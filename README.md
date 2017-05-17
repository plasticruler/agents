# agent experiments
Experiments in programming an autonamous agent.

View live [here](https://skrillex581.github.io/agents/).

![alt tag](https://raw.githubusercontent.com/skrillex581/agents/master/agents.gif)

Most of the code comes from watching the videos in [this](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6YHt0dtyf4uiw8tKOxQLvlW) playlist. All I did was rewrite most of it but used ES2015 and added some features to improve my conceptual understanding of the principles.

 
FEATURES:
    - Boids die after a number seconds unless they eat something which restores life by adding a random number of life points.
    - Boids are born each second with a fixed probability. My plan is for them to eventually mate and pass on their phenotypes.
    - Food items are inserted into the simulation each second with a fixed probability.
    - A number of parameters control boid behaviour.
 TODO:
    - Mating and evolution.