
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground

function preload(){
  
  
  monkey_running=  
  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(400,400)
  
  
  var survivalTime=0;
  
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
  
  monkey=createSprite(80,315,20,20)
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.1
  
  ground=createSprite(400,350,900,10)
  ground.x=ground.width/2
  ground.velocityX=-4
  console.log(ground.x)
  
  score=0;
}


function draw() {
  
  background(255);
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  
   
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
   
  spawnfood();
    spawnobstacles();
 
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);        
  
  
    if(obstacleGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);

    }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
}


function spawnfood () {
 
  if (frameCount%80===0) {
      
    banana=createSprite (600,250,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaImage);
    banana.velocityX = -5;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    banana.scale=0.1;
    banana.lifetime = 300;
    FoodGroup.add(banana)
   }
}

function spawnobstacles(){
  if (frameCount%300===0) {
    obstacle=createSprite (800,320,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;
    
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    obstacle.scale=0.2;
    obstacle.lifetime =300;
    obstacleGroup.add(obstacle) 
  }
}





