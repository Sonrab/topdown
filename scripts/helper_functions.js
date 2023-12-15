function throwAbstractionError(funcName)
{
    throw new Error("Abstract class method " + funcName + " has no implementation.");
}

function addImage(src)
{
    let img = new Image();
    img.src = src;
    return img;
}

function distBetweenPoints(x1, y1, x2, y2)
{
    let x = Math.abs(x1 - x2);
    let y = Math.abs(y1 - y2);
    let dist = pythagorean(x, y);
    return dist;
}

function pythagorean(a, b)
{
    let c = Math.sqrt(a*a + b*b);
    return c;
}

function randomInt(min, max)
{
    return Math.round(Math.random() * (max-min) + min);
}

function randomFloat(min, max)
{
    return Math.random() * (max-min) + min;
}