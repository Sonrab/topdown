const healthBarText = document.querySelector("#healthBarText");
const healthBar = document.querySelector("#healthBar");

const manaBarText = document.querySelector("#manaBarText");
const manaBar = document.querySelector("#manaBar");

class UserInterface
{
    constructor()
    {
        this.canvas = document.getElementById('user_interface_canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    
        this.images = new Map();
        this.bombIconPos = this.canvas.width - 96;
    
        this.actionbarPosition = {
            x : this.canvas.width/2 - 256,
            y: this.canvas.height - 102
        };

        this.init();
    }

    init()
    {
        this.updateHealth();
        this.updateMana();
    }

    clear()
    {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render()
    {
        this.clear();
        this.renderBomb();
        //this.updateHealth();
        this.updateMana();
        //this.renderActionBar();
    }

    updateHealth()
    {
        console.log("aaaaaaa");
        let healthPercent = (player.health/player.maxHealth) * 100;
        if(healthPercent < 0)
            healthPercent = 0;
        
        healthBarText.innerHTML = `${player.health}/${player.maxHealth}`;
        healthBar.style.background = `linear-gradient(to right, rgb(155, 0, 0) 0%, rgb(190, 0, 0) ${healthPercent}%,  rgb(50, 50, 50) ${healthPercent}%,  rgb(50, 50, 50) 100%)`;
        
    }

    updateMana()
    {
        let manaPercent = (player.mana/player.maxMana) * 100;
        manaBarText.innerHTML = `${player.mana}/${player.maxMana}`;
        manaBar.style.background = `linear-gradient(to right, rgb(0, 0, 180) 0%, rgb(0, 0, 215) ${manaPercent}%,  rgb(50, 50, 50) ${manaPercent}%,  rgb(50, 50, 50) 100%)`;
    }

    renderBomb()
    {
        if(!player.bombData.unlocked)
        return;

        this.ctx.drawImage(ui_image_bomb, player.bombData.rechargeStep*32, 0, 32, 32, this.bombIconPos, 16, 64, 64);
        this.ctx.textAlign="center";
        this.ctx.font = "64px Arial"; 
        this.ctx.fillText(player.bombData.amount, this.bombIconPos - 20, 74);
    }

    renderActionBar()
    {
        this.ctx.drawImage(ui_action_bar_frame, this.actionbarPosition.x, this.actionbarPosition.y);
    }

    
}





const ui_image_bomb = new Image();
ui_image_bomb.src = "images/user_interface/ui_bomb.png";

// const ui_image_heart_full = new Image();
// ui_image_heart_full.src = "images/user_interface/ui_heart_full.png";

// const ui_image_heart_empty = new Image();
// ui_image_heart_empty.src = "images/user_interface/ui_heart_empty.png";

const ui_action_bar_frame = new Image();
ui_action_bar_frame.src = "images/user_interface/ui_action_bar.png";

