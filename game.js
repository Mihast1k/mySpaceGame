var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var aster = [];
var fire = [];
var timer = 0;
var ship = {x:300,y:300,animx:0,animy:0};
var lavels = 20;
var bullet = 20;
var complexity = 500;
var healthPoint = 3;
var menuPause = false;

window.score = 0;






var fon = new Image();
fon.src = 'resources/Backgrounds/backImage.gif';

var asterfon = new Image();
asterfon.src = 'resources/PNG/Meteors/meteorGrey_big1.png';

var fireimg = new Image();
fireimg.src = 'resources/PNG/Lasers/laserBlue05.png';

var shipimg = new Image();
shipimg.src = 'resources/PNG/playerShip1_blue.png';




canvas.addEventListener("mousemove", function(event){
    ship.x = event.offsetX-48;
    ship.y = event.offsetY-40;
})

fon.onload = function(){
    game(); 
}

document.addEventListener('keydown', function (e) {
    if(e.keyCode === 27) {
        var element = document.getElementById("popupClinet");
        pauseON();
    }
    if(e.keyCode === 13){
        var element = document.getElementById("popupClinet");
        continueButton();
    } 
});

function game(){
    render();
    update();
    requestAnimationFrame(game);
}

function update(){

    if (menuPause == false){
        timer++;

        if(timer % complexity == 0){
            lavels-= 3;
        }
        
    
        if(timer % lavels == 0){
            aster.push({
                x:Math.random()*1130,
                y:-70,
                dx:Math.random()*2-1,
                dy:Math.random()*2+2,
                del: 0});
        }
    //скорость выстрелов
        if(timer % bullet == 0){
            fire.push({x:ship.x + 90, y:ship.y + 0, dx: 0, dy: -15});
            fire.push({x:ship.x - 1, y:ship.y - 0, dx: 0, dy: -15});
        }
    
        for (i in fire){
            fire[i].x = fire[i].x + fire[i].dx;
            fire[i].y = fire[i].y + fire[i].dy;
    
            if (fire[i].y < -30){
                fire.splice(i,1);
            }
        }
    
        for(i in aster){ 
            aster[i].x+= aster[i].dx;
            aster[i].y+= aster[i].dy;
        
            if( aster[i].x >= 1130 ||  aster[i].x < 0){
                aster[i].dx =  -aster[i].dx;
            }
            if( aster[i].y >= 735){
                aster.splice(i,1);
                healthPoint--;
                document.getElementById("hp").innerText = String(healthPoint);
                if(healthPoint == 0){
                   
                    window.location.href = 'gameOver.html';
                }
    
            }
            
            for (j in fire){
                if(    Math.abs(aster[i].x + 35 - fire[j].x - 15) < 70 
                    && Math.abs(aster[i].y - fire[j].y) < 35 ){
    
                    aster[i].del = 1;
                    fire.splice(j,1); 
                    break;
    
                }
            }
    
            for(k in aster){
                if( Math.abs(aster[i].x + 35 - ship.x - 30) < 70 
                    && Math.abs(aster[i].y - ship.y) < 35 ){
                    aster[i].del = 1;
                    healthPoint--;
                    document.getElementById("hp").innerText = String(healthPoint);
                    if(healthPoint == 0){
                       
                        window.location.href = 'gameOver.html';
                    }
                    break;
                }
            }
    
            if (aster[i].del == 1){
                aster.splice(i,1);
                score += 10;
                localStorage.setItem('gameScore', score);
                document.getElementById("experience").innerText = String(score);
            }
        }
       
    }
    
}

function render(){

    context.drawImage(fon,0,0,1200,1000);
    context.drawImage(shipimg, ship.x, ship.y, 99, 75);

        for (i in fire){
            context.drawImage(fireimg,fire[i].x, fire[i].y,10,35);
        }
        for(i in aster){
            context.drawImage(asterfon,aster[i].x,aster[i].y,70,70);
        }
}

var requestAnimationFrame = (function(){
    
    return window.requestAnimationFrame ||
    window.mozRerequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback){
        window.setTimeout(callback,1080 / 20 );
    };

})();

function pauseON(){
    menuPause = true;
    document.getElementById('pauseMenu').style.display = 'block';
}

function exitButton(){
    document.getElementById('pauseMenu').style.display = 'none';
    window.location.href = 'menu.html';
}
    
function continueButton(){
    menuPause = false;
    // Здесь вы можете добавить код для продолжения игры
    document.getElementById('pauseMenu').style.display = 'none';
}
   
function lavel1(){
    window.location.href = 'index.html';
}
function lavel2(){
    window.location.href = 'index.html';
}
function lavel3(){
    window.location.href = 'index.html';
}

