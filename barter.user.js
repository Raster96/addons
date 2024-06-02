// ==UserScript==
// @name         Barter - filtr <3
// @namespace    http://tampermonkey.net/
// @version      2024-03-29
// @description  Ukrywa skrzynki dla których mamy mniej niż 3 składniki.
// @author       You
// @match        https://inferno.margonem.pl/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=margonem.pl
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const eventEmitter = document.createElement('div');
    let barterAvailable = false;
    let buttonCreated = false;

    function runBarterScript() {
        const matchedData = [];

        Engine.barter.allCategories[16].forEach(item => {
            const offerId = item.id;
            const requiredItemId = item.required[0][0];
            const affectedId = item.affectedId;

            Engine.barter.barterOwnedData.forEach(category => {
                if (category[0] === requiredItemId) {
                    const quantity = category[1];

                    matchedData.push({
                        offerId: offerId,
                        affectedId: affectedId,
                        requiredItemId: requiredItemId,
                        quantity: quantity
                    });
                }
            });
        });

        matchedData.forEach(data => {
            if (data.quantity < 3) {
                const divToRemove = document.querySelector(`.offer-id-${data.offerId}.affectedId-id-${data.affectedId}`);
                if (divToRemove) {
                    divToRemove.remove();
                    console.log(`Usunięto div dla pozycji o offer-id ${data.offerId} i affectedId ${data.affectedId}`);
                } else {
                    console.log(`Nie znaleziono div do usunięcia dla pozycji o offer-id ${data.offerId} i id affectedId ${data.affectedId}`);
                }
            }
        });
    }

    eventEmitter.addEventListener('nodesAdded', function(event) {
        if (window.Engine && window.Engine.barter && window.Engine.barter.barterId === 103) {
            barterAvailable = true;
            if (!buttonCreated) {
                createButton();
                buttonCreated = true;
            }
        } else {
            barterAvailable = false;
            buttonCreated = false;
        }
    });

    document.body.addEventListener('DOMNodeInserted', function(event) {
        if (event.target && event.target.nodeType === Node.ELEMENT_NODE) {
            eventEmitter.dispatchEvent(new Event('nodesAdded'));
        }
    });

    document.body.addEventListener('DOMNodeRemoved', function(event) {
        if (!window.Engine || !window.Engine.barter || window.Engine.barter.barterId !== 103) {
            barterAvailable = false;
            buttonCreated = false;
            const buttonContainer = document.getElementById('buttonContainer');
            if (buttonContainer && buttonContainer.parentNode) {
                buttonContainer.parentNode.removeChild(buttonContainer);
            }
        }
    });

    function createButton() {
        const targetContainer = document.querySelector('.left-grouped-list-and-right-description-window .right-column .right-scroll .scroll-pane .reagents-label');
        if (targetContainer) {
            const existingButton = document.getElementById('buttonContainer');
            if (!existingButton) {
                const buttonContainer = document.createElement('div');
                buttonContainer.id = 'buttonContainer';
                buttonContainer.style.position = 'absolute';
                buttonContainer.style.display = 'inline';

                const button = document.createElement('button');
                button.innerHTML = 'Filtr < 3';
                button.style.padding = '10px';
                button.style.border = 'none';
                button.style.float = 'right';
                button.style.borderRadius = '5px';
                button.style.backgroundColor = '#4CAF50';
                button.style.color = 'white';
                button.style.cursor = 'pointer';

                button.addEventListener('click', runBarterScript);

                buttonContainer.appendChild(button);
                targetContainer.appendChild(buttonContainer);
            }
        }
    }
})();