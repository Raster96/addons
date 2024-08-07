// ==UserScript==
// @name         Klanowicze online - gracze na mapach
// @namespace    http://tampermonkey.net/
// @version      2024-08-07
// @description  Wyświetla nazwy map na których znajduje się przynajmniej 3 graczy. Kliknięcie na nazwę mapy umożliwia skopiowanie listy graczy z danej mapy.
// @author       You
// @match        https://inferno.margonem.pl/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=margonem.pl
// @grant        none
// ==/UserScript==

(function() {
    function copyToClipboard(text, mapName) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        message(`Skopiowano listę graczy z mapy ${mapName} do schowka!`);
    }

    function checkMaps() {
        let elements = document.querySelectorAll('.gargonem-otherlist-other');
        let mapCounts = {};
        let nameMap = {};

        elements.forEach(element => {
            let nameElement = element.querySelector('.gargonem-otherlist-left');
            let mapElement = element.querySelector('.gargonem-otherlist-right');

            if (nameElement && mapElement) {
                let name = nameElement.innerText.split(' (')[0];
                let map = mapElement.innerText.split(' (')[0];

                if (mapCounts[map]) {
                    mapCounts[map]++;
                    nameMap[map].push(name);
                } else {
                    mapCounts[map] = 1;
                    nameMap[map] = [name];
                }
            }
        });

        let content = '';
        for (let map in mapCounts) {
            let textColor = "white"; // default

            if (mapCounts[map] >= 10) {
                textColor = "red";
            } else if (mapCounts[map] >= 5) {
                textColor = "orange";
            }

            if (mapCounts[map] > 2) {
                content += `<div class="map-name" data-map="${map}" style="color: ${textColor}; cursor: pointer; text-align: center; font-weight: bold;">${map} [${mapCounts[map]}]</div>`;
            }
        }

        let container = document.querySelector('.gargonem-clan-members-online-wrapper');
        if (!container) return;

        let infoContainer = container.querySelector('.map-info-container');

        if (!infoContainer) {
            infoContainer = document.createElement('div');
            infoContainer.className = 'map-info-container';
            infoContainer.style.textAlign = 'center';
            container.prepend(infoContainer);
        }

        infoContainer.innerHTML = content;

        document.querySelectorAll('.map-name').forEach(mapNameElement => {
            mapNameElement.addEventListener('click', function() {
                let map = this.getAttribute('data-map');
                if (map && nameMap[map]) {
                    copyToClipboard(nameMap[map].join('/'), map);
                }
            });
        });
    }

    function observeWrapper() {
        const wrapper = document.querySelector('.gargonem-clan-members-online-wrapper');
        const members = document.querySelector('.gargonem-otherlist-other');

        if (wrapper && members) {
            const observer = new MutationObserver(checkMaps);
            observer.observe(wrapper, {
                childList: false,
                subtree: true,
                characterData: true,
                characterDataOldValue: true
            });
            checkMaps();
        } else {
            setTimeout(observeWrapper, 1000);
        }
    }

    observeWrapper();
})();
