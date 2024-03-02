const imgChestOpen = addImage("images/chest/chest_open.png");
const imgChestClosed = addImage("images/chest/chest_closed.png");

class Chest
{
    constructor(x, y, contentType, content)
    {
        this.type = "chest";
        this.img = imgChestClosed;
    
        this.tileX = x;
        this.tileY = y;
        this.x = x * tileWidth;
        this.y = (y * tileWidth) -17;

        this.interactArea = {
            x: this.x - 16,
            y: this.y + 16,
            width: 64,
            height: 48,
        }
    
        this.closed = true;
        this.content = content;
        this.contentType = contentType;
        this.renderContent = false;
    }

    onInteract()
    {
        if(this.closed)
        {
            this.closed = false;
            this.img = imgChestOpen;
    
            switch(this.contentType)
            {
                case 'item':
                    Inventory.addItem(this.content);
                    break;
                case 'upgrade':
                    this.content.execute();
            }
            
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
        if(this.renderContent) //render the content inside the chest after opening
        {
            renderer.foregroundQueue.push([this.content.img, this.x, this.y]);
        }

        ctx.strokeRect(this.interactArea.x, this.interactArea.y, this.interactArea.width, this.interactArea.height);
            
        ctx.drawImage(this.img, this.x, this.y);
    }
}