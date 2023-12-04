var bombimg = new Image();
bombimg.src = "images/bomb_mine.png";

function CBomb ()
{
    //this.timerLength = 3000;
    this.height = 32;
    this.width = 32;
    this.img = bombimg;
    this.x = player.x + (player.width/2) - (this.width/2);
    this.y = player.y + player.height/2 - this.height/2;
    //this.frames = this.initFrames();
    //this.explosionFrames = this.initExplosionFrames();
    //this.explosionFrames = explosionFrames;
    this.currentExplosionFrame = 0;
    this.currentFrame = 0;
    this.blastRange = 50;
    this.animationFrames = 9;
    this.anim = 1;
    this.hasExploded = false;
    this.timer = function()
    {
        setTimeout(() => {
            this.currentFrame++;
            if(this.currentFrame >= bombFramesLen)    
                this.explode();
            else
                this.timer();
        }, bombFrames[this.currentFrame].duration);
    }

    this.explode = function()
    {
        //get center of bomb
        let bombCenterX = this.x + this.width/2;
        let bombCenterY = this.y + this.height/2;

        
        //bomb blows tiles in a 3x3 grid around the bomb
        //start by getting the topleft tile of that 3x3 grid and then loop through all positions and look for bombable tiles
        let gridX = Math.floor(bombCenterX / tileWidth) -1;
        let gridY = Math.floor(bombCenterY / tileWidth) -1;
        for(let i = 0; i < 3; i++)
        {
            for(let j = 0; j < 3; j++)
            {
                if(!mapHandler.map.grid[gridY+i] || !mapHandler.map.grid[gridY+i][gridX+j] || !mapHandler.map.grid[gridY+i][gridX+j][1])
                    continue;
                
                if(tileHandler.getTileById(mapHandler.map.grid[gridY+i][gridX+j][1]).bombable)
                    mapHandler.map.grid[gridY+i][gridX+j][1] = 0;
            }
        }

        playerCenterX = player.x + (player.width/2);
        playerCenterY = player.y + (player.height/2);
        if(playerCenterX > bombCenterX - this.blastRange && playerCenterX < bombCenterX + this.blastRange
        && playerCenterY > bombCenterY - this.blastRange && playerCenterY < bombCenterY + this.blastRange)
        {
            player.takeDmg(1);
        }

        let enemies = mapHandler.map.enemies;
        for(let i = enemies.length-1; i >= 0; i--)
        {
            let enemy = enemies[i];
            // console.log(enemy);
            let enemyCenterX = enemy.x + (enemy.width/2);
            let enemyCenterY = enemy.y + (enemy.height/2);
            if(enemyCenterX > bombCenterX - this.blastRange && enemyCenterX < bombCenterX + this.blastRange
            && enemyCenterY > bombCenterY - this.blastRange && enemyCenterY < bombCenterY + this.blastRange)
            {
                enemy.takeDmg(1);
            }
        }


        this.hasExploded = true;
        this.updateExplosionFrame();
        // setTimeout(() => {
        //     //player.bomb = false;
        //     objectList.splice(this, 1);
        // }, 300);
        
    }
}

CBomb.prototype.updateExplosionFrame = function()
{
    setTimeout(() => {
        this.currentExplosionFrame++;
        if(this.currentExplosionFrame >= explosionFramesLen)
            objectList.splice(this, 1);
        else
            this.updateExplosionFrame();
    }, explosionFrames[this.currentExplosionFrame].duration);
};

var explosionimg = new Image();
explosionimg.src = "images/explosion.png";


CBomb.prototype.render = function()
{
    if(this.hasExploded)
    {
        let frame = explosionFrames[this.currentExplosionFrame].frame;
        //console.log(exp);
        renderer.foregroundQueue.push([explosionimg, frame.x, frame.y, frame.w, frame.h, (this.x+(this.width/2)) - frame.w/2, this.y-this.height*2, frame.w, frame.h]);
        console.log("asd");
    }
       
    else
    {
        let frame = bombFrames[this.currentFrame].frame;
        renderer.foregroundQueue.push([this.img, frame.x, frame.y, frame.w, frame.h, this.x, this.y, frame.w, frame.h]);
    }
        
}


const explosionFrames = [
    {
        "filename": "explosion",
        "frame": { "x": 0, "y": 0, "w": 128, "h": 128 },
        "rotated": false,
        "trimmed": false,
        "spriteSourceSize": { "x": 0, "y": 0, "w": 128, "h": 128 },
        "sourceSize": { "w": 128, "h": 128 },
        "duration": 60
    },
    {
        "filename": "explosion",
        "frame": { "x": 128, "y": 0, "w": 128, "h": 128 },
        "rotated": false,
        "trimmed": false,
        "spriteSourceSize": { "x": 0, "y": 0, "w": 128, "h": 128 },
        "sourceSize": { "w": 128, "h": 128 },
        "duration": 60
    },
    {
        "filename": "explosion",
        "frame": { "x": 256, "y": 0, "w": 128, "h": 128 },
        "rotated": false,
        "trimmed": false,
        "spriteSourceSize": { "x": 0, "y": 0, "w": 128, "h": 128 },
        "sourceSize": { "w": 128, "h": 128 },
        "duration": 60
    },
    {
        "filename": "explosion",
        "frame": { "x": 384, "y": 0, "w": 128, "h": 128 },
        "rotated": false,
        "trimmed": false,
        "spriteSourceSize": { "x": 0, "y": 0, "w": 128, "h": 128 },
        "sourceSize": { "w": 128, "h": 128 },
        "duration": 60
    },
    {
        "filename": "explosion",
        "frame": { "x": 512, "y": 0, "w": 128, "h": 128 },
        "rotated": false,
        "trimmed": false,
        "spriteSourceSize": { "x": 0, "y": 0, "w": 128, "h": 128 },
        "sourceSize": { "w": 128, "h": 128 },
        "duration": 60
    },
    {
        "filename": "explosion",
        "frame": { "x": 640, "y": 0, "w": 128, "h": 128 },
        "rotated": false,
        "trimmed": false,
        "spriteSourceSize": { "x": 0, "y": 0, "w": 128, "h": 128 },
        "sourceSize": { "w": 128, "h": 128 },
        "duration": 60
    },
    {
        "filename": "explosion",
        "frame": { "x": 768, "y": 0, "w": 128, "h": 128 },
        "rotated": false,
        "trimmed": false,
        "spriteSourceSize": { "x": 0, "y": 0, "w": 128, "h": 128 },
        "sourceSize": { "w": 128, "h": 128 },
        "duration": 60
    },
    {
        "filename": "explosion",
        "frame": { "x": 896, "y": 0, "w": 128, "h": 128 },
        "rotated": false,
        "trimmed": false,
        "spriteSourceSize": { "x": 0, "y": 0, "w": 128, "h": 128 },
        "sourceSize": { "w": 128, "h": 128 },
        "duration": 60
    }
];
const explosionFramesLen = explosionFrames.length;

const bombFrames = [
    {
     "filename": "bomb_mine0",
     "frame": { "x": 0, "y": 0, "w": 32, "h": 32 },
     "rotated": false,
     "trimmed": false,
     "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 32 },
     "sourceSize": { "w": 32, "h": 32 },
     "duration": 600
    },
    {
     "filename": "bomb_mine1",
     "frame": { "x": 32, "y": 0, "w": 32, "h": 32 },
     "rotated": false,
     "trimmed": false,
     "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 32 },
     "sourceSize": { "w": 32, "h": 32 },
     "duration": 600
    },
    {
     "filename": "bomb_mine2",
     "frame": { "x": 64, "y": 0, "w": 32, "h": 32 },
     "rotated": false,
     "trimmed": false,
     "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 32 },
     "sourceSize": { "w": 32, "h": 32 },
     "duration": 600
    },
    {
     "filename": "bomb_mine3",
     "frame": { "x": 96, "y": 0, "w": 32, "h": 32 },
     "rotated": false,
     "trimmed": false,
     "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 32 },
     "sourceSize": { "w": 32, "h": 32 },
     "duration": 600
    },
    {
     "filename": "bomb_mine4",
     "frame": { "x": 128, "y": 0, "w": 32, "h": 32 },
     "rotated": false,
     "trimmed": false,
     "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 32 },
     "sourceSize": { "w": 32, "h": 32 },
     "duration": 80
    },
    {
     "filename": "bomb_mine5",
     "frame": { "x": 160, "y": 0, "w": 32, "h": 32 },
     "rotated": false,
     "trimmed": false,
     "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 32 },
     "sourceSize": { "w": 32, "h": 32 },
     "duration": 80
    },
    {
     "filename": "bomb_mine6",
     "frame": { "x": 192, "y": 0, "w": 32, "h": 32 },
     "rotated": false,
     "trimmed": false,
     "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 32 },
     "sourceSize": { "w": 32, "h": 32 },
     "duration": 80
    },
    {
     "filename": "bomb_mine7",
     "frame": { "x": 224, "y": 0, "w": 32, "h": 32 },
     "rotated": false,
     "trimmed": false,
     "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 32 },
     "sourceSize": { "w": 32, "h": 32 },
     "duration": 80
    },
    {
     "filename": "bomb_mine8",
     "frame": { "x": 256, "y": 0, "w": 32, "h": 32 },
     "rotated": false,
     "trimmed": false,
     "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 32 },
     "sourceSize": { "w": 32, "h": 32 },
     "duration": 80
    },
    {
     "filename": "bomb_mine9",
     "frame": { "x": 288, "y": 0, "w": 32, "h": 32 },
     "rotated": false,
     "trimmed": false,
     "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 32 },
     "sourceSize": { "w": 32, "h": 32 },
     "duration": 80
    }
]; 

const bombFramesLen = bombFrames.length;
