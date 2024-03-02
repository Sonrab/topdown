const imgPoweredFence = addImage("images/powerfence.png");
class PoweredFence
{
    static width = 16;
    static height = 32;

    static drawWidth = 32;
    static drawHeight = 34;

    constructor(x1, y1, x2, y2, trigger, points=10)
    {
        this.post1 = 
        {
            x: x1*tileWidth, 
            y: y1*tileWidth,
            orb: 
            {
                x: x1*tileWidth + PoweredFence.width/2,
                y: y1*tileWidth + 10
            }
        };

        this.post2 = 
        {
            x: x2*tileWidth, 
            y: y2*tileWidth,
            orb: 
            {
                x: x2*tileWidth + PoweredFence.width/2,
                y: y2*tileWidth + 10
            }
        };
        
        this.activated = true;

        this.lightningPoints = []; //stores coords for the breakpoints in the lightning
        this.lightningPointsRandomized = []; //stores the randomized version of the breakpoints
        this.lastLightningGen = 0;

        //value for setting the "span" of the lightning effect. Bigger value=lightning arcs furter away from the line between poles
        this.maxStep = 5; //span is value * 2 since randomziation goes from -value -> value
        this.maxStepX;
        this.maxStepY;
        
        this.damage = 2;
        this.trigger = trigger;

        this.calculateBaseLightningPoints(points);
        this.randomizeLightningPoints();
    }

    calculateBaseLightningPoints(points) //evenly distribute amount of points along hypotenuse between poles
    {
        let dx = (this.post2.orb.x - this.post1.orb.x);
        let dy = (this.post2.orb.y - this.post1.orb.y);
        let hypo = pythagorean(dx, dy);

        //recalulate maxsteps in both axises based on angle between the poles
        //if poles are on same x-value, only x-value will randomize
        //if poles are on sam y-value, only y-value will randomize
        this.maxStepY = (dx/hypo) * this.maxStep;
        this.maxStepX = (dy/hypo) * this.maxStep;

        let dist = hypo/points; //distance between points to evenly distribute
        for(let i = 1; i < points; i++)
        {
            let ratio = hypo/(dist*i); 
            let x = dx/ratio;
            let y = dy/ratio;

            //add point dist to post1 coords and store in point-array
            this.lightningPoints.push({
                x: this.post1.orb.x + x, 
                y: this.post1.orb.y + y
            });
        }
    }

    randomizeLightningPoints()
    {
        this.lightningPointsRandomized = [];
        for(let i = 0; i < 3; i++)
        {
            this.lightningPointsRandomized.push([]);

            for(let j = 0; j < this.lightningPoints.length; j++)
            {
                this.lightningPointsRandomized[i].push({
                    x: this.lightningPoints[j].x + randomFloat(-this.maxStepX, this.maxStepX),
                    y: this.lightningPoints[j].y + randomFloat(-this.maxStepY, this.maxStepY)
                });
            }
        }

        // this.lightningPointsRandomized = [];
        // for(let i = 0; i < this.lightningPoints.length; i++)
        // {
        //     this.lightningPointsRandomized.push({
        //         x: this.lightningPoints[i].x + randomFloat(-this.maxStepX, this.maxStepX),
        //         y: this.lightningPoints[i].y + randomFloat(-this.maxStepY, this.maxStepY)
        //     });
        // }
    }


    render()
    {
        ctx.drawImage(imgPoweredFence, 32, 0, 32, 32, this.post1.x-8, this.post1.y-2, PoweredFence.drawWidth, PoweredFence.drawHeight);
        ctx.drawImage(imgPoweredFence, 32, 0, 32, 32, this.post2.x-8, this.post2.y-2, PoweredFence.drawWidth, PoweredFence.drawHeight);

        if(this.trigger.activated)
        {
            ctx.strokeStyle = "rgb(180, 219, 97)";
            ctx.lineWidth = 2;

            for(let i = 0; i < this.lightningPointsRandomized.length; i++)
            {
                ctx.beginPath();
                ctx.moveTo(this.post1.orb.x, this.post1.orb.y);
    
                for(let j = 0; j < this.lightningPoints.length; j++)
                {
                    ctx.lineTo(this.lightningPointsRandomized[i][j].x, this.lightningPointsRandomized[i][j].y);
                }
                ctx.lineTo(this.post2.orb.x, this.post2.orb.y);
                ctx.stroke();
            }

        }

        // if(this.trigger.activated)
        // {
        //     ctx.strokeStyle = "rgb(180, 219, 97)";
        //     ctx.lineWidth = 2;
        //     ctx.beginPath();
        //     ctx.moveTo(this.post1.orb.x, this.post1.orb.y);

        //     for(let i = 0; i < this.lightningPoints.length; i++)
        //     {
        //         ctx.lineTo(this.lightningPointsRandomized[i].x, this.lightningPointsRandomized[i].y);
        //     }
        //     ctx.lineTo(this.post2.orb.x, this.post2.orb.y);
        //     ctx.stroke();
        // }

        this.trigger.render();
    }

    update()
    {
        this.trigger.update();
        if(!this.trigger.activated)
            this.activated = false;

        if(this.lastLightningGen+75 < currentTime)
            this.randomizeLightningPoints();
    }
}