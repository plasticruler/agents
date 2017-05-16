class Eatable {
    constructor(position, radius,eatableType, showCentre){
            this.position  = position;            
            this.showCentre=showCentre;
            this.eatableType = eatableType||0;//no effect
            this.radius = radius||5;
            this.isDead=false;     
            this.foodValue = random(5,20);

    }
    forceType(){
        return this.forceType;
    }
    isAlive(){
        return !this.isDead;
    }
    kill(){
        this.isDead=true;
    }
    run(){
        this.display();
    }
    display(){     
            push();                                                 
                strokeWeight(2);                                                         
                translate(this.position.x,this.position.y);                                  
                
                stroke('white');
                fill(this.eatableType==0?'green':'yellow');                
                
                ellipse(0,0,this.radius);                                                
                
                if (this.showCentre)
                {
                    strokeWeight(4);
                    stroke('red');
                    point(0,0);
                }                                                     
            pop();            
    }
}