// ==UserScript==
// @name         Missing Party Members
// @namespace    http://tampermonkey.net/
// @version      2024-03-29
// @description  Zaznacza na czerwono graczy w oknie grupy, którzy nie znajdują się na tej samej mapie co my.
// @author       You
// @match        https://*.margonem.pl/
// @exclude      https://www.margonem.pl/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=margonem.pl
// @grant        none
// ==/UserScript==

const checkMissingMembers = () => {
    if (!Engine.party) {
        return;
    }

    const currentMapName = Engine.map.d.name;
    const partyMembers = Object.values(Engine.party.getMembers()).map(member => ({
        nick: member.nick,
        div: document.querySelector(`div.party-member.tw-list-item.other-party-id-${member.id}`)
    }));
    const hereList = Object.values(Engine.whoIsHere.getList()).map(entry => entry.nick);

    let missingMembers = [];

    partyMembers.forEach(member => {
        if (member.nick === Engine.hero.d.nick) {
            return;
        }
        if (!hereList.includes(member.nick)) {
            missingMembers.push(member.nick);
            if (member.div) {
                member.div.style.color = 'red';
            }
        } else {
            if (member.div) {
                member.div.style.color = '';
            }
        }
    });
};

const observePlayerChanges = (selector, callback) => {
    const observer = new MutationObserver(callback);
    const targetNode = document.querySelector(selector);

    if (targetNode) {
        observer.observe(targetNode, { childList: true, subtree: true });
    } else {
        console.error(`Nie można znaleźć elementu o selektorze: ${selector}`);
    }
};

const startChecking = () => {
    observePlayerChanges('.who-is-here .players-number', checkMissingMembers);
    observePlayerChanges('.party .players-number', checkMissingMembers);
    checkMissingMembers();
};

const intervalId = setInterval(() => {
    if (Engine.party) {
        clearInterval(intervalId);
        startChecking();
    }
}, 1000);
