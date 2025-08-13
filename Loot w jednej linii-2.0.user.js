// ==UserScript==
// @name         Loot w jednej linii
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  6 lootów w jednej linii, >6 lootów (kolos) = dwie linie po 5, Twój loot z kolosa zawsze wyświetlany jako pierwszy
// @match        http*://*.margonem.pl
// @exclude      https://www.margonem.pl/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=margonem.pl
// @grant        GM_addStyle
// ==/UserScript==

(function () {
    'use strict';

GM_addStyle(`
    .loot-window .items-wrapper {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: center !important;
        max-width: 408px;
    }

    .loot-window .items-wrapper:has(.loot-item-wrapper:nth-child(7)) {
        max-width: 340px;
    }

    .loot-window .items-wrapper .loot-item-wrapper.yours {
        order: -1;
    }
`);
})();
