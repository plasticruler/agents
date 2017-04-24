/* configs */
var CANVAS_SIZE = 800;
var FRAME_RATE =32;
var balls = [];
function setup() {
    var MAX_RADIUS = 50;
    var BALL_COUNT=1;
    createCanvas(CANVAS_SIZE, CANVAS_SIZE);        
    frameRate(FRAME_RATE);   
    for(var i=0; i < BALL_COUNT; i++) 
    {
        var randomColour = color(random(255),random(255),random(255));
        randomColour =random(['red','white','blue','green']);
        balls.push(new Ball(random(width/2),random(height/2),random(10,MAX_RADIUS),randomColour));         
    }
    var car = new Car(createVector(50,50),15,45);    
    balls.push(new Car(createVector(50,50),15,45));    
    balls.push(new Car(createVector(100,110),15,45));    
    
        
}
function drawTrack(){
    balls.forEach((b)=>{
        //b.update();         
        //b.display();
    });

    for(var i=0; i < balls.length; i++)    {
        balls[i].update();
        balls[i].display(true);
    }
}
function draw() {
    background(50);  
    angleMode(DEGREES)                      ;
    drawTrack();   
    //console.log(mouseX, mouseY)       ;
}