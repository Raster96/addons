// ==UserScript==
// @name         Notepad
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Prosty notatnik z automatycznym zapisywaniem w GM storage. Zapisuje tekst po każdym wpisanym znaku.
// @author       You
// @match        http*://*.margonem.pl/
// @exclude      http*://www.margonem.pl/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=margonem.pl
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function () {
    'use strict';

    let notepadMenu = null;
    let toggleButton = null;
    let resizeHandle = null;
    let textArea = null;
    let isVisible = true;
    let isDragging = false;
    let isDraggingToggle = false;
    let isResizing = false;
    let dragOffset = { x: 0, y: 0 };
    let toggleDragOffset = { x: 0, y: 0 };
    let resizeStartSize = { width: 0, height: 0 };
    let resizeStartMouse = { x: 0, y: 0 };

    const addTip = (element, text) => {
        $(element).tip(text);
    };

    const waitForGame = setInterval(() => {
        if (typeof Engine !== 'undefined' && Engine.communication) {
            clearInterval(waitForGame);
            initAddon();
        }
    }, 100);

    function initAddon() {
        loadData();
        createStyles();
        createToggleButton();
        createNotepadMenu();
    }

    function toggleWindow() {
        isVisible = !isVisible;
        notepadMenu.style.display = isVisible ? 'block' : 'none';
        saveVisibility();
    }

    function closeWindow() {
        isVisible = false;
        notepadMenu.style.display = 'none';
        saveVisibility();
    }

    function loadData() {
        isVisible = GM_getValue('notepadVisible', true);
    }

    function saveVisibility() {
        GM_setValue('notepadVisible', isVisible);
    }

    function loadText() {
        return GM_getValue('notepadText', '');
    }

    function saveText(text) {
        GM_setValue('notepadText', text);
    }

    function loadMenuPosition() {
        const position = GM_getValue('notepadMenuPosition', '{"x": 10, "y": 100}');
        return JSON.parse(position);
    }

    function loadMenuSize() {
        const size = GM_getValue('notepadMenuSize', '{"width": 400, "height": 500}');
        return JSON.parse(size);
    }

    function saveMenuPosition(x, y) {
        GM_setValue('notepadMenuPosition', JSON.stringify({ x, y }));
    }

    function saveMenuSize(width, height) {
        GM_setValue('notepadMenuSize', JSON.stringify({ width, height }));
    }

    function loadTogglePosition() {
        const position = GM_getValue('notepadTogglePosition', '{"x": 10, "y": 10}');
        return JSON.parse(position);
    }

    function saveTogglePosition(x, y) {
        GM_setValue('notepadTogglePosition', JSON.stringify({ x, y }));
    }

    function createStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .notepad-advanced {
                position: fixed;
                background: linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%);
                border: 1px solid #333;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8),
                           0 0 0 1px rgba(255, 255, 255, 0.1) inset;
                z-index: 15;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                min-width: 300px;
                min-height: 250px;
                backdrop-filter: blur(10px);
                overflow: hidden;
                resize: none;
            }

            .notepad-resize-handle {
                position: absolute;
                bottom: 0;
                right: 0;
                width: 20px;
                height: 20px;
                cursor: nw-resize;
                background: linear-gradient(135deg, transparent 0%, transparent 40%, #555 40%, #555 60%, transparent 60%);
                border-bottom-right-radius: 12px;
            }

            .notepad-resize-handle:hover {
                background: linear-gradient(135deg, transparent 0%, transparent 40%, #777 40%, #777 60%, transparent 60%);
            }

            .notepad-title {
                background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%);
                color: #fff;
                padding: 12px 16px;
                font-weight: 600;
                font-size: 14px;
                cursor: move;
                user-select: none;
                border-bottom: 1px solid #333;
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }

            .notepad-close-btn {
                position: absolute;
                right: 12px;
                background: #e74c3c;
                color: white;
                border: none;
                width: 24px;
                height: 24px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.2s;
            }

            .notepad-close-btn:hover {
                background: #c0392b;
            }

            .notepad-title::before {
                content: '🗒️';
                margin-right: 8px;
                font-size: 16px;
            }

            .notepad-toggle-button {
                position: fixed;
                width: 44px;
                height: 44px;
                background: linear-gradient(145deg, #2d2d2d 0%, #1a1a1a 100%);
                border: 1px solid #333;
                border-radius: 8px;
                color: white;
                font-size: 20px;
                cursor: move;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 16;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
                transition: all 0.2s ease;
                user-select: none;
            }

            .notepad-body {
                display: flex;
                flex-direction: column;
                height: calc(100% - 49px);
                position: relative;
            }

            .notepad-content {
                flex: 1;
                padding: 16px;
                background: #0d0d0d;
                display: flex;
                flex-direction: column;
            }

            .notepad-textarea {
                flex: 1;
                width: 100%;
                background: #1a1a1a;
                border: 1px solid #333;
                border-radius: 8px;
                color: #fff;
                font-size: 14px;
                font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
                padding: 12px;
                outline: none;
                resize: none;
                line-height: 1.5;
                min-height: 200px;
                box-sizing: border-box;
            }

            .notepad-textarea:focus {
                border-color: #ffd700;
                box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.2);
            }

            .notepad-textarea::placeholder {
                color: #666;
                font-style: italic;
            }

            .notepad-textarea::-webkit-scrollbar {
                width: 8px;
            }

            .notepad-textarea::-webkit-scrollbar-track {
                background: #0d0d0d;
                border-radius: 4px;
            }

            .notepad-textarea::-webkit-scrollbar-thumb {
                background: linear-gradient(135deg, #444 0%, #333 100%);
                border-radius: 4px;
            }

            .notepad-textarea::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(135deg, #555 0%, #444 100%);
            }

            .notepad-status {
                margin-top: 8px;
                font-size: 12px;
                color: #666;
                text-align: right;
                font-style: italic;
            }
        `;
        document.head.appendChild(style);
    }

    function createToggleButton() {
        toggleButton = document.createElement('div');
        toggleButton.className = 'notepad-toggle-button';
        toggleButton.textContent = '🗒️';
        addTip(toggleButton, 'Notepad');

        const position = loadTogglePosition();
        toggleButton.style.left = position.x + 'px';
        toggleButton.style.top = position.y + 'px';

        toggleButton.addEventListener('click', toggleWindow);
        toggleButton.addEventListener('mousedown', startToggleDrag);

        document.body.appendChild(toggleButton);
    }

    function createNotepadMenu() {
        notepadMenu = document.createElement('div');
        notepadMenu.className = 'notepad-advanced';

        const position = loadMenuPosition();
        const size = loadMenuSize();
        notepadMenu.style.left = position.x + 'px';
        notepadMenu.style.top = position.y + 'px';
        notepadMenu.style.width = size.width + 'px';
        notepadMenu.style.height = size.height + 'px';

        const title = document.createElement('div');
        title.className = 'notepad-title';
        title.textContent = 'Notepad';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'notepad-close-btn';
        closeBtn.textContent = '✕';
        addTip(closeBtn, 'Zamknij');
        closeBtn.addEventListener('click', closeWindow);

        title.appendChild(closeBtn);

        const body = document.createElement('div');
        body.className = 'notepad-body';

        const content = document.createElement('div');
        content.className = 'notepad-content';

        textArea = document.createElement('textarea');
        textArea.className = 'notepad-textarea';
        textArea.placeholder = 'Wpisz swoje notatki tutaj...\n\nTekst jest zapisywany automatycznie po każdym znaku.';
        textArea.value = loadText();

        textArea.addEventListener('input', () => {
            saveText(textArea.value);
            updateStatus();
        });

        const status = document.createElement('div');
        status.className = 'notepad-status';
        status.id = 'notepad-status';

        resizeHandle = document.createElement('div');
        resizeHandle.className = 'notepad-resize-handle';
        addTip(resizeHandle, 'Przeciągnij aby zmienić rozmiar');

        content.appendChild(textArea);
        content.appendChild(status);
        body.appendChild(content);

        notepadMenu.appendChild(title);
        notepadMenu.appendChild(body);
        notepadMenu.appendChild(resizeHandle);

        title.addEventListener('mousedown', startDrag);
        resizeHandle.addEventListener('mousedown', startResize);

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        document.body.appendChild(notepadMenu);

        notepadMenu.style.display = isVisible ? 'block' : 'none';

        updateStatus();
    }

    function updateStatus() {
        const status = document.getElementById('notepad-status');
        if (status && textArea) {
            const charCount = textArea.value.length;
            const lineCount = textArea.value.split('\n').length;
            status.textContent = `Znaków: ${charCount} | Linii: ${lineCount} | Automatycznie zapisano`;
        }
    }

    function startDrag(e) {
        isDragging = true;
        const rect = notepadMenu.getBoundingClientRect();
        dragOffset.x = e.clientX - rect.left;
        dragOffset.y = e.clientY - rect.top;
        e.preventDefault();
    }

    function startResize(e) {
        isResizing = true;
        const rect = notepadMenu.getBoundingClientRect();
        resizeStartSize.width = rect.width;
        resizeStartSize.height = rect.height;
        resizeStartMouse.x = e.clientX;
        resizeStartMouse.y = e.clientY;
        e.preventDefault();
        e.stopPropagation();
    }

    function startToggleDrag(e) {
        isDraggingToggle = true;
        const rect = toggleButton.getBoundingClientRect();
        toggleDragOffset.x = e.clientX - rect.left;
        toggleDragOffset.y = e.clientY - rect.top;
        e.preventDefault();
        e.stopPropagation();
    }

    function handleMouseMove(e) {
        if (isDragging) {
            const x = e.clientX - dragOffset.x;
            const y = e.clientY - dragOffset.y;

            notepadMenu.style.left = Math.max(0, Math.min(window.innerWidth - notepadMenu.offsetWidth, x)) + 'px';
            notepadMenu.style.top = Math.max(0, Math.min(window.innerHeight - notepadMenu.offsetHeight, y)) + 'px';
        }

        if (isResizing) {
            const deltaX = e.clientX - resizeStartMouse.x;
            const deltaY = e.clientY - resizeStartMouse.y;

            const newWidth = Math.max(300, resizeStartSize.width + deltaX);
            const newHeight = Math.max(250, resizeStartSize.height + deltaY);

            notepadMenu.style.width = newWidth + 'px';
            notepadMenu.style.height = newHeight + 'px';
        }

        if (isDraggingToggle) {
            const x = e.clientX - toggleDragOffset.x;
            const y = e.clientY - toggleDragOffset.y;

            toggleButton.style.left = Math.max(0, Math.min(window.innerWidth - toggleButton.offsetWidth, x)) + 'px';
            toggleButton.style.top = Math.max(0, Math.min(window.innerHeight - toggleButton.offsetHeight, y)) + 'px';
        }
    }

    function handleMouseUp() {
        if (isDragging) {
            isDragging = false;
            const rect = notepadMenu.getBoundingClientRect();
            saveMenuPosition(rect.left, rect.top);
        }

        if (isResizing) {
            isResizing = false;
            const rect = notepadMenu.getBoundingClientRect();
            saveMenuSize(rect.width, rect.height);
        }

        if (isDraggingToggle) {
            isDraggingToggle = false;
            const rect = toggleButton.getBoundingClientRect();
            saveTogglePosition(rect.left, rect.top);
        }
    }
})();