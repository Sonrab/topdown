class InventoryItem
{
    constructor(item)
    {
        this.imageElement; //Reference to the corresponding html inventory element
        this.name = item.name;
        this.itemType = item.itemType;
        this.img = item.img;
        this.item = item.item;

        this.itemInfoBox;

        this.createInventoryImage();
        // this.imageElement.addEventListener("contextmenu", inventoryItemRmbClick, true);
        
        console.log(this.itemType);
        this.imageElement.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            this.handleItemRightClick();
        });
    }

    setItem(item)
    {
        this.item = item.item;
        // this.createInventoryImage();
        
    }

    handleItemRightClick()
    {
        //get source item slot. Can be either inv or equipment slot
        if(!(Inventory.sourceItemSlot = Inventory.getInventorySlotByElement(this.imageElement.parentNode))) //if fetching inventoryslot returns false we are fetch from equipslot
        {
            Inventory.sourceItemSlot = Inventory.getEquipmentSlotByElement(this.imageElement.parentNode); //get the equipment slot we are fetching from
        }

        if(Inventory.sourceItemSlot.slotType === 'equipment') //if slot is equipment
        {
            let index = Inventory.findFirstEmptySlot();
            console.log(index);
            if(index === false) 
                console.log("Inventory full!");
            else
            {
                Inventory.moveItemLocation(Inventory.sourceItemSlot, Inventory.slots[index]);
            }
        }
        else
        {
            if(Inventory.equipment[this.itemType].item === null) //if the equip slot is empty we move item there
                Inventory.moveToEquipment(Inventory.sourceItemSlot, Inventory.equipment[this.itemType]);
            else //if equip slot is not empty we swap item with the one curretnly there
                Inventory.swapEquipmentLocations(Inventory.sourceItemSlot, Inventory.equipment[this.itemType]);
        }
    }


    createInventoryImage()
    {
        this.imageElement = document.createElement('img');
        this.imageElement.setAttribute('src', this.img.src);
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
    e.preventDefault();
    console.log(Inventory.equipment["weapon"]);
    console.log(e);
    console.log(this);

}