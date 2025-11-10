// ==UserScript==
// @name         Kamyki (Enhancement Points)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Dodaje Enhancement Points do nazw kamyków (wartości dla priv)
// @author       You
// @match        http*://*.margonem.pl/
// @exclude      https://www.margonem.pl/
// @exclude      https://www.margonem.pl//*.
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const itemEnhancementPoints = {
        "5k": [
            "Źródło goblińskiego zjednoczenia",
            "Błyskotka gildii banitów",
            "Order naczelnego stwora",
            "Kryształ ciemnego pogrążenia",
            "Runa zatraconej woli",
            "Iglasta pieczęć centaurów",
            "Serce ponurego miłośnika",
            "Wezwanie wulkanu",
            "Fragment zatopionego posągu",
            "Runa fatamorgany",
            "Kamień wygnańców",
            "Klejnot pustynnych zakamarków",
            "Runa obłąkańca",
            "Dziedziczny klejnot dynastii",
            "Kryształ strażniczek przyrody"
        ],
        "10k": [
            "Odcisk kopyta demona",
            "Klejnot głębinowy",
            "Runa heretycznych rytuałów",
            "Klejnot zainfekowanych sztolni",
            "Skarb plugawych korytarzy",
            "Pieczęć starożytnego bóstwa",
            "Zwęglona runa"
        ],
        "25k": [
            "Odprysk skały narad",
            "Pieczęć orczych sztolni",
            "Kamyk ścieżki straconych",
            "Znamię przeklętej transformacji",
            "Szlachetna glina tolloków",
            "Cenny marmur dławicieli",
            "Pieczęć pożerania",
            "Serce góry",
            "Chmielowa błyskotka",
            "Niewyrzeźbiony pirop",
            "Zaczarowany kamyk inżyniera",
            "Klucz materializacji",
            "Mutagenny klejnot szczurów",
            "Kryształ ciekłej ucieczki",
            "Klejnot mahopteckiego czempiona"
        ],
        "50k": [
            "Kamień nieposkromionej chciwości",
            "Skamieniałe łzy wdowy",
            "Runa góralskiej starszyzny",
            "Klejnot z górskiego potoku",
            "Dusza orczego przodka",
            "Kamień przywołania Shakkru",
            "Kruszec odmrożonych kończyn",
            "Minerał ociekających jaskiń",
            "Błyskotka okrutnych dam",
            "Bagienna kora drzewca",
            "Klejnot pierzastego węża"
        ],
        "100k": [
            "Runa mroku",
            "Płyta ze zbrojowni Andarum",
            "Kamień dzikich rytuałów",
            "Pieczęć opuszczonego grobu",
            "Minerał pancernej bolity"
        ],
        "250k": [
            "Rubinowe oko mściciela",
            "Kryształ wiecznej młodości",
            "Serce demonicznego posłańca",
            "Różany ryt",
        ],
        "500k": [],
        "1m": [
            "Klucz piekielnego portalu",
            "Chluba mitycznych stworów"
        ],
        "2.5m": [],
    };

    const itemToEnhancementPoints = {};
    for (const [points, items] of Object.entries(itemEnhancementPoints)) {
        items.forEach(item => {
            itemToEnhancementPoints[item] = points;
        });
    }

    const waitForGame = setInterval(() => {
        if (typeof Engine !== 'undefined' && typeof API !== 'undefined' && typeof MargoTipsParser !== 'undefined') {
            clearInterval(waitForGame);
            initAddon();
        }
    }, 100);

    function initAddon() {

        const originalGetTip = MargoTipsParser.getTip;

        MargoTipsParser.getTip = function (item, cmpStats) {
            let originalName = null;

            if (item && item.name && itemToEnhancementPoints[item.name]) {
                originalName = item.name;
                const enhancementPoints = itemToEnhancementPoints[item.name];
                item.name = `${originalName} [${enhancementPoints}]`;
            }

            let tooltip = originalGetTip.call(this, item, cmpStats);

            if (originalName !== null) {
                item.name = originalName;
            }

            return tooltip;
        };

        if (typeof Engine.items !== 'undefined' && Engine.items.parseItemStat) {
            const originalParseItemStat = Engine.items.parseItemStat;

            Engine.items.parseItemStat = function (item) {
                const result = originalParseItemStat.call(this, item);

                if (result && result.name && itemToEnhancementPoints[result.name]) {
                    const enhancementPoints = itemToEnhancementPoints[result.name];
                    result.name = `${result.name} [${enhancementPoints}]`;
                }

                return result;
            };
        }

    }
})();
