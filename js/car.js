class Car {
    constructor(position, w,l){
        this.position = position;        
        this.velocity = createVector(random(-1,1),random(-1,1));
        this.acceleration = createVector(0,0);

        this.topspeed = 3.0;//random(1,3);
        this.maxForce = 0.05;

        this.w=w;
        this.l=l;        
        this.rotation = 0;        
        this.colour = color(random(0,255),random(0,255),random(0,255));        
    }
    applyForce(force){
        this.acceleration.add(force);
    }

    isInCircle(target, radius) { //OK
            //check if the distance from the center of the circle the point is less than the radius
            return Math.sqrt(Math.pow(target.x - this. position.x,2) + Math.pow(target.y - this.position.y, 2)) < radius;
    }

    borders() { //OK
    if (this.position.x < -this.w) this.position.x = width+this.w;
    if (this.position.y < -this.l) this.position.y = height+this.l;
    if (this.position.x > width+this.w) this.position.x = -this.w;
    if (this.position.y > height+this.l) this.position.y = -this.l;
  }
    
    run(f,t,obstacles){
        this.flock(f,t,obstacles);
        this.update();
        this.borders();
        this.display(f);
    }
    flock(f,tree,obstacles){ //OK                        
        let seperationRatio=1.5;
        let alignmentRatio=1.0;
        let cohesionRatio=1.0;
        let avoidanceRatio = 1.5 * seperationRatio;
        let seperationDistance = 25;
        let alignmentDistance = 50;
        let cohesionDistance = 40;
        
        if (f)
        {
                if (f.fm)
                {
                    this.applyForce(this.seek(createVector(mouseX,mouseY)));                    
                }
                seperationRatio = f.s;
                alignmentRatio = f.a;
                cohesionRatio = f.c;
                seperationDistance = f.sd;
                alignmentDistance = f.ad;
                cohesionDistance = f.cd;
                avoidanceRatio = f.avoidanceRatio;
        }   
        this.seperationDistance = seperationDistance;
        this.alignmentDistance = alignmentDistance;
        this.cohesionDistance = cohesionDistance;                 
        //only pass in the car collection for surrounding cars
        let sep = this.seperate(tree.findAll(this.position.x,this.position.y,seperationDistance),seperationDistance);
        let ali = this.align(tree.findAll(this.position.x,this.position.y,alignmentDistance),alignmentDistance);
        let coh = this.cohesion(tree.findAll(this.position.x,this.position.y,cohesionDistance),cohesionDistance);
        let av = this.avoidObstacles(obstacles,f.avoidanceRadius);  //TODO:use the tree for this lookup
        sep.mult(seperationRatio);
        ali.mult(alignmentRatio);
        coh.mult(cohesionRatio);
        av.mult(avoidanceRatio);
        
        this.applyForce(av);
        this.applyForce(sep);
        this.applyForce(ali);
        this.applyForce(coh);  
        
    }
     update(){ //OK
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.topspeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    } 
    
    align(cars,a){        //OK
        var sum = createVector(0,0);        
        var count =0;
        //instead of checking each car we will use a quadtree
        cars.forEach((c)=>{
            var d = p5.Vector.dist(this.position,c.position);
            if ((d > 0) && (d < a)){
                sum.add(c.velocity);
                count++;
            }
        });
        if (count>0){
            sum.div(count);
            sum.normalize();
            sum.mult(this.topspeed);
            var steer = p5.Vector.sub(sum,this.velocity);
            steer.limit(this.maxForce);
            return steer;
        }
        else{
            return createVector(0,0);
        }
    }
    seek(target){ //OK
        var desired = p5.Vector.sub(target,this.position);
        desired.normalize();
        desired.mult(this.topspeed);

        var steer = p5.Vector.sub(desired,this.velocity);
        steer.limit(this.maxForce);        
        return steer;        
    }
    cohesion(cars,a){ //OK
        
        var sum = createVector(0,0);
        var count =0;        
        cars.forEach((c)=>{
            var d = p5.Vector.dist(this.position,c.position);
            if ((d > 0) && (d < a)){
                sum.add(c.velocity);
                count++;
            }
        });
        if (count>0){
            sum.div(count);                        
            return this.seek(sum);
        }
        else{
            return createVector(0,0);
        }
    }
    seperate(cars,a){          
        var steer = createVector(0,0);
        var count = 0;        
        cars.forEach((c)=>{
               var d = p5.Vector.dist(this.position,c.position) ;
               if ((d > 0) && (d < a)){
                   var diff = p5.Vector.sub(this.position,c.position);
                   diff.normalize();
                   diff.div(d);
                   steer.add(diff);
                   count++;
               }
        });

        if (count>0){
            steer.div(count);
        }
        if (steer.mag() > 0){
            steer.normalize();
            steer.mult(this.topspeed);
            steer.sub(this.velocity);
            steer.limit(this.maxForce);
        }
        return steer;
        
    }
    avoidObstacles(obstacles,av){
        var steer = createVector(0,0);        
        var count  = 0;
        av = av*1.5;
        obstacles.forEach((o)=>{
            var d = p5.Vector.dist(this.position,o.position); //50 pixels away
            if (d > 0 && d < av){ //obstacle centre within 20 pixels
                var diff = p5.Vector.sub(this.position,o.position);
                diff.normalize();
                diff.div(d); //divide by distance
                steer.add(diff); //add
                count++;
            }            
        });
        if (count > 0){
            steer.div(count);         
        }
        if (steer.mag() > 0){
            steer.normalize();
            steer.mult(this.topspeed);
            steer.sub(this.velocity);
            steer.limit(this.maxForce*2.0);
        }
        return steer;
    }    
    approach(target,boundary){
        var desired = target.sub(this.position);
        var d = desired.mag();
        if (!boundary)
        {
            boundary=100;
        }
        if (d < boundary)
        {
            var m = map(d,0,boundary,0,this.topspeed)
            desired.setMag(m);
        }
        else
            desired.setMag(this.topspeed);

        var steer = desired.sub(this.velocity);
        steer.limit(this.maxForce);        
        return steer;        
    }
      
    rotate(degrees){
        this.rotation = degrees;
    }
    display(f){
            var direction = this.velocity.heading()-90;
            this.rotation = direction; 
            push();                                 
                
                strokeWeight(2);                                         
                noFill();       
                translate(this.position.x,this.position.y);  //make the origin 0,0
                strokeWeight(1);                
                rotate(this.rotation); 
                if (f.showSeperationDistance)  {
                    stroke('red');
                    ellipse(0,0,this.seperationDistance);
                }
                if (f.showAlignmentDistance){
                    stroke('yellow');
                    ellipse(0,0,this.alignmentDistance);
                }
                if (f.showCohesionDistance){
                    stroke('green');
                    ellipse(0,0,this.cohesionDistance);
                }
                
                fill(this.colour);
                
                stroke('white');                
                let h = Math.sqrt(Math.pow(this.l,2) - (Math.pow(this.w/2.0,2)));
                beginShape(TRIANGLES);
                    vertex(0, h);
                    vertex(-this.w/2,-h/2);
                    vertex(this.w/2,-h/2);
                endShape();
                //rect(-this.w/2,-this.l/2, this.w,this.l);                                                                            

                line(-Math.floor(this.w/2)-Math.floor(0.3*this.w), 
                      -Math.floor(this.l/2)-1,
                      Math.floor(this.w/2)+Math.floor(0.3*this.w), 
                      -Math.floor(this.l/2)-1);                                 
            
                line(0,0,0,Math.floor(-this.l));
                
                if (f.showCentre)
                {
                    strokeWeight(4);
                    stroke('red');
                    point(0,0);
                }                                                     
            pop();            
    }
}