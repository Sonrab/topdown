const inventory = document.getElementById("inventory")
const inventory_playerStats = document.querySelector("#UI_inventory_playerStats")

const healthBarText = document.querySelector("#healthText");
const healthBar = document.querySelector("#healthBar");

const manaBarText = document.querySelector("#manaText");
const manaBar = document.querySelector("#manaBar");

const displayLevel = document.getElementById('displayLevel');
const expBar = document.getElementById('xpBar');

const actionBar = document.querySelectorAll('.inventoryslot')


// const pauseMenuBtnReturn = document.getElementById("#btnReturn");
// pauseMenuBtnReturn.addEventListener("click", function(){
//     game.unpause();
// }, false);

/*stores*/
// const userInterface = document.getElementById('userInterface');
// const hurtVignette = document.getElementById('hurtVignette');
// const blackScreen = document.getElementById('blackScreen');
// const xpBar = document.getElementById('xpBar');
// const healthBar = document.getElementById('healthBar');
// const manaBar = document.getElementById('manaBar');

// const healthText = document.getElementById('healthText');
// const manaText = document.getElementById('manaText');

// const displayLevel = document.getElementById('displayLevel');

// const actionBar = document.querySelectorAll('.inventoryslot')
/* --- */

class UserInterface
{
    constructor()
    {
        this.canvas = document.getElementById('user_interface_canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.bombIconPos = this.canvas.width - 96;
        this.inventoryOpen = false;
    
        this.actionBar = {
            primary: {
                element: actionBar[0]
            },
            mobility: {
                element: actionBar[5]
            }
        }

        this.init();
    }

    toggleInventory()
    {
        if(this.inventoryOpen) //close inv
        {
            inventory.classList.remove("fade-in");
            inventory.classList.add("fade-out");
            this.inventoryOpen = !this.inventoryOpen;
            console.log(`Inv open: ${this.inventoryOpen}, Classlist: ${inventory.classList}`);
            return;
        }
        else //open inv
        {
            inventory.classList.remove("fade-out");
            inventory.classList.add("fade-in");
            inventory_playerStats.innerHTML=`
            <p title="Player health" class="unselectable">Health: ${player.health}/${player.maxHealth}</p>
            <p title="Player mana" class="unselectable">Mana: ${player.mana}/${player.maxMana}</p>
            <p title="Player movement speed" class="unselectable">Speed: ${player.speed}</p>
            <p title="Raw bow damage (Before resistances)" class="unselectable">Bow Damage: ${player.bow.damage}</p>
            `;
            this.inventoryOpen = !this.inventoryOpen;
            console.log(`Inv open: ${this.inventoryOpen}, Classlist: ${inventory.classList}`);
            return;
        }
    }

    init()
    {
        this.updateHealth();
        this.updateMana();
        this.updateExp();
    }

    clear()
    {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render()
    {
        this.clear();
        this.renderBomb();
        // this.updateHealth();
        // this.updateMana();
        //this.renderActionBar();
    }

    updateHealth()
    {
        let healthPercent = (player.health/player.maxHealth) * 100;
        if(healthPercent < 0)
            healthPercent = 0;

        healthBar.style.width = `${(player.health / player.maxHealth) * 100}%`
        healthBarText.textContent = `${player.health}/${player.maxHealth}`;      
    }

    updateMana()
    {
        manaBar.style.width = `${(player.mana / player.maxMana) * 100}%`
        manaBarText.textContent = `${player.mana}/${player.maxMana}`;
    }

    updateExp()
    {
        expBar.style.width = `${(player.expHandler.currentExp / player.expHandler.expToNextLevel) * 100}%`
        displayLevel.textContent = player.expHandler.level;
    }

    renderBomb() //SHOULD BE REMOVED AND PUT IN HTML/CSS LIKE REST OF UI
    {
        if(!player.bombData.unlocked)
        return;

        this.ctx.drawImage(ui_image_bomb, player.bombData.rechargeStep*32, 0, 32, 32, this.bombIconPos, 16, 64, 64);
        this.ctx.textAlign="center";
        this.ctx.font = "64px Arial"; 
        this.ctx.fillText(player.bombData.amount, this.bombIconPos - 20, 74);
    }


    triggerActionBarAnimation(element){
        element.classList.add('inv-trans');
        element.classList.add('inv-anim');
    
       setTimeout(function(){
        element.classList.remove('inv-trans');
        element.classList.remove('inv-anim');
       }, 500)
    }

    
}





const ui_image_bomb = new Image();
ui_image_bomb.src = "images/user_interface/ui_bomb.png";

// const ui_image_heart_full = new Image();
// ui_image_heart_full.src = "images/user_interface/ui_heart_full.png";

// const ui_image_heart_empty = new Image();
// ui_image_heart_empty.src = "images/user_interface/ui_heart_empty.png";

// const ui_action_bar_frame = new Image();
// ui_action_bar_frame.src = "images/user_interface/ui_action_bar.png";

