const imgTeleporter = addImage("images/teleporter.png");
const imgTeleporterActive = addImage("images/teleporter_active.png");

class Teleporter
{
    static drawWidth = 64;
    static drawHeight = 74;
    constructor(x1, y1, x2, y2)
    {
        this.teleporter1 = {x: x1*tileWidth, y: y1*tileWidth};
        this.teleporter2 = {x: x2*tileWidth, y: y2*tileWidth};

        this.interactArea1 = {
            x: this.teleporter1.x+8,
            y: this.teleporter1.y,
            width: 48,
            height: 48,
        }

        this.interactArea2 = {
            x: this.teleporter2.x+8,
            y: this.teleporter2.y,
            width: 48,
            height: 48,
        }
    }

    render()
    {
        if(this.playerInInteractArea(this.interactArea1))
            ctx.drawImage(imgTeleporterActive, this.teleporter1.x, this.teleporter1.y-10);
        else
            ctx.drawImage(imgTeleporter, this.teleporter1.x, this.teleporter1.y-10);

        if(this.playerInInteractArea(this.interactArea2))
            ctx.drawImage(imgTeleporterActive, this.teleporter2.x, this.teleporter2.y-10);
        else
            ctx.drawImage(imgTeleporter, this.teleporter2.x, this.teleporter2.y-10);
    }

    playerInInteractArea(area)
    {
        if(player.center.x > area.x && player.center.y > area.y && player.center.x < area.x + area.width && player.center.y < area.y + area.height)
        {
            return true;
        }
        return false;
    }

    onInteract(tp)
    {   
        if(tp === "TP1")
        {
            player.x = this.teleporter2.x+16;
            player.y = this.teleporter2.y+8;
        
        }
        else if(tp === "TP2")
        {
            player.x = this.teleporter1.x+16;
            player.y = this.teleporter1.y+8;
        }
    }
}