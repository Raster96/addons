// ==UserScript==
// @name         NPC Click Counter
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Liczy rozpoczynane dialogi z wybranymi NPC-ami. Przydatne np. podczas eventów do liczenia NPC-ów z których spada waluta albo podczas kopalni.
// @author       You
// @match        http*://*.margonem.pl/
// @exclude      http*://www.margonem.pl/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=margonem.pl
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function () {
    'use strict';

    let npcCounters = [];
    let counterMenu = null;
    let toggleButton = null;
    let resizeHandle = null;
    let isVisible = true;
    let isDragging = false;
    let isDraggingToggle = false;
    let isResizing = false;
    let dragOffset = { x: 0, y: 0 };
    let toggleDragOffset = { x: 0, y: 0 };
    let resizeStartSize = { width: 0, height: 0 };
    let resizeStartMouse = { x: 0, y: 0 };

    let lastNpcName = '';

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
        createCounterMenu();
        setupIntercept();
    }

    const intercept = (obj, key, cb, _ = obj[key]) =>
        obj[key] = (...args) => {
            const result = _.apply(obj, args);
            cb(...args);
            return result;
        };

    function setupIntercept() {
        intercept(Engine.communication, 'parseJSON', handleGameData);
    }

    function handleGameData(data) {
        try {
            if (data?.d) {
                handleDialogData(data.d);
            }

            if (!Engine.dialogue || !Engine.dialogue.talk || Engine.dialogue.talk.id === 0) {
                if (lastNpcName) {
                    lastNpcName = '';
                }
            }
        } catch (error) {
            console.error('NPC Click Counter Error:', error);
        }
    }

    function handleDialogData(dialogData) {
        try {
            if (Array.isArray(dialogData) && dialogData.length >= 5) {
                const dialogType = dialogData[0] || 0;
                const npcName = dialogData[1] || '';
                const dialogText = dialogData[4] || '';

                if (npcName.trim() && dialogText.trim()) {
                    if (isNewDialog(npcName)) {
                        handleNpcDialog(npcName);
                    } else {
                    }
                }
            }
        } catch (error) {
            console.error('Dialog Handler Error:', error);
        }
    }

    function isNewDialog(npcName) {
        const hasActiveDialog = Engine.dialogue && Engine.dialogue.talk && Engine.dialogue.talk.id !== 0;

        if (hasActiveDialog && lastNpcName === npcName) {
            return false;
        }

        lastNpcName = npcName;
        return true;
    }

    function handleNpcDialog(npcName) {
        const existingIndex = npcCounters.findIndex(entry => entry.npcName === npcName);

        if (existingIndex !== -1) {
            npcCounters[existingIndex].count++;

            npcCounters.sort((a, b) => b.count - a.count);

            saveData();
            updateCounterMenu();
        }
    }

    function addNpcToTracking(npcName) {
        if (!npcName.trim()) return;

        const existingIndex = npcCounters.findIndex(entry => entry.npcName === npcName);

        if (existingIndex === -1) {
            npcCounters.push({
                npcName: npcName,
                count: 0
            });

            saveData();
            updateCounterMenu();
        }
    }



    function removeNpcFromTracking(npcName) {
        const existingIndex = npcCounters.findIndex(entry => entry.npcName === npcName);

        if (existingIndex !== -1) {
            npcCounters.splice(existingIndex, 1);
            saveData();
            updateCounterMenu();
        }
    }

    function toggleWindow() {
        isVisible = !isVisible;
        counterMenu.style.display = isVisible ? 'block' : 'none';
        saveData();
    }

    function closeWindow() {
        isVisible = false;
        counterMenu.style.display = 'none';
        saveData();
    }

    function loadData() {
        const saved = GM_getValue('npcCounters', '[]');
        npcCounters = JSON.parse(saved);
        isVisible = GM_getValue('npcCounterVisible', true);
    }

    function saveData() {
        GM_setValue('npcCounters', JSON.stringify(npcCounters));
        GM_setValue('npcCounterVisible', isVisible);
    }

    function loadMenuPosition() {
        const position = GM_getValue('counterMenuPosition', '{"x": 10, "y": 100}');
        return JSON.parse(position);
    }

    function loadMenuSize() {
        const size = GM_getValue('counterMenuSize', '{"width": 320, "height": 400}');
        return JSON.parse(size);
    }

    function saveMenuPosition(x, y) {
        GM_setValue('counterMenuPosition', JSON.stringify({ x, y }));
    }

    function saveMenuSize(width, height) {
        GM_setValue('counterMenuSize', JSON.stringify({ width, height }));
    }

    function loadTogglePosition() {
        const position = GM_getValue('toggleButtonPosition', '{"x": 10, "y": 10}');
        return JSON.parse(position);
    }

    function saveTogglePosition(x, y) {
        GM_setValue('toggleButtonPosition', JSON.stringify({ x, y }));
    }

    function createStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .npc-counter-advanced {
                position: fixed;
                background: linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%);
                border: 1px solid #333;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8),
                           0 0 0 1px rgba(255, 255, 255, 0.1) inset;
                z-index: 15;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                min-width: 280px;
                min-height: 200px;
                backdrop-filter: blur(10px);
                overflow: hidden;
                resize: none;
            }

            .npc-resize-handle {
                position: absolute;
                bottom: 0;
                right: 0;
                width: 20px;
                height: 20px;
                cursor: nw-resize;
                background: linear-gradient(135deg, transparent 0%, transparent 40%, #555 40%, #555 60%, transparent 60%);
                border-bottom-right-radius: 12px;
            }

            .npc-resize-handle:hover {
                background: linear-gradient(135deg, transparent 0%, transparent 40%, #777 40%, #777 60%, transparent 60%);
            }

            .npc-counter-title {
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

            .npc-close-btn {
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

            .npc-close-btn:hover {
                background: #c0392b;
            }

            .npc-counter-title::before {
                content: '📝';
                margin-right: 8px;
                font-size: 16px;
            }

            .npc-toggle-button {
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

            .npc-count {
                background: #444;
                color: #ffd700;
                padding: 2px 8px;
                border-radius: 10px;
                font-size: 12px;
                font-weight: bold;
            }

            .npc-input-section {
                padding: 12px 16px;
                background: #222;
                border-bottom: 1px solid #333;
            }

            .npc-input-wrapper {
                display: flex;
                gap: 8px;
                align-items: center;
            }

            .npc-input {
                flex: 1;
                padding: 8px 12px;
                background: #333;
                border: 1px solid #555;
                border-radius: 6px;
                color: #fff;
                font-size: 13px;
                outline: none;
            }

            .npc-input:focus {
                border-color: #ffd700;
                box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.2);
            }

            .npc-input::placeholder {
                color: #888;
            }

            .npc-add-btn {
                background: #27ae60;
                color: white;
                border: none;
                padding: 8px 12px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                transition: background 0.2s;
                min-width: 40px;
            }

            .npc-add-btn:hover {
                background: #2ecc71;
            }

            .npc-counter-content {
                flex: 1;
                overflow-y: auto;
                overflow-x: hidden;
                background: #0d0d0d;
                min-height: 100px;
                scroll-behavior: smooth;
            }

            .npc-counter-body {
                display: flex;
                flex-direction: column;
                height: 100%;
                position: relative;
            }

            .counter-item {
                padding: 12px 16px;
                border-bottom: 1px solid #222;
                color: #fff;
                font-size: 13px;
                transition: all 0.3s ease;
                position: relative;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .counter-item:hover {
                background: linear-gradient(90deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%);
            }

            .counter-item:last-child {
                border-bottom: none;
            }

            .npc-name {
                font-weight: bold;
                color: #87ceeb;
                font-size: 14px;
                flex: 1;
            }

            .npc-actions {
                display: flex;
                gap: 8px;
                align-items: center;
            }

            .npc-counter-display {
                background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
                color: white;
                padding: 4px 8px;
                border-radius: 12px;
                font-weight: bold;
                font-size: 12px;
                min-width: 30px;
                text-align: center;
            }

            .npc-btn {
                background: #555;
                color: #fff;
                border: none;
                padding: 6px 10px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
                transition: background 0.2s;
                min-width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .npc-btn:hover {
                background: #666;
            }



            .npc-btn.remove {
                background: #e74c3c;
            }

            .npc-btn.remove:hover {
                background: #c0392b;
            }

            .npc-counter-content::-webkit-scrollbar {
                width: 8px;
            }

            .npc-counter-content::-webkit-scrollbar-track {
                background: #0d0d0d;
            }

            .npc-counter-content::-webkit-scrollbar-thumb {
                background: linear-gradient(135deg, #444 0%, #333 100%);
                border-radius: 4px;
            }

            .npc-counter-content::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(135deg, #555 0%, #444 100%);
            }

            .no-data {
                padding: 30px 20px;
                text-align: center;
                color: #666;
                font-style: italic;
                font-size: 13px;
            }

            .no-data::before {
                content: '📝';
                display: block;
                font-size: 24px;
                margin-bottom: 8px;
                opacity: 0.5;
            }
        `;
        document.head.appendChild(style);
    }

    function createToggleButton() {
        toggleButton = document.createElement('div');
        toggleButton.className = 'npc-toggle-button';
        toggleButton.textContent = '📝';
        addTip(toggleButton, 'NPC Click Counter');

        const position = loadTogglePosition();
        toggleButton.style.left = position.x + 'px';
        toggleButton.style.top = position.y + 'px';

        toggleButton.addEventListener('click', toggleWindow);

        toggleButton.addEventListener('mousedown', startToggleDrag);

        document.body.appendChild(toggleButton);
    }

    function createCounterMenu() {
        counterMenu = document.createElement('div');
        counterMenu.className = 'npc-counter-advanced';

        const position = loadMenuPosition();
        const size = loadMenuSize();
        counterMenu.style.left = position.x + 'px';
        counterMenu.style.top = position.y + 'px';
        counterMenu.style.width = size.width + 'px';
        counterMenu.style.height = size.height + 'px';

        const title = document.createElement('div');
        title.className = 'npc-counter-title';
        title.textContent = 'NPC Click Counter';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'npc-close-btn';
        closeBtn.textContent = '✕';
        addTip(closeBtn, 'Zamknij');
        closeBtn.addEventListener('click', closeWindow);

        title.appendChild(closeBtn);

        const inputSection = document.createElement('div');
        inputSection.className = 'npc-input-section';

        const inputWrapper = document.createElement('div');
        inputWrapper.className = 'npc-input-wrapper';

        const input = document.createElement('input');
        input.className = 'npc-input';
        input.type = 'text';
        input.placeholder = 'Nazwa NPC...';

        const addBtn = document.createElement('button');
        addBtn.className = 'npc-add-btn';
        addBtn.textContent = '+';
        addTip(addBtn, 'Dodaj NPC');

        const addNpc = () => {
            const npcName = input.value.trim();
            if (npcName) {
                addNpcToTracking(npcName);
                input.value = '';
            }
        };

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addNpc();
            }
        });

        addBtn.addEventListener('click', addNpc);

        inputWrapper.appendChild(input);
        inputWrapper.appendChild(addBtn);
        inputSection.appendChild(inputWrapper);

        const body = document.createElement('div');
        body.className = 'npc-counter-body';

        const content = document.createElement('div');
        content.className = 'npc-counter-content';

        resizeHandle = document.createElement('div');
        resizeHandle.className = 'npc-resize-handle';
        addTip(resizeHandle, 'Przeciągnij aby zmienić rozmiar');

        body.appendChild(inputSection);
        body.appendChild(content);

        counterMenu.appendChild(title);
        counterMenu.appendChild(body);
        counterMenu.appendChild(resizeHandle);

        title.addEventListener('mousedown', startDrag);

        resizeHandle.addEventListener('mousedown', startResize);

        content.addEventListener('wheel', handleWheelScroll, { passive: false });

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        document.body.appendChild(counterMenu);

        counterMenu.style.display = isVisible ? 'block' : 'none';

        updateCounterMenu();
    }

    function updateCounterMenu() {
        if (!counterMenu) return;

        const title = counterMenu.querySelector('.npc-counter-title');
        const content = counterMenu.querySelector('.npc-counter-content');

        const titleText = title.childNodes[0];
        if (titleText && titleText.nodeType === Node.TEXT_NODE) {
            titleText.textContent = 'NPC Licznik';
        } else {
            const textNode = document.createTextNode('NPC Licznik');
            title.insertBefore(textNode, title.firstChild);
        }
        content.innerHTML = '';

        if (npcCounters.length === 0) {
            const noData = document.createElement('div');
            noData.className = 'no-data';
            noData.textContent = 'Dodaj NPC do śledzenia używając pola powyżej';
            content.appendChild(noData);
            return;
        }

        npcCounters.forEach(npc => {
            const item = document.createElement('div');
            item.className = 'counter-item';

            const nameDiv = document.createElement('div');
            nameDiv.className = 'npc-name';
            nameDiv.textContent = npc.npcName;

            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'npc-actions';

            const counterDisplay = document.createElement('div');
            counterDisplay.className = 'npc-counter-display';
            counterDisplay.textContent = npc.count;

            const removeBtn = document.createElement('button');
            removeBtn.className = 'npc-btn remove';
            removeBtn.textContent = '✕';
            addTip(removeBtn, 'Usuń NPC');
            removeBtn.addEventListener('click', () => {
                if (confirm(`Czy na pewno chcesz usunąć "${npc.npcName}" z listy?`)) {
                    removeNpcFromTracking(npc.npcName);
                }
            });

            actionsDiv.appendChild(counterDisplay);
            actionsDiv.appendChild(removeBtn);

            item.appendChild(nameDiv);
            item.appendChild(actionsDiv);
            content.appendChild(item);
        });
    }

    function startDrag(e) {
        isDragging = true;
        const rect = counterMenu.getBoundingClientRect();
        dragOffset.x = e.clientX - rect.left;
        dragOffset.y = e.clientY - rect.top;
        e.preventDefault();
    }

    function startResize(e) {
        isResizing = true;
        const rect = counterMenu.getBoundingClientRect();
        resizeStartSize.width = rect.width;
        resizeStartSize.height = rect.height;
        resizeStartMouse.x = e.clientX;
        resizeStartMouse.y = e.clientY;
        e.preventDefault();
        e.stopPropagation();
    }

    function handleMouseMove(e) {
        if (isDragging) {
            const x = e.clientX - dragOffset.x;
            const y = e.clientY - dragOffset.y;

            counterMenu.style.left = Math.max(0, Math.min(window.innerWidth - counterMenu.offsetWidth, x)) + 'px';
            counterMenu.style.top = Math.max(0, Math.min(window.innerHeight - counterMenu.offsetHeight, y)) + 'px';
        }

        if (isResizing) {
            const deltaX = e.clientX - resizeStartMouse.x;
            const deltaY = e.clientY - resizeStartMouse.y;

            const newWidth = Math.max(280, resizeStartSize.width + deltaX);
            const newHeight = Math.max(200, resizeStartSize.height + deltaY);

            counterMenu.style.width = newWidth + 'px';
            counterMenu.style.height = newHeight + 'px';
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
            const rect = counterMenu.getBoundingClientRect();
            saveMenuPosition(rect.left, rect.top);
        }

        if (isResizing) {
            isResizing = false;
            const rect = counterMenu.getBoundingClientRect();
            saveMenuSize(rect.width, rect.height);
        }

        if (isDraggingToggle) {
            isDraggingToggle = false;
            const rect = toggleButton.getBoundingClientRect();
            saveTogglePosition(rect.left, rect.top);
        }
    }


    function handleWheelScroll(e) {
        e.preventDefault();
        e.stopPropagation();

        const content = e.currentTarget;
        const scrollAmount = e.deltaY;

        const canScrollUp = content.scrollTop > 0;
        const canScrollDown = content.scrollTop < (content.scrollHeight - content.clientHeight);

        if ((scrollAmount > 0 && canScrollDown) || (scrollAmount < 0 && canScrollUp)) {
            content.scrollTop += scrollAmount;
        }
    }

    function startToggleDrag(e) {
        isDraggingToggle = true;
        const rect = toggleButton.getBoundingClientRect();
        toggleDragOffset.x = e.clientX - rect.left;
        toggleDragOffset.y = e.clientY - rect.top;
        e.preventDefault();
        e.stopPropagation();
    }
})();
