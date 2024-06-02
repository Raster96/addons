// ==UserScript==
// @name         Groove - podział legend na głównej
// @version      1.0
// @description  Wyświetla podział łupów dla legend bez konieczności wchodzenia na stronę lootu
// @author       You
// @match        https://grooove.pl/*/
// @match        https://grooove.pl/*/legendary*
// @match        https://grooove.pl/*/heroic*
// @match        https://grooove.pl/*/unique*
// @match        https://grooove.pl/*/cat-heros*
// @match        https://grooove.pl/*/cat-titan*
// @match        https://grooove.pl/*/cat-kolos*
// @match        https://grooove.pl/*/cat-event*
// @match        https://grooove.pl/*/date-*
// @match        https://grooove.pl/*/monster-*
// @match        https://grooove.pl/*/itemid-*
// @match        https://grooove.pl/*/ident-*
// @match        https://grooove.pl/*/page-*
// @exclude      https://grooove.pl/*/adminPanel
// @exclude      https://grooove.pl/*/stats
// @exclude      https://grooove.pl/*/counter2
// @exclude      https://grooove.pl/*/timerConfigure
// @exclude      https://grooove.pl/*/timer
// @exclude      https://grooove.pl/*/manage
// @exclude      https://grooove.pl/*/install
// @exclude      https://grooove.pl/*/emptyloots*
// @exclude      https://grooove.pl/*/announcements
// @exclude      https://grooove.pl/rankingph/
// @exclude      https://grooove.pl/skills/
// @exclude      https://grooove.pl/targowisko/
// @exclude      https://grooove.pl/battle/
// @exclude      https://grooove.pl/lootlog/
// @exclude      https://grooove.pl/licznik/
// @exclude      https://grooove.pl/blog/
// @exclude      https://grooove.pl/FAQ/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=grooove.pl
// @grant        none
// ==/UserScript==

(async () => {
    try {
        const itemContainers = document.querySelectorAll('.item.col-md-12.row-shadow:not(.anouncement)');
        const parser = new DOMParser();

        for (const itemContainer of itemContainers) {
            const fightersContainer = itemContainer.querySelector('.fighters.col-md-4');
            if (fightersContainer) {
                const numberDivs = fightersContainer.querySelectorAll('div.number');
                if (numberDivs.length <= 1) {
                    continue;
                }
            }

            const itemLinkElement = itemContainer.querySelector('.loot.col-md-3 a.itemborder');
            if (!itemLinkElement) {
                continue;
            }
            const itemLink = itemLinkElement.getAttribute('href');
            const itemImages = itemContainer.querySelectorAll('.loot.col-md-3 a.itemborder img[data-stats*=legendary]');
            if (itemImages.length === 0) {
                continue;
            }

            const response = await fetch(`https://grooove.pl/dk/${itemLink}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const html = await response.text();
            const htmlDocument = parser.parseFromString(html, 'text/html');

            const divideCatchers = htmlDocument.querySelectorAll('.divide.catcher');
            const itemsMap = new Map();

            htmlDocument.querySelectorAll('.loot.col-md-3 a.itemborder img').forEach((item) => {
                const dataStats = item.getAttribute('data-stats');
                if (dataStats) {
                    const statsArray = dataStats.split('||');
                    const name = statsArray[0];
                    const stats = statsArray[1].split(';').reduce((acc, curr) => {
                        const [key, value] = curr.split('=');
                        acc[key] = value;
                        return acc;
                    }, {});
                    itemsMap.set(name, stats);
                }
            });

            divideCatchers.forEach((element) => {
                const item = element.firstChild;
                if (item && item.nodeType === Node.TEXT_NODE && item.textContent.trim()) {
                    const itemName = item.textContent.trim();
                    const stats = itemsMap.get(itemName);
                    if (stats && stats.rarity === 'legendary') {
                        const span = document.createElement('span');
                        span.style.color = '#ff8400';
                        span.textContent = itemName + ' ';
                        element.replaceChild(span, item);
                        element.style.display = 'block';
                        itemContainer.appendChild(element);
                    }
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
})();