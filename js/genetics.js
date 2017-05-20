class Genetics{
    constructor(chromosomes, fn){
        this.chromosomes = chromosomes;
    }
    returnTrueXPercentUniform(x){
        return random(0,1) < x;
    }
    getMutation(){

    }
    getMutation(){
        var MUTATION_RATE = 0.05;
        var GENOME_PRESERVATION_RATE = 0.2;

        var m = {};
        if ( this.returnTrueXPercentUniform(MUTATION_RATE)) //5% change of mutation appearing
        {
            Object.keys(this.chromosomes).forEach((k)=>{
            m[k]=1;
            });
        }

        


        if ( this.returnTrueXPercentUniform(MUTATION_RATE)) //5% change of mutation appearing
        {
            return {'FOOD_SEARCH_DISTANCE': this.returnTrueXPercentUniform(GENOME_PRESERVATION_RATE)?random(30,80):this.chromoSomes.FOOD_SEARCH_DISTANCE, //20% of a something 'new'
                            'TOP_SPEED':this.returnTrueXPercentUniform(GENOME_PRESERVATION_RATE)?random(2,4):this.chromoSomes.TOP_SPEED,
                            'MAX_FORCE':this.returnTrueXPercentUniform(GENOME_PRESERVATION_RATE)?random(0.05, 0.08):this.chromoSomes.MAX_FORCE,
                            'FLOCK_BEHAVIOUR':this.returnTrueXPercentUniform(GENOME_PRESERVATION_RATE)?Math.floor(random(1,3)):this.chromoSomes.FLOCK_BEHAVIOUR, 
                            'MOUTH_SIZE':this.returnTrueXPercentUniform(GENOME_PRESERVATION_RATE)?Math.floor(random(5,8)):this.chromoSomes.MOUTH_SIZE,
                            'ENDURANCE_FACTOR':this.returnTrueXPercentUniform(GENOME_PRESERVATION_RATE)?random(0.95,1.05):this.chromoSomes.ENDURANCE_FACTOR} ;
        }
        else
        {
             return {'FOOD_SEARCH_DISTANCE':this.chromoSomes.FOOD_SEARCH_DISTANCE,
                     'TOP_SPEED':this.chromoSomes.TOP_SPEED,
                     'MAX_FORCE':this.chromoSomes.MAX_FORCE,
                     'FLOCK_BEHAVIOUR':this.chromoSomes.FLOCK_BEHAVIOUR, 
                     'MOUTH_SIZE':this.chromoSomes.MOUTH_SIZE,
                     'ENDURANCE_FACTOR':this.chromoSomes.ENDURANCE_FACTOR};
        }
    }
}