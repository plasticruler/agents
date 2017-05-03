class Flock{
    constructor(boids){
        this.boids = boids;
    
    
    }
    y(b){    
        return b.position.y;
    }
    x(b){    
        return b.position.x;
    }
    run(f){
        //we need to clear out the tree before run is called as the 
        //boid positions change
        this.tree = d3.quadtree()
            .x(this.x)
            .y(this.y)           
        this.tree.addAll(this.boids);    
        this.boids.forEach((c)=>{
            c.run(this.boids,f,this.tree);
        });        
    }
    addBoid(c){
        this.boids.push(c);
        this.tree.add(c);
    }
}