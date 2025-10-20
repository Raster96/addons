// ==UserScript==
// @name         Essence Display
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Wyświetla ilość esencji obok nazwy przedmiotu
// @author       Twój Nick
// @match        http*://*.margonem.pl/
// @exclude      https://www.margonem.pl/
// @exclude      https://www.margonem.pl//*.
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const waitForGame = setInterval(() => {
        if (typeof Engine !== 'undefined' && typeof API !== 'undefined' && typeof MargoTipsParser !== 'undefined') {
            clearInterval(waitForGame);
            initAddon();
        }
    }, 100);

    function initAddon() {

        const originalGetTip = MargoTipsParser.getTip;

        MargoTipsParser.getTip = function(item, cmpStats) {

            let originalName = null;
            if (item && item.salvageItems && item.salvageItems > 0) {
                originalName = item.name;
                item.name = `${originalName} [${item.salvageItems}]`;
            }

            let tooltip = originalGetTip.call(this, item, cmpStats);

            if (originalName !== null) {
                item.name = originalName;
            }

            return tooltip;
        };

    }
})();