class StatusPanel {    
    constructor(x,y,panelWidth, barWidthRatio, maxLabelWidthRatio)
    {

        this.panelWidth= panelWidth||100;
        this.BAR_WIDTH=this.panelWidth * (0.40||barWidthRatio);      
        this.MAX_LABEL_WIDTH=this.panelWidth * (0.70||maxLabelWidthRatio);        
        this.x = x;
        this.y = y;
        this.data = [];
        this.start = new Date();
    }
    addLine(t,v,max,showBar, invertIndicator){
        this.data.push(
            {
                    caption:t,
                    value:v||0,
                    max:max||10,
                    showBar:showBar||false,
                    invertIndicator:invertIndicator||false
            });
    }
    setCaptionValue(c,value,max){                
        let n = this.data.filter(
            (d)=>{            
            return d.caption==c
        }
        );        
        if (n && n[0])
        {
            n[0].value=value;
            n[0].max=max;
        }
    }
    display(){        
        noFill();        
        let elapsed = new Date()-this.start;
        let timeDiff = Math.round(elapsed/1000) ; 

        

        rect(this.x,this.y,this.panelWidth,textSize()*(this.data.length+1)+5);        
        
        this.data.forEach((c,i)=>{            
                let myY = this.y+15+i*15;
                fill(255);
                text(c.caption,this.x+5,myY);
                fill(c.invertIndicator?'red':'green');
                rect(this.MAX_LABEL_WIDTH,myY-10,this.BAR_WIDTH,10);
                fill(!c.invertIndicator?'red':'green');
                if (c.showBar)
                {                    
                    let j = (c.value/c.max)*this.BAR_WIDTH;
                    j = Math.min(j,this.BAR_WIDTH);
                    rect(this.MAX_LABEL_WIDTH,myY-10,j,10);                
                }                
                fill(255);
                text(c.value,this.MAX_LABEL_WIDTH+10,myY);
        });
    }
}