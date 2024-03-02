const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const mapBuffer = document.createElement('canvas');
const mapBufferCtx = mapBuffer.getContext('2d');

function updateBufferSize(mapsize)
{
    mapBuffer.width = mapsize.width;
    mapBuffer.height =  mapsize.height;
}

function resizeCanvas(width, height)
{
    canvas.width = width;
    canvas.height = height;
    ctx.imageSmoothingEnabled = false; //ctx state is reset after canvas reset so this needs to be set to false on every canvas resize
}

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
// const instructionTextbox = document.querySelector("#game-instruction-box");
// const statscreenTextbox = document.querySelector("#game-statscreen-box");
// const descriptionTextbox = document.querySelector("#game-description-box");

//global constants
const tileWidth = 32;
const imgPerRowTilesheet = 16;
const diagonalMovementMultiplier = 1/Math.sqrt(2);


var objectList = new Array();




window.addEventListener("resize", resizeWindow);
function resizeWindow()
{
    let mapsize = game.currentMap.mapsize;
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

// canvas.addEventListener("mouseup", function(event) {
//     event.preventDefault();
//     mouse.down = false;
// });

document.addEventListener("mouseup", function(event) {
    event.preventDefault();
    mouse.down = false;
});


var delta = 0;
var updateFrequence = 0;


var TimeNow = 0;
var FPS = 0;
var count = 0;


var updateCounter = 0;
var updateStart = 0;
var lastUpdate = 0;

var currentTime;
var updateEnd;

var time;
var game = new Game();
window.addEventListener("load", function(){ //fires after full pageload including scripts and stylesheets
    game.setup();
    game.pause();
}, false);
