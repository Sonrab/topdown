class InventoryItem
{
    constructor(item)
    {
        this.imageElement; //Reference to the corresponding html inventory element
        this.name = item.name;
        this.itemType = item.itemType;
        this.imgSrc = item.imgSrc;
        this.item = item.item;

        this.itemInfoBox;

        this.createInventoryImage();
        this.imageElement.addEventListener("contextmenu", inventoryItemRmbClick);
    }

    setItem(item)
    {
        this.item = item.item;
        // this.createInventoryImage();
        
    }


    createInventoryImage()
    {
        this.imageElement = document.createElement('img');
        this.imageElement.setAttribute('src', this.imgSrc);
        this.imageElement.setAttribute('draggable', true);
        this.imageElement.addEventListener('dragstart', dragStartHandler);
    }

    deleteItem()
    {
        this.imageElement.removeEventListener('dragstart', dragStartHandler);
        this.imageElement.removeEventListener('contextmenu', inventoryItemRmbClick);
        // this.element.removeChild(this.img);
    }
}

//rmb event handler
function inventoryItemRmbClick(e)
{
    console.log(e);
}