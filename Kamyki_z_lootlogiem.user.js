// ==UserScript==
// @name         Kamyki z lootlogiem
// @namespace    http://tampermonkey.net/
// @version      10.11.2024
// @description  Przeróbka dodatku Priweejta, który dodaje grafiki do kamyków. Dodano wyświetlanie timerów z lootloga na teleportach.
// @author       You (edycja oryginalnego kodu autorstwa Priweejt)
// @match        http*://*.margonem.pl/
// @exclude      http*://www.margonem.pl/
// @grant        none
// ==/UserScript==

// JEŚLI NIE POKAZUJE GRAFIKI - POPRAW NAZWĘ MAPY NA TAKĄ JAK NA KAMYKU (WAŻNA JEST TEŻ WIELKOŚĆ ZNAKÓW).
// JEŚLI NIE POKAZUJE TIMERA - POPRAW NAZWĘ E2 NA TAKĄ JAK NA LOOTLOGU NP. Terrozaur (urwisko).
// NIEKTÓRE KOLOSY MAM USTAWIONE O MAPĘ WCZEŚNIEJ PRZED PRZEDSIONKIEM, ZMIEŃTA SE
// DLA GRAFIK NA TELEPORTACH Z UŻYCIAMI NALEŻY USUNĄĆ && stone._cachedStats.hasOwnProperty("timelimit") NIŻEJ
// JEŚLI DODATEK PRZESTAŁ DZIAŁAĆ POPRAW PRZECINKI I CUDZYSŁOWIA

const STONES_MAP = {
    // E2
    "Grota Dzikiego Kota": [
        "Mushita",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/st-puma.gif"
    ],
    "Las Tropicieli": [
        "Kotołak Tropiciel",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e1/kotolak_lowca.gif"
    ],
    "Przeklęta Strażnica - podziemia p.2 s.1": [
        "Shae Phu",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/demonszef.gif"
    ],
    "Schowek na Łupy": [
        "Zorg Jednooki Baron",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/zbir-e2-zorg.gif"
    ],
    "Podmokła Dolina": [
        "Gobbos",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/gobsamurai.gif"
    ],
    "Pieczara Kwiku - sala 1": [
        "Tyrtajos",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/dzik.gif"
    ],
    "Skalne Turnie": [
        "Tollok Shimger",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/tollok_shimger.gif"
    ],
    "Stary Kupiecki Trakt": [
        "Szczęt alias Gładki",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/zbir-szczet.gif"
    ],
    "Mokra Grota p.2": [
        "Agar",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/glut_agar.gif"
    ],
    "Stare Wyrobisko p.3": [
        "Razuglag Oklash",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/razuglag.gif"
    ],
    "Lazurytowa Grota p.4": [
        "Foverk Turrim",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/kobold07.gif"
    ],
    "Kopalnia Kapiącego Miodu p.2 - sala Owadziej Matki": [
        "Owadzia Matka",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/zadlak-e2-owadzia-matka.gif"
    ],
    "Wioska Gnolli": [
        "Vari Kruger",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/gnoll11.gif"
    ],
    "Jaskinia Gnollich Szamanów p.3": [
        "Furruk Kozug",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/gnoll12.gif"
    ],
    "Kamienna Jaskinia - sala 1": [
        "Jotun",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/kam_olbrzym-b.gif"
    ],
    "Głębokie Skałki p.4": [
        "Tollok Utumutu",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/tollok_jask_utumatu.gif"
    ],
    "Głębokie Skałki p.3": [
        "Tollok Atamatu",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/tollok_jask_atamatu.gif"
    ],
    "Krypty Dusz Śniegu p.2": [
        "Lisz",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/lisz_demilisze.gif"
    ],
    "Erem Czarnego Słońca p.5": [
        "Grabarz świątynny",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/nieu_mnich_grabarz.gif"
    ],
    "Firnowa Grota p.2": [
        "Wielka Stopa",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/wlochacze_wielka_stopa.gif"
    ],
    "Świątynia Andarum - zbrojownia": [
        "Podły Zbrojmistrz",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/magaz_zbrojmistrz.gif"
    ],
    "Wylęgarnia Choukkerów p.3": [
        "Choukker (p.3)",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/dlawiciel5.gif"
    ],
    "Kopalnia Margorii": [
        "Nadzorczyni krasnoludów",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/nadzorczyni_krasnoludow.gif"
    ],
    "Margoria - Sala Królewska": [
        "Morthen",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/krasnolud_boss.gif"
    ],
    "Zapomniany Święty Gaj p.2": [
        "Leśne Widmo",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/lesne_widmo.gif"
    ],
    "Grota Samotnych Dusz p.6": [
        "Żelazoręki Ohydziarz",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/ugrape2.gif"
    ],
    "Kamienna Strażnica - Sala Chwały": [
        "Goplana",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/goplana.gif"
    ],
    "Zagrzybiałe Ścieżki p.3": [
        "Gnom Figlid",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/gnom_figlid.gif"
    ],
    "Dolina Centaurów": [
        "Centaur Zyfryd",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/cent-zyfryd.gif"
    ],
    "Las Dziwów": [
        "Kambion",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/kambion.gif"
    ],
    "Podziemia Zniszczonej Wieży p.5": [
        "Jertek Moxos",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/moloch-jertek.gif"
    ],
    "Zabłocona Jama p.2 - Sala Błotnistych Odmętów": [
        "Miłośnik rycerzy",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/blotniaki_milosnik_rycerzy.gif"
    ],
    "Zabłocona Jama p.2 - Sala Magicznego Błota": [
        "Miłośnik Magii",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/blotniaki_milosnik_magii.gif"
    ],
    "Zabłocona Jama p.2 - Sala Duszącej Stęchlizny": [
        "Miłośnik łowców",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/blotniaki_milosnik_lowcow.gif"
    ],
    "Skalne Cmentarzysko p.4": [
        "Łowca Czaszek (p.3)",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/alghul-czaszka-1a.gif"
    ],
    "Piramida Pustynnego Władcy p.3": [
        "Ozirus Władca Hieroglifów",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/mumia-ozirus.gif"
    ],
    "Jama Morskiej Macki p.1 - sala 3": [
        "Morski potwór",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/mumia-ozirus.gif"
    ],
    "Chata wójta Fistuły p.1": [
        "Wójt Fistuła",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/goral05.gif"
    ],
    "Wyspa Rem": [
        "Krab pustelnik",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/krab_big3.gif"
    ],
    "Kryształowa Grota p.2 - sala 2": [
        "Królowa Śniegu",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/krolowa-sniegu.gif"
    ],
    "Babi Wzgórek": [
        "Teściowa Rumcajsa",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/goral08.gif"
    ],
    "Wulkan Politraki p.1 - sala 3": [
        "Ifryt",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/magradit_ifryt.gif"
    ],
    "Ukryta Grota Morskich Diabłów - magazyn": [
        "Młody Jack Truciciel",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/pirat01.gif"
    ],
    "Piaszczysta Grota p.1 - sala 1": [
        "Eol",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/pirat01.gif"
    ],
    "Ukryta Grota Morskich Diabłów - siedziba": [
        "Helga Opiekunka Rumu",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/pirat-2b.gif"
    ],
    "Ukryta Grota Morskich Diabłów - skarbiec": [
        "Henry Kaprawe Oko",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e1/pirat5b.gif"
    ],
    "Grota Orczej Hordy p.2 s.3": [
        "Burkog Lorulk",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/orkczd.gif"
    ],
    "Grota Orczych Szamanów p.3 s.1": [
        "Sheba Orcza Szamanka",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/r_orc_sheba.gif"
    ],
    "Kopalnia Żółtego Kruszcu p.2 - sala 1": [
        "Grubber Ochlaj",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/grubber-ochlaj.gif"
    ],
    "Grobowiec Przodków": [
        "Berserker Amuno",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/amuno.gif"
    ],
    "Piaskowa Pułapka - Grota Piaskowej Śmierci": [
        "Stworzyciel",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/stworzyciel.gif"
    ],
    "Mała Twierdza - sala główna": [
        "Fodug Zolash",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/fodug_zolash.gif"
    ],
    "Kuźnia Worundriela p.7 - sala 4": [
        "Mistrz Worundriel",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/worundriel02.gif"
    ],
    "Lokum Złych Goblinów": [
        "Goons Asterus",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/mechgoblin4.gif"
    ],
    "Laboratorium Adariel": [
        "Adariel",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/tri_adariel.gif"
    ],
    "Nawiedzone Kazamaty p.4": [
        "Duch Władcy Klanów",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/duch_wladcy_kl.gif"
    ],
    "Ogrza Kawerna p.3": [
        "Ogr Stalowy Pazur",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/ogr_drapak.gif"
    ],
    "Sala Rady Orków": [
        "Ziuggrael Strażnik Królowej",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/praork_woj_elita.gif"
    ],
    "Sala Królewska": [
        "Lusgrathera Królowa Pramatka",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/prakrolowa.gif"
    ],
    "Wyspa Ingotia": [
        "Borgoros Garamir III",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/minotaur-elita.gif"
    ],
    "Drzewo Dusz p.1": [
        "Chryzoprenia",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/chryzoprenia.gif"
    ],
    "Grota Arbor s.2": [
        "Cerasus",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/drzewoe2.gif"
    ],
    "Zalana Grota": [
        "Czempion Furboli",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/forbol03.gif"
    ],
    "Krypty Bezsennych p.3": [
        "Torunia Ankelwald",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/thuz-patr1.gif"
    ],
    "Przysiółek Valmirów": [
        "Breheret Żelazny Łeb",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/draki-breheret-1b.gif"
    ],
    "Szlamowe Kanały": [
        "Mysiur Myświórowy Król",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/krolszczur.gif"
    ],
    "Przerażające Sypialnie": [
        "Sadolia Nadzorczyni Hurys",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/sekta-sadolia.gif"
    ],
    "Tajemnicza Siedziba": [
        "Annaniel Wysysacz Marzeń",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/sekta-annaniel.gif"
    ],
    "Sala Spowiedzi Konających": [
        "Sataniel Skrytobójca",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/sekta-sataniel.gif"
    ],
    "Sale Rozdzierania": [
        "Bergermona Krwawa Hrabina",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/sekta-bergermona.gif"
    ],
    "Sala Tysiąca Świec": [
        "Zufulus Smakosz Serc",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/sekta-zufulus.gif"
    ],
    "Ołtarz Pajęczej Bogini": [
        "Marlloth Malignitas",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/marlloth.gif"
    ],
    "Grota Błotnej Magii": [
        "Mocny Maddoks",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/maddok5.gif"
    ],
    "Arachnitopia p.5": [
        "Arachniregina Colosseus",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/regina-e2.gif"
    ],
    "Jaszczurze Korytarze p.4 - sala 3": [
        "Pancerny Maddok",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/maddok_roz.gif"
    ],
    "Krzaczasta Grota - korytarz": [
        "Silvanasus",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/silvanasus.gif"
    ],
    "Jaskinia Korzennego Czaru p.1 - sala 1": [
        "Dendroculus",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/dendroculus.gif"
    ],
    "Złota Góra p.2 sala 1": [
        "Tolypeutes",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/bolita.gif"
    ],
    "Niecka Xiuh Atl": [
        "Cuaitl Citlalin",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/maho-cuaitl.gif"
    ],
    "Potępione Zamczysko - sala ofiarna": [
        "Pogardliwa Sybilla",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/tri2_witch_e2.gif"
    ],
    "Zachodni Mictlan p.9": [
        "Yaotl",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/mahoplowca.gif"
    ],
    "Wschodni Mictlan p.9": [
        "Quetzalcoatl",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/quetzalcoatl.gif"
    ],
    "Katakumby Gwałtownej Śmierci": [
        "Chopesz",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/chopesh2.gif"
    ],
    "Grobowiec Seta": [
        "Neferkar Set",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/szkiel_set.gif"
    ],
    "Urwisko Vapora": [
        "Terrozaur (urwisko)",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/terrorzaur_pus.gif"
    ],
    "Jaskinia Smoczej Paszczy p.2": [
        "Terrozaur (jaskinia)",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/terrorzaur_pus.gif"
    ],
    "Świątynia Hebrehotha - sala ofiary": [
        "Vaenra Charkhaam",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/bar_smoczyca.gif"
    ],
    "Świątynia Hebrehotha - sala czciciela": [
        "Chaegd Agnrakh",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/bar_smokoszef.gif"
    ],
    "Drzewo Życia p.2": [
        "Nymphemonia",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/nymphemonia.gif"
    ],
    "Sala Lodowej Magii": [
        "Artenius",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/wl-mrozu03.gif"
    ],
    "Sala Mroźnych Strzał": [
        "Furion",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/wl-mrozu02.gif"
    ],
    "Sala Mroźnych Szeptów": [
        "Zorin",
        "https://micc.garmory-cdn.cloud/obrazki/npc/e2/wl-mrozu01.gif"
    ],
    // TYTAN
    "Mroczna Pieczara p.0": [
        "Dziewicza Orlica",
        "https://micc.garmory-cdn.cloud/obrazki/npc/tyt/dziewicza_orlica.gif"
    ],
    "Grota Caerbannoga": [
        "Zabójczy Królik",
        "https://micc.garmory-cdn.cloud/obrazki/npc/tyt/zabojczy_krolik.gif"
    ],
    "Bandyckie Chowisko": [
        "Renegat Baulus",
        "https://micc.garmory-cdn.cloud/obrazki/npc/tyt/renegat_baulus.gif"
    ],
    "Wulkan Politraki - przedsionek": [
        "Piekielny Arcymag",
        "https://micc.garmory-cdn.cloud/obrazki/npc/tyt/archdemon.gif"
    ],
    "Sala Goblińskich Narad": [
        "Versus Zoons",
        "https://micc.garmory-cdn.cloud/obrazki/npc/tyt/titangoblin.gif"
    ],
    "Jaskinia Ulotnych Wspomnień": [
        "Łowczyni Wspomnień",
        "https://micc.garmory-cdn.cloud/obrazki/npc/tyt/lowcz-wspo-driady.gif"
    ],
    "Więzienie Demonów": [
        "Przyzywacz Demonów",
        "https://micc.garmory-cdn.cloud/obrazki/npc/tyt/przyz_demon_sekta.gif"
    ],
    "Grota Jaszczurzych Koszmarów p.2": [
        "Maddok Magua",
        "https://micc.garmory-cdn.cloud/obrazki/npc/tyt/maddok-tytan.gif"
    ],
    "Topan p.13": [
        "Tezcatlipoca",
        "https://micc.garmory-cdn.cloud/obrazki/npc/tyt/tezcatlipoca.gif"
    ],
    "Pustynia Shaiharrud - wschód": [
        "Barbatos Smoczy Strażnik",
        "https://micc.garmory-cdn.cloud/obrazki/npc/tyt/hebrehoth_smokoludzie.gif"
    ],
    "Przejście Władców Mrozu": [
        "Tanroth",
        "https://micc.garmory-cdn.cloud/obrazki/npc/tyt/ice_king.gif"
    ],
    // KOLOS
    "Pradawne Wzgórze Przodków": [
        "Mamlambo",
        "https://micc.garmory-cdn.cloud/obrazki/npc/kol/mamlambo_final2.gif"
    ],
    "Pieczara Szaleńców - przedsionek": [
        "Regulus Mętnooki",
        "https://micc.garmory-cdn.cloud/obrazki/npc/kol/bazyliszek.gif"
    ],
    "Podmokłe leże - przedsionek": [
        "Umibozu",
        "https://micc.garmory-cdn.cloud/obrazki/npc/kol/kolos-wodnik.gif"
    ],
    "Skały Mroźnych Śpiewów": [
        "Amaimon Soploręki",
        "https://micc.garmory-cdn.cloud/obrazki/npc/kol/soploreki.gif"
    ],
    "Czeluść Chimerycznej Natury - przedsionek": [
        "Hydrokora Chimeryczna",
        "https://micc.garmory-cdn.cloud/obrazki/npc/kol/hydrokora.gif"
    ],
    "Jezioro Ważek": [
        "Vashkar",
        "https://micc.garmory-cdn.cloud/obrazki/npc/kol/kolos-wazka.gif"
    ],
    "Grobowiec Przeklętego Krakania - przedsionek": [
        "Lulukav",
        "https://micc.garmory-cdn.cloud/obrazki/npc/kol/kolkrucz.gif"
    ],
    "Grota Przebiegłego Tkacza - przedsionek": [
        "Arachin Podstępny",
        "https://micc.garmory-cdn.cloud/obrazki/npc/kol/kolos-pajak.gif"
    ],
    "Grota Martwodrzewów - przedsionek": [
        "Reuzen",
        "https://micc.garmory-cdn.cloud/obrazki/npc/kol/kolos-dendro.gif"
    ],
    "Katakumby Krwawych Wypraw": [
        "Wernoradzki Drakolisz",
        "https://micc.garmory-cdn.cloud/obrazki/npc/kol/kolos-drakolisz.gif"
    ],
};

function loadItemImage(url) {
  const $newImg = document.createElement("img");
  $newImg.src = url;
  $newImg.classList.add("priw8-item-overlay");
  return new Promise(resolve => {
    $newImg.addEventListener("load", () => {
      let w = $newImg.width, h = $newImg.height;
      if (h > 32) {
        w = w * (32 / h);
        h = 32;
      }
      if (w > 32) {
        h = h * (32 / w);
        w = 32;
      }
      const offset = (32 - w) / 2;
      $newImg.width = w;
      $newImg.height = h;
      $newImg.style.left = `${offset}px`;
      $newImg.style.display = "block";

      resolve($newImg);
    });
  });
}

async function appendItemOverlay(id, url) {
  const $it = document.querySelector(`.item-id-${id}`);
  if ($it && !$it.querySelector(".priw8-item-overlay")) {
    $it.classList.add("priw8-item-small-icon");
    const $newImg = await loadItemImage(url);
    $newImg.style.position = "absolute";
    $newImg.zIndex = 1;
    const $canv = $it.querySelector("canvas");
    $canv.parentElement.appendChild($newImg);
  }
}

const drawStonesLabels = () => {
  const dragonStones = fetchDragonStones();

  dragonStones.forEach((stone) => {
    const mapName = getMapName(stone._cachedStats);

    if (STONES_MAP.hasOwnProperty(mapName)) {
      const [monsterName, imageUrl] = STONES_MAP[mapName];
      const monsterElement = $(".cll-timer-monster").filter(function () {
        return $(this).text().trim() === monsterName;
      });

      if (monsterElement.length > 0) {
        const timerElement = monsterElement.siblings(".cll-timer-time");
        const timeText = timerElement.text().trim();

        const existingLabel = $(`.item-id-${stone.id} .stone-label`);
        if (existingLabel.length > 0) {
          existingLabel.text(timeText);
        } else if (timeText) {
          const label = $(`<div class="stone-label">${timeText}</div>`);
          $(`.item-id-${stone.id}`).append(label);
        }
      } else {
        $(`.item-id-${stone.id} .stone-label`).remove();
      }

      if (imageUrl && stone._cachedStats.hasOwnProperty("timelimit")) { // usunąć && stone._cachedStats.hasOwnProperty("timelimit") dla grafik na teleportach z użyciami
        appendItemOverlay(stone.id, imageUrl);
      }
    }
  });
};

const fetchDragonStones = () => {
  const allItems = Engine.items.fetchLocationItems("g");
  return allItems.filter((item) => {
    return item._cachedStats.hasOwnProperty("custom_teleport") || item._cachedStats.hasOwnProperty("teleport");
  });
};

const getMapName = (stats) => {
  const teleportStat = stats.custom_teleport || stats.teleport;
  if (teleportStat) {
    const parts = teleportStat.split(",");
    return parts[parts.length - 1].trim();
  }
  return null;
};

const setupCSS = () => {
  const style = $(`<style>.stone-label {
      position: absolute;
      top: 20px;
      height: 16px;
      width: 32px;
      text-align: center;
      color: white;
      pointer-events: none;
      text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
      font-size: 0.55rem;
      z-Index: 1000;
  }
  .priw8-item-small-icon canvas.canvas-icon {
      width: 20px;
      height: 20px;
      top: 12px;
      z-index: 1;
  }
  .priw8-item-small-icon .amount, .priw8-item-small-icon .cooldown {
      z-index: 2;
  }
  </style>`);
  $("body").append(style);
};

(function () {
  const init = () => {
    try {
      if (!Engine.interface.getAlreadyInitialised()) {
        setTimeout(init, 500);
        return;
      }
    } catch (error) {
      setTimeout(init, 500);
    }

    setupCSS();
    drawStonesLabels();
    setInterval(drawStonesLabels, 1000);
  };

  init();
})();
