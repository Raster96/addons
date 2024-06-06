// ==UserScript==
// @name         Groove - wyszukiwarka wolnych e2
// @version      2024-06-06
// @description  Dodaje wyszukiwarkę e2 na stronie https://grooove.pl/*/counter2
// @author       You
// @match        http*://grooove.pl/*/counter2
// @icon         https://www.google.com/s2/favicons?sz=64&domain=grooove.pl
// @updateURL    https://github.com/Raster96/addons/raw/main/Groove_-_wyszukiwarka_wolnych_e2.user.js
// @downloadURL  https://github.com/Raster96/addons/raw/main/Groove_-_wyszukiwarka_wolnych_e2.user.js
// @grant        none
// ==/UserScript==

let allMonsters = [
    "Mushita - Wojownik, 23lvl",
    "Kotołak Tropiciel - Tropiciel, 27lvl",
    "Shae Phu - Mag, 30lvl",
    "Zorg Jednooki Baron - Łowca, 33lvl",
    "Władca rzek - Mag, 37lvl",
    "Gobbos - Tancerz Ostrzy, 40lvl",
    "Tyrtajos - Wojownik, 42lvl",
    "Szczęt alias Gładki - Paladyn, 47lvl",
    "Tollok Shimger - Łowca, 47lvl",
    "Razuglag Oklash - Mag, 50lvl",
    "Agar - Paladyn, 51lvl",
    "Foverk Turrim - Tancerz Ostrzy, 57lvl",
    "Owadzia Matka - Tropiciel, 58lvl",
    "Vari Kruger - Mag, 65lvl",
    "Furruk Kozug - Mag, 66lvl",
    "Jotun - Wojownik, 70lvl",
    "Tollok Atamatu - Łowca, 73lvl",
    "Tollok Utumutu - Łowca, 73lvl",
    "Lisz - Mag, 75lvl",
    "Grabarz świątynny - Paladyn, 80lvl",
    "Podły zbrojmistrz - Wojownik, 82lvl",
    "Wielka Stopa - Mag, 82lvl",
    "Choukker - Paladyn, 84lvl",
    "Nadzorczyni krasnoludów - Wojownik, 88 lvl",
    "Morthen - Wojownik, 89lvl",
    "Żelazoręki Ohydziarz - Paladyn, 92lvl",
    "Leśne Widmo - Tropiciel, 92lvl",
    "Goplana - Paladyn, 93lvl",
    "Gnom Figlid - Mag, 96lvl",
    "Centaur Zyfryd - Łowca, 99lvl",
    "Kambion - Tancerz Ostrzy, 101lvl",
    "Jertek Moxos - Paladyn, 105lvl",
    "Miłośnik łowców - Łowca, 108lvl",
    "Miłośnik rycerzy - Wojownik, 108lvl",
    "Miłośnik magii - Mag, 108lvl",
    "Łowca czaszek - Łowca, 112 lvl",
    "Ozirus Władca Hieroglifów - Mag, 115 lvl",
    "Wójt Fistuła - Tancerz Ostrzy, 118lvl",
    "Krab pustelnik - Tancerz Ostrzy, 124lvl",
    "Królowa Śniegu - Mag, 124lvl",
    "Teściowa Rumcajsa - Mag, 125lvl",
    "Ifryt - Mag, 128 lvl",
    "Henry Kaprawe Oko - Paladyn, 131 lvl",
    "Helga Opiekunka Rumu - Tropiciel, 131 lvl",
    "Młody Jack Truciciel - Wojownik, 131lvl",
    "Burkog Lorulk - Wojownik, 135lvl",
    "Sheba Orcza Szamanka - Mag, 135lvl",
    "Grubber Ochlaj - Wojownik, 136lvl",
    "Berserker Amuno - Wojownik, 139lvl",
    "Stworzyciel - Tancerz Ostrzy, 144lvl",
    "Fodug Zolash - Mag, 145lvl",
    "Mistrz Worundriel - Wojownik, 148lvl",
    "Goons Asterus - Łowca, 150lvl",
    "Adariel - Mag, 155lvl",
    "Duch Władcy Klanów - Paladyn, 160lvl",
    "Ogr Stalowy Pazur - Tancerz Ostrzy, 165lvl",
    "Bragarth Myśliwy Dusz - Łowca, 170lvl",
    "Fursharag Pożeracz Umysłów - Mag, 170lvl",
    "Ziuggrael Strażnik Królowej - Wojownik, 170lvl",
    "Lusgrathera Królowa Pramatka - Mag, 175lvl",
    "Borgoros Garamir III - Wojownik, 175lvl",
    "Chryzoprenia - Mag, 178lvl",
    "Cerasus - Mag, 180lvl",
    "Czempion Furboli - Wojownik, 183lvl",
    "Torunia Ankelwald - Paladyn, 186lvl",
    "Breheret Żelazny Łeb - Wojownik, 192lvl",
    "Mysiur Myświórowy Król - Mag, 193lvl",
    "Sadolia Nadzorczyni Hurys - Tancerz Ostrzy, 197lvl",
    "Bergermona Krwawa Hrabina - Łowca, 200lvl",
    "Sataniel Skrytobójca - Łowca, 200lvl",
    "Annaniel Wysysacz Marzeń - Mag, 200lvl",
    "Gothardus Kolekcjoner Głów - Wojownik, 200lvl",
    "Zufulus Smakosz Serc - Mag, 205lvl",
    "Marlloth Malignitas - Tancerz Ostrzy, 214lvl",
    "Mocny Maddoks - Mag, 218lvl",
    "Arachniregina Colosseus - Tancerz Ostrzy, 220lvl",
    "Pancerny Maddok - Paladyn, 226lvl",
    "Silvanasus - Mag, 235lvl",
    "Dendroculus - Wojownik, 240lvl",
    "Tolypeutes - Wojownik, 245lvl",
    "Cuaitl Citlalin - Wojownik, 250lvl",
    "Pogardliwa Sybilla - Mag, 255lvl",
    "Yaotl - Łowca, 258lvl",
    "Quetzalcoatl - Mag, 260lvl",
    "Chopesz - Tancerz Ostrzy, 267lvl",
    "Neferkar Set - Wojownik, 274lvl",
    "Chaegd Agnrakh - Wojownik, 280lvl",
    "Vaenra Charkhaam - Mag, 280lvl",
    "Terrozaur - Tancerz Ostrzy, 280lvl",
    "Nymphemonia - Łowca, 287lvl",
    "Zorin - Tancerz Ostrzy, 300lvl",
    "Furion - Łowca, 300lvl",
    "Artenius - Mag, 300lvl"
];

function parseMonster(text) {
    let [name, rest] = text.split(' - ');
    let level = parseInt(rest.split(', ')[1].replace('lvl', ''));
    return { name, level, text };
}

function getDataFromContainer(container) {
    let month = container.querySelector('h5').innerText;
    let presentMonsters = Array.from(container.querySelectorAll('.box.box2')).map(el => {
        let name = el.querySelector('p:first-child').innerText;
        let kills = parseInt(el.querySelector('p:nth-child(2) b').innerText);
        return { name, kills };
    });
    return { month, presentMonsters };
}

let parsedMonsters = allMonsters.map(parseMonster);

function calculateDifference(myLevel, monsterLevel) {
    return Math.abs(myLevel - monsterLevel);
}

function filterMonstersByLevelDifference(myLevel, monsters) {
    const maxUpperDifference = 15;
    return monsters.filter(monster => {
        let difference = monster.level - myLevel;
        return difference >= -50 && difference <= maxUpperDifference;
    });
}

let containers = document.querySelectorAll('.col-md-12.nopadding');

let newContainer = document.createElement('div');
newContainer.className = 'col-md-12 nopadding';

let title = document.createElement('h5');
title.textContent = 'Wyszukiwarka wolnych e2 (lvl -50/+15)';
newContainer.appendChild(title);

let dropdown = document.createElement('select');
dropdown.style.marginBottom = '10px';
let currentMonthOption = document.createElement('option');
currentMonthOption.value = 'current';
currentMonthOption.textContent = containers[0].querySelector('h5').innerText;
dropdown.appendChild(currentMonthOption);
if (containers.length > 1) {
    let previousMonthOption = document.createElement('option');
    previousMonthOption.value = 'previous';
    previousMonthOption.textContent = containers[1].querySelector('h5').innerText;
    dropdown.appendChild(previousMonthOption);

    let sumOption = document.createElement('option');
    sumOption.value = 'sum';
    sumOption.textContent = `Suma obu miesięcy`;
    dropdown.appendChild(sumOption);
}
newContainer.appendChild(dropdown);

let levelInput = document.createElement('input');
levelInput.type = 'number';
levelInput.placeholder = 'Twój poziom';
levelInput.style.marginBottom = '10px';
newContainer.appendChild(levelInput);

let button = document.createElement('button');
button.textContent = 'OK';
button.style.marginLeft = '10px';
button.addEventListener('click', () => {
    let myLevel = parseInt(levelInput.value);
    if (myLevel > 300) {
        myLevel = 300;
        levelInput.value = 300;
    }
    if (!isNaN(myLevel)) {
        let previousResults = newContainer.querySelectorAll('table');
        previousResults.forEach(result => {
            newContainer.removeChild(result);
        });

        let selectedValue = dropdown.value;
        let data;
        if (selectedValue === 'previous' && containers.length > 1) {
            data = getDataFromContainer(containers[1]);
        } else if (selectedValue === 'sum' && containers.length > 1) {
            let dataCurrent = getDataFromContainer(containers[0]);
            let dataPrevious = getDataFromContainer(containers[1]);
            let summedMonsters = dataCurrent.presentMonsters.map(monster => {
                let previousMonster = dataPrevious.presentMonsters.find(m => m.name === monster.name);
                let kills = monster.kills + (previousMonster ? previousMonster.kills : 0);
                return { name: monster.name, kills };
            });
            data = {
                month: `${dataCurrent.month} + ${dataPrevious.month}`,
                presentMonsters: summedMonsters
            };
        } else {
            data = getDataFromContainer(containers[0]);
        }

        let filteredMonsters = filterMonstersByLevelDifference(myLevel, parsedMonsters);
        filteredMonsters.sort((a, b) => {
            let killsA = data.presentMonsters.find(m => m.name === a.name)?.kills || 0;
            let killsB = data.presentMonsters.find(m => m.name === b.name)?.kills || 0;
            return killsA - killsB;
        });

        let table = document.createElement('table');

        let headerRow = table.insertRow();
        let nameHeader = document.createElement('th');
        nameHeader.textContent = 'Nazwa';
        headerRow.appendChild(nameHeader);
        let professionHeader = document.createElement('th');
        professionHeader.textContent = 'Prof/Lvl';
        headerRow.appendChild(professionHeader);
        let killsHeader = document.createElement('th');
        killsHeader.textContent = 'Ubicia';
        headerRow.appendChild(killsHeader);

        filteredMonsters.forEach((monster) => {
            let row = table.insertRow();

            let nameCell = row.insertCell();
            nameCell.textContent = monster.name;

            let professionCell = row.insertCell();
            professionCell.textContent = monster.text.replace(monster.name + ' - ', '');

            let killsCell = row.insertCell();
            let kills = data.presentMonsters.find(m => m.name === monster.name)?.kills || 0;
            killsCell.textContent = kills;
        });

        let monthDisplay = newContainer.querySelector('h5:nth-of-type(2)');
        if (monthDisplay) {
            monthDisplay.textContent = data.month;
        } else {
            monthDisplay = document.createElement('h5');
            monthDisplay.textContent = data.month;
            monthDisplay.style.margin = '0';
            newContainer.insertBefore(monthDisplay, newContainer.querySelector('table'));
        }

        newContainer.appendChild(table);
    } else {
        alert('Wprowadź poprawny poziom!');
    }
});
newContainer.appendChild(button);

containers[0].parentNode.insertBefore(newContainer, containers[0]);
