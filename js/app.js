/* configs */
let CANVAS_SIZE = 800;
let FRAME_RATE = 60;
let LIFE_LIMIT_FOR_ENTITIES = 50;
let entities = [];
let obstacles = [];
let eatables = [];
let flock;
let tickCounter = 0;
let startingTime = new Date();
let controlPanel;
let statusPanel;
let flockBehaviour = {
    s: 1.5,
    a: 1.0,
    c: 0.0,
    avoidanceRatio: 2.5,
    sd: 25,
    ad: 50,
    cd: 50,
    followMouse: false,
    showCentre: false,
    showSeperationDistance: false,
    showCohesionDistance: false,
    showAlignmentDistance: false,
    maxForce: 0.05,
    topSpeed: 3.0,
    avoidanceRadius: 25,
    continueFlockingWhileHungry: true,
    showFoodDistance: false,
    showMouthSize: false,
    generateRandom: true
};
let treeProto = d3.quadtree.prototype;
treeProto.findAll = tree_findAll;
let FOOD_GENERATION_FREQUENCY = { //numbers dont have to add up to 100
    0: 10,
    1: 75,
    2: 10,
    3: 5
}
let foodCounter = {};
let foodGenerator = new RandomByFrequency(FOOD_GENERATION_FREQUENCY);
function setup() {
    var MAX_RADIUS = 50;
    var ENTITY_COUNT = 1;
    var OBSTACLE_COUNT = random(0, 2);
    var EATABLE_COUNT = random(20, ENTITY_COUNT);
    var x = 20, y = 20;
    foodGenerator.normalise();
    statusPanel = new StatusPanel(x, y, 100);
    statusPanel.addLine("W. Age");
    statusPanel.addLine("Pop.");
    statusPanel.addLine("Food");
    statusPanel.addLine("Oldest");
    statusPanel.addLine("Avg Age", 0, LIFE_LIMIT_FOR_ENTITIES, true, false);

    createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    controlPanel = QuickSettings.create(CANVAS_SIZE + 10, 10, "Options");

    controlPanel.addRange("Seperation force", 0, 5, flockBehaviour.s, 0.1, () => {
        settingChangedCallback();
    });
    controlPanel.addRange("Alignment force", 0, 5, flockBehaviour.a, 0.1, () => {
        settingChangedCallback();
    });
    controlPanel.addRange("Cohesion force", 0, 4, flockBehaviour.c, 0.1, () => {
        settingChangedCallback();
    });

    controlPanel.addRange("Seperation distance", 0, 100, flockBehaviour.sd, 5, () => {
        settingChangedCallback();
    });
    controlPanel.addRange("Alignment distance", 0, 100, flockBehaviour.ad, 5, () => {
        settingChangedCallback();
    });
    controlPanel.addRange("Cohesion distance", 0, 100, flockBehaviour.cd, 5, () => {
        settingChangedCallback();
    });
    controlPanel.addBoolean("Show Seperation Distance", flockBehaviour.showSeperationDistance, () => {
        settingChangedCallback();
    });
    controlPanel.addBoolean("Show Alignment Distance", flockBehaviour.showAlignmentDistance, () => {
        settingChangedCallback();
    });
    controlPanel.addBoolean("Show Cohesion Distance", flockBehaviour.showCohesionDistance, () => {
        settingChangedCallback();
    });
    controlPanel.addBoolean("Show Food Distance", flockBehaviour.showFoodDistance, () => {
        settingChangedCallback();
    });
    controlPanel.addBoolean("Flock despite hunger", flockBehaviour.continueFlockingWhileHungry, () => {
        settingChangedCallback();
    });
    controlPanel.addBoolean("Show Mouth Size", flockBehaviour.showMouthSize, () => {
        settingChangedCallback();
    });

    controlPanel.addBoolean("Follow Mouse", flockBehaviour.followMouse, () => {
        settingChangedCallback();
    });
    controlPanel.addBoolean("Birth new", flockBehaviour.generateRandom, () => {
        settingChangedCallback();
    });
    controlPanel.addBoolean("Show Centre", flockBehaviour.showCentre, () => {
        settingChangedCallback();
    });
    controlPanel.addHTML("About", "<ul><li>Refresh page to randomize things up a bit.</li><li>Drag mouse to create more boids.</li></ul>")
    frameRate(FRAME_RATE);

    for (var i = 0; i < ENTITY_COUNT; i++) {
        var randomColour = color(random(255), random(255), random(255));
        entities.push(new Creature(createVector(random(10, CANVAS_SIZE),
            random(10, CANVAS_SIZE)), 10, 20, LIFE_LIMIT_FOR_ENTITIES));
    }
    for (var i = 0; i < OBSTACLE_COUNT; i++) {
        obstacles.push(new Obstacle(createVector(random(10, CANVAS_SIZE), random(10, CANVAS_SIZE)), flockBehaviour.avoidanceRadius));
    }
    for (var i = 0; i < EATABLE_COUNT; i++) {
        eatables.push(new Eatable(createVector(random(10, CANVAS_SIZE), random(10, CANVAS_SIZE)), 10, foodGenerator.generate()));
    }
    flock = new Flock(entities, obstacles, eatables);

}
function mode(arr) {
    return arr.sort((a, b) =>
        arr.filter(v => v === a).length
        - arr.filter(v => v === b).length
    ).pop();
}
function settingChangedCallback() {
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
    flockBehaviour.continueFlockingWhileHungry = controlPanel.getValue("Flock despite hunger");
    flockBehaviour.showFoodDistance = controlPanel.getValue("Show Food Distance");
    flockBehaviour.showMouthSize = controlPanel.getValue("Show Mouth Size");
    flockBehaviour.generateRandom = controlPanel.getValue("Birth new");
}

function mouseDragged() {
    if ((mouseX > 0 && mouseX < CANVAS_SIZE) && (mouseY > 0 && mouseY < CANVAS_SIZE))
        flock.addCreature(new Creature(createVector(mouseX, mouseY), 5, 10));
}
function mouseClicked() {

}
function shouldGenerateFood() {
    return random() <= 0.95; //95% chance of a new food item being generated each second
}
function shouldGenerateBoid() {
    if (flockBehaviour.generateRandom)
        return random(0, 1) <= 0.3;   //30% chance each second of population growth
    return false;
}

function updateInternals() {

    var elapsed = new Date() - startingTime;
    var timeDiff = Math.round(elapsed / 1000);
    tickCounter++;
    if (!(tickCounter % FRAME_RATE)) //frame rate is x-times per second
    {
        if (shouldGenerateFood()) {
            flock.food.push(new Eatable(createVector(random(10, CANVAS_SIZE), random(10, CANVAS_SIZE)), 10, foodGenerator.generate()));
            flock.food.push(new Eatable(createVector(random(10, CANVAS_SIZE), random(10, CANVAS_SIZE)), 10, foodGenerator.generate()));
        }
        if (shouldGenerateBoid()) {
            flock.creatures.push(new Creature(createVector(random(10, CANVAS_SIZE),
                random(10, CANVAS_SIZE)), 5, 10, LIFE_LIMIT_FOR_ENTITIES));
        }
        tickCounter = 0;
        console.log(flock.creatures[0].foodCounts);
    }
}

function draw() {
    updateInternals();
    background(50);
    angleMode(DEGREES);
    flock.run(flockBehaviour);
    obstacles.forEach(o => {
        o.display();
    });
    noFill();
    statusPanel.setCaptionValue("W. Age", Math.round((new Date() - startingTime) / 1000));
    statusPanel.setCaptionValue("Food", flock.food.length);
    statusPanel.setCaptionValue("Pop.", flock.creatures.length);
    statusPanel.setCaptionValue("Oldest", Math.max.apply(Math, flock.creatures.map(function (o) {
        return o.totalAge;
    })));
    statusPanel.setCaptionValue("Avg Age", Math.floor(flock.creatures.reduce(
        (p, c) => {
            return p + c.totalAge;
        }
        , 0) / flock.creatures.length));
    statusPanel.display();
}