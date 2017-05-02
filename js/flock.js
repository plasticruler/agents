class Flock{
    constructor(boids){
        this.boids = boids;
    }
    run(f){
        this.boids.forEach((c)=>{
            c.run(this.boids,f);
        })
    }
    addBoid(c){
        this.boids.push(c);
    }
}