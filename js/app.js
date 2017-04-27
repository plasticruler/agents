/* configs */
var CANVAS_SIZE = 800;
var FRAME_RATE =32;
var entities = [];
function setup() {
    var MAX_RADIUS = 50;
    var ENTITY_COUNT=30;
    createCanvas(CANVAS_SIZE, CANVAS_SIZE);        
    frameRate(FRAME_RATE);   
    for(var i=0;  i < ENTITY_COUNT; i++) 
    {
        var randomColour = color(random(255),random(255),random(255));
        //randomColour =random(['red','white','blue','green']);
        //entities.push(new Ball(random(width/2),random(height/2),random(10,MAX_RADIUS),randomColour));         
        entities.push(new Car(createVector(random(10,CANVAS_SIZE/2),random(10,CANVAS_SIZE/2)),15,35));    
    }                        
}
function drawTrack(){
    entities.forEach((b)=>{
        b.applyBehaviours(entities);
        b.update();        
        b.display(true);
    });    
}
function draw() {
    background(50);  
    angleMode(DEGREES)                      ;
    drawTrack();   
    //console.log(mouseX, mouseY)       ;
}