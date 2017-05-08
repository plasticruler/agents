/* configs */
var CANVAS_SIZE = 620;
var FRAME_RATE =60;
var entities = [];
var obstacles = [];
var flock;
var controlPanel;
var flockBehaviour = {
    s:1.5,
    a:1.0,
    c:1.0,
    avoidanceRatio:2.5,
    sd:25,
    ad:50,
    cd:50,
    followMouse:false,
    showCentre:false,
    showSeperationDistance:false,
    showCohesionDistance:false,
    showAlignmentDistance:false,
    maxForce:0.05,
    topSpeed:3.0,
    avoidanceRadius:25
};
var treeProto= d3.quadtree.prototype;
treeProto.findAll = tree_findAll;
function setup() {
    var MAX_RADIUS = 50;
    var ENTITY_COUNT = 30;
    var OBSTACLE_COUNT = random(0,10);
    

    createCanvas(CANVAS_SIZE, CANVAS_SIZE);        
    controlPanel = QuickSettings.create(CANVAS_SIZE+10,20,"Options");    
    controlPanel.addRange("Seperation force",0,5,flockBehaviour.s,0.1,()=>{
        settingChangedCallback();
    });
    controlPanel.addRange("Alignment force",0,5,flockBehaviour.a,0.1,()=>{
        settingChangedCallback();
    });
    controlPanel.addRange("Cohesion force",0,4,flockBehaviour.c,0.1,()=>{
        cohesionChangedCallback();
    });

    controlPanel.addRange("Seperation distance",0,100,flockBehaviour.sd,5,()=>{
        settingChangedCallback();
    });
    controlPanel.addRange("Alignment distance",0,100,flockBehaviour.ad,5,()=>{
        settingChangedCallback();
    });
    controlPanel.addRange("Cohesion distance",0,100,flockBehaviour.cd,5,()=>{
        settingChangedCallback();
    });
    controlPanel.addBoolean("Show Seperation Distance",flockBehaviour.showSeperationDistance,()=>{
        settingChangedCallback();
    });
    controlPanel.addBoolean("Show Alignment Distance",flockBehaviour.showAlignmentDistance,()=>{
        settingChangedCallback();
    });
    controlPanel.addBoolean("Show Cohesion Distance",flockBehaviour.showCohesionDistance,()=>{
        settingChangedCallback();
    });
    controlPanel.addBoolean("Follow mouse",flockBehaviour.followMouse,()=>{
        settingChangedCallback();
    });
    controlPanel.addBoolean("Show Centre",flockBehaviour.showCentre,()=>{
        settingChangedCallback();
    });

    frameRate(FRAME_RATE);   
    
    for(var i=0;  i < ENTITY_COUNT; i++) 
    {
        var randomColour = color(random(255),random(255),random(255));        
        entities.push(new Car(createVector(random(10,CANVAS_SIZE),random(10,CANVAS_SIZE)),5,10));    
    }                        
    for(var i=0;  i < OBSTACLE_COUNT; i++) 
    {        
        obstacles.push(new Obstacle(createVector(random(10,CANVAS_SIZE),random(10,CANVAS_SIZE)),flockBehaviour.avoidanceRadius));    
    }                        
    flock = new Flock(entities,obstacles);
    
}
function settingChangedCallback(){
    console.log(controlPanel);
    flockBehaviour.fm = controlPanel.getValue("Follow mouse");    
    flockBehaviour.sd = parseFloat(controlPanel.getValue("Seperation distance"));
    flockBehaviour.ad = parseFloat(controlPanel.getValue("Alignment distance"));
    flockBehaviour.cd = parseFloat(controlPanel.getValue("Cohesion distance"));
    flockBehaviour.s = parseFloat(controlPanel.getValue("Seperation force"));
    flockBehaviour.a = parseFloat(controlPanel.getValue("Alignment force"));
    flockBehaviour.c = parseFloat(controlPanel.getValue("Cohesion force"));
    flockBehaviour.showAlignmentDistance = controlPanel.getValue("Show Alignment Distance");
    flockBehaviour.showCohesionDistance = controlPanel.getValue("Show Cohesion Distance");
    flockBehaviour.showSeperationDistance = controlPanel.getValue("Show Seperation Distance");
    flockBehaviour.showCentre = controlPanel.getValue("Show Centre");
    flockBehaviour.followMouse = controlPanel.getValue("Follow Mouse");
}

function mouseDragged(){
    if ((mouseX > 0 && mouseX < CANVAS_SIZE) && (mouseY>0 && mouseY < CANVAS_SIZE))
        flock.addBoid(new Car(createVector(mouseX,mouseY),5,10));       
}
function mouseClicked(){

}

function draw() {
    background(50);  
    angleMode(DEGREES)                      ;
    flock.run(flockBehaviour);    
    obstacles.forEach(o=>{
        o.display();
    })
    //console.log(mouseX, mouseY)       ;
}