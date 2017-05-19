class Eatable {
    constructor(position, radius,eatableType, showCentre){
            this.position  = position;            
            this.showCentre=showCentre;
            this.eatableType = eatableType||0;//no effect
            this.radius = radius||5;
            this.isDead=false;     
            this.foodValue = 5;//random(5,20);


            this.start = new Date();
            this.tickCounter = 0;
            this.cycleAge = 0;
            this.lifeLimit = 75;            
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
    updateInternals(){
        var elapsed = new Date() - this.start;
        var timeDiff = Math.round(elapsed / 1000);
        this.tickCounter++;
        if (this.tickCounter === FRAME_RATE) //frame rate is x-times per second
        {
            this.cycleAge++;
            this.tickCounter = 0;
        }

        if (this.cycleAge > this.lifeLimit - 1) {
            this.kill(); //the food has gone stale
        }
    }
    run(){
        this.updateInternals();
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