
class RandomByFrequency{
    constructor(d){        
        this.d  = d;        
        //console.log(this.d);
    }
    normalise(){        
        var result = {};
        var sum = Object.keys(this.d).reduce((p,c,i)=>{            
            result[c]=p+this.d[i];            
            return p+this.d[i];
        },0);
        Object.keys(result).forEach((k)=>{ //normalise since we don't know by how much to multiply out when we use random()
                result[k] /= sum; 
        });
        //update dict        
        this.d = result;        
        //console.log(this.d);        
    }
    generate(){                        
        let keys = Object.keys(this.d).sort();               
        let n = random();
        for(let i=0; i < keys.length; i++){ 
            if (this.d[keys[i]] > n)     
            {                                                
                return keys[i]; //don't assume that this is a number
            }                                           
        }                
    }
}