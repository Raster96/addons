// ==UserScript==
// @name         Wykrywacz monet
// @namespace    http://tampermonkey.net/
// @version      2024-12-18
// @description  Wyświetla żółty komunikat i wyszukuje "Moneta" na minimapach.
// @author       You
// @match        http*://*.margonem.pl/
// @exclude      http*://www.margonem.pl/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=margonem.pl
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function checkNpcs(npc) {
        if (npc.d.nick === 'Moneta') {
            message('Moneta!');

            const searchInput = document.querySelector('.search-wrapper.search-item-wrapper .search');
            if (searchInput) {
                searchInput.value = 'Moneta';
                searchInput.dispatchEvent(new Event('keyup'));
            }

            const bottomBarInput = document.querySelector('.mmpWrapper .mmpBottombar input');
            if (bottomBarInput) {
                bottomBarInput.value = 'Moneta';
                bottomBarInput.dispatchEvent(new Event('keyup'));
            }
        }
    }

    window.API.addCallbackToEvent('newNpc', function(npc) {
        checkNpcs(npc);
    });
})();
