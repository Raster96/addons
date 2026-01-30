// ==UserScript==
// @name         Missing Party Members
// @namespace    http://tampermonkey.net/
// @version      2025-12-08
// @description  Zaznacza na czerwono w oknie grupy graczy, którzy nie znajdują się w zasięgu 20 kratek od nas.
// @author       Marger
// @match        http*://*.margonem.pl/
// @exclude      http*://www.margonem.pl/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=margonem.pl
// @grant        none
// ==/UserScript==

const isOtherInBattleRange = (other) => {
    const { x: hx, y: hy } = Engine.hero.d;
    const { x, y } = other.d;
    return Math.max(Math.abs(x - hx), Math.abs(y - hy)) <= 20;
};
const updatePartyMembers = () => {
    if (!Engine.party) return;
    const partyMembers = Engine.party.getMembers();
    if (!partyMembers) return;
    const others = Engine.others.check();
    const members = Object.fromEntries(partyMembers);
    const { id: hid } = Engine.hero.d;
    for (const id of Object.keys(members)) {
        if (id == hid) continue;
        const $nickname = members[id].el.querySelector('.nickname');
        const inRange = others[id] && isOtherInBattleRange(others[id]);
        $nickname.style.color = inRange ? '' : 'red';
    }
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
