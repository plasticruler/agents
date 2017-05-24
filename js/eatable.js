class Eatable {
    constructor(position, radius,eatableType, showCentre){
            this.position  = position;        
            
            this.showCentre=showCentre;            
            this.eatableType = eatableType;            
            this.radius = radius||5;            
            this.isDead=false;                 
            this.start = new Date();
            this.tickCounter = 0;
            this.cycleAge = 0;
            this.lifeLimit = 75;                                    
    } 
    isAlive(){
        return !this.isDead;
    }
    kill(){
        this.isDead=true;
    }
    getFoodValue(){
        switch(this.eatableType)
        {
            case 0:
                return 0;
            case 1:
                return 5;
            case 2:
                return -5;
            case 3:
                return -Number.MAX_SAFE_INTEGER;
            default:
                return 0;
        }
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
    getColour(){                
        switch(parseInt(this.eatableType))
        {            
            case 0: //no effect            
                return 'green';                                            
            case 1: //food            
                return 'green';                            
            case 2: //poison            
                return  'red';                            
            case 3://instant death            
                return  'brown'                            
            default:
                return 'blue';
        }                        
    }
    display(){     
            push();                                                 
                strokeWeight(2);                                                         
                translate(this.position.x,this.position.y);                                  
                
                stroke('white');
                fill(this.getColour());                

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