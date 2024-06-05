// ==UserScript==
// @name         Players Online
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Wyświetlanie graczy online z możliwością filtrowania noobów
// @author       You
// @match        http*://inferno.margonem.pl/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=margonem.pl
// @grant        none
// ==/UserScript==

let NoobPlayersIds = await fetch('https://raw.githubusercontent.com/Raster96/addons/main/noobPlayersIds.json').then(response => response.json());

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
        margin-top: 4.6875px;
        display: inline-block;
        outline: 0;
        cursor: pointer;
        padding: 4.6875px 15px;
        font-size: 13.125px;
        font-weight: 500;
        line-height: 18.75px;
        vertical-align: middle;
        border: 1px solid;
        border-radius: 5.625px;
        color: #ffffff;
        background-color: #808080;
        border-color: #1b1f2326;
        box-shadow: rgba(27, 31, 35, 0.04) 0px 0.9375px 0px 0px, rgba(255, 255, 255, 0.25) 0px 0.9375px 0px 0px inset;
        transition: 0.2s cubic-bezier(0.3, 0, 0.5, 1);
        transition-property: color, background-color, border-color;
    }
    .world-online header button:hover {
        background-color: #737373;
        border-color: #1b1f2326;
        transition-duration: 0.1s;
    }
    .world-online .content {
        padding: 10px;
        height: calc(100% - 50px);
        overflow-y: auto;
    }
    .world-online .content a:nth-child(odd) {
        cursor: url(https://inferno.margonem.pl/img/gui/cursor/5n.png) 4 0, url(https://inferno.margonem.pl/img/gui/cursor/5n.cur) 4 0, auto;
        background: #46464699;
        padding: 1px;
        display: block;
        color: white;
        text-decoration: none;
        margin-bottom: 5px;
    }
    .world-online .content a:nth-child(even) {
        cursor: url(https://inferno.margonem.pl/img/gui/cursor/5n.png) 4 0, url(https://inferno.margonem.pl/img/gui/cursor/5n.cur) 4 0, auto;
        background: #28282899;
        padding: 1px;
        display: block;
        color: white;
        text-decoration: none;
        margin-bottom: 5px;
    }
    .world-online header .notify-discord-button {
        margin-top: 4.6875px;
        display: inline-block;
        outline: 0;
        cursor: pointer;
        padding: 4.6875px 15px;
        font-size: 13.125px;
        font-weight: 500;
        line-height: 18.75px;
        vertical-align: middle;
        border: 1px solid;
        border-radius: 5.625px;
        color: #ffffff;
        background-color: #5865F2;
        border-color: #1b1f2326;
        box-shadow: rgba(27, 31, 35, 0.04) 0px 0.9375px 0px 0px, rgba(255, 255, 255, 0.25) 0px 0.9375px 0px 0px inset;
        transition: 0.2s cubic-bezier(0.3, 0, 0.5, 1);
        transition-property: color, background-color, border-color;
    }
    .world-online header .notify-discord-button:hover {
        background-color: #4E5ACD;
        border-color: #1b1f2326;
        transition-duration: 0.1s;
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
            if (!uniquePlayersMap.has(player.a)) {
                uniquePlayersMap.set(player.a, []);
            }
            uniquePlayersMap.get(player.a).push(player);
        });

        content.innerHTML = '';

        if (filteredPlayers.length === 0) {
            console.log("No players are currently online in " + world + ".");
            headerText.textContent = showNoobPlayersOnly ? 'Nooby online [0]' : 'Gracze online [0]';
            headerText.style.color = '';
            return;
        }

        const onlinePlayersHeaderText = showNoobPlayersOnly ? 'Nooby online' : 'Gracze online';
        headerText.textContent = `${onlinePlayersHeaderText} [${uniquePlayersMap.size}]`;

        headerText.style.color = Array.from(uniquePlayersMap.keys()).some(playerId => NoobPlayersIds.includes(playerId.toString())) ? 'red' : '';

        uniquePlayersMap.forEach((players, playerId) => {
            const playerLink = document.createElement('a');
            playerLink.textContent = players.map(player => `${player.n} (${player.l}${player.p})`).join('/');
            playerLink.href = `http://www.margonem.pl/profile/view,${playerId}#char_${players[0].c},${world.toLowerCase()}`;
            playerLink.target = "_blank";

            if (NoobPlayersIds.includes(playerId.toString())) {
                playerLink.style.color = 'red';
            }
            content.appendChild(playerLink);
        });
    }

    getAndDisplayOnlinePlayers();

    setInterval(getAndDisplayOnlinePlayers, 60000);

    const notifyDiscordButton = document.createElement('button');
    notifyDiscordButton.className = 'notify-discord-button';
    notifyDiscordButton.textContent = 'Powiadom Discord';
    header.appendChild(notifyDiscordButton);
    notifyDiscordButton.style.cursor = 'url(https://inferno.margonem.pl/img/gui/cursor/5n.png) 4 0, url(https://inferno.margonem.pl/img/gui/cursor/5n.cur) 4 0, auto';

    notifyDiscordButton.addEventListener('click', function() {
        const noobPlayersInfo = prepareNoobPlayersInfo(filteredPlayers);
        const noobPlayersCount = noobPlayersInfo.length;

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
            embeds: [{
                title: `**Nooby online! [${noobCount}]**`,
                color: 16711680,
                description: noobPlayersInfo.join('\n'),
                thumbnail: {
                    url: 'https://i.imgur.com/eQHxEMq.gif'
                },
                timestamp: new Date().toISOString()
            }]
        };

        if (noobCount > 2) {
            message.content = '@here';
        }

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

    function prepareNoobPlayersInfo(filteredPlayers) {
        const uniqueNoobPlayersMap = new Map();
        filteredPlayers.filter(player => NoobPlayersIds.includes(player.a.toString())).forEach(player => {
            if (!uniqueNoobPlayersMap.has(player.a)) {
                uniqueNoobPlayersMap.set(player.a, []);
            }
            uniqueNoobPlayersMap.get(player.a).push(`${player.n} (${player.l}${player.p})`);
        });

        const noobPlayersInfo = [];
        uniqueNoobPlayersMap.forEach((names, playerId) => {
            noobPlayersInfo.push(names.join('/'));
        });

        return noobPlayersInfo;
    }

})();
