

class Renderer
{
    constructor() 
    {
        this.foregroundQueue = [];
        this.backgroundQueue = [];
        this.renderQueue = [];

        //this.init();
    }

    
    renderScene()
    {
        //can not use "this" here due to animationframe hijacking "this"-keyword
        renderer.clearScene();

        ctx.setTransform(1, 0, 0, 1, 0, 0); //Reset all transforms back to default. This means scaling and the changes in x and y
        ctx.translate(-player.camera.x*game.scaling.x, -player.camera.y*game.scaling.y); //translate the context to include what the camera sees
        ctx.scale(game.scaling.x, game.scaling.y); //scale all drawing according to the game scaling

        //draw the buffered map as a complete map image
        //This needs to be fixed, as of now I believe it draws the full map. Needs to cut the section currently in view from the buffer and draw to ordinary canvas
        ctx.drawImage(mapBuffer, 0, 0);

        game.currentMap.render();

        //player.render();

        player.cursor.render();

        renderer.renderProjectiles();
        renderer.renderForeground();
        // if(!player.behindForeground)
        game.currentMap.renderForeground();
        userInterface.render();
        
        // ctx.strokeRect(player.x, player.y, player.width, player.height);
        requestAnimationFrame(renderer.renderScene);
    }

    clearScene()
    {
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.clearRect(player.camera.x, player.camera.y, canvas.width, canvas.height);
    }

    renderForeground()
    {
        for(let i = 0; i < this.foregroundQueue.length; i++)
        ctx.drawImage(...this.foregroundQueue[i]);

    this.foregroundQueue = [];
    }

    renderProjectiles()
    {
        for(let i = 0; i < g_projectiles.length; i++)
        {
            g_projectiles[i].render();
        }
    }
}

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
