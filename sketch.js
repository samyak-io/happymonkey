//Global Variables
var obstacleGroup, obstacleImage, bananaGroup, bananaImage,   playerMonkey, backgr, backgrImage, player_running;
var ground, groundImage;
var score = 0;

function preload(){
  backgrImage = loadImage("jungle.jpg");
  obstacleImage = loadImage("stone.png");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("Banana.png");
  groundImage = loadImage("ground.jpg");
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
}


function setup() {
  createCanvas(800,400);
  
  backgr = createSprite(0,140,800,400);
  backgr.velocityX = - 5;
  backgr.x = backgr.width/2;
  backgr.addImage(backgrImage);
  
  ground = createSprite(400,350,800,10); 
  ground.velocityX = -4;     
  ground.x = ground.width/2; 
  ground.visible = false;
  
  playerMonkey = createSprite(100,340,0,0);
  playerMonkey.addAnimation("running", player_running);
  playerMonkey.scale = 0.12;
}


function draw(){
 background(255); 
   
 if(backgr.x < 210) {
   backgr.x = Math.floor(backgr.width/2);
  }
  
 if (ground.x < 200) {
    ground.x = ground.width/2;
  }
  
 //if banana touches the monkey increase the score, destroy the food 
 if (bananaGroup.collide(playerMonkey)) {
    score = score + 2; 
    bananaGroup.destroyEach();
  }
  
 if (keyDown("space") && playerMonkey.y > 283) {
    playerMonkey.velocityY = -15;
  }
   console.log(playerMonkey.y);
  
   //giving gravity 
   playerMonkey.velocityY = playerMonkey.velocityY + 0.8;
 
   //monkey collides with ground
   playerMonkey.collide(ground);
  
  switch(score) {
    case 10: playerMonkey.scale = 0.14;
             break;
    case 20: playerMonkey.scale = 0.16;
             break;       
    case 30: playerMonkey.scale = 0.18;
             break;
    case 40: playerMonkey.scale = 0.2;
             break;
    default: break;
  }
  
  if(obstacleGroup.isTouching(playerMonkey)) {
    playerMonkey.scale = 0.12;
    obstacleGroup.destroyEach();
  }
  
   food();
   spawnObstacles();
  
 drawSprites();
  
 //score system 
 stroke("white");
 textSize(20);
 fill("white"); 
 text("score: " + score,500,50);
}

function food() {
  if (frameCount %120 === 0) {
    banana = createSprite(800,0,10,20);
    banana.y = Math.round(random(130,300));
    banana.scale = 0.04;
    banana.velocityX = - 8;
    banana.addImage(bananaImage);
    
    //add lifetime
    banana.lifetime = 200;
    
    bananaGroup.add(banana);   
  }
}

function spawnObstacles() {
  if(frameCount %160 === 0) {
    obstacle = createSprite(800,0,10,20);  
    obstacle.y = Math.round(random(110,300));
    obstacle.scale = 0.06;
    obstacle.velocityX = -10;
    obstacle.addImage(obstacleImage);
    
    //add lifetime
    obstacle.lifetime = 80;
    
    obstacleGroup.add(obstacle);
  }
}
