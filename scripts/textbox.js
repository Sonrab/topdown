function CTextbox()
{
    this.width = 200;
    this.height = 75;
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    this.text = "You found double jump!";

};

CTextbox.prototype.render = function()
{
    ctx.strokeRect(this.x - (this.width/2), this.y - (this.height/2));
    ctx.strokeRect(canvas.width/2-100, canvas.height/4 - 50, 200, 60);
    ctx.fillText(this.text, canvas.width/2, canvas.height/4);
};