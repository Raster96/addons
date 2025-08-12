// ==UserScript==
// @name         Zapraszanie pod "V" na NI (losowanie)
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Edycja dodatku autorstwa Arhq — zaprasza jedną losową osobę po wciśnięciu "V" i zmienia kolor nicku do momentu zaakceptowania zaproszenia.
// @author       You
// @match        http*://*.margonem.pl/
// @exclude      http*://www.margonem.pl/
// @icon         https://www.google.com/s2/favicons?domain=margonem.pl
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    document.addEventListener("keyup", (ev) => {
        if (ev.keyCode === 86 && !["INPUT", "TEXTAREA", "MAGIC_INPUT"].includes(ev.target.tagName)) {
            const list = Object.entries(window.Engine.whoIsHere.getList()).filter(([_, { relation }]) =>
                ["cl", "fr", "cl-fr"].includes(relation)
            );

            if (list.length === 0) return;

            const [id] = list[Math.floor(Math.random() * list.length)];

            _g(`party&a=inv&id=${id}`, (data) => {
                if (data.message) {
                    const element = document.querySelector(`div[data-id="${id}"] .center`);
                    if (element) {
                        element.style.color = "rgb(255, 0, 0)";
                    }
                }
            });
        }
    });
})();
