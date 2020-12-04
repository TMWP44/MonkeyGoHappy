//declaring global variables

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;

var banana ,bananaImage, obstacle, obstacleImage;

var FoodGroup, ObstacleGroup;

var score;

var ground;

function preload(){
  
  //loading images and animations
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png",  "sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
createCanvas(400,400);
  
  //creating monkey
  monkey = createSprite(50,315,10,10);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.15;
  
  obstaclesGroup = new Group();
  fruitGroup = new Group();
}

function draw() {
background(220);
  
  if(gameState === PLAY){
  //creating ground
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  // when space is pressed monkey will jump
  if(keyDown("space")&& monkey.y >= 260) {
        monkey.velocityY = -12;
  }
 
  //adding velocity to the monkey
  monkey.velocityY = monkey.velocityY + 0.8;
  
  //monkey should collide with ground
  monkey.collide(ground);
  
   if (frameCount % 80 === 0) {
   
    banana = createSprite(400,200,10,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -6;
    banana.lifetime = 150;
   
    fruitGroup.add(banana);
  }

if (frameCount % 100 === 0) {
   
    obstacle = createSprite(400,350,10,10);
    obstacle.y = Math.round(random(250,315));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -7;
    obstacle.lifetime = 150;
  
    obstaclesGroup.add(obstacle);
  
  }
   
    if(fruitGroup.isTouching(monkey)){
      fruitGroup.destroyEach();
    }
    
    if(obstaclesGroup.isTouching(monkey)){
    gameState = END;
  }
}else if(gameState === END){
   obstacle.velocityX = 0;
   banana.velocitX = 0;
   obstaclesGroup.setVelocityXEach(0);
   fruitGroup.setVelocityXEach(0);
  
  obstaclesGroup.setLifetimeEach(-1);
  fruitGroup.setLifetimeEach(-1);
  
  ground.velocity = 0;
  
   }
  
 //survivalTime
  var survivalTime = 0;

  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text(" Survival Time "+survivalTime,100,50);
  
  drawSprites();
}  

