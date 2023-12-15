class InventorySlot
{
    constructor(element)
    {
        this.slotType = 'inventory';
        this.element = element; //Reference to the corresponding html inventory element
        this.item = null;
    }

    setSlotContent(item)
    {
        this.item = item;
        this.element.appendChild(this.item.imageElement);
    }

    deleteItem()
    {
        this.element.removeChild(this.item.element);
        this.item.deleteItem();
    }
}