// ==UserScript==
// @name         Missing Party Members
// @namespace    http://tampermonkey.net/
// @version      2024-08-25
// @description  Zaznacza na czerwono w oknie grupy graczy, którzy nie znajdują się w zasięgu 20 kratek od nas.
// @author       Marger
// @match        http*://*.margonem.pl/
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
    if (!Engine.party) return;
    const others = Engine.others.check();
    const members = Engine.party.getMembers();
    const { id: hid } = Engine.hero.d;
    for (const id of Object.keys(members)) {
        if (id == hid) continue;
        const $nickname = members[id].$.find('.nickname');
        const inRange = others[id] && isOtherInBattleRange(others[id]);
        $nickname.css('color', inRange ? '' : 'red');
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
});})();
