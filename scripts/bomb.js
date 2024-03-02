const bombCountdownImg = addImage("images/bomb_mine.png");
const bombExplosionImg = addImage("images/explosion.png");

class Bomb
{
    constructor(x, y)
    {
        //this.timerLength = 3000;
        this.height = 32;
        this.width = 32;
        this.img = bombCountdownImg;
        this.x = x - (this.width/2);
        this.y = y - this.height/2;

        this.blastRange = 50;

        this.hasExploded = false;


        this.animations = {
            countdown : new Animation(this, 'countdown', Bomb.countdownFrames, false)
        };
        this.currentAnimation = this.animations.countdown;

        this.init();
    }

    init()
    {
        this.currentAnimation.play();
    }


    explode()
    {
        let map = game.currentMap;
        //get center of bomb
        let bombCenterX = this.x + this.width/2;
        let bombCenterY = this.y + this.height/2;

        
        //bomb blows tiles in a 3x3 grid around the bomb
        //start by getting the topleft tile of that 3x3 grid and then loop through all positions and look for bombable tiles
        let gridX = Math.floor(bombCenterX / tileWidth) -1;
        let gridY = Math.floor(bombCenterY / tileWidth) -1;
        // for(let i = 0; i < 3; i++)
        // {
        //     for(let j = 0; j < 3; j++)
        //     {
        //         if(!map.grid[gridY+i] || !map.grid[gridY+i][gridX+j] || !map.grid[gridY+i][gridX+j][1])
        //             continue;
                
        //         if(tileHandler.getTileById(map.grid[gridY+i][gridX+j][1]).bombable)
        //             map.grid[gridY+i][gridX+j][1] = 0;
        //     }
        // }

        let playerCenterX = player.x + (player.width/2);
        let playerCenterY = player.y + (player.height/2);
        if(playerCenterX > bombCenterX - this.blastRange && playerCenterX < bombCenterX + this.blastRange
        && playerCenterY > bombCenterY - this.blastRange && playerCenterY < bombCenterY + this.blastRange)
        {
            player.takeDmg(1);
        }

        let enemies = map.enemies;
        for(let i = enemies.length-1; i >= 0; i--)
        {
            let enemy = enemies[i];
            // console.log(enemy);
            let enemyCenterX = enemy.x + (enemy.width/2);
            let enemyCenterY = enemy.y + (enemy.height/2);
            if(enemyCenterX > bombCenterX - this.blastRange && enemyCenterX < bombCenterX + this.blastRange
            && enemyCenterY > bombCenterY - this.blastRange && enemyCenterY < bombCenterY + this.blastRange)
            {
                enemy.onHit(1);
            }
        }


        this.hasExploded = true;  
    }

    onAnimationEnd(animName)
    {
        switch(animName)
        {
            case 'countdown':
                this.explode();
                objectList.splice(objectList.indexOf(this), 1);
                objectList.push(new BombExplosion(this.x, this.y));
                break;
        }
    }

    render()
    {
        let frame = this.currentAnimation.getCurrentFrame();
        renderer.foregroundQueue.push([this.img, frame.cutFrom.x, frame.cutFrom.y, frame.sourceFrameSize.w, frame.sourceFrameSize.h, 
            (this.x+(this.width/2)) - frame.sourceFrameSize.w/2, this.y, frame.sourceFrameSize.w, frame.sourceFrameSize.h]);
    }

    
    
    static countdownFrames = [
        {
            "cutFrom": { "x": 0, "y": 0},
            "sourceFrameSize": { "w": 32, "h": 32 },
            "duration": 400
        },
        {
            "cutFrom": { "x": 32, "y": 0},
            "sourceFrameSize": { "w": 32, "h": 32 },
            "duration": 400
        },
        {
            "cutFrom": { "x": 64, "y": 0},
            "sourceFrameSize": { "w": 32, "h": 32 },
            "duration": 400
        },
        {
            "cutFrom": { "x": 96, "y": 0},
            "sourceFrameSize": { "w": 32, "h": 32 },
            "duration": 400
        },
        {
            "cutFrom": { "x": 128, "y": 0},
            "sourceFrameSize": { "w": 32, "h": 32 },
            "duration": 150
        },
        {
            "cutFrom": { "x": 160, "y": 0},
            "sourceFrameSize": { "w": 32, "h": 32 },
            "duration": 150
        },
        {
            "cutFrom": { "x": 192, "y": 0},
            "sourceFrameSize": { "w": 32, "h": 32 },
            "duration": 150
        },
        {
            "cutFrom": { "x": 224, "y": 0},
            "sourceFrameSize": { "w": 32, "h": 32 },
            "duration": 150
        },
        {
            "cutFrom": { "x": 256, "y": 0},
            "sourceFrameSize": { "w": 32, "h": 32 },
            "duration": 150
        },
        {
            "cutFrom": { "x": 288, "y": 0},
            "sourceFrameSize": { "w": 32, "h": 32 },
            "duration": 150
        }
    ]; 
}

class BombExplosion
{
    constructor(x, y)
    {
        this.height = 128;
        this.width = 128;
        this.img = bombExplosionImg;
        this.x = x - this.width/2;
        this.y = y - this.height/2;

        this.animations = {
            explosion: new Animation(this, 'explosion', BombExplosion.explosionFrames, false)
        };
        this.currentAnimation = this.animations.explosion;

        this.init();
    }

    init()
    {
        this.currentAnimation.play();
    }

    onAnimationEnd(animName) 
    {
        switch(animName)
        {
            case 'explosion':
                objectList.splice(objectList.indexOf(this), 1);
                break;
        }
    }

    render()
    {
        let frame = this.currentAnimation.getCurrentFrame();
        renderer.foregroundQueue.push([this.img, frame.cutFrom.x, frame.cutFrom.y, frame.sourceFrameSize.w, frame.sourceFrameSize.h, 
            (this.x+(this.width/2)) - frame.sourceFrameSize.w/2, this.y, frame.sourceFrameSize.w, frame.sourceFrameSize.h]);
    }

    static explosionFrames = [
        {
            "cutFrom": { "x": 0, "y": 0},
            "sourceFrameSize": { "w": 128, "h": 128 },
            "duration": 60
        },
        {
            "cutFrom": { "x": 128, "y": 0},
            "sourceFrameSize": { "w": 128, "h": 128 },
            "duration": 60
        },
        {
            "cutFrom": { "x": 256, "y": 0},
            "sourceFrameSize": { "w": 128, "h": 128 },
            "duration": 60
        },
        {
            "cutFrom": { "x": 384, "y": 0},
            "sourceFrameSize": { "w": 128, "h": 128 },
            "duration": 60
        },
        {
            "cutFrom": { "x": 512, "y": 0},
            "sourceFrameSize": { "w": 128, "h": 128 },
            "duration": 60
        },
        {
            "cutFrom": { "x": 640, "y": 0},
            "sourceFrameSize": { "w": 128, "h": 128 },
            "duration": 60
        },
        {
            "cutFrom": { "x": 768, "y": 0},
            "sourceFrameSize": { "w": 128, "h": 128 },
            "duration": 60
        },
        {
            "cutFrom": { "x": 896, "y": 0},
            "sourceFrameSize": { "w": 128, "h": 128 },
            "duration": 60
        }
    ];
}