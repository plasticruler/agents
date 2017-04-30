class Car {
    constructor(position, w,l){
        this.position = position;        
        this.velocity = createVector(random(-3,15),random(-3,15));
        this.acceleration = createVector(0,0);

        this.topspeed = random(1,5);
        this.maxForce = 0.05;

        this.neighbourDistance = 15;
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
    if (this.position.y > height+this.l) this.position.y = -this.y;
  }
    
    run(cars){
        this.flock(cars);
        this.update();
        this.borders();
        this.display();
    }
    flock(cars){ //OK
        //this.applyForce(this.seek(createVector(mouseX,mouseY)));

        var sep = this.seperate(cars);
        var ali = this.align(cars);
        var coh = this.cohesion(cars);

        sep.mult(2.5);
        ali.mult(1.4);
        coh.mult(0.5);

        this.applyForce(sep);
        this.applyForce(ali);
        this.applyForce(coh);

        
        this.borders();
    }
     update(){ //OK
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.topspeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    } 
    applyBehaviours(cars){                            
        var seperateForce = this.seperate(cars,this.neighbourDistance);            
        var seekForce = this.seek(createVector(mouseX,mouseY));                    
        
        seperateForce.mult(2);                
        seekForce.mult(1);        
        this.applyForce(seekForce);
        this.applyForce(seperateForce);
    }
    align(cars){        //OK
        var sum = createVector(0,0);
        var nd = 50.0;
        var count =0;
        cars.forEach((c)=>{
            var d = p5.Vector.dist(this.position,c.position);
            if ((d > 0) && (d < nd)){
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
        var desired = target.sub(this.position);
        desired.normalize();
        desired.mult(this.topspeed);


        var steer = p5.Vector.sub(desired,this.velocity);
        steer.limit(this.maxForce);        
        return steer;        
    }
    cohesion(cars){ //OK
        
        var sum = createVector(0,0);
        var count =0;
        var nd = 50.0;
        cars.forEach((c)=>{
            var d = p5.Vector.dist(this.position,c.position);
            if ((d > 0) && (d < nd)){
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
    seperate(cars){        
        var steer = createVector(0,0);
        var count = 0;
        var nd = 35.0;
        cars.forEach((c)=>{
               var d = p5.Vector.dist(this.position,c.position) ;
               if ((d > 0) && (d < nd)){
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
    display(showCentre){
            var direction = this.velocity.heading();
            this.rotation = direction+90; 
            push();                                 
                stroke('white');
                strokeWeight(2);                                         
                noFill();       
                
                translate(this.position.x,this.position.y);  //make the origin 0,0
                strokeWeight(1);                
                rotate(this.rotation);   
                fill(this.colour);
                rect(-this.w/2,-this.l/2, this.w,this.l);                                                                            

                line(-Math.floor(this.w/2)-Math.floor(0.3*this.w), 
                      -Math.floor(this.l/2)-1,
                      Math.floor(this.w/2)+Math.floor(0.3*this.w), 
                      -Math.floor(this.l/2)-1);                                 
            
                line(0,0,0,Math.floor(-this.l));

                if (showCentre)
                {
                    strokeWeight(4);
                    stroke('red');
                    point(0,0);
                }                                                     
            pop();            
    }
}