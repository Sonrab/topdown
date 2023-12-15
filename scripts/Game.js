class Game
{
    constructor()
    {
        this.musicPlayer = new MusicHandler();
        this.userInterface;
        this.loop;
        this.isPaused = false;
        this.targetFPS = 40;

        //set game scaling.
        this.scaling = {
            x: 2*(window.innerWidth/1920), 
            y: 2*(window.innerHeight/1080)
        };

        console.log(this.scaling);
        this.initList = [];
    }

    setup()
    {
        upgradeList = new UpgradeList();
        loadMaps();
        tileHandler = new TileHandler(); //create tilehandler object
        
        renderer = new Renderer();
        player = new Player(); // Create player object
        userInterface = new UserInterface();
        mapHandler = new MapHandler(maps.get("start"), {x : 12, y : 21}); //create maphandler object
        updateEnd = performance.now();
        
        for(let i = 0; i < this.initList.length; i++)
        {
            this.initList[i].init();
        }

        requestAnimationFrame(renderer.renderScreen);        
    }

    start()
    {
        this.loop = setInterval(run, (1000/this.targetFPS));
    }

    pause()
    {
        this.isPaused = true;
        blackScreen.classList.toggle('show-blackscreen');
        clearInterval(this.loop);
    }

    unpause()
    {
        this.isPaused = false;
        blackScreen.classList.toggle('show-blackscreen');
        this.start();
    }
}