// ==UserScript==
// @name         Missing Party Members (Klanowicze online)
// @namespace    http://tampermonkey.net/
// @version      2025-04-26
// @description  Zaznacza na złoto graczy, którzy są w zasięgu 20 kratek na dodatku Klanowicz online Priweejta.
// @author       przeróbka kodu Margera
// @match        http*://*.margonem.pl/
// @exclude      http*://www.margonem.pl/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=margonem.pl
// @grant        none
// ==/UserScript==

(function() {
    const isOtherInBattleRange = (other) => {
        const { x: hx, y: hy } = Engine.hero.d;
        const { x, y } = other.d;
        return Math.max(Math.abs(x - hx), Math.abs(y - hy)) <= 20;
    };

    const updatePartyMembers = () => {
    //    if (!Engine.party) return; // usunac // zeby dzialalo tylko jak grp
        const others = Engine.others.check();
        const hero = Engine.hero.d.nick;
        const otherDivs = document.querySelectorAll('.gargonem-otherlist-left.nowrap');

        otherDivs.forEach(div => {
            const fullText = div.textContent.trim();
            const nickname = fullText.split(' (')[0];

            let inRange = false;
            if (nickname === hero) {
                inRange = true;
            } else {
                const other = Object.values(others).find(o => o.nick === nickname);
                if (other && isOtherInBattleRange(other)) {
                    inRange = true;
                }
            }

            div.style.color = inRange ? '#FFD700' : '';
        });
    };

    const intercept = (obj, key, cb, _ = obj[key]) => obj[key] = (...args) => {
        const result = _.apply(obj, args);
        return cb(...args) ?? result;
    };

    intercept(Engine.communication, 'parseJSON', (data) => {
        if (data.h || data.party || data.other) {
            updatePartyMembers();
        }
    });
})();
