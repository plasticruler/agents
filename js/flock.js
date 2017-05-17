class Flock {
    constructor(boids, obstacles, food) {
        this.boids = boids;
        this.obstacles = obstacles;
        this.food = food;
    }
    y(b) {
        return b.position.y;
    }
    x(b) {
        return b.position.x;
    }
    run(f) {
        //remove dead boids        
        this.boids = this.boids.filter((b) => {
            return !b.isDead;
        });
        this.food = this.food.filter((f) => {
            return !f.isDead;
        });

        //we need to clear out the tree before run is called as the 
        //boid positions change
        var boidTree = d3.quadtree()
            .x(this.x)
            .y(this.y);
        var obstacleTree = d3.quadtree()
            .x(this.x)
            .y(this.y);
        var foodTree = d3.quadtree()
            .x(this.x)
            .y(this.y);

        boidTree.addAll(this.boids);
        obstacleTree.addAll(this.obstacles);
        foodTree.addAll(this.food);        
        
        this.food.forEach((f)=>
        {
            f.run();
        })
        this.obstacles.forEach((o) => {
            o.run();
        });
        this.boids.forEach((c) => {
            c.run(f, boidTree, obstacleTree,foodTree);
        });
        
    }
    addFood(f) {
        this.food.push(f);
    }

    addBoid(c) {
        this.boids.push(c);
    }
}