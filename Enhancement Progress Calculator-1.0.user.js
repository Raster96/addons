// ==UserScript==
// @name         Enhancement Progress Calculator
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Pokazuje ile brakuje do kolejnego poziomu ulepszenia po najechaniu na 176 139 / 390 000 poniżej paska postępu ulepszenia
// @author       You
// @match        http*://*.margonem.pl/
// @exclude      http*://www.margonem.pl/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=margonem.pl
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    const calculateDifference = (text) => {
        const match = text.match(/([\d\s]+)\s*\/\s*([\d\s]+)/);
        if (!match) return null;

        const current = parseInt(match[1].replace(/\s/g, ''));
        const max = parseInt(match[2].replace(/\s/g, ''));

        if (current === 0 && max === 0) return null;

        return max - current;
    };

    const updateTip = ($element) => {
        const text = $element.text().trim();
        const difference = calculateDifference(text);

        if (difference === null) return;

        const tipText = `Brakuje: ${formatNumber(difference)}`;
        $element.tip(tipText);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            message(`Skopiowano brakujące punkty ulepszenia!`);
        })
    };

    $(document).on('click', '.enhance__progress-text--current', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const text = $(this).text().trim();
        const difference = calculateDifference(text);

        if (difference !== null) {
            copyToClipboard(difference.toString());
        }
    });

    const observer = new MutationObserver(() => {
        const $element = $('.enhance__progress-text--current');
        if ($element.length > 0) {
            updateTip($element);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });
})();