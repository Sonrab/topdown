var grapplerimg = new Image();
grapplerimg.src = "images/weapons/grapple.png";

class Grappler
{
    constructor()
    {
        this.speed = 6;

        this.img = grapplerimg;
    
    
        this.mouseDownAutoUse = false;
        this.lastUse = 0;
        this.x = 0;
        this.y = 0;
    
        this.ropeAttachPoint = {x: 2, y: 1};
        this.colPoint = {x: 9, y: 1};
    
        this.collidesWith = [1, 2];
    
        this.parentPosOnGrappleStart = {x: 0, y:0};
        this.startX = 0;
        this.startY = 0;
    
        this.orgVelX = 0;
        this.orgVelY = 0;
    
        this.velX = 0;
        this.velY = 0;
    
        this.angle = 0;
        this.radians = 0;
    
        this.range = 300; //px
        this.ropecolor = "blue";
    
        this.states = Object.freeze({
            Idle: Symbol("idle"),
            Thrown: Symbol("thrown"),
            Latched: Symbol("latched"),
            Returning: Symbol("returning")
        });
    
        this.state = this.states.Idle;
        this.canUse = true;
    }

    upgradeGrappler()
    {
        this.speed = 7;
        this.range = 300;
        this.ropecolor = "brown";
    }

    unequip()
    {
        this.state = this.states.Idle;
        this.canUse = true;
    }


    render()
    {
        if(this.state === this.states.Idle)
            return;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.radians);
        ctx.drawImage(this.img, 0, -4);
        ctx.rotate(-this.radians);
        ctx.translate(-this.x, -(this.y));


        let x1 = this.ropeAttachPoint.x*Math.cos(this.radians) - this.ropeAttachPoint.y*Math.sin(this.radians);
        let y1 = this.ropeAttachPoint.x*Math.sin(this.radians) + this.ropeAttachPoint.y*Math.cos(this.radians);

        ctx.strokeStyle = this.ropecolor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(player.center.x, player.center.y);
        ctx.lineTo(this.x + x1, this.y + y1);
        ctx.stroke();
    };



    updateReturnAngle()
    {
            let dx = this.x - (player.center.x);
            let dy = this.y - (player.center.y);
            let magnitude = Math.sqrt(dx*dx + dy*dy);
            this.angle = Math.atan2(dy, dx) * (180 / Math.PI);
            if(this.angle < 0)
                this.angle = 360 - (-this.angle);

            this.radians = this.angle * (Math.PI/180);
        
            this.velX = -(dx/magnitude) * this.speed;
            this.velY = -(dy/magnitude) * this.speed;

    };

    updatePlayerVel()
    {
        let dx = this.x - (player.center.x);
        let dy = this.y - (player.center.y);
        let magnitude = Math.sqrt(dx*dx + dy*dy);

        player.velX = (dx/magnitude) * this.speed;
        player.velY = (dy/magnitude) * this.speed;
    }



    toggleReturn()
    {
        player.onGrappleEnd();
        this.state = this.states.Returning;
        
    }

    update()
    {
        if(this.state === this.states.Idle)
            return;
        // else if(this.lastUse + 5000 < currentTime && this.state !== this.states.Returning)
        // {
        //     this.toggleReturn();
        // }
        if(!mouse.down)
            this.canUse = true;

        if(this.state === this.states.Returning)
            this.updateReturnAngle();

        if(this.state === this.states.Latched)
            this.updatePlayerVel();

        this.x += this.velX;
        this.y += this.velY;

        
        this.checkCollision();
    }

    checkCollision()
    {
        let map = game.currentMap;
            

        let x1 = this.colPoint.x*Math.cos(this.radians) - this.colPoint.y*Math.sin(this.radians);
        let y1 = this.colPoint.x*Math.sin(this.radians) + this.colPoint.y*Math.cos(this.radians);


        let tile = map.getCollissionTileId(this.x + x1, this.y + y1);

        if(this.collidesWith.includes(tile) && tileHandler.tiles.get(`${tile}`).grappleable && this.state === this.states.Thrown)
        {

            this.state = this.states.Latched;
            let dx = this.x - (player.center.x);
            let dy = this.y - (player.center.y);
            let magnitude = Math.sqrt(dx*dx + dy*dy);
            // let angle = Math.atan2(dy, dx) * (180 / Math.PI);
            // if(angle < 0)
            // {
            //     angle = 360 - (-angle);
            // }
            //this.radians = this.angle * (Math.PI/180);
            // this.x = player.center.x;
            // this.y = player.center.y;
            player.onGrappleStart();
            player.velX = (dx/magnitude) * this.speed;
            player.velY = (dy/magnitude) * this.speed;

            // player.velX += this.velX;
            // player.velY += this.velY;
            
            this.velX = 0;
            this.velY= 0;
        }
        else if(this.state === this.states.Thrown)
        {
            if(distBetweenPoints(this.startX, this.startY, this.x, this.y) >= this.range)
            {
                this.toggleReturn();
            }

        }

        let range = 20;
        if(this.x > player.center.x-range && this.x < player.center.x+range
        && this.y > player.center.y-range && this.y < player.center.y+range
        && (this.state === this.states.Latched || this.state === this.states.Returning))
        {
            this.state = this.states.Idle; //when player reaches grappler, put grappler state in idle
            this.velX = 0;
            this.velY = 0;
            player.onGrappleEnd();
        }
    };


    use()
    {
        if(!this.canUse)
            return;

        if(this.state === this.states.Idle) //can only throw grappler when idle
        {
            this.state = this.states.Thrown; //set grappler state to thrown
            this.lastUse = currentTime;
            
            let dx = mouse.transX - (player.center.x);
            let dy = mouse.transY - (player.center.y);
            let magnitude = Math.sqrt(dx*dx + dy*dy);
            this.angle = Math.atan2(dy, dx) * (180 / Math.PI);
            if(this.angle < 0)
                this.angle = 360 - (-this.angle);
    
            this.radians = this.angle * (Math.PI/180);
        
            this.x = player.center.x;
            this.y = player.center.y;

            this.startX = this.x;
            this.startY = this.y;
            this.velX = (dx/magnitude) * this.speed;
            this.velY = (dy/magnitude) * this.speed;
        }
        else if(this.state != this.states.Returning)
        {
            this.toggleReturn();
        }
    }

}

