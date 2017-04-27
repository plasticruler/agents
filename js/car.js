class Car {
    constructor(position, w,l){
        this.position = position;        
        this.velocity = createVector(0,0);
        this.acceleration = createVector(0,0);

        this.topspeed = random(2,5);
        this.maxForce = 0.2;


        this.w=w;
        this.l=l;        
        this.rotation = 0;        
        this.colour = color(random(0,255),random(0,255),random(0,255));        
    }
    isInCircle(target, radius) {
            //check if the distance from the center of the circle the point is less than the radius
            return Math.sqrt(Math.pow(target.x - this. position.x,2) + Math.pow(target.y - this.position.y, 2)) < radius;
    }

    applyForce(force){
        this.acceleration.add(force);
    }
    applyBehaviours(cars){                            
        var seperateForce = this.seperate(cars,75);    
        seperateForce.mult(2);
        this.applyForce(seperateForce);
        
        var seekForce = this.seek(createVector(mouseX,mouseY));                    
        seekForce.mult(1);        
        this.applyForce(seekForce);
    }
    seek(target){
        var desired = target.sub(this.position);
        desired.normalize();
        desired.mult(this.topspeed);


        var steer = p5.Vector.sub(desired,this.velocity);
        steer.limit(this.maxForce);        
        return steer;        
    }
    seperate(cars,desiredSeperation){
        if (!desiredSeperation)
            desiredSeperation=20;        
        
        var sum = createVector(0,0);
        var count =0;

        cars.forEach((c)=>{
            var d = p5.Vector.dist(this.position, c.position);
            if ((d>0) && (d < desiredSeperation)){
                var diff = p5.Vector.sub(this.position, c.position);
                diff.normalize();
                diff.div(d);
                sum.add(diff);
                count++;
            }
        });
        if (count>0){
            sum.div(count);
            sum.normalize();
            sum.mult(this.topspeed);
            sum.sub(this.velocity);
            sum.limit(this.maxForce);
        }
        return sum;
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
    update(){                                                                            
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.topspeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
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