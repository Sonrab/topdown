class ExperienceHandler
{
    constructor()
    {
        this.level = 1;
        this.currentExp = 0;
        this.expToNextLevel = this.getExpToNextLevel();
    }

    levelUp()
    {
        this.level++;
        this.expToNextLevel = this.getExpToNextLevel(this.level);

        
    }

    addExp(amount)
    {
        this.currentExp += amount;
        while(this.currentExp >= this.expToNextLevel)
        {
            this.currentExp -= this.expToNextLevel;
            this.levelUp()
        }

        userInterface.updateExp();
    }

    getExpToNextLevel()
    {
        return Math.floor(Math.pow(this.level+4, 3) / 5);
    }
}