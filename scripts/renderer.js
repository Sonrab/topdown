function CRenderer()
{
    //console.log(this);
    this.foregroundQueue = [];
    this.backgroundQueue = [];

};

var TimeNowR = 0;
var FPSR = 0;
var countR = 0;






CRenderer.prototype.renderScreen = function()
{
    //can not use "this" here due to animationframe hijacking "this"-keyword
    renderer.renderMain();
    for(let i = 0; i < objectList.length; i++)
        objectList[i].render();

    renderer.renderProjectiles();
    renderer.renderForeground();
    // if(!player.behindForeground)
    ctx.globalAlpha = mapHandler.foregroundAlpha;
        mapHandler.map.renderForeground();

    //console.log(mapHandler.foregroundAlpha);
    ctx.globalAlpha = 1.0;
    //player.renderHealth();
    userInterface.render();

    if(Date.now() >= TimeNowR)
    {
        TimeNowR = Date.now() + 1000;
        FPSR = countR;
        countR = 0;
    }
    countR++;
    requestAnimationFrame(renderer.renderScreen);
};

// function drawRotated(degrees){
//     context.clearRect(0,0,canvas.width,canvas.height);

//     // save the unrotated context of the canvas so we can restore it later
//     // the alternative is to untranslate & unrotate after drawing
//     context.save();

//     // move to the center of the canvas
//     context.translate(canvas.width/2,canvas.height/2);

//     // rotate the canvas to the specified degrees
//     context.rotate(degrees*Math.PI/180);

//     // draw the image
//     // since the context is rotated, the image will be rotated also
//     context.drawImage(image,-image.width/2,-image.width/2);

//     // we’re done with the rotating so restore the unrotated context
//     context.restore();
// }



//CChest.prototype.toggleRenderContent = function()
CRenderer.prototype.renderMain = function()
{
    this.clearScreen();
    mapHandler.map.render();
    player.render();
    if(player.bomb !== false)
        player.bomb.render();
};


CRenderer.prototype.clearScreen = function()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // canvas.height = canvas.height;
    // canvas.width = canvas.width;
};

CRenderer.prototype.renderForeground = function()
{
    for(let i = 0; i < this.foregroundQueue.length; i++)
        ctx.drawImage(...this.foregroundQueue[i]);

    this.foregroundQueue = [];
};



CRenderer.prototype.renderProjectiles = function()
{
    for(let i = 0; i < projectiles.length; i++)
    {
        projectiles[i].render();
    }
}