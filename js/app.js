/* configs */
var CANVAS_SIZE = 640;
var FRAME_RATE =32;
var entities = [];
var flock;
var controlPanel;
var flockBehaviour = {
    s:1.5,
    a:1.0,
    c:0.5,
    sd:50,
    ad:35,
    cd:20
};
function setup() {
    var MAX_RADIUS = 50;
    var ENTITY_COUNT = 20;

    createCanvas(CANVAS_SIZE, CANVAS_SIZE);        
    controlPanel = QuickSettings.create(CANVAS_SIZE+10,20,"Options");    
    controlPanel.addRange("Seperation force",0,5,2.5,0.1,()=>{
        seperationChangedCallback();
    });
    controlPanel.addRange("Alignment force",0,5,1.4,0.1,()=>{
        alignmentChangedCallback();
    });
    controlPanel.addRange("Cohesion force",0,4,0.5,0.1,()=>{
        cohesionChangedCallback();
    });


    controlPanel.addRange("Seperation distance",0,100,50,5,()=>{
        seperationDistanceChangedCallback();
    });
    controlPanel.addRange("Alignment distance",0,100,50,5,()=>{
        alignmentDistanceChangedCallback();
    });
    controlPanel.addRange("Cohesion distance",0,100,50,5,()=>{
        cohesionDistanceChangedCallback();
    });
    controlPanel.addBoolean("Follow mouse",false,()=>{
        followMouseChangedCallback();
    });



    frameRate(FRAME_RATE);   
    
    for(var i=0;  i < ENTITY_COUNT; i++) 
    {
        var randomColour = color(random(255),random(255),random(255));        
        entities.push(new Car(createVector(random(10,CANVAS_SIZE/2),random(10,CANVAS_SIZE/2)),5,10));    
    }                        
    flock = new Flock(entities);
}
function followMouseChangedCallback(){
    flockBehaviour.fm = controlPanel.getValue("Follow mouse");    
}
function seperationDistanceChangedCallback(){
    flockBehaviour.sd = parseFloat(controlPanel.getValue("Seperation distance"));
    
}
function alignmentDistanceChangedCallback(){
    flockBehaviour.ad = parseFloat(controlPanel.getValue("Alignment distance"));
    
}
function cohesionDistanceChangedCallback(){
    flockBehaviour.cd = parseFloat(controlPanel.getValue("Cohesion distance"));
    
}
function seperationChangedCallback(){
    flockBehaviour.s = parseFloat(controlPanel.getValue("Seperation force"));
}
function alignmentChangedCallback(){
    flockBehaviour.a = parseFloat(controlPanel.getValue("Alignment force"));
}
function cohesionChangedCallback(){
    flockBehaviour.c = parseFloat(controlPanel.getValue("Cohesion force"));
}

function mouseDragged(){
    if ((mouseX > 0 && mouseX < CANVAS_SIZE) && (mouseY>0 && mouseY < CANVAS_SIZE))
        flock.addBoid(new Car(createVector(mouseX,mouseY),5,10));       
}

function draw() {
    background(50);  
    angleMode(DEGREES)                      ;
    flock.run(flockBehaviour);    
    //console.log(mouseX, mouseY)       ;
}