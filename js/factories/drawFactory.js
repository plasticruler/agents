class drawFactory{
    constructor(){
        console.log("drawFactory initialised.");
    }
    drawBoid(self,config){
        push();        
        var direction = self.velocity.heading() - 90;
        self.rotation = direction;
        noFill();
        translate(self.position.x, self.position.y);  //make the origin 0,0
        strokeWeight(1);
        rotate(self.rotation);
        if (config.showSeperationDistance) {
            stroke('red');
            ellipse(0, 0, self.seperationDistance);
        }
        if (config.showAlignmentDistance) {
            stroke('yellow');
            ellipse(0, 0, self.alignmentDistance);
        }
        if (config.showCohesionDistance) {
            stroke('green');
            ellipse(0, 0, self.cohesionDistance);
        }
        if (config.showFoodDistance)
        {
            stroke('orange');
            ellipse(0, 0, self.seeFoodDistance);
        }        

        if (config.showMouthSize)
        {
            stroke('blue');        
            ellipse(0, 0, self.mouthSize);
        }        

        fill(self.colour);
        if (self.isHungry())
            fill('red');

        stroke('white');
        let h = Math.sqrt(Math.pow(self.l, 2) - (Math.pow(self.w / 2.0, 2)));
        beginShape(TRIANGLES);
        vertex(0, h/2.0);
        vertex(self.w / 2.0, -h / 2.0);
        vertex(-self.w / 2.0, -h / 2.0);
        endShape();                                                                                
        line(0, 0, 0, Math.floor(-self.l));

        if (config.showCentre) {
            strokeWeight(4);
            stroke('red');
            point(0, 0);
        }
        pop();
    }
}