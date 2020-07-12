//Global Variables
var monkey,ground;
var obstacleGroup, bananaGroup;

var bananaImage, obstacleImage, backImage, monkey_running;

var survivalTime =0;
var jungle;

var PLAY;
var END;
var gameState = PLAY;

var restartImg, restart;

function preload(){
  backImage = loadImage("jungle.jpg");
  
  monkey_running=     loadImage("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png", "Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("Banana.png");
  obstacleImage = loadImage("stone.png")
  
  restartImg= loadImage("restart.png");
  
}


function setup() {
  createCanvas(600,300);
 
  //background
  jungle = createSprite(20,20,100,200);
  jungle.addImage("jungle", backImage);
  jungle.scale=1.2;
  
  
  //ground
  ground = createSprite(600,260,1200,10);
  ground.visible = false;
  
  
  //monkey
  monkey = createSprite(100,230,30,60);
  monkey.addImage("running", monkey_running);
  monkey.scale = 0.1;
  
  //groups
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  //restart
    restart=createSprite(300,150,20,20);
    restart.addImage("reset", restartImg);
    restart.scale=0.5;
    restart.visible=false;
    
  
  
}


function draw(){
 background(255); 
  
  //jungle
  //jungle.velocity = -3;
  
  /*if(jungle.x<0){
    jungle.x=jungle.width/2;
  }*/
  
  //monkey
    monkey.debug=false; 
    monkey.setCollider("circle",0,0,90);
  
  if(gameState == PLAY){
    //moving ground
    ground.velocityX = -5;

    //scrolling ground
    if(ground.x < 0){
        ground.x = ground.width/2;
    }

    //jumping monkey
    if(keyDown("space") && monkey.y>225){
      monkey.velocityY=-10;
      //console.log(monkey.y);
      
      
    }

    monkey.velocityY= monkey.velocityY+0.5;
    monkey.collide(ground);

    

    //monkey and banana (check code - all in frame destroyed)
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();

      survivalTime = survivalTime + 2;

      switch(survivalTime){

        case 10: monkey.scale = 0.12;
        break;

        case 20: monkey.scale = 0.14;
        break;

        case 30: monkey.scale = 0.16;
        break;

        case 40: monkey.scale = 0.18;
        break; 

        default:break;

      }
    }

    //monkey and stone
    if(monkey.isTouching(obstacleGroup)){
      monkey.scale =0.10;
      gameState=END;
  }
    
  }
  
  if(gameState==END){
    
    
    if(monkey.isTouching(obstacleGroup)){
      
      ground.velocityX =0;
      monkey.velocityY = 0;
       
      obstacleGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);
      obstacleGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);
      
      restart.visible=true;
    
    }
    
    if(mousePressedOver(restart)){
      reset();
    }
  
  
  }
  
  //banana and stone
  reward();
  stone();
    
  
  drawSprites();
  
  //score
  stroke("white");
  textSize(20);
  fill("white");
  /*survivalTime = survivalTime + Math.round(World.frameRate/60); */
  text("Score: " + survivalTime, 100,50); 
  
}

function reward(){
  
  //bananas
  if(frameCount%200 == 0){
    var banana = createSprite(630,150,10,30);
    banana.y = random(120,180);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.05;
    banana.velocityX=-3;
    
    banana.lifetime= 230;
    
    //grouping
    bananaGroup.add(banana);
  }
  
}

function stone(){
  
  //obstacles
  if(frameCount%100 == 0){
    var obstacle = createSprite(650,240,50,40);
    obstacle.y = random(240,250);
    obstacle.addImage("stone", obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX=-4; 
    
    obstacle.lifetime= 190;
    
    //grouping
    obstacleGroup.add(obstacle);
  }
  
}

function reset(){

  
  gameState = PLAY;
  
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
    
  survivalTime = 0;
  
  restart.visible=false;
  
}