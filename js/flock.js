class Flock{
    constructor(boids){
        this.boids = boids;
    }
    run(){
        this.boids.forEach((c)=>{
            c.run(this.boids);
        })
    }
    addBoid(c){
        this.boids.push(c);
    }
}