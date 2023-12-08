class Item
{
    constructor(name, imgsrc, upgradeFunc)
    {
        this.name = name;
        this.execute = upgradeFunc; //stored function that will execute and apply the upgrade
        this.img = new Image();
        this.img.src = "images/item_icons/" + imgsrc;
    }
}