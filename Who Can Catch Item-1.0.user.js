// ==UserScript==
// @name         Who Can Catch Item
// @version      1.0
// @author       You
// @match        *.margonem.pl/
// @exclude      https://www.margonem.pl/
// @exclude      https://www.margonem.pl//*.
// @icon         https://www.google.com/s2/favicons?sz=64&domain=margonem.pl
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const getProfessionForMember = (id) => {
        if (id === Engine.hero.d.id) {
            return Engine.hero.d.prof;
        }
        const others = Engine.others.check();
        return others[id]?.prof || null;
    };

    const getNicknameForMember = (id) => {
        if (id === Engine.hero.d.id) {
            return Engine.hero.d.nick;
        }
        const others = Engine.others.check();
        return others[id]?.nick || null;
    };

    const updateLootItemsWithEligibleData = () => {
        if (!Engine.party) return;
        if (Engine.map.d.mode === 5) return; // zeby nie dzialalo na mapach z kolosami

        const items = Engine.items.fetchLocationItems("l");
        const members = Engine.party.getMembers();
        const partyIds = Object.keys(members);

        items.forEach((item) => {
            const itemId = item.id;
            const reqp = item._cachedStats?.reqp || "";

            let eligibleNicknames = [];
            partyIds.forEach((id) => {
                if (id === Engine.hero.d.id) return;

                const prof = getProfessionForMember(id);
                if (!reqp || (prof && reqp.includes(prof))) {
                    const nick = getNicknameForMember(id);
                    if (nick) {
                        eligibleNicknames.push(nick);
                    }
                }
            });

            const heroProf = Engine.hero.d.prof;
            if (!reqp || reqp.includes(heroProf)) {
                eligibleNicknames.push(Engine.hero.d.nick);
            }

            const lootItem = document.querySelector(`.loot-window .items-wrapper .loot-item-wrapper[loot-id="${itemId}"]`);

            if (lootItem) {
                if (lootItem.querySelector('.eligible-count')) {
                    return;
                }

                const countLabel = document.createElement('span');
                countLabel.className = 'eligible-count';
                countLabel.style.position = 'absolute';
                countLabel.style.top = '-2px';
                countLabel.style.right = '25px';
                countLabel.style.color = 'white';
                countLabel.style.fontSize = '12px';
                countLabel.textContent = eligibleNicknames.length.toString();

                addTip(countLabel, eligibleNicknames.join(', '));

                lootItem.style.position = 'relative';
                lootItem.appendChild(countLabel);
            }
        });
    };

    const addTip = (element, text) => {
        $(element).tip(text);
    };

    const intercept = (obj, key, cb, _ = obj[key]) => obj[key] = (...args) => {
        const result = _.apply(obj, args);
        return cb(...args) ?? result;
    };

    intercept(Engine.communication, 'parseJSON', (data) => {
    if (data.loot) {
        updateLootItemsWithEligibleData();
    }
});
})();