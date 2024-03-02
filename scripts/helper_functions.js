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

function get4WayRotationFromAngle(angle)
{
        //4 way rotation
        if(angle > 315 && angle <= 360 || angle <= 45) //right
            return 'right';
        else if(angle > 45 && angle <= 135) //down
            return 'down';
        else if(angle > 135 && angle <= 225) //left
            return 'left';
        else if(angle > 225 && angle <= 315) //up
            return 'up';

}

function get8WayRotationFromAngle(angle)
{

}

function rectanglesOverlap(rect1, rect2)
{
        //width
        let width = Math.min(rect1.x+rect1.width, rect2.x+rect2.width) > Math.max(rect1.x, rect2.x);
        let height = Math.min(rect1.y+rect1.height, rect2.y+rect2.height) > Math.max(rect1.y, rect2.y);

        if(width && height)
        {
            return true;
        }
    return false;
}

function linesIntersect(line1, line2)
{
    // taken from https://www.jeffreythompson.org/collision-detection/line-rect.php
    //function checks if lines intersect
    
    //this calc was used in both uA and uB
    let secondHalf = (line2.y2-line2.y1) * (line1.x2-line1.x1) - (line2.x2-line2.x1) * (line1.y2-line1.y1); 

    let uA = ( (line2.x2-line2.x1) * (line1.y1-line2.y1) - (line2.y2-line2.y1) * (line1.x1-line2.x1) ) / secondHalf;
    let uB = ( (line1.x2-line1.x1) * (line1.y1-line2.y1) - (line1.y2-line1.y1)*(line1.x1-line2.x1) ) / secondHalf;

    if(uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) //lines intersect
    {
        // let intersectionX = x1 + (uA * (x2-x1));
        // let intersectionY = y1 + (uA * (y2-y1));
        return true;
    }
    return false;
}

function rectangleLineIntersect(rect, line)
{
    if(linesIntersect({x1: rect.topLeft.x, y1: rect.topLeft.y, x2: rect.topRight.x, y2: rect.topRight.y}, line)
    || linesIntersect({x1: rect.topRight.x, y1: rect.topRight.y, x2: rect.bottomRight.x, y2: rect.bottomRight.y}, line)
    || linesIntersect({x1: rect.bottomRight.x, y1: rect.bottomRight.y, x2: rect.bottomLeft.x, y2: rect.bottomLeft.y}, line)
    || linesIntersect({x1: rect.bottomLeft.x, y1: rect.bottomLeft.y, x2: rect.topLeft.x, y2: rect.topLeft.y}, line))
    {
        return true;
    }   
    return false;
}