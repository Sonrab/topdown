const defaultCursor = addImage("images/cursor_icons/crosshair.png");
const castModeCursor = addImage("images/cursor_icons/target.png");


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



    render()
    {
        let x = Math.floor(mouse.transX);
        let y = Math.floor(mouse.transY);
        if(this.castModeActive)
        {
            ctx.drawImage(castModeCursor, x - this.radius, y - this.radius, this.diameter, this.diameter);
        }
        else
        {
            ctx.drawImage(defaultCursor, x - 5, y - 5, 11, 11);
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