// ==UserScript==
// @name         Gracze na mapie - kopiuj
// @namespace    http://tampermonkey.net/
// @version      2024-03-31
// @description  Dodaje przycisk który dodaje przycisk kopiuj umożliwiający skopiowanie listy "Gracze na mapie"
// @author       You
// @match        *://inferno.margonem.pl/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=margonem.pl
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const style = document.createElement('style');
    style.textContent = `
.copy-button {
    width: 13px;
    height: 15px;
    top: 6.7px;
    left: 125.3px;
    background: url(https://inferno.margonem.pl/img/gui/buttony.png) -772px -202px;
    margin-left: 6px;
    display: inline-block;
    transform: scale(0.8);
    vertical-align: text-top;
    border: none;
    outline: none;
    position: absolute;
    cursor: url(https://inferno.margonem.pl/img/gui/cursor/5n.png) 4 0, url(https://inferno.margonem.pl/img/gui/cursor/5n.cur) 4 0, auto;
}

.copy-button:hover {
    background-position-y: -184px
}
    `;
    document.head.appendChild(style);

    function createButton() {
        var button = document.createElement('button');
        button.classList.add('copy-button');
        return button;
    }

    var copyButton;

    function initialize() {
        copyButton = createButton();
        copyButton.addEventListener('click', function() {
            var playerList = document.querySelector('.who-is-here .scroll-wrapper .scroll-pane .player-list');
            if (playerList) {
                var players = Array.from(playerList.children).map(function(player) {
                    var playerName = player.textContent.trim().split(/\s*(?:\[\d+[a-z]?\]|\(\d+[a-z]?\))\s*/)[0];
                    return playerName;
                });

                players.unshift(Engine.hero.d.nick);

                var copiedText = players.join('/');

                var textArea = document.createElement('textarea');
                textArea.value = copiedText;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                message(`Skopiowano listę graczy!`);
                document.body.removeChild(textArea);
            }
        });

        var whoIsHereWindow = document.querySelector('.whoishere-window .header-label-positioner');
        if (whoIsHereWindow) {
            whoIsHereWindow.appendChild(copyButton);
        } else {
            console.error('Element .whoishere-window not found.');
        }
    }

function run() {
    if (typeof Engine === 'undefined' || Engine.getInitLvl() !== 4) {
        setTimeout(run, 100);
        return;
    }
    initialize();
}

run();
})();
