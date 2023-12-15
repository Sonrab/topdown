const imgLargeChestOpen = addImage("images/chest/chest_large_open.png");
const imgLargeChestClosed = addImage("images/chest/chest_large_closed.png");


class LargeChest
{
    constructor(x, y, item)
    {
        this.type = "chest";
        this.img = imgLargeChestClosed;
    
        this.tileX = x;
        this.tileY = y;
        this.x = x * tileWidth;
        this.y = (y * tileWidth) -17;
    
        this.closed = true;
        this.item = item;
        this.renderContent = false;
    }

    onInteract()
    {
        if(this.closed)
        {
            this.closed = false;
            this.img = imgLargeChestOpen;
    
            console.log(this.item);
            player.inventory.addItem(this.item);
            //executes the function stored in the content like applying an upgrade
            // console.log(this.content);
            // this.content.execute();
    
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
        renderer.foregroundQueue.push([this.item.img, this.x + 16, this.y]);

        ctx.drawImage(this.img, this.x, this.y);
    }
}