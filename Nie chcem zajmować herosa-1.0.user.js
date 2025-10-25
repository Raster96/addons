// ==UserScript==
// @name         Nie chcem zajmować herosa
// @version      1.0
// @description  Usuwa przycisk "Zajmij herosa" z menu kontekstowego wykrywacza herosów
// @author       You
// @match        http*://*.margonem.pl/
// @exclude      https://www.margonem.pl/
// @exclude      https://www.margonem.pl//*.
// @icon         https://www.google.com/s2/favicons?sz=64&domain=margonem.pl
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const waitForEngine = setInterval(() => {
        if (window.Engine && window.Engine.interface && window.Engine.interface.showPopupMenu) {
            clearInterval(waitForEngine);

            const originalShowPopupMenu = window.Engine.interface.showPopupMenu;

            window.Engine.interface.showPopupMenu = function(contextMenu, event, options) {
                if (Array.isArray(contextMenu)) {
                    const filteredMenu = contextMenu.filter(item => {
                        if (Array.isArray(item) && item.length >= 1) {
                            const text = item[0];
                            return !(
                                text.toLowerCase().includes('zajmij')
                            );
                        }
                        return true;
                    });

                    return originalShowPopupMenu.call(this, filteredMenu, event, options);
                }

                return originalShowPopupMenu.call(this, contextMenu, event, options);
            };
        }
    }, 100);
})();