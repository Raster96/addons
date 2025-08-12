// ==UserScript==
// @name         Loot w jednej linii
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Loot w jednej linii
// @match        *://*.margonem.pl/*
// @exclude      https://www.margonem.pl/
// @exclude      https://www.margonem.pl//*.
// @icon         https://www.google.com/s2/favicons?sz=64&domain=margonem.pl
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle(`
        .loot-window .items-wrapper {
            max-width: none !important;
            justify-content: center !important;
        }`
       );
})();