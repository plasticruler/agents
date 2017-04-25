class Car {
    constructor(position, w,l){
        this.position = position;        
        this.velocity = createVector(random(-5,5),random(-5,5));
        this.acceleration = createVector();
        this.topspeed = random(2,15);
        this.w=w;
        this.l=l;        
        this.rotation = 0;
    }
    update(){        
        var mouse = createVector(mouseX,mouseY);                        
        this.acceleration = p5.Vector.sub(mouse,this.position);
        //this.acceleration.setMag(100); 
        
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.topspeed);        
        
        this.position.add(this.velocity);        
        //line(mouse.x,mouse.y, this.position.x,this.position.y);
        var direction = mouse.sub(this.position);                                        
        this.rotation = direction.heading()+90;
    }
    rotate(degrees){
        this.rotation = degrees;
    }
    display(showCentre){
            push();                                 
                stroke('green');
                strokeWeight(2);                                         
                noFill();       
                
                translate(this.position.x,this.position.y);  //make the origin 0,0
                strokeWeight(1);                
                rotate(this.rotation);        
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