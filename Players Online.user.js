// ==UserScript==
// @name         Players Online
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Wyświetlanie graczy online na świecie Inferno w Margonem
// @author       You
// @match        http*://inferno.margonem.pl/
// @grant        none
// ==/UserScript==

let NoobPlayersIds = await fetch('https://raw.githubusercontent.com/Raster96/addons/main/noobPlayersIds.json').then(response=>{ return response.json()});

(function() {
    var windowDiv = null;
    var world = "Inferno"; // Default world
    var showNoobPlayersOnly = false; // Default to show all players
    var filteredPlayers = [];

    const style = document.createElement('style');
    style.textContent = `
    .world-online {
        position: fixed;
        left: 104px;
        top: 382px;
        width: 200px;
        max-height: calc(100vh - 100px);
        background: rgba(0, 0, 0, 0.7);
        border: 1px solid #ccc;
        z-index: 10000;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        color: white;
        cursor: url('https://inferno.margonem.pl/img/gui/cursor/1n.png?v=1716879995669'), auto;
    }
    .world-online header {
        padding: 10px;
        background: rgba(0, 0, 0, 0.5);
        border: 1px solid #ccc;
        text-align: center;
        margin: -1px;
        width: calc(100% + 2px);
        box-sizing: border-box;
    }
    .world-online header span {
        display: block;
        font-size: 16px;
        font-weight: bold;
    }
    .world-online header button {
        margin-top: 5px;
    }
    .world-online .content {
        padding: 10px;
        height: calc(100% - 50px);
        overflow-y: auto;
    }
    .world-online .content a:nth-child(odd) {
        cursor: pointer;
        background: #46464699;
        padding: 1px;
        display: block;
        color: white;
        text-decoration: none;
        margin-bottom: 5px;
    }
    .world-online .content a:nth-child(even) {
        cursor: pointer;
        background: #28282899;
        padding: 1px;
        display: block;
        color: white;
        text-decoration: none;
        margin-bottom: 5px;
    }
    `;
    document.head.appendChild(style);

    windowDiv = document.createElement('div');
    windowDiv.className = 'world-online';

    var windowPosition = JSON.parse(localStorage.getItem('windowPosition'));
    if (windowPosition) {
        windowDiv.style.left = windowPosition.left + 'px';
        windowDiv.style.top = windowPosition.top + 'px';
    }

    const header = document.createElement('header');
    var headerText = document.createElement('span');
    headerText.textContent = 'Gracze online';
    header.appendChild(headerText);
    windowDiv.appendChild(header);

    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Pokaż tylko noobów';
    header.appendChild(toggleButton);
    toggleButton.style.cursor = 'url(https://inferno.margonem.pl/img/gui/cursor/5n.png) 4 0, url(https://inferno.margonem.pl/img/gui/cursor/5n.cur) 4 0, auto';

    var lastViewOption = localStorage.getItem('lastViewOption');

    if (lastViewOption === 'showNoobPlayersOnly') {
        showNoobPlayersOnly = true;
        toggleButton.textContent = 'Pokaż wszystkich graczy';
        headerText.textContent = 'Nooby online';
    }

    toggleButton.addEventListener('click', function() {
        showNoobPlayersOnly = !showNoobPlayersOnly;
        if (showNoobPlayersOnly) {
            toggleButton.textContent = 'Pokaż wszystkich graczy';
            headerText.textContent = 'Nooby online';
            localStorage.setItem('lastViewOption', 'showNoobPlayersOnly');
        } else {
            toggleButton.textContent = 'Pokaż tylko noobów';
            headerText.textContent = 'Gracze online';
            localStorage.removeItem('lastViewOption');
        }
        getAndDisplayOnlinePlayers();
    });

    const content = document.createElement('div');
    content.className = 'content';
    windowDiv.appendChild(content);

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    windowDiv.addEventListener('mousedown', function(e) {
        isDragging = true;
        offsetX = e.clientX - windowDiv.getBoundingClientRect().left;
        offsetY = e.clientY - windowDiv.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const left = e.clientX - offsetX;
            const top = e.clientY - offsetY;
            windowDiv.style.left = left + 'px';
            windowDiv.style.top = top + 'px';
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
        // Zapisz pozycję okna w local storage
        localStorage.setItem('windowPosition', JSON.stringify({
            left: parseInt(windowDiv.style.left),
            top: parseInt(windowDiv.style.top)
        }));
    });

    document.body.appendChild(windowDiv);

    function getAndDisplayOnlinePlayers() {
        fetch(`https://public-api.margonem.pl/info/online/${world.toLowerCase()}.json`)
            .then(response => response.json())
            .then(data => {
                displayOnlinePlayers(data);
            })
            .catch(error => console.error('Error fetching JSON:', error));
    }

function displayOnlinePlayers(data) {
    if (!data) {
        console.log("Online stats not available.");
        return;
    }

    const onlinePlayers = data;

    if (showNoobPlayersOnly) {
        filteredPlayers = onlinePlayers.filter(player => NoobPlayersIds.includes(player.a.toString()));
    } else {
        filteredPlayers = onlinePlayers;
    }

    const uniquePlayersMap = new Map();
    filteredPlayers.forEach(player => {
        uniquePlayersMap.set(player.a, player);
    });

    const uniquePlayers = Array.from(uniquePlayersMap.values());

    content.innerHTML = '';

    if (filteredPlayers.length === 0) {
        console.log("No players are currently online in " + world + ".");
        headerText.textContent = showNoobPlayersOnly ? 'Nooby online [0]' : 'Gracze online [0]';
        headerText.style.color = '';
        return;
    }

    const onlinePlayersHeaderText = showNoobPlayersOnly ? 'Nooby online' : 'Gracze online';
    headerText.textContent = `${onlinePlayersHeaderText} [${uniquePlayers.length}]`;

    headerText.style.color = uniquePlayers.some(player => NoobPlayersIds.includes(player.a.toString())) ? 'red' : '';

    filteredPlayers.forEach(function(player, index) {
        const playerLink = document.createElement('a');
        playerLink.textContent = `${player.n} (${player.l}${player.p})`;
        playerLink.href = `http://www.margonem.pl/profile/view,${player.a}#char_${player.c},${world.toLowerCase()}`;
        playerLink.target = "_blank";
        if (index % 2 === 0) {
            playerLink.className = 'even';
        } else {
            playerLink.className = 'odd';
        }

        if (NoobPlayersIds.includes(player.a.toString())) {
            playerLink.style.color = 'red';
        }
        content.appendChild(playerLink);
    });
}

    getAndDisplayOnlinePlayers();

    setInterval(getAndDisplayOnlinePlayers, 60000);

const notifyDiscordButton = document.createElement('button');
notifyDiscordButton.textContent = 'Powiadom Discord';
header.appendChild(notifyDiscordButton);
notifyDiscordButton.style.cursor = 'url(https://inferno.margonem.pl/img/gui/cursor/5n.png) 4 0, url(https://inferno.margonem.pl/img/gui/cursor/5n.cur) 4 0, auto';

notifyDiscordButton.addEventListener('click', function() {
    const uniqueNoobPlayers = Array.from(new Set(filteredPlayers.filter(player => NoobPlayersIds.includes(player.a.toString())).map(player => player.a)));
    const noobPlayersCount = uniqueNoobPlayers.length;
    const noobPlayersInfo = filteredPlayers.filter(player => NoobPlayersIds.includes(player.a.toString())).map(player => `${player.n} (${player.l}${player.p})`);

    if (noobPlayersCount > 0) {
        sendToDiscord(noobPlayersCount, noobPlayersInfo);
        message(`Powiadomiono Discord!`);
    } else {
        message(`Żaden noob nie jest online!`);
    }
});

function sendToDiscord(noobCount, noobPlayersInfo) {
    const webhookURL = 'https://discord.com/api/webhooks/1221784515098447882/7Yo-Nl71h_TWPA0lyUJlH-49eRpBRFfdeZ3kG3sofM5LjE8aKGU0w7EBeqb7PLMsPwbZ';

    const message = {
        content: `**Nooby online! [${noobCount}]**\n${noobPlayersInfo.join('\n')}`
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
    .then(response => {
        if (!response.ok) {
            console.error('Failed to send message to Discord:', response.status, response.statusText);
        } else {
            console.log('Message sent successfully to Discord.');
        }
    })
    .catch(error => console.error('Error sending message to Discord:', error));
}

})();
