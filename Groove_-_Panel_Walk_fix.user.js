// ==UserScript==
// @name         Panel Walk fix
// @version      1.0
// @description  Usuwa blokadę "Panel Walk istnieje już prawie 10 lat i cały czas jest dodatkiem całkowicie darmowym, dlatego mam jedynie małą prośbę o wyłączenie blokowania reklam :) // Groove Armada"
// @author       You
// @match        https://grooove.pl/battle/*
// @grant        none
// ==/UserScript==

const newAd = document.createElement('div');
newAd.className = 'adsbygoogle';
newAd.style.height = '30px';

document.body.appendChild(newAd);
