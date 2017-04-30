class Ball {
    constructor(x,y,radius,colour){
        if (!radius)
            this.radius = random(10,50);        

        this.radius = radius;
        this.colour = colour;        
        
        this.location = createVector(x,y);
        this.velocity = createVector(random(-5,15),random(-5,5));//createVector(10.5,-2);
        this.acceleration = createVector();
        this.topspeed=5; 
        
    }
    update(){
        var mouse = createVector(mouseX,mouseY);        
        this.acceleration = p5.Vector.sub(mouse,this.location);
        this.acceleration.setMag(0.2); 
        
        this.velocity.add(this.acceleration);
        this.velocity.limit(5);
        
        this.location.add(this.velocity);        
        this.bounce();        
    }
    display(){        
        fill(this.colour);
        ellipse(this.location.x,this.location.y,this.radius,this.radius);
    }
    bounce(){
        if (((this.location.x+this.radius/2) > width) || ((this.location.x-(this.radius/2)) < 0)){
            this.velocity.x = this.velocity.x * -1;
        }

        if (((this.location.y+this.radius/2) > height) || ((this.location.y-(this.radius/2)) < 0)){
            this.velocity.y = this.velocity.y * -1;
        }
    }
}
