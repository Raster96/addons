// ==UserScript==
// @name         Groove - guwnosymulator lootu z Tanrotha
// @version      1.2
// @description  Guwnosymulator lootu z Tanrotha
// @author       You
// @match        https://grooove.pl/dk/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=grooove.pl
// @grant        none
// ==/UserScript==

(function() {
    const itemsDatabase = [
        {
            type: 'unique',
            html: `<a href="./item-1714247219" class="itemborder">
                        <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/hel/helm761.gif" alt="Item" data-stats="Złowieszcze rogi zimy||ac=854;act=5;ds=171;endest=8;lvl=300;permbound;rarity=unique;reqp=wb;resfrost=2;sa=233||9||394192" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Złowieszcze rogi zimy</b><b class=unique>* unikat *</b>Typ:  Hełmy<br>Pancerz: 854<br>Odporność na truciznę +5%<br>Odporność na zimno +2%<br>Siła +171<br>Niszczenie 8 energii podczas ataku<br>SA +2.33<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Wojownik, Tancerz ostrzy</b><br>Wartość: 394 192">
                    </a>`
        },
                {
            type: 'unique',
            html: `<a href="./item-1716994935" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/but/buty87.gif" alt="Item" data-stats="Stopy pana śnieżyc||ac=1280;act=1;lvl=300;permbound;rarity=unique;reqp=wp;resfrost=4;sa=83||10||357544" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Stopy pana śnieżyc</b><b class=unique>* unikat *</b>Typ:  Buty<br>Pancerz: 1280<br>Odporność na truciznę +1%<br>Odporność na zimno +4%<br>SA +0.83<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Wojownik, Paladyn</b><br>Wartość: 357 544">
                </a>`
        },
                        {
            type: 'unique',
            html: `<a href="./item-1716994935" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/but/buty87.gif" alt="Item" data-stats="Stopy pana śnieżyc||ac=1280;act=1;lvl=300;permbound;rarity=unique;reqp=wp;resfrost=4;sa=83||10||357544" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Stopy pana śnieżyc</b><b class=unique>* unikat *</b>Typ:  Buty<br>Pancerz: 1280<br>Odporność na truciznę +1%<br>Odporność na zimno +4%<br>SA +0.83<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Wojownik, Paladyn</b><br>Wartość: 357 544">
                </a>`
        },
        {
            type: 'unique',
            html: `<a href="./item-1716994935" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/luk/luk62.gif" alt="Item" data-stats="Mroźny celownik||abdest=784;dmg=8100,9900;lvl=300;permbound;pierce=20;rarity=unique;reqp=h;sa=158||4||643580" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Mroźny celownik</b><b class=unique>* unikat *</b>Typ:  Dystansowe<br>Atak: 8100,9900<br>Niszczenie 784 absorpcji przed atakiem<br>Przebicie pancerza +20%<br>SA +1.58<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Łowca</b><br>Wartość: 643 580">
                </a>`
        },
        {
            type: 'unique',
            html: `<a href="./item-1716908925" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/nas/naszyjnik841.gif" alt="Item" data-stats="Sierp przeraźliwego zimna||crit=1;ds=171;energybon=30;hp=10078;lowevade=30;lvl=300;permbound;rarity=unique;reqp=wb;sa=233||13||394192" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Sierp przeraźliwego zimna</b><b class=unique>* unikat *</b>Typ:  Naszyjniki<br>Cios krytyczny +1%<br>Siła +171<br>Energia +30<br>Życie +10078<br>Podczas ataku unik przeciwnika jest mniejszy o 30<br>SA +2.33<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Wojownik, Tancerz ostrzy</b><br>Wartość: 394 192">
                </a>`
        },
        {
            type: 'unique',
            html: `<a href="./item-1716908925" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/hel/helm70.gif" alt="Item" data-stats="Szyszak minusowych temperatur||ac=647;act=14;lvl=300;manadest=17;permbound;rarity=unique;reqp=th;resfrost=7;sa=158;slow=179||9||394192" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Szyszak minusowych temperatur</b><b class=unique>* unikat *</b>Typ:  Hełmy<br>Pancerz: 647<br>Odporność na truciznę +14%<br>Odporność na zimno +7%<br>Niszczenie 17 many podczas ataku<br>SA +1.58<br>Obniża SA przeciwnika o 1.79<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Tropiciel, Łowca</b><br>Wartość: 394 192">
                </a>`
        },
        {
            type: 'unique',
            html: `<a href="./item-1716908925" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/hel/helm762.gif" alt="Item" data-stats="Maska dotkliwych odmrożeń||ac=863;blok=45;lvl=300;manadest=17;permbound;rarity=unique;reqp=p;resfrost=7;sa=158;slow=94||9||394192" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Maska dotkliwych odmrożeń</b><b class=unique>* unikat *</b>Typ:  Hełmy<br>Pancerz: 863<br>Odporność na zimno +7%<br>Blok +45<br>Niszczenie 17 many podczas ataku<br>SA +1.58<br>Obniża SA przeciwnika o 0.94<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Paladyn</b><br>Wartość: 394 192">
                </a>`
        },
        {
            type: 'unique',
            html: `<a href="./item-1716822335" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/mie/miecz86.gif" alt="Item" data-stats="Miecz białego mrozu||acdmg=53;crit=1;dmg=7500,9167;lvl=300;permbound;rarity=unique;reqp=w;sa=158||3||643580" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Miecz białego mrozu</b><b class=unique>* unikat *</b>Typ:  Półtoraręczne<br>Atak: 7500,9167<br>Niszczy 53 punktów pancerza podczas ciosu<br>Cios krytyczny +1%<br>SA +1.58<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Wojownik</b><br>Wartość: 643 580">
                </a>`
        },
        {
            type: 'unique',
            html: `<a href="./item-1716649469" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/arr/strzaly172.gif" alt="Item" data-stats="Strzały sublimacji||crit=1;fire=1000;heal=764;lvl=300;permbound;rarity=unique;reqp=t;resdmg=1;sa=83;slow=94||29||709546" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Strzały sublimacji</b><b class=unique>* unikat *</b>Typ:  undefined<br>Obrażenia od ognia ~1000<br>Cios krytyczny +1%<br>Przywraca 764 punktów życia podczas walki<br>Obniżenie odporności o 1% podczas ciosu<br>SA +0.83<br>Obniża SA przeciwnika o 0.94<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Tropiciel</b><br>Wartość: 709 546">
                </a>`
        },
        {
            type: 'unique',
            html: `<a href="./item-1716649469" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/but/buty88.gif" alt="Item" data-stats="Ślizg gołoledzi||ac=667;act=12;evade=90;lvl=300;permbound;rarity=unique;reqp=bh;resfrost=4;sa=158||10||375421" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Ślizg gołoledzi</b><b class=unique>* unikat *</b>Typ:  Buty<br>Pancerz: 667<br>Odporność na truciznę +12%<br>Odporność na zimno +4%<br>Unik +90<br>SA +1.58<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Tancerz ostrzy, Łowca</b><br>Wartość: 375 421">
                </a>`
        },
        {
            type: 'unique',
            html: `<a href="./item-1716563030" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/hel/helm763.gif" alt="Item" data-stats="Magiczna ochrona uszu||absorb=2588;absorbm=1294;ac=431;endest=8;heal=829;lvl=300;permbound;rarity=unique;reqp=m;resfrost=12;sa=158||9||413902" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Magiczna ochrona uszu</b><b class=unique>* unikat *</b>Typ:  Hełmy<br>Pancerz: 431<br>Odporność na zimno +12%<br>Absorbuje do 2588 obrażeń fizycznych<br>Absorbuje do 1294 obrażeń magicznych<br>Niszczenie 8 energii podczas ataku<br>Przywraca 829 punktów życia podczas walki<br>SA +1.58<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Mag</b><br>Wartość: 413 902">
                </a>`
        },
        {
            type: 'unique',
            html: `<a href="./item-1716563030" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/roz/rozdzka152.gif" alt="Item" data-stats="Wezwanie zamieci||abdest=784;frost=300,5667;lvl=300;manabon=75;permbound;rarity=unique;reqp=m;sa=158||6||643580" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Wezwanie zamieci</b><b class=unique>* unikat *</b>Typ:  Różdżki<br>Obrażenia od zimna +5667<br>oraz spowalnia cel o 3 SA<br>Niszczenie 784 absorpcji przed atakiem<br>Mana +75<br>SA +1.58<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Mag</b><br>Wartość: 643 580">
                </a>`
        },
        {
            type: 'unique',
            html: `<a href="./item-1716476532" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/tar/tarcza94.gif" alt="Item" data-stats="Chłodna blokada||ac=2118;act=1;blok=300;heal=635;lowcrit=2;lvl=300;permbound;pierceb=60;rarity=unique;reqp=w;sa=83||14||579463" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Chłodna blokada</b><b class=unique>* unikat *</b>Typ:  Tarcze<br>Pancerz: 2118<br>Odporność na truciznę +1%<br>Blok +300<br>Przywraca 635 punktów życia podczas walki<br>Podczas obrony szansa na cios krytyczny przeciwnika jest mniejsza o 2%<br>60% szans na zablokowanie przebicia<br>SA +0.83<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Wojownik</b><br>Wartość: 579 463">
                </a>`
        },
        {
            type: 'unique',
            html: `<a href="./item-1716476532" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/nas/naszyjnik834.gif" alt="Item" data-stats="Mroźny nów||dz=171;energybon=90;evade=30;heal=764;hp=2538;lvl=300;permbound;rarity=unique;reqp=th;sa=233;slow=94||13||413902" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Mroźny nów</b><b class=unique>* unikat *</b>Typ:  Naszyjniki<br>Zręczność +171<br>Energia +90<br>Unik +30<br>Przywraca 764 punktów życia podczas walki<br>Życie +2538<br>SA +2.33<br>Obniża SA przeciwnika o 0.94<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Tropiciel, Łowca</b><br>Wartość: 413 902">
                </a>`
        },
        {
            type: 'unique',
            html: `<a href="./item-1716476532" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/arr/strzaly171.gif" alt="Item" data-stats="Zniszczenie lodowych marionetek||acdmg=103;energybon=30;evade=30;heal=764;lvl=300;pdmg=633;permbound;rarity=unique;reqp=h;sa=83||29||709546" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Zniszczenie lodowych marionetek</b><b class=unique>* unikat *</b>Typ:  undefined<br>Atak fizyczny: 633<br>Niszczy 103 punktów pancerza podczas ciosu<br>Energia +30<br>Unik +30<br>Przywraca 764 punktów życia podczas walki<br>SA +0.83<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Łowca</b><br>Wartość: 709 546">
                </a>`
        },
        {
            type: 'unique',
            html: `<a href="./item-1716303843" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/nas/naszyjnik835.gif" alt="Item" data-stats="Lodowa pełnia||crit=1;da=83;di=171;heal=764;hp=2538;lvl=300;manabon=225;permbound;rarity=unique;reqp=mp;sa=233||13||413902" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Lodowa pełnia</b><b class=unique>* unikat *</b>Typ:  Naszyjniki<br>Cios krytyczny +1%<br>Wszystkie cechy +83<br>Intelekt +171<br>Przywraca 764 punktów życia podczas walki<br>Życie +2538<br>Mana +225<br>SA +2.33<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Mag, Paladyn</b><br>Wartość: 413 902">
                </a>`
        },
        {
            type: 'unique',
            html: `<a href="./item-1716303843" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/top/topor25.gif" alt="Item" data-stats="Kruszyciel zamarzniętych kałuż||abdest=784;contra=50;dmg=5400,6600;frost=287,3000;lvl=300;permbound;rarity=unique;reqp=p;resdmg=1;sa=158||1||709546" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Kruszyciel zamarzniętych kałuż</b><b class=unique>* unikat *</b>Typ:  Jednoręczne<br>Atak: 5400,6600<br>Obrażenia od zimna +3000<br>oraz spowalnia cel o 2.87 SA<br>Niszczenie 784 absorpcji przed atakiem<br>+50% szans na kontrę po krytyku<br>Obniżenie odporności o 1% podczas ciosu<br>SA +1.58<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Paladyn</b><br>Wartość: 709 546">
                </a>`
        },
        {
            type: 'unique',
            html: `<a href="./item-1716044543" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/bro/sztylet82.gif" alt="Item" data-stats="Sopel głębokiego ranienia||acdmg=53;dmg=4980,6087;hp=2538;lvl=300;permbound;rarity=unique;reqp=b;sa=158;wound=25,1833||1||675759" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Sopel głębokiego ranienia</b><b class=unique>* unikat *</b>Typ:  Jednoręczne<br>Atak: 4980,6087<br>Niszczy 53 punktów pancerza podczas ciosu<br>Życie +2538<br>SA +1.58<br>Głęboka rana, 25% szans na +1833 obrażeń<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Tancerz ostrzy</b><br>Wartość: 675 759">
                </a>`
        },
        {
            type: 'unique',
            html: `<a href="./item-1715871927" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/orb/orb98.gif" alt="Item" data-stats="Podejrzane żółte kryształy||heal=764;light=2556,3833;lvl=300;permbound;rarity=unique;reqp=m;resdmg=2;sa=83||7||643580" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Podejrzane żółte kryształy</b><b class=unique>* unikat *</b>Typ:  Laski<br>Obrażenia od błyskawic 1-2556,3833<br>Przywraca 764 punktów życia podczas walki<br>Obniżenie odporności o 2% podczas ciosu<br>SA +0.83<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Mag</b><br>Wartość: 643 580">
                </a>`
        },
        {
            type: 'unique',
            html: `<a href="./item-1715958177" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/tar/tarcza95.gif" alt="Item" data-stats="Ochrona śnieżnego wilka||ac=1961;blok=360;heal=635;lowevade=30;lvl=300;permbound;pierceb=60;rarity=unique;reqp=p;resfrost=7;sa=83||14||579463" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Ochrona śnieżnego wilka</b><b class=unique>* unikat *</b>Typ:  Tarcze<br>Pancerz: 1961<br>Odporność na zimno +7%<br>Blok +360<br>Przywraca 635 punktów życia podczas walki<br>Podczas ataku unik przeciwnika jest mniejszy o 30<br>60% szans na zablokowanie przebicia<br>SA +0.83<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Paladyn</b><br>Wartość: 579 463">
                </a>`
        },
        {
            type: 'heroic',
            html: `<a href="./item-1714247218" class="itemborder">
                        <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/zbr/zbroja794.gif" alt="Item" data-stats="Zbroja mroźnego spadkobiercy||ac=2851;act=1;crit=2;ds=171;energybon=30;hp=2538;hpbon=3;lvl=300;permbound;rarity=heroic;reqp=w;sa=158||8||977844" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Zbroja mroźnego spadkobiercy</b><b class=heroic>* heroiczny *</b>Typ:  Zbroje<br>Pancerz: 2851<br>Odporność na truciznę +1%<br>Cios krytyczny +2%<br>Siła +171<br>Energia +30<br>Życie +2538<br>+3 życia za 1 pkt siły<br>SA +1.58<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Wojownik</b><br>Wartość: 977 844">
                    </a>`
        },
        {
            type: 'heroic',
            html: `<a href="./item-1717859122" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/pie/pierscien852.gif" alt="Item" data-stats="Zamarznięty płomień||crit=3;critmval=18;da=83;di=171;hp=2538;lvl=300;manabon=75;permbound;rarity=heroic;reqp=m;sa=308||12||517378" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Zamarznięty płomień</b><b class=heroic>* heroiczny *</b>Typ:  Pierścienie<br>Cios krytyczny +3%<br>Siła krytyka magicznego +18%<br>Wszystkie cechy +83<br>Intelekt +171<br>Życie +2538<br>Mana +75<br>SA +3.08<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Mag</b><br>Wartość: 517 378">
                </a>`
        },
        {
            type: 'heroic',
            html: `<a href="./item-1717772564" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/pie/pierscien854.gif" alt="Item" data-stats="Pierścień zastygłej natury||crit=2;critval=12;dz=171;energybon=60;evade=30;hp=2538;lvl=300;permbound;rarity=heroic;reqp=h;sa=383||12||517378" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Pierścień zastygłej natury</b><b class=heroic>* heroiczny *</b>Typ:  Pierścienie<br>Cios krytyczny +2%<br>Siła krytyka fizycznego +12%<br>Zręczność +171<br>Energia +60<br>Unik +30<br>Życie +2538<br>SA +3.83<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Łowca</b><br>Wartość: 517 378">
                </a>`
        },
        {
            type: 'heroic',
            html: `<a href="./item-1717772564" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/zbr/zbroja817.gif" alt="Item" data-stats="Pancerz z lodowych komnat||ac=2376;act=8;ds=171;dz=171;energybon=30;evade=100;hp=2538;lvl=300;permbound;rarity=heroic;reqp=b;resfrost=4;sa=233||8||1026736" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Pancerz z lodowych komnat</b><b class=heroic>* heroiczny *</b>Typ:  Zbroje<br>Pancerz: 2376<br>Odporność na truciznę +8%<br>Odporność na zimno +4%<br>Siła +171<br>Zręczność +171<br>Energia +30<br>Unik +100<br>Życie +2538<br>SA +2.33<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Tancerz ostrzy</b><br>Wartość: 1 026 736">
                </a>`
        },
        {
            type: 'heroic',
            html: `<a href="./item-1717772564" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/luk/luk549.gif" alt="Item" data-stats="Kusza trzaskających kryształków||acdmg=53;crit=2;dmg=4241,5184;light=3815,5723;lvl=300;permbound;pierce=20;rarity=heroic;reqp=t;sa=233||4||886933" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Kusza trzaskających kryształków</b><b class=heroic>* heroiczny *</b>Typ:  Dystansowe<br>Atak: 4241,5184<br>Obrażenia od błyskawic 1-3815,5723<br>Niszczy 53 punktów pancerza podczas ciosu<br>Cios krytyczny +2%<br>Przebicie pancerza +20%<br>SA +2.33<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Tropiciel</b><br>Wartość: 886 933">
                </a>`
        },
        {
            type: 'heroic',
            html: `<a href="./item-1717686208" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/zbr/zbroja790.gif" alt="Item" data-stats="Szata pana mrozu||absorb=7921;absorbm=3960;ac=1320;crit=1;heal=764;hp=7564;lvl=300;manabon=100;permbound;rarity=heroic;reqp=m;reslight=14;sa=158||8||1026736" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Szata pana mrozu</b><b class=heroic>* heroiczny *</b>Typ:  Zbroje<br>Pancerz: 1320<br>Odporność na błyskawice +14%<br>Absorbuje do 7921 obrażeń fizycznych<br>Absorbuje do 3960 obrażeń magicznych<br>Cios krytyczny +1%<br>Przywraca 764 punktów życia podczas walki<br>Życie +7564<br>Mana +100<br>SA +1.58<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Mag</b><br>Wartość: 1 026 736">
                </a>`
        },
        {
            type: 'heroic',
            html: `<a href="./item-1717599799" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/mie/miecz301.gif" alt="Item" data-stats="Mroźna gwiazda||crit=3;dmg=6423,7850;evade=30;lvl=300;permbound;rarity=heroic;reqp=b;sa=233||1||804474" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Mroźna gwiazda</b><b class=heroic>* heroiczny *</b>Typ:  Jednoręczne<br>Atak: 6423,7850<br>Cios krytyczny +3%<br>Unik +30<br>SA +2.33<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Tancerz ostrzy</b><br>Wartość: 804 474">
                </a>`
        },
        {
            type: 'heroic',
            html: `<a href="./item-1717599799" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/rek/rekawice98.gif" alt="Item" data-stats="Sztywne palce dziedzica||ac=686;act=1;blok=45;crit=1;ds=171;hp=2667;lvl=300;permbound;rarity=heroic;reqp=pw;reslight=5;sa=233;slow=94||11||570409" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Sztywne palce dziedzica</b><b class=heroic>* heroiczny *</b>Typ:  Rękawice<br>Pancerz: 686<br>Odporność na truciznę +1%<br>Odporność na błyskawice +5%<br>Blok +45<br>Cios krytyczny +1%<br>Siła +171<br>Życie +2667<br>SA +2.33<br>Obniża SA przeciwnika o 0.94<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Paladyn, Wojownik</b><br>Wartość: 570 409">
                </a>`
        },
        {
            type: 'heroic',
            html: `<a href="./item-1717599799" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/rek/rekawice100.gif" alt="Item" data-stats="Zastygłe dłonie monarchy||ac=528;act=12;crit=1;dz=171;energybon=30;heal=377;lowevade=30;lvl=300;permbound;rarity=heroic;reqp=tbh;resfire=7;sa=308||11||570409" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Zastygłe dłonie monarchy</b><b class=heroic>* heroiczny *</b>Typ:  Rękawice<br>Pancerz: 528<br>Odporność na truciznę +12%<br>Odporność na ogień +7%<br>Cios krytyczny +1%<br>Zręczność +171<br>Energia +30<br>Przywraca 377 punktów życia podczas walki<br>Podczas ataku unik przeciwnika jest mniejszy o 30<br>SA +3.08<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Tropiciel, Tancerz ostrzy, Łowca</b><br>Wartość: 570 409">
                </a>`
        },
        {
            type: 'heroic',
            html: `<a href="./item-1717340622" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/pie/pierscien851.gif" alt="Item" data-stats="Mroźna róża||crit=4;da=83;energybon=30;hp=5051;lowevade=30;lvl=300;manabon=75;permbound;rarity=heroic;reqp=p;sa=308||12||517378" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Mroźna róża</b><b class=heroic>* heroiczny *</b>Typ:  Pierścienie<br>Cios krytyczny +4%<br>Wszystkie cechy +83<br>Energia +30<br>Życie +5051<br>Podczas ataku unik przeciwnika jest mniejszy o 30<br>Mana +75<br>SA +3.08<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Paladyn</b><br>Wartość: 517 378">
                </a>`
        },
        {
            type: 'heroic',
            html: `<a href="./item-1717513344" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/zbr/zbroja792.gif" alt="Item" data-stats="Ciepły kubrak myśliwego||absorb=5280;absorbm=2640;ac=1848;act=12;critmval=6;di=171;evade=30;heal=764;lvl=300;manabon=50;permbound;rarity=heroic;reqp=t;resfrost=12;sa=308||8||1131976" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Ciepły kubrak myśliwego</b><b class=heroic>* heroiczny *</b>Typ:  Zbroje<br>Pancerz: 1848<br>Odporność na truciznę +12%<br>Odporność na zimno +12%<br>Absorbuje do 5280 obrażeń fizycznych<br>Absorbuje do 2640 obrażeń magicznych<br>Siła krytyka magicznego +6%<br>Intelekt +171<br>Unik +30<br>Przywraca 764 punktów życia podczas walki<br>Mana +50<br>SA +3.08<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Tropiciel</b><br>Wartość: 1 131 976">
                </a>`
        },
        {
            type: 'heroic',
            html: `<a href="./item-1717513344" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/pie/pierscien864.gif" alt="Item" data-stats="Sople władzy||crit=2;critmval=6;di=171;energybon=30;evade=60;hp=2538;lvl=300;manabon=75;permbound;rarity=heroic;reqp=t;sa=383||12||543247" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Sople władzy</b><b class=heroic>* heroiczny *</b>Typ:  Pierścienie<br>Cios krytyczny +2%<br>Siła krytyka magicznego +6%<br>Intelekt +171<br>Energia +30<br>Unik +60<br>Życie +2538<br>Mana +75<br>SA +3.83<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Tropiciel</b><br>Wartość: 543 247">
                </a>`
        },
        {
            type: 'heroic',
            html: `<a href="./item-1717426908" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/mie/miecz302.gif" alt="Item" data-stats="Narzędzie upłynnienia lodowców||contra=60;dmg=5453,6665;fire=3366;hp=2538;lowevade=30;lvl=300;manabon=75;permbound;rarity=heroic;reqp=p;resdmg=1;sa=158||1||977844" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Narzędzie upłynnienia lodowców</b><b class=heroic>* heroiczny *</b>Typ:  Jednoręczne<br>Atak: 5453,6665<br>Obrażenia od ognia ~3366<br>+60% szans na kontrę po krytyku<br>Życie +2538<br>Podczas ataku unik przeciwnika jest mniejszy o 30<br>Mana +75<br>Obniżenie odporności o 1% podczas ciosu<br>SA +1.58<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Paladyn</b><br>Wartość: 977 844">
                </a>`
        },
        {
            type: 'heroic',
            html: `<a href="./item-1717081355" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/mie/miecz70.gif" alt="Item" data-stats="Ostrze lodowych nacieków||abdest=792;dmg=5029,6147;hp=5051;lowevade=30;lvl=300;permbound;rarity=heroic;reqp=w;sa=158;slow=94;wound=25,1851||1||931280" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Ostrze lodowych nacieków</b><b class=heroic>* heroiczny *</b>Typ:  Jednoręczne<br>Atak: 5029,6147<br>Niszczenie 792 absorpcji przed atakiem<br>Życie +5051<br>Podczas ataku unik przeciwnika jest mniejszy o 30<br>SA +1.58<br>Obniża SA przeciwnika o 0.94<br>Głęboka rana, 25% szans na +1851 obrażeń<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Wojownik</b><br>Wartość: 931 280">
                </a>`
        },
        {
            type: 'heroic',
            html: `<a href="./item-1717167811" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/but/buty843.gif" alt="Item" data-stats="Trop zimowej zwierzyny||ac=713;acdmg=40;da=83;hp=1425;lowevade=30;lvl=300;permbound;rarity=heroic;resdmg=1;sa=233;slow=94||10||517378" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Trop zimowej zwierzyny</b><b class=heroic>* heroiczny *</b>Typ:  Buty<br>Pancerz: 713<br>Niszczy 40 punktów pancerza podczas ciosu<br>Wszystkie cechy +83<br>Życie +1425<br>Podczas ataku unik przeciwnika jest mniejszy o 30<br>Obniżenie odporności o 1% podczas ciosu<br>SA +2.33<br>Obniża SA przeciwnika o 0.94<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br>Wartość: 517 378">
                </a>`
        },
        {
            type: 'heroic',
            html: `<a href="./item-1716822335" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/luk/luk548.gif" alt="Item" data-stats="Trująca zawierucha||crit=1;dmg=5514,6739;lowcrit=2;lvl=300;permbound;pierce=25;poison=134,2356;rarity=heroic;reqp=h;sa=233||4||886933" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Trująca zawierucha</b><b class=heroic>* heroiczny *</b>Typ:  Dystansowe<br>Atak: 5514,6739<br>Obrażenia od trucizny +2356<br>oraz spowalnia cel o 1.34 SA<br>Cios krytyczny +1%<br>Podczas obrony szansa na cios krytyczny przeciwnika jest mniejsza o 2%<br>Przebicie pancerza +25%<br>SA +2.33<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Łowca</b><br>Wartość: 886 933">
                </a>`
        },
        {
            type: 'heroic',
            html: `<a href="./item-1716390234" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/roz/rozdzka151.gif" alt="Item" data-stats="Różdżka pierwszych roztopów||critmval=18;fire=6733;heal=764;lvl=300;permbound;rarity=heroic;reqp=m;sa=158;slow=94||6||844698" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Różdżka pierwszych roztopów</b><b class=heroic>* heroiczny *</b>Typ:  Różdżki<br>Obrażenia od ognia ~6733<br>Siła krytyka magicznego +18%<br>Przywraca 764 punktów życia podczas walki<br>SA +1.58<br>Obniża SA przeciwnika o 0.94<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Mag</b><br>Wartość: 844 698">
                </a>`
        },
        {
            type: 'heroic',
            html: `<a href="./item-1716390234" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/pie/pierscien850.gif" alt="Item" data-stats="Oko sunącego lodowca||crit=3;critval=18;da=83;ds=171;energybon=30;hp=2538;lvl=300;permbound;rarity=heroic;reqp=w;sa=308||12||517378" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Oko sunącego lodowca</b><b class=heroic>* heroiczny *</b>Typ:  Pierścienie<br>Cios krytyczny +3%<br>Siła krytyka fizycznego +18%<br>Wszystkie cechy +83<br>Siła +171<br>Energia +30<br>Życie +2538<br>SA +3.08<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Wojownik</b><br>Wartość: 517 378">
                </a>`
        },
        {
            type: 'heroic',
            html: `<a href="./item-1715353423" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/pie/pierscien853.gif" alt="Item" data-stats="Sygnet nagłego gradobicia||crit=3;critval=12;da=83;ds=171;evade=30;hp=2538;lvl=300;permbound;rarity=heroic;reqp=b;sa=383||12||517378" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Sygnet nagłego gradobicia</b><b class=heroic>* heroiczny *</b>Typ:  Pierścienie<br>Cios krytyczny +3%<br>Siła krytyka fizycznego +12%<br>Wszystkie cechy +83<br>Siła +171<br>Unik +30<br>Życie +2538<br>SA +3.83<br>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Tancerz ostrzy</b><br>Wartość: 517 378">
                </a>`
        },
        {
            type: 'legendary',
            html: `<a href="./item-1717928772" class="itemborder">
                        <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/rek/rekawice846.gif" alt="Item" data-stats="Dłonie śnieżnych lawin||absorb=1000;absorbm=500;ac=500;crit=2;di=171;heal=746;legbon=glare,300;lowcrit=2;lvl=300;manabon=150;opis=Lodowy Tron, niegdyś usytuowany na szczycie najwyższej w krainie góry, stanowił cel niezliczonej ilości śmiałków chcących na nim zasiąść. Obalenie śnieżnego władcy symbolizować miało ostateczną władzę i budzić największą trwogę... Każdy jednak, kto podejmował się tego wyzwania, grzebany był w lawinach śnieżnego puchu przywoływanych jednym, silniejszym uderzeniem pięści Tanrotha.;permbound;rarity=legendary;reqp=mp;reslight=14;sa=383||11||792383" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Dłonie śnieżnych lawin</b><b class=legendary>* legendarny *</b>Typ:  Rękawice<br>Pancerz: 500<br>Odporność na błyskawice +14%<br>Absorbuje do 1000 obrażeń fizycznych<br>Absorbuje do 500 obrażeń magicznych<br>Cios krytyczny +2%<br>Intelekt +171<br>Przywraca 746 punktów życia podczas walki<br>Podczas obrony szansa na cios krytyczny przeciwnika jest mniejsza o 2%<br>Mana +150<br>SA +3.83<br><i class=legbon>Oślepienie: Podczas przyjmowania ataku 9% szansy na oślepienie przeciwnika i zablokowanie jego najbliższej akcji.</i><i class=idesc>Lodowy Tron, niegdyś usytuowany na szczycie najwyższej w krainie góry, stanowił cel niezliczonej ilości śmiałków chcących na nim zasiąść. Obalenie śnieżnego władcy symbolizować miało ostateczną władzę i budzić największą trwogę... Każdy jednak, kto podejmował się tego wyzwania, grzebany był w lawinach śnieżnego puchu przywoływanych jednym, silniejszym uderzeniem pięści Tanrotha.</i>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Mag, Paladyn</b><br>Wartość: 792 383">
                    </a>`
        },
        {
            type: 'legendary',
            html: `<a href="./item-1714247219" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/hel/helm769.gif" alt="Item" data-stats="Kaptur szronowych miraży||absorb=2199;absorbm=1100;ac=528;act=6;crit=2;heal=418;legbon=cleanse,300;lvl=300;manabon=225;opis=Szronowe pejzaże malują się na powierzchni kaptura niczym uchwycone trajektorie lotu świetlików. Te mroźne miraże mącą w słabych umysłach oraz hipnotyzują przeciwników, znacznie spowalniając ich ruchy i reakcję, dając ci czas na wyprowadzenie znacznie potężniejszego, wzmocnionego skomplikowanym zaklęciem, ataku.;permbound;rarity=legendary;reqp=mt;resdmg=1;resfrost=15;sa=308;slow=179||9||832003" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Kaptur szronowych miraży</b><b class=legendary>* legendarny *</b>Typ:  Hełmy<br>Pancerz: 528<br>Odporność na truciznę +6%<br>Odporność na zimno +15%<br>Absorbuje do 2199 obrażeń fizycznych<br>Absorbuje do 1100 obrażeń magicznych<br>Cios krytyczny +2%<br>Przywraca 418 punktów życia podczas walki<br>Mana +225<br>Obniżenie odporności o 1% podczas ciosu<br>SA +3.08<br>Obniża SA przeciwnika o 1.79<br><i class=legbon>Płomienne oczyszczenie: podczas otrzymywania celnego ataku 12% szans na usunięcie z postaci efektów obezwładnienia, spowolnienia i obrażeń warunkowych.</i><i class=idesc>Szronowe pejzaże malują się na powierzchni kaptura niczym uchwycone trajektorie lotu świetlików. Te mroźne miraże mącą w słabych umysłach oraz hipnotyzują przeciwników, znacznie spowalniając ich ruchy i reakcję, dając ci czas na wyprowadzenie znacznie potężniejszego, wzmocnionego skomplikowanym zaklęciem, ataku.</i>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Mag, Tropiciel</b><br>Wartość: 832 003">
                </a>`
        },
        {
            type: 'legendary',
            html: `<a href="./item-1705680139" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/hel/helm770.gif" alt="Item" data-stats="Kask mroźnego nieboskłonu||ac=748;acdmg=40;act=12;crit=2;critval=6;dz=171;energybon=30;evade=60;legbon=critred,300;lvl=300;opis=Wyjątkową ochronę głowy wykonano ze stopu metali i minerałów pochodzących z komety, która uderzyła lata temu, jeszcze przed wielką wojną, w okolicach Andarum Ilami. Odbijający wszelkie wrogie zaklęcia i nigdy nieprzebity żadną strzałą hełm stanowił jeden z największych skarbów zgromadzonych przez Dziedzica Lodowego Tronu.;permbound;rarity=legendary;reqp=bh;resfire=6;sa=383||9||792383" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Kask mroźnego nieboskłonu</b><b class=legendary>* legendarny *</b>Typ:  Hełmy<br>Pancerz: 748<br>Odporność na truciznę +12%<br>Odporność na ogień +6%<br>Niszczy 40 punktów pancerza podczas ciosu<br>Cios krytyczny +2%<br>Siła krytyka fizycznego +6%<br>Zręczność +171<br>Energia +30<br>Unik +60<br>SA +3.83<br><i class=legbon>Krytyczna osłona: przyjmowane ciosy krytyczne są o 20% słabsze.</i><i class=idesc>Wyjątkową ochronę głowy wykonano ze stopu metali i minerałów pochodzących z komety, która uderzyła lata temu, jeszcze przed wielką wojną, w okolicach Andarum Ilami. Odbijający wszelkie wrogie zaklęcia i nigdy nieprzebity żadną strzałą hełm stanowił jeden z największych skarbów zgromadzonych przez Dziedzica Lodowego Tronu.</i>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Tancerz ostrzy, Łowca</b><br>Wartość: 792 383">
                </a>`
        },
        {
            type: 'legendary',
            html: `<a href="./item-1707494582" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/nas/naszyjnik836.gif" alt="Item" data-stats="Artefakt minionej ery||crit=4;da=83;endest=8;energybon=30;evade=30;heal=1520;hp=2538;legbon=verycrit,300;lvl=300;manabon=75;manadest=17;opis=Naszyjnik, przy pomocy wielkiej siły i potężnych zaklęć, wydobyty został przez Tanrotha z wiecznej zmarzliny. Kunszt wykonania, tajemnicze symbole i użyte do jego wykonania materiały sugerują, iż musi być on dziełem rąk cywilizacji tak dawnej, że nie wspominają o niej nawet najstarsze księgi...;permbound;rarity=legendary;sa=383;slow=94||13||792383" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Artefakt minionej ery</b><b class=legendary>* legendarny *</b>Typ:  Naszyjniki<br>Cios krytyczny +4%<br>Wszystkie cechy +83<br>Niszczenie 8 energii podczas ataku<br>Energia +30<br>Unik +30<br>Przywraca 1520 punktów życia podczas walki<br>Życie +2538<br>Mana +75<br>Niszczenie 17 many podczas ataku<br>SA +3.83<br>Obniża SA przeciwnika o 0.94<br><i class=legbon>Cios bardzo krytyczny: 13% szansy na podwojenie mocy ciosu krytycznego.</i><i class=idesc>Naszyjnik, przy pomocy wielkiej siły i potężnych zaklęć, wydobyty został przez Tanrotha z wiecznej zmarzliny. Kunszt wykonania, tajemnicze symbole i użyte do jego wykonania materiały sugerują, iż musi być on dziełem rąk cywilizacji tak dawnej, że nie wspominają o niej nawet najstarsze księgi...</i>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br>Wartość: 792 383">
                </a>`
        },
        {
            type: 'legendary',
            html: `<a href="./item-1689606227" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/rek/rekawice847.gif" alt="Item" data-stats="Dotyk nagłej krystalizacji||ac=500;act=14;crit=1;dz=337;energybon=30;evade=30;legbon=curse,300;lowcrit=2;lowevade=30;lvl=300;opis=Zaledwie jedno tknięcie w tych rękawicach potrafi skrystalizować każdy płyn i zmrozić każdą tkankę, przemieniając rzeki i rozległe jeziora w kryształowe zwierciadła, a drzewa w lodowe monumenty. Mroźny Dziedzic wykorzystał tę magię jednak w inny sposób. Zamrażając żywe tkanki własnego ciała przedłużał swe istnienie niemal w nieskończoność.;permbound;rarity=legendary;reqp=ht;resfire=9;sa=383;slow=94||11||832003" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Dotyk nagłej krystalizacji</b><b class=legendary>* legendarny *</b>Typ:  Rękawice<br>Pancerz: 500<br>Odporność na truciznę +14%<br>Odporność na ogień +9%<br>Cios krytyczny +1%<br>Zręczność +337<br>Energia +30<br>Unik +30<br>Podczas obrony szansa na cios krytyczny przeciwnika jest mniejsza o 2%<br>Podczas ataku unik przeciwnika jest mniejszy o 30<br>SA +3.83<br>Obniża SA przeciwnika o 0.94<br><i class=legbon>Klątwa: udany atak powoduje, iż przeciwnik otrzymuje 9% szans na chybienie przy jego następnym ataku.</i><i class=idesc>Zaledwie jedno tknięcie w tych rękawicach potrafi skrystalizować każdy płyn i zmrozić każdą tkankę, przemieniając rzeki i rozległe jeziora w kryształowe zwierciadła, a drzewa w lodowe monumenty. Mroźny Dziedzic wykorzystał tę magię jednak w inny sposób. Zamrażając żywe tkanki własnego ciała przedłużał swe istnienie niemal w nieskończoność.</i>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Łowca, Tropiciel</b><br>Wartość: 832 003">
                </a>`
        },
        {
            type: 'legendary',
            html: `<a href="./item-1702915287" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/rek/rekawice848.gif" alt="Item" data-stats="Chwyt głębokiej martwicy||ac=766;act=4;crit=2;da=83;energybon=30;heal=377;legbon=cleanse,300;lowcrit=4;lowevade=30;lvl=300;opis=Korzystanie z tego skarbu niesie ze sobą ogromne ryzyko. Włożone w parę rękawic dłonie rozpoczynają niemal natychmiastowo wielką batalię - chłoną moc artefaktu, zarazem opierając się klątwie niszczącej martwicy chcącej wdać się w twe tkanki. To, czy nie odniesiesz większych obrażeń z powodu używania tej błyskotki, zależy tylko i wyłącznie od twoich sił witalnych i potencjału regeneracyjnego.;permbound;rarity=legendary;reqp=wb;resfire=4;sa=383||11||792383" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Chwyt głębokiej martwicy</b><b class=legendary>* legendarny *</b>Typ:  Rękawice<br>Pancerz: 766<br>Odporność na truciznę +4%<br>Odporność na ogień +4%<br>Cios krytyczny +2%<br>Wszystkie cechy +83<br>Energia +30<br>Przywraca 377 punktów życia podczas walki<br>Podczas obrony szansa na cios krytyczny przeciwnika jest mniejsza o 4%<br>Podczas ataku unik przeciwnika jest mniejszy o 30<br>SA +3.83<br><i class=legbon>Płomienne oczyszczenie: podczas otrzymywania celnego ataku 12% szans na usunięcie z postaci efektów obezwładnienia, spowolnienia i obrażeń warunkowych.</i><i class=idesc>Korzystanie z tego skarbu niesie ze sobą ogromne ryzyko. Włożone w parę rękawic dłonie rozpoczynają niemal natychmiastowo wielką batalię - chłoną moc artefaktu, zarazem opierając się klątwie niszczącej martwicy chcącej wdać się w twe tkanki. To, czy nie odniesiesz większych obrażeń z powodu używania tej błyskotki, zależy tylko i wyłącznie od twoich sił witalnych i potencjału regeneracyjnego.</i>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Wojownik, Tancerz ostrzy</b><br>Wartość: 792 383">
                </a>`
        },
        {
            type: 'legendary',
            html: `<a href="./item-1710691425" class="itemborder">
                  <img src="https://micc.garmory-cdn.cloud/obrazki/itemy/hel/helm771.gif" alt="Item" data-stats="Czarna stal Tanrotha||ac=915;acdmg=78;act=1;blok=45;crit=2;energybon=30;legbon=lastheal,300;lowevade=60;lvl=300;opis=Ciężki, bojowy hełm wykuto z czarnej stali pochodzącej z lodowych, krasnoludzkich kuźni, ukrytych przed pobieżnym okiem poszukiwaczy przygód. Przedmioty wykonane przez zbuntowany klan krasnoludów, który lata temu odłączył się od Ograbar-dun, zasłynęły na podziemnym rynku z niezwykłej wytrzymałości uzyskiwanej dzięki hartowaniu rozgrzanych metali w kryształowych formacjach wiecznej zmarzliny.;permbound;rarity=legendary;reqp=wp;reslight=6;sa=308;slow=94||9||792383" data-ctip="item" loading="lazy" class="hastip" data-tip="<b class='item-name'>Czarna stal Tanrotha</b><b class=legendary>* legendarny *</b>Typ:  Hełmy<br>Pancerz: 915<br>Odporność na truciznę +1%<br>Odporność na błyskawice +6%<br>Niszczy 78 punktów pancerza podczas ciosu<br>Blok +45<br>Cios krytyczny +2%<br>Energia +30<br>Podczas ataku unik przeciwnika jest mniejszy o 60<br>SA +3.08<br>Obniża SA przeciwnika o 0.94<br><i class=legbon>Ostatni ratunek: kiedy po otrzymanym ataku zostanie graczowi mniej niż 18% życia, zostaje jednorazowo uleczony do 30-50% swojego życia.</i><i class=idesc>Ciężki, bojowy hełm wykuto z czarnej stali pochodzącej z lodowych, krasnoludzkich kuźni, ukrytych przed pobieżnym okiem poszukiwaczy przygód. Przedmioty wykonane przez zbuntowany klan krasnoludów, który lata temu odłączył się od Ograbar-dun, zasłynęły na podziemnym rynku z niezwykłej wytrzymałości uzyskiwanej dzięki hartowaniu rozgrzanych metali w kryształowych formacjach wiecznej zmarzliny.</i>Związany z właścicielem na stałe<br><b class='att'>Wymagany poziom: 300</b><br><b class='att'>Wymagana profesja:  Wojownik, Paladyn</b><br>Wartość: 792 383">
                </a>`
        },
    ];

const getRandomItem = (rank) => {
    const items = itemsDatabase[rank];
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex].html;
};

const getRandomItemType = () => {
    const rand = Math.random() * 100;
    if (rand <= 0.9) return 'legendary';
    if (rand <= 45.9) return 'heroic';
    return 'unique';
};

const createItems = () => {
    const items = [];
    const draw = Math.floor(Math.random() * 2) + 1; // Random draw between 1 and 2
    const loopLength = draw === 1 ? 5 : 6;

    for (let i = 0; i < loopLength; i++) {
        const itemType = getRandomItemType();
        const itemsOfSelectedType = itemsDatabase.filter(item => item.type === itemType);
        const randomItem = itemsOfSelectedType[Math.floor(Math.random() * itemsOfSelectedType.length)];
        items.push(randomItem.html);
    }

    return items;
};

const createWindowWithItems = () => {
    let msgDiv = document.createElement('div');
    msgDiv.className = 'item col-md-12 row-shadow anouncement';

    let msgDiv__div = document.createElement('div');
    msgDiv__div.style.display = 'flex';
    msgDiv__div.style.flexDirection = 'column';
    msgDiv__div.style.justifyContent = 'center';
    msgDiv__div.style.alignItems = 'center';
    msgDiv__div.className = 'col-md-12 center';

    let iceKing = document.createElement('img');
    iceKing.src = 'https://micc.garmory-cdn.cloud/obrazki/npc/tyt/ice_king.gif';
    iceKing.className = 'iceKing';
    msgDiv__div.appendChild(iceKing);
    iceKing.style.border = 'none';
    iceKing.style.margin = '0';
    iceKing.style.display = 'inline';
    iceKing.style.background = 'none';
    iceKing.style.cursor = 'auto';

    let itemContainer = document.createElement('div');
    itemContainer.className = 'loot col-md-3';
    itemContainer.style.textAlign = 'center';

    const items = createItems();
    items.forEach(itemHTML => {
        itemContainer.innerHTML += itemHTML;
    });

    msgDiv__div.appendChild(itemContainer);

    let counter = 1;
    let previousLegendary = false;

    let button = document.createElement('button');
    button.innerText = 'Losuj';
    button.style.marginTop = '10px';
    let isCooldown = false;
    let legendCount = document.createElement('span');
    legendCount.innerText = 'Bicia potrzebne do zdobycia legendy: 1';
    msgDiv__div.appendChild(legendCount);

    button.onclick = () => {
        if (!isCooldown) {
            itemContainer.innerHTML = '';
            const newItems = createItems();
            newItems.forEach(itemHTML => {
                itemContainer.innerHTML += itemHTML;
            });

            const isLegendary = newItems.some(itemHTML => {
                return itemHTML.includes('legendary');
            });

            if (isLegendary) {
                counter++;
                previousLegendary = true;
                legendCount.innerText = `Bicia potrzebne do zdobycia legendy: ${counter}`;

                isCooldown = true;
                setTimeout(() => {
                    isCooldown = false;
                }, 1000);
            } else {
                if (previousLegendary) {
                    counter = 1;
                } else {
                    counter++;
                }
                previousLegendary = false;
                legendCount.innerText = `Bicia potrzebne do zdobycia legendy: ${counter}`;
            }
        }
    };
    msgDiv__div.appendChild(button);

    msgDiv.appendChild(msgDiv__div);

    let container = document.querySelector('.items>.col-md-12');
    container.prepend(msgDiv);
};

createWindowWithItems();
})();
