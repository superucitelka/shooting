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

/*******************************************************************************************/
/* cross - objekt záměrného kříže */
let cross = {
    /* Atributy objektu */
    /* x, y - souřadnice středu kříže */
    x: canvas.width / 2,
    y: canvas.width / 2,
    /* shift - maximální rychlost pohybu kříže */
    shift: 10,
    /* sensitivity - citlivost ovládání kříže z klávesnice */
    sensitivity: 3,   

    /* Metody objektu */
    /* init() - inicializace kříže do počáteční polohy */
    init: function() {
        this.x = canvas.width / 2;
        this.y = canvas.width / 2 + 150;
    },

    /* shake() - simulace roztřesení ruky - náhodný pohyb kříže */
    shake: function() {
        this.x += Math.round(Math.random() * 2 * this.shift) - this.shift;
        this.y += Math.round(Math.random() * 2 * this.shift) - this.shift;     
    },

    /* paint() - vykreslení kříže na plátno */
    paint: function() {
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.moveTo(this.x-10, this.y);
        ctx.lineTo(this.x+10, this.y);
        ctx.moveTo(this.x, this.y-10);
        ctx.lineTo(this.x, this.y+10);
        ctx.stroke();
    }
}

// Test objektů target a cross
target.paint();
cross.init();
cross.shift = 50;
cross.shake();
console.log(cross);
cross.paint();

/*******************************************************************************************/
/* Player - objekt hráče */
function Player(name) {
    /* Atributy objektu */
    /* name - jméno hráče */
    this.name = name,
    /* shots - pole s hodnotami jednotlivých ran */
    this.shots = [],

    /* Metody objektu */
    /* sum() - součet všech ran */
    this.sum = function() {
        let suma = 0;
        this.shots.forEach((shot) => {
            suma += shot.result;
        })
        console.log()
        return suma.toFixed(1);
    }, 

    /* avg() - průměr všech ran */
    this.avg = function() {
        return (this.sum() / this.shots.length).toFixed(2);
    } 
}

// Test objektu Player
let myplayer = new Player(prompt('Zadej jméno hráče: '));
myplayer.shots.push(5.8);
myplayer.shots.push(8);
myplayer.shots.push(7);
console.log(myplayer);

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
