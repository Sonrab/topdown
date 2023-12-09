var sound_player_jump = new Audio("sounds/player/jump.wav");
var sound_player_death= new Audio("sounds/player/death.wav");
sound_player_jump.volume = 0.2;
sound_player_death = 0.2;

const chestImg = addImage("images/red_armor.png");



const spritesheet_player = addImage("images/player/player_sheet.png");

class Player
{
    

    constructor()
    {

        this.spritesheet = spritesheet_player;
        this.behindForeground = false;
        //x, y and targetx, targety values
        this.x = 0;
        this.tx = this.x;
        this.y = 0;
        this.ty = this.y;
        this.center = {x: this.x, y: this.y};
        this.z = 0;
    
        this.width = 20;
        this.height = 16;
        this.animTimeout = false;
        this.health = 25;
        this.maxHealth = 25;

        this.mana = 50;
        this.maxMana = 50;
        //width and height
        
        this.drawWidth = 32;
        this.drawHeight = 32;
    
        this.iframes = {
            active: false,
            duration: 500
        };
   
        this.orbs = []; //list for player orbs
        this.orbSpawnAmount = 1; //amount of orbs which spawns by player spell
        //player speed
        this.speed = 1.5;

        
    
        this.tileId = "";    
        this.camera = new Camera();
        this.inventory = new Inventory();
        this.cursor = new Cursor();
    
    
        //player gravity and forces applied when moving
        this.velX = 0;
        this.velY = 0;
        this.velCap = 5;
        this.knockbackVel;
        
        this.walking = false;
    
        this.bow = new Bow();
        this.grappler = new CGrappler();
    
        this.equippedWep = this.bow;

        

        this.animations = {
            walk : {
                down: new Animation(this, 'walkDown', Player.walkDownAnimFrames, true),
                left: new Animation(this, 'walkLeft', Player.walkLeftAnimFrames, true),
                right: new Animation(this, 'walkRight', Player.walkRightAnimFrames, true),
                up: new Animation(this, 'walkUp', Player.walkUpAnimFrames, true)
            },
            idle: {
                down: new Animation(this, 'idleDown', [Player.walkDownAnimFrames[1]], true),
                left: new Animation(this, 'idleLeft', [Player.walkLeftAnimFrames[1]], true),
                right: new Animation(this, 'idleRight', [Player.walkRightAnimFrames[1]], true),
                up: new Animation(this, 'idleUp', [Player.walkUpAnimFrames[1]], true)
            },
            dodgeRoll: new Animation(this, 'dodgeRoll', Player.dodgeRollFrames, true)
        };
        this.currentAnimation = this.animations.walk.down;

        //possible directions
        this.directions = Object.freeze({ 
            down: Symbol("down"),
            left: Symbol("left"),
            right: Symbol("right"),
            up: Symbol("up")
        });

        this.states = Object.freeze({
            idle: Symbol("idle"),
            walking: Symbol("walking"),
            grappling: Symbol("grappling"),
            dodgeRolling: Symbol("dodgeRolling")
        });

        this.state = this.states.idle;

        this.direction = this.directions.down; //direction the player is facing to display correctly
    

        /* DATA FOR DIFFERENT SKILLS AND ABILITIES */
    
        //bomb
        this.bombData = {
            unlocked: false, //boolean which keeps track if the player have unlocked bombs
            capacity: 3,
            amount: 3, //amount of current bombs
            rechargeTime: 3000, //3 sec 
            rechargeActive: false,
            rechargeStep: 3 //keeps track of which step of the cooldown we are in. Used for bomb-cooldown animation
        };

        //dodge roll
        this.dodgeRollData = {
            unlocked: false,
            speed: 5,
            ready: true,
            cooldown: 100 //time in ms
        };

        /* END OF DATA FOR DIFFERENT SKILLS AND ABILITIES */
    
        this.grappling = false;
        this.grapplerUnlocked = false;
    
    
        this.sound = {jump : sound_player_jump, death : sound_player_death};
        this.init();
    }

    init()
    {
        this.currentAnimation.play();
        // this.watch("mana", function(){
        //     userInterface.updateMana();
        // });
    }

    setX(x)
    {
        this.x = x;
        this.tx = x;
        this.center.x = this.x + this.width/2;
    }

    setY(y)
    {
        this.y = y;
        this.ty = y;
        this.center.y = this.y + this.height/2;
    }

    setXY(x, y)
    {
        this.x = x;
        this.y = y;

        this.tx = x;
        this.ty = y;

        this.center.x = this.x + this.width/2;
        this.center.y = this.y + this.height/2;
    }



    setDirection(dir)
    {
        if(this.direction != dir) //if same direction as we already have, just return
            this.direction = dir;
        
        switch(this.state)
        {
            case this.states.idle:
                this.setPlayerIdle();
                break;
            case this.states.walking:
                this.setPlayerWalking();
                break;
        }
    }

    castFireOrbs()
    {
        let len = this.orbs.length;
        if(len > 0)
        {
            for(let i = 0; i < len; i++)
            {
                let orb = this.orbs[i];
                if(orb.mode === orb.modes.orbit)
                {
                    orb.launch();
                    break;
                }
            }
        }
        else
        {
            this.mana -= 15;
            let orbSpacing = 360/this.orbSpawnAmount;
            this.orbs = [];
            for(let i = 0; i < this.orbSpawnAmount; i++)
            {
                this.orbs.push(new Orb(i*orbSpacing));
            }
        }
    }

    castFirestorm()
    {
        this.cursor.enterCastMode(90);

        
    }

    firestorm()
    {
        console.log("pewpew");
    }


    setPlayerWalking()
    {
        if(this.state === this.states.dodgeRolling)
            return;

        if(this.state != this.states.walking)
            this.state = this.states.walking;
        
        switch(this.direction)
        {
            case this.directions.up:
                if(this.currentAnimation != this.animations.walk.up)
                    this.animations.walk.up.play();
                break;
            case this.directions.left:
                if(this.currentAnimation != this.animations.walk.left)
                    this.animations.walk.left.play();
                break;
            case this.directions.right:
                if(this.currentAnimation != this.animations.walk.right)
                    this.animations.walk.right.play();
                break;
            case this.directions.down:
                if(this.currentAnimation != this.animations.walk.down)
                    this.animations.walk.down.play();
                break;  
        }
    }

    setPlayerIdle()
    {

        if(this.state != this.states.idle)
            this.state = this.states.idle;
        
        switch(this.direction)
        {
            case this.directions.up:
                
                this.animations.idle.up.play();
                break;
            case this.directions.left:
                this.animations.idle.left.play();
                break;
            case this.directions.right:
                this.animations.idle.right.play();
                break;
            case this.directions.down:
                this.animations.idle.down.play();
                break;  
        }
    }

    dodgeRoll()
    {
        if(this.state === this.states.dodgeRolling)
            return;

        this.state = this.states.dodgeRolling;
        this.animations.dodgeRoll.play();
        userInterface.triggerActionBarAnimation(userInterface.actionBar.mobility.element);
        if ('KeyA' in keysDown || 'ArrowLeft' in keysDown) //vänster
        {
            player.move('left');
        }   
     
        if ('KeyW' in keysDown || 'ArrowUp' in keysDown) // upp 
            player.move('up');
    
    
        if ('KeyS' in keysDown || 'ArrowDown' in keysDown) // ner 
            player.move('down'); 
        
        
        if ('KeyD' in keysDown || 'ArrowRight' in keysDown) //höger
        {
            player.move('right');
        }
        if ('KeyA' in keysDown || 'ArrowLeft' in keysDown)
        {
            if ('KeyW' in keysDown || 'ArrowUp' in keysDown) // upp 
            {
                this.velX = -this.dodgeRollData.speed * diagonalMovementMultiplier;
                this.velY = -this.dodgeRollData.speed * diagonalMovementMultiplier;
            }
            else if ('KeyS' in keysDown || 'ArrowDown' in keysDown) // ner 
            {
                this.velX = -this.dodgeRollData.speed * diagonalMovementMultiplier;
                this.velY = this.dodgeRollData.speed * diagonalMovementMultiplier;
            }
            else
            {
                this.velX = -this.dodgeRollData.speed;
                this.velY = 0;
            }
        }
        else if ('KeyW' in keysDown || 'ArrowUp' in keysDown) // upp 
        {
            if ('KeyD' in keysDown || 'ArrowRight' in keysDown) //höger
            {
                this.velX = this.dodgeRollData.speed * diagonalMovementMultiplier;
                this.velY = -this.dodgeRollData.speed * diagonalMovementMultiplier;
            }
            else
            {
                this.velX = 0;
                this.velY = -this.dodgeRollData.speed;
            }
        }
        else if ('KeyS' in keysDown || 'ArrowDown' in keysDown) // ner 
        {
            if ('KeyD' in keysDown || 'ArrowRight' in keysDown) //höger
            {
                this.velX = this.dodgeRollData.speed * diagonalMovementMultiplier;
                this.velY = this.dodgeRollData.speed * diagonalMovementMultiplier;
            }
            else
            {
                this.velX = 0;
                this.velY = this.dodgeRollData.speed;
            } 
        }   
        else if ('KeyD' in keysDown || 'ArrowRight' in keysDown) //höger
        {
            this.velX = this.dodgeRollData.speed;
            this.velY = 0;
        }

        console.log(this.velX);

        setTimeout(() => {
            this.setPlayerIdle();
        }, 275);
    }


    bombCooldown() 
    {
        if(!this.bombData.rechargeActive) //set bomb recharge active if its not already
            this.bombData.rechargeActive  = true;
        
        //bomb cooldown animation is in 4 steps, which is why recharge step goes from 0 - 3 and recharge time is split in 3 with the timeout
        setTimeout(() => { 
            this.bombData.rechargeStep++;
            if(this.bombData.rechargeStep === 3) //when rechargestep is at 3, 1 bomb has recharged
            {
                this.bombData.amount++;
                if(this.bombData.amount === this.bombData.capacity) //if the bombcapacity is full we set recharge to false and return
                {
                    this.bombData.rechargeActive = false;
                    return;
                }
                else //if bombcapacity is not full we reset the rechargestep and start a new cooldown
                {
                    this.bombData.rechargeStep = 0;
                    this.bombCooldown();
                }
            }
            else //if the rechargestep is not 3 the bomb has not recharged and we call the cooldown again
            {
                this.bombCooldown();
            }    
        }, this.bombData.rechargeTime/3); //split in 3 for animation
    }

    dropBomb()
    {
        if(!this.bombData.unlocked) //if bombs are not yet unlocked, we return
            return;

        if(this.bombData.amount > 0) //check if player has bombs in bag
        {
            let bomb = new Bomb();
            objectList.push(bomb);
            //bomb.timer();
            this.bombData.amount--;
            if(!this.bombData.rechargeActive)
            {
                this.bombData.rechargeStep = 0;
                this.bombCooldown();
            }   
        }
    }
    /* END OF PLAYER BOMB FUNCTIONS */



    toggleIframes(duration = this.iframes.duration)
    {
        this.iframes.active = true;
        setTimeout(() => {
            this.iframes.active = false;
        }, duration);
    }


    takeDmg(dmg)
    {

        /* "hurt flash" when getting hit. Move to better place later */
        hurtVignette.style.opacity = 1;
        setTimeout(function(){
            hurtVignette.style.opacity = 0;
           }, 200)
        /* ------------- */


        if(!this.iframes.active)
        {
            //this.health -= dmg;
            this.removeHealth(dmg);
            this.toggleIframes();
            
        }
    }

    addHealth(amount)
    {
        this.health += amount;
        userInterface.updateHealth();
    }

    removeHealth(amount)
    {
        this.health -= amount;
        userInterface.updateHealth();
    }

    addHealthUpgrade(amount)
    {
        this.maxHealth += amount;
        this.health += amount;
        userInterface.updateHealth();
    }

    checkMana(amount)
    {

    }

    addMana(amount)
    {
        this.mana += amount;
        //userInterface.updateMana();
    }

    removeMana(amount)
    {
        this.mana -= amount;
        userInterface.updateMana();
    }



    render()
    {
        let frame = this.currentAnimation.getCurrentFrame();
        ctx.drawImage(this.spritesheet, frame.cutFrom.x, frame.cutFrom.y, frame.sourceFrameSize.w, frame.sourceFrameSize.h, this.x - ((this.drawWidth-this.width)/2), this.y+this.height-this.drawHeight, this.drawWidth, this.drawHeight);
        

        //ctx.drawImage(chestImg, this.x - ((this.drawWidth-this.width)/2), this.y+this.height-this.drawHeight);

        for(let i = 0; i < this.orbs.length; i++)
        {
            this.orbs[i].render();
        }
        //this.orb.render();
        //ctx.drawImage(this.spritesheet, sourceX,sourceY,this.drawWidth,this.drawHeight, Math.round(this.x - (this.drawWidth-this.width)/2),Math.round(this.y - (this.drawHeight - this.height)),this.drawWidth,this.drawHeight);
        this.equippedWep.render();
    }


    getStandingTile()
    {
        return mapHandler.map.getTileId(this.x, this.y+this.height+1);
    }


    //function for updating facing direction relative to mouse pos
    updateRotation()
    {
        let dx = mouse.transX - (player.center.x);
        let dy = mouse.transY - (player.center.y);
        let angle = Math.atan2(dy, dx) * (180 / Math.PI);

        if(angle < 0)
            angle = 360 - (-angle);

        if(angle > 315 && angle <= 360 || angle <= 45) //right
            this.setDirection(this.directions.right)
        else if(angle > 45 && angle <= 135) //down
            this.setDirection(this.directions.down)
        else if(angle > 135 && angle <= 225) //left
            this.setDirection(this.directions.left)
        else if(angle > 225 && angle <= 315) //up
            this.setDirection(this.directions.up)
    }

    update()
    {      
        for(let i = 0; i < this.orbs.length; i++)
        {
            this.orbs[i].update();
        }

        checkInput();
        if(this.velX === 0 && this.velY === 0) //if no velocity then set idle
        {
            this.setPlayerIdle();
        }


        

        this.tx = this.x + (this.velX * delta);
        this.ty = this.y + (this.velY * delta);

        
        this.checkCollision(mapHandler.map);
        //this.checkBehindForeground();
        this.updateRotation();
        this.camera.update(); 

        if('update' in this.equippedWep)
            this.equippedWep.update();
        
        if(!this.grappling && this.state != this.states.dodgeRolling)
        {
            this.velX = 0;
            this.velY = 0;
        }

        canvas.dispatchEvent(new MouseEvent("mousemove", {
            clientX: mouse.x,
            clientY: mouse.y
        }));
    }

    interact()
    {
        let map = mapHandler.map;
        let positions = new Array();
        console.log("asd");
        //get left and right position in the grid of player. will be used for calculating multiple positions
        let x = {left : parseInt(this.x/tileWidth), right : parseInt((this.x+this.width)/tileWidth)};

        //get top, middle and top position in the grid of player. will be used for calculating multiple positions
        let y = {top : parseInt((this.y+2)/tileWidth), mid :  parseInt((this.y+this.height/2)/tileWidth), bot : parseInt((this.y+this.height-2)/tileWidth)}

        //get grid x and y for different player positions
        let topLeft = {x : x.left, y : y.top};
        let topRight = {x : x.right, y : y.top};

        let midLeft = {x : x.left, y : y.mid};
        let midRight = {x : x.right, y : y.mid};

        let botLeft = {x : x.left, y : y.bot};
        let botRight = {x : x.right, y : y.bot};

        positions.push(topLeft);
        positions.push(topRight);
        positions.push(botLeft);
        positions.push(botRight);
        positions.push(midLeft);
        positions.push(midRight);
        
        for(let i = 0; i < positions.length; i++)
        {
            for(let j = 0; j < map.interactables.length; j++)
            {
                let obj =  map.interactables[j];
                console.log(obj);
                if(positions[i].x === obj.tileX && positions[i].y === obj.tileY)
                {
                    
                    console.log("interacting");
                    obj.onInteract();
                    return;
                }
            }
        }
    }

    equipWeapon(wep)
    {
        player.equippedWep.unequip();
        wep.equip();
    }

    //MOVEMENT: This makes the character moving based on the keys etc.
    move(code)
    {  
        if(this.state === this.states.dodgeRolling)
            return;
        if (code === 'left')	//v�nster
        {     
            if(Math.abs(this.velX - this.speed) < this.velCap)
                this.velX -= this.speed;
            else if(!this.grappling)
                this.velX = -this.velCap;

            this.walking = true;
        }
        else if (code === 'right')	//h�ger
        {
            if(Math.abs(this.velX + this.speed) < this.velCap)
                this.velX += this.speed;
            else if(!this.grappling)
                this.velX = this.velCap;
            this.walking = true;
        }
        else if(code==='down') //ner
        {
            if(Math.abs(this.velY + this.speed) < this.velCap)
                this.velY += this.speed;
            else if(!this.grappling)
                this.velY = this.velCap;
            this.walking = true;
        }
        else if(code === 'up') // upp
        {
            if(Math.abs(this.velY - this.speed) < this.velCap)
                this.velY -= this.speed;
            else if(!this.grappling)
                this.velY = -this.velCap;
            this.walking = true;
        }

        if(['left', 'right', 'down', 'up'].includes(code))
        {
            if(this.state != this.states.walking)
                this.setPlayerWalking();
        }
    }

    death()
    {
        mapHandler.setMap(maps.get("start"), spawn = {x : 5, y : 3});
        this.velX = 0;
        this.velY = 0;
        this.velY = 0;
        this.velX = 0;
        // this.x = map.respawn.x;
        // this.y = map.respawn.y;
        // this.tx = this.x;
        // this.ty = this.y;
        this.dir="left";
        this.health = this.maxHealth;
    }

    checkPassages()
    {
        let passages = mapHandler.map.passages;
        // console.log(this.center.x/tileWidth);
        // console.log(this.center.y/tileWidth);
        // console.log("");

        for(let i = 0; i < passages.length; i++)
        {   
            let passage = passages[i];
            if(this.center.x >= passage.entrance.xmin*tileWidth && this.center.x <= passage.entrance.xmax*tileWidth && this.center.y >= passage.entrance.ymin*tileWidth && this.center.y <= passage.entrance.ymax*tileWidth)
            {
                mapHandler.setMap(maps.get(passage.passageTo), passage.playerSpawnPoint);
            }
        }
    }


    //COLLISION DETECTION AND HANDLING: This function detects and handles the collision, making you unable to walk through walls etc.
    checkCollision()
    {
        let map = mapHandler.map;
        let tiles = tileHandler.tiles;
        let colissionDetected = false;
        let tlTile, tmTile, trTile, mlTile, mrTile, blTile, bmTile, brTile;


        



        //player.tx = player.x + (player.tx - player.x)*delta;
        

        //KOD FÖR HEIGHTMAP
        // let x = Math.floor(player.center.x / tileWidth);
        // let y = Math.floor(player.center.y / tileWidth);
        // console.log(mapHandler.map.heightmap[y][x]);

        //get the tileids for 6 different positions of the player.
        //since these values will be used to check sideways colission, y is offset by 2 so the top and bottom corners wont
        //mark collission when the player is just walking
        //get tileID function will return the tile of the position sent in parameteres
        //it will recalculate the x and y to grid x and grid y

        

        //top left, top right
        tlTile = map.getTileId(this.tx, this.y);
        trTile = map.getTileId(this.tx + this.width, this.y);
        //middle left, middle right
        mlTile = map.getTileId(this.tx, this.y + (this.height/2));
        mrTile = map.getTileId(this.tx + this.width, this.y + (this.height/2));
        //bottom left, bottom right
        blTile = map.getTileId(this.tx, this.y + this.height);
        brTile = map.getTileId(this.tx + this.width, this.y + this.height);

        //no colission, all blocks touched by the player are non-solid
        if(!trTile.solid && !mrTile.solid && !brTile.solid 
        && !tlTile.solid && !mlTile.solid && !blTile.solid)
        {   
            this.x = this.tx;
        }
        else //colission
        {
            if(this.tx - this.x > 0) //colission right
            {
                while(trTile.solid || mrTile.solid || brTile.solid) //if any tile on right side is solid
                {      
                    this.tx -=1;   
                    trTile = map.getTileId(this.tx + this.width, this.y);
                    mrTile = map.getTileId(this.tx + this.width, this.y + (this.height/2));
                    brTile = map.getTileId(this.tx + this.width, this.y + this.height);         
                }
            }
            else if(this.tx - this.x < 0) //colission left
            {
                while(tlTile.solid || mlTile.solid || blTile.solid) //if any tile on left side is solid
                {
                    this.tx +=1;
                    tlTile = map.getTileId(this.tx, this.y);
                    mlTile = map.getTileId(this.tx, this.y + (this.height/2));
                    blTile = map.getTileId(this.tx, this.y + this.height);
                }
            }

            if(Math.floor(this.tx) === Math.floor(this.x)) //if rounded down numbers are the same there's no need to move player. It will only cause "vibrations"
                this.tx = this.x;
            this.x = this.tx;
            
            this.velX = 0;
        }

        //y-colission
        //top left, top mid, top right
        tlTile = map.getTileId(this.x, this.ty);
        tmTile = map.getTileId(this.x + (this.width/2), this.ty);
        trTile = map.getTileId(this.x + this.width, this.ty);
        //middle left, middle right
        mlTile = map.getTileId(this.x, this.ty + (this.height/2));
        mrTile = map.getTileId(this.x + this.width, this.ty + (this.height/2));
        //bottom left, bottom mid, bottom right
        blTile = map.getTileId(this.x, this.ty + this.height);
        bmTile = map.getTileId(this.x + (this.width/2), this.ty + this.height);
        brTile = map.getTileId(this.x + this.width, this.ty + this.height);

        

        if(!tlTile.solid && !tmTile.solid && !trTile.solid 
        && !blTile.solid && !bmTile.solid && !brTile.solid)
        {   
            this.y = this.ty;
        }
        else //colission
        {
            if(this.ty - this.y > 0) //colission down
            {
                while(blTile.solid || brTile.solid) //if any tile on right side is solid
                {      
                    this.ty -=1;   
                    blTile = map.getTileId(this.x, this.ty + this.height);
                    brTile = map.getTileId(this.x + this.width, this.ty + this.height);         
                }
            }
            else if(this.ty - this.y < 0) //colission up
            {
                while(tlTile.solid || trTile.solid) //if any tile on left side is solid
                {
                    this.ty +=1;
                    tlTile = map.getTileId(this.x, this.ty);
                    trTile = map.getTileId(this.x + this.width, this.ty);
                }
            }

            if(Math.floor(this.ty) === Math.floor(this.y)) //if rounded down numbers are the same there's no need to move player. It will only cause "vibrations"
                this.ty = this.y;
            this.y = this.ty;
            
            this.velY = 0;
        }

        this.center.x = this.x + this.width/2;
        this.center.y = this.y + this.height/2;

        this.checkPassages();
        this.checkCollisionEvents();
        if(!this.iframes.active)
        {
            this.checkEnemyColission();
        }
    }



    checkBehindForeground()
    {
        let map = mapHandler.map;
        let tlTile, trTile, blTile, brTile;
        tlTile = map.getForegroundTileId(this.x, this.y);
        trTile = map.getForegroundTileId(this.x + this.width, this.y);

        blTile = map.getForegroundTileId(this.tx, this.y + this.height);
        brTile = map.getForegroundTileId(this.tx + this.width, this.y + this.height);

        if(tlTile !== 0 || trTile !== 0 || blTile !== 0 || brTile !== 0)
        {
            player.behindForeground = true;
            if(mapHandler.foregroundAlpha > 0)
                mapHandler.foregroundAlpha -= 0.075;
            
            if(mapHandler.foregroundAlpha < 0)
                mapHandler.foregroundAlpha = 0;
        }
            
        else
        {
            player.behindForeground = false;
            if(mapHandler.foregroundAlpha < 1)
                mapHandler.foregroundAlpha += 0.075;
            if(mapHandler > 1)
            mapHandler.foregroundAlpha = 1;
        }
        //console.log(mapHandler.foregroundAlpha);
            
    }




    checkEnemyColission()
    {
        let map = mapHandler.map;
        let center = {};
        center.x = this.x + (this.width/2);
        center.y = this.y + (this.height/2);
        for(let i = 0; i < map.enemies.length; i++)
        {
            let enemy = map.enemies[i];
            if(center.x > enemy.x && center.x < enemy.x+enemy.width
            && center.y > enemy.y && center.y < enemy.y+enemy.height)
            {
                this.takeDmg(enemy.damage);
                this.toggleIframes();

                this.velY = 0;
                this.velX = 0;
                
                if(this.health <= 0)
                {
                    this.death();
                }
                return;
            }

        }
    }

    checkCollisionEvents()
    {
        //check if player hits the map-exit
        let map = mapHandler.map;

        let center = {};
        let pcTile; //holds the tileid for centercoords of the player
        center.x = parseInt((this.x+(this.width/2))/tileWidth);
        center.y = parseInt((this.y+(this.height/2))/tileWidth);
        //pcTile = map.grid[center.y][center.x]; //
        let passages = map.passages;

        if(pcTile === 16 || pcTile === 24)
        {
            this.death(map);
        }
        for(let i = 0; i < map.passages.length; i++)
        {
            if(map.passages[i].entrance.x === center.x && map.passages[i].entrance.y === center.y)
            {
                // this.x = doors[i].exit.x;
                // this.tx = this.x;
                // this.y = doors[i].exit.y;
                // this.ty = this.y;
                return;
            }
        }
    }

    static walkDownAnimFrames = [
        {
            "cutFrom": { "x": 0, "y": 0},
            "sourceFrameSize": { "w": 32, "h": 32},
            "duration": 150
        },
        {
            "cutFrom": { "x": 32, "y": 0},
            "sourceFrameSize": { "w": 32, "h": 32},
            "duration": 150
        },
        {
            "cutFrom": { "x": 64, "y": 0},
            "sourceFrameSize": { "w": 32, "h": 32},
            "duration": 150
        }
    ];

    static walkLeftAnimFrames = [
        {
            "cutFrom": { "x": 0, "y": 32},
            "sourceFrameSize": { "w": 32, "h": 32},
            "duration": 150
        },
        {
            "cutFrom": { "x": 32, "y": 32},
            "sourceFrameSize": { "w": 32, "h": 32},
            "duration": 150
        },
        {
            "cutFrom": { "x": 64, "y": 32},
            "sourceFrameSize": { "w": 32, "h": 32},
            "duration": 150
        }
    ];

    static walkRightAnimFrames = [
        {
            "cutFrom": { "x": 0, "y": 64},
            "sourceFrameSize": { "w": 32, "h": 32},
            "duration": 150
        },
        {
            "cutFrom": { "x": 32, "y": 64},
            "sourceFrameSize": { "w": 32, "h": 32},
            "duration": 150
        },
        {
            "cutFrom": { "x": 64, "y": 64},
            "sourceFrameSize": { "w": 32, "h": 32},
            "duration": 150
        }
    ];

    static walkUpAnimFrames = [
        {
            "cutFrom": { "x": 0, "y": 96},
            "sourceFrameSize": { "w": 32, "h": 32},
            "duration": 150
        },
        {
            "cutFrom": { "x": 32, "y": 96},
            "sourceFrameSize": { "w": 32, "h": 32},
            "duration": 150
        },
        {
            "cutFrom": { "x": 64, "y": 96},
            "sourceFrameSize": { "w": 32, "h": 32},
            "duration": 150
        }
    ];

    static dodgeRollFrames = [
        {
            "cutFrom": { "x": 96, "y": 0},
            "sourceFrameSize": { "w": 32, "h": 32},
            "duration": 150
        },
        {
            "cutFrom": { "x": 96, "y": 32},
            "sourceFrameSize": { "w": 32, "h": 32},
            "duration": 150
        },
        {
            "cutFrom": { "x": 96, "y": 64},
            "sourceFrameSize": { "w": 32, "h": 32},
            "duration": 150
        }
    ];
}



