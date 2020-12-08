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

/*******************************************************************************************/
/* Objekt hry - střelecké soutěže */
let game = {
    /* Atributy objektu */
    /* players - pole s uloženými hráči */
    players: [],
    /* maxShots - maximální počet ran */
    maxShots: 10,
    /* activePlayer - pro uložení objektu aktivního hráče */
    activePlayer: null, 
    /* timer - nastavení časovače */
    timer: null,

    /* Metody objektu */
    /* play() - spuštění hry */
    play: function() {
        // Deaktivace tlačítka Nová hra
        // Nastavení parametrů hry, terče a kříže podle hodnot zadaných do formuláře 
        // Inicializace kříže - nastavení na počíteční souřadnice
        cross.init();
        // Vytvoření nového hráče (zadání jména) a jeho uložení jako aktivního hráče
        this.activePlayer = new Player(prompt('Zadej jméno hráče'));
        // Spuštění časovače:
        this.timer = setInterval(() => {
            // * pravidelné překreslování plátna
            this.repaint();
            // * kontrola ukončení hry - hráč dosáhne maximálního počtu ran
            if (this.activePlayer.shots.length >= this.maxShots) this.stop();
        }, 20);
    },

    /* stop() - zastavení hry */
    stop: function() {
        // Zastavení a vynulování časovače
        // Vyčištění plátna
        // Vypsání celkových výsledků aktivního hráče
        // Přidání záznamu (objektu) aktivního hráče do pole všech hráčů
        // Vynulování objektu aktivního hráče
        // Vypsání výsledkové listiny
        // Aktivace tlačítka Nová hra
    },    

    /* repaint() - překreslení celého plátna */
    repaint: function() {
        // Vyčištění plátna
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Vykreslení terče
        target.paint();
        // "Roztřesení" (náhodný přesun) záměrného kříže
        cross.shake();
        // Vykreslení kříže
        cross.paint();
        // Vypsání průběžných výsledků aktivního hráče:
        // * výpis jména hráče
        // * výpis všech dosud zaznamenaných ran
    },

    /* resultList() - vypsání výsledků */
    resultList: function() {    
        // Seřazení hráčů podle součtů všech ran do výsledkové listiny - list 
        // Vymazání bloku s výsledky a vypsání výsledkové listiny
    }    
}

/*******************************************************************************************/
/* Ošetření události stisknutí klávesy v okně stránky */
document.addEventListener('keydown', function(event){
    // Je-li právě nějaký hráč aktivní, proběhne reakce na stisknutou klávesu 
    if (game.activePlayer) {
        // V případě, že v události odchycený kód klávesy odpovídá:
        switch (event.code) {
            // šipka nahoru: posun kříže záporným směrem v ose y
            case 'ArrowUp': cross.y -= cross.sensitivity;
                break;
            // šipka dolů: posun kříže kladným směrem v ose y
            case 'ArrowDown': cross.y += cross.sensitivity;
                break;
            // šipka doleva: posun kříže záporným směrem v ose x
            case 'ArrowLeft': cross.x -= cross.sensitivity;
                break;
            // šipka doprava: posun kříže kladným směrem v ose x
            case 'ArrowRight': cross.x += cross.sensitivity;
                break;
            // mezerník: symbolický výstřel - výpočet umístění rány, uložení do statistiky hráče, nastavení kříže do počáteční polohy
            case 'Space': 
                let a = Math.abs(cross.x - canvas.width / 2);
                let b = Math.abs(cross.y - canvas.height / 2);
                var result = target.circles - Math.pow(a ** 2 + b ** 2, 1/2) / target.gap;                     
                game.activePlayer.shots.push({x: cross.x, y: cross.y, result: result});
                cross.init();     
                break;        
        }
        // Test 
        console.log(game.activePlayer);
    }
});

/*******************************************************************************************/
/* Ošetření události kliknutí na tlačítko Nová hra */
    // Spuštění hry
    game.play();
