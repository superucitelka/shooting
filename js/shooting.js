/* Konstanty odkazující na formulářové elementy */
/* Konstanta odkazující na výsledkovou část stránky */

/*******************************************************************************************/
/* Konstanta odkazující na element plátna */
const canvas = document.getElementById('canvas');
/* Konstanta obsahující grafický kontext */
const ctx = canvas.getContext('2d');

/*******************************************************************************************/
/* target - objekt terče */
let target = {
    /* Atributy objektu */
    /* circles - počet kruhů */
    circles: 10,
    /* gap - mezera mezi kruhy */
    gap: 20,    

    /* Metody objektu */
    /* paint() - metoda pro vykreslení terče na plátno */
    paint: function(){
        ctx.strokeStyle = 'black';
        ctx.font = '10px Arial';
        ctx.fillStyle = 'blue';
        for (var i = 1; i <= this.circles; i++) {
            ctx.beginPath();
            var r = (this.circles - i) * this.gap + this.gap;
            ctx.arc(canvas.width / 2, canvas.height / 2, r , 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fillText(i, canvas.width / 2 + r - 15, canvas.height / 2 + 5);
        }
    }
}

/* Test objektu target */
target.circles = 5;
target.gap = 30;
target.paint();


/*******************************************************************************************/
/* cross - objekt záměrného kříže */
    /* Atributy objektu */
    /* x, y - souřadnice středu kříže */
    /* shift - maximální rychlost pohybu kříže */
    /* sensitivity - citlivost ovládání kříže z klávesnice */

    /* Metody objektu */
    /* init() - inicializace kříže do počáteční polohy */
    /* shake() - simulace roztřesení ruky - náhodný pohyb kříže */
    /* paint() - vykreslení kříže na plátno */

/*******************************************************************************************/
/* Player - objekt hráče */
    /* Atributy objektu */
    /* name - jméno hráče */
    /* shots - pole s hodnotami jednotlivých ran */

    /* Metody objektu */
    /* sum() - součet všech ran */
    /* avg() - průměr všech ran */

/*******************************************************************************************/
/* Objekt hry - střelecké soutěže */
    /* Atributy objektu */
    /* players - pole s uloženými hráči */
    /* maxShots - maximální počet ran */
    /* activePlayer - pro uložení objektu aktivního hráče */
    /* timer - nastavení časovače */

    /* Metody objektu */
    /* play() - spuštění hry */
        // Deaktivace tlačítka Nová hra
        // Nastavení parametrů hry, terče a kříže podle hodnot zadaných do formuláře 
        // Inicializace kříže - nastavení na počíteční souřadnice
        // Vytvoření nového hráče (zadání jména) a jeho uložení jako aktivního hráče
        // Spuštění časovače:
            // * pravidelné překreslování plátna
            // * kontrola ukončení hry - hráč dosáhne maximálního počtu ran

    /* stop() - zastavení hry */
        // Zastavení a vynulování časovače
        // Vyčištění plátna
        // Vypsání celkových výsledků aktivního hráče
        // Přidání záznamu (objektu) aktivního hráče do pole všech hráčů
        // Vynulování objektu aktivního hráče
        // Vypsání výsledkové listiny
        // Aktivace tlačítka Nová hra

    /* repaint() - překreslení celého plátna */
        // Vyčištění plátna
        // Vykreslení terče
        // "Roztřesení" (náhodný přesun) záměrného kříže
        // Vykreslení kříže
        // Vypsání průběžných výsledků aktivního hráče:
        // * výpis jména hráče
        // * výpis všech dosud zaznamenaných ran

    /* resultList() - vypsání výsledků */
        // Seřazení hráčů podle součtů všech ran do výsledkové listiny - list 
        // Vymazání bloku s výsledky a vypsání výsledkové listiny

/*******************************************************************************************/
/* Ošetření události stisknutí klávesy v okně stránky */
    // Je-li právě nějaký hráč aktivní, proběhne reakce na stisknutou klávesu 
        // V případě, že v události odchycený kód klávesy odpovídá:
            // * šipka nahoru: posun kříže záporným směrem v ose y
            // * šipka dolů: posun kříže kladným směrem v ose y
            // * šipka doleva: posun kříže záporným směrem v ose x
            // * šipka doprava: posun kříže kladným směrem v ose x
            // * mezerník: symbolický výstřel - výpočet umístění rány, uložení do statistiky hráče, nastavení kříže do počáteční polohy

/*******************************************************************************************/
/* Ošetření události kliknutí na tlačítko Nová hra */
    // Spuštění hry
