 // Creates the box that my game will be playable in
// var canvas = {
//     background : document.getElementById('background_canvas'),
//     main : document.getElementById('canvas'),
//     foreground : document.getElementById('foreground_canvas')
// };

// var ctx = {
//     background : canvas.background.getContext('2d'),
//     main : canvas.main.getContext('2d'),
//     foreground : canvas.foreground.getContext('2d')
// }
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var canvasBoundingRect = canvas.getBoundingClientRect();

var backgroundMusic = document.getElementById('backgroundMusic');


// var UI_canvas = document.getElementById('user_interface_canvas');
// var UI_ctx = UI_canvas.getContext('2d');
// UI_canvas.width = window.innerWidth;
// UI_canvas.height = window.innerHeight;



// document.addEventListener("fullscreenchange", function() {
//     alert("fullscreen");
//   });

//globals
g_projectiles = new Array();


//html output divs. Used for displaying boxes of text
const instructionTextbox = document.querySelector("#game-instruction-box");
const statscreenTextbox = document.querySelector("#game-statscreen-box");
const descriptionTextbox = document.querySelector("#game-description-box");

//global constants
const tileWidth = 32;
const imgPerRowTilesheet = 16;
const diagonalMovementMultiplier = 1/Math.sqrt(2);

var tilesheet = new Image();
tilesheet.src = "images/tilesheets/tilesheet_32.png";

var objectList = new Array();




window.addEventListener("resize", resizeWindow);
function resizeWindow()
{
    let mapsize = mapHandler.map.mapsize;
    if(mapsize.width > window.innerWidth)
        canvas.width = window.innerWidth; //offset scrollbar
    else
        canvas.width = mapsize.width;


    if(mapsize.height > window.innerHeight)
        canvas.height = window.innerHeight;
    else
        canvas.height = mapsize.height;

    player.camera.refreshViewport();
    //player.camera.viewport = {width : window.innerWidth/2, height : window.innerHeight/2};
}

var player, userInterface;
var mapHandler, tileHandler, musicHandler, gameloop, renderer, upgradeList;
var playerCamera;

var keysDown = {};

window.addEventListener('keydown', function(e) 
{ 
    if(game.isPaused && e.code != "Escape")
        return;
    keysDown[e.code] = true;
    // keysDown[e.keyCode] = true;
    checkKeyPress(e);
});

window.addEventListener('keyup', function(e) 
{
    checkKeyRelease(e);
    delete keysDown[e.code];
    
});

var mouse = {};
canvas.addEventListener("mousemove", function (e) {
    //store untranslated x & y to be able to retransform coords when moving camera without moving mouse
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    //let rect = canvas.getBoundingClientRect();
    //console.log(rect);

    //store mouse coords translated in relation to canvas translation
    //let transXY = getTransformedPoint(e.clientX, e.clientY);
    let transXY = getTransformedPoint(e.clientX - canvasBoundingRect.left, e.clientY - canvasBoundingRect.top);
    mouse.transX = transXY.x;
    mouse.transY = transXY.y;
});

//function to transform mousecoords to become relative to our scaling of the canvas
function getTransformedPoint(x, y) 
{
    const transform = ctx.getTransform();
    const invertedScaleX = 1 / transform.a;
    const invertedScaleY = 1 / transform.d;
  
    const transformedX = invertedScaleX * x - invertedScaleX * transform.e;
    const transformedY = invertedScaleY * y - invertedScaleY * transform.f;
  
    return { x: transformedX, y: transformedY };
}


canvas.addEventListener("click", function(event) {
    event.preventDefault();
    onMouseClick();
});

canvas.addEventListener("contextmenu", function(event) {
    event.preventDefault();
});
    

canvas.addEventListener("mousedown", function(event) {
    event.preventDefault();
    mouse.down = true;
});

canvas.addEventListener("mouseup", function(event) {
    event.preventDefault();
    mouse.down = false;
});

console.log(10 * Math.pow(1.2, 7));
var delta = 0;
var updateFrequence = 0;
function update(d) 
{
    delta = d;


    player.update();
    for(let i = 0; i < mapHandler.map.enemies.length; i++)
    {
        mapHandler.map.enemies[i].update();
    }

    for(let i = g_projectiles.length-1; i >= 0; i--)
    {
        
        g_projectiles[i].update(i);
    }
}

var TimeNow = 0;
var FPS = 0;
var count = 0;


var updateCounter = 0;
var updateStart = 0;
var lastUpdate = 0;
function run() 
{    
    currentTime = Date.now();
    
    updateStart = performance.now();
    update((updateStart - updateEnd) / (1000/game.targetFPS));
    if(Date.now() >= TimeNow)
    {
        TimeNow = Date.now() + 1000;
        FPS = count;
        count = 0;

    }
    count++;
    // debugOutput.innerHTML = "FPS: " + FPS;
    // debugOutput.innerHTML += "<br>FPS Render: " + FPSR;
    updateEnd = performance.now();
    lastUpdate = performance.now();

    // if(performance.now() - lastUpdate > 16)
    // {
    //     updateStart = performance.now();
    //     update((updateStart - updateEnd) / (1000/60));
    //     updateEnd = performance.now();
    //     lastUpdate = performance.now();
    // }
}
var currentTime;
var updateEnd;

var time;
var game = new Game();
window.addEventListener("load", function(){ //fires after full pageload including scripts and stylesheets
    game.setup();
    game.pause();
}, false);
