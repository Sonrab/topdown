const castModeCursor = addImage("images/target.png");

class Cursor
{
    constructor()
    {
        this.img = castModeCursor;
        this.radius;
        this.diameter;
        this.castModeActive = false;

        this.init();
    }

    init()
    {
        //this.enterCastMode(120);
    }

    update

    render()
    {
        if(this.castModeActive)
        {
            ctx.drawImage(castModeCursor, mouse.transX - this.radius, mouse.transY - this.radius, this.diameter, this.diameter);
        }
        
    }

    enterCastMode(radius)
    {
        this.radius = radius;
        this.diameter = radius*2;
        this.castModeActive = true;
    }

    exitCastMode()
    {
        this.castModeActive = false;
    }
}