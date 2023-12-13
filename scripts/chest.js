const chest_open = new Image();
const chest_closed = new Image();
chest_open.src = "images/chest/chest_open.png";
chest_closed.src = "images/chest/chest_closed.png";

class Chest
{
    constructor(x, y, content)
    {
        this.type = "chest";
        this.img = chest_closed;
    
        this.tileX = x;
        this.tileY = y;
        this.x = x * tileWidth;
        this.y = (y * tileWidth) -17;
    
        this.closed = true;
        this.content = content;
        this.renderContent = false;
    }

    onInteract()
    {
        if(this.closed)
        {
            this.closed = false;
            this.img = chest_open;
    
            console.log(this.content);
            //executes the function stored in the content like applying an upgrade
            this.content.execute();
    
            this.toggleRenderContent();
        }
        else
        {
            console.log("This chest is already open!");
        }
    }

    toggleRenderContent()
    {
        this.renderContent = true;
        setTimeout(() => {
            this.renderContent = false;
        }, 1500);
    }

    render()
    {
        if(this.renderContent)
        renderer.foregroundQueue.push([this.content.img, this.x, this.y]);

        mapBufferCtx.drawImage(this.img, this.x, this.y);
    }
}