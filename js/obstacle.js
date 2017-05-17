class Obstacle {
    constructor(position, radius,forceType, showCentre){
            this.position  = position;            
            this.showCentre=showCentre;
            this.forceType = forceType||0;//avoide           
            this.radius = radius||20;
    }
    forceType(){
        return this.forceType;
    }
    run(){
        this.display();
    }
    display(){     
            push();                                                 
                strokeWeight(2);                                                         
                translate(this.position.x,this.position.y);                                  
                
                stroke(this.forceType==0?'red':'green');
                fill(this.forceType==0?'red':'green');                
                
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