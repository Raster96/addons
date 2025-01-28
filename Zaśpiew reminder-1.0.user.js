// ==UserScript==
// @name         Zaśpiew reminder
// @version      1.0.1
// @author       You
// @description  Po rozpoczęciu walki z tytanem wyświetla żółty komunikat przypominający o użyciu zaśpiewów (Mroczny Wrzask i Krzyk z Otchłani)
// @match        *.margonem.pl/
// @exclude      https://www.margonem.pl/
// @exclude      https://www.margonem.pl//*.
// @icon         https://www.google.com/s2/favicons?sz=64&domain=margonem.pl
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const intercept = (obj, key, cb, _ = obj[key]) => obj[key] = (...args) => {
        const result = _.apply(obj, args);
        return cb(...args) ?? result;
    };

    intercept(Engine.communication, 'parseJSON', (data) => {
        if (data.f && data.npcs && data.npcs[0] && data.npcs[0].wt > 99) {
            const items = Engine.items.fetchLocationItems("g");

            if (items && Array.isArray(items)) {
                items.forEach(item => {
                    if (item.name === "Mroczny Wrzask" || item.name === "Plaga z Otchłani" || item.name === "Krzyk z Otchłani") {
                        message(`Przypomnienie o użyciu przedmiotu ${item.name}.`);
                    }
                });
            }
        }
    });
})();
