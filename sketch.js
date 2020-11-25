var trex, trexruns;
var ground, groundmoves, invisibleground;
var o1, o2, o3, o4, o5, o6,obstaclegroup;
var clouds, cloudimage,cloudgroup
var gameover,gameoverimage;
var restart,restartimage;
var collide,collideimage;
var play=0;
var jump;
var die;
var checkpoint;
var score=0;

function preload() {
  trexruns = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundmoves = loadImage("ground2.png");
  cloudimage = loadImage("cloud.png");
  o1 = loadImage("obstacle1.png");
  o2 = loadImage("obstacle2.png");
  o3 = loadImage("obstacle3.png");
  o4 = loadImage("obstacle4.png");
  o5 = loadImage("obstacle5.png");
  o6 = loadImage("obstacle6.png");
  gameover=loadImage("gameOver.png");
  restart=loadImage("restart.png");
  collide=loadAnimation("trex_collided.png");
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
  checkpoint=loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("runs", trexruns);
  trex.addAnimation("collided",collide);
  trex.scale = 0.5;
  ground = createSprite(200, 180, 400, 20);
  ground.addImage(groundmoves);
  ground.velocityX = -5;
  invisibleground = createSprite(200, 190, 400, 10);
  invisibleground.visible = false;
  cloudgroup=new Group();
  obstaclegroup=new Group();
  gameOver=createSprite(300,70,20,20);
  gameOver.addImage(gameover);
  gameOver.scale=0.8;
  gameOver.visible=false;
  Restart=createSprite(300,110,20,20);
  Restart.visible=false;
  Restart.addImage(restart);
  Restart.scale=0.65;
  a=0;
}

function draw() {
  background(255);
  textSize(20);text("Score:"+score,500,30);
  if(play==0){
    spawnclouds();
  spawnobstacles();
    if(frameCount%60==0){
      score=score+1;
    }
    if(score%10==0&&score>0){
      a=a+1;
    }
    if(a==55){
      checkpoint.play();a=a+1;}
     if(obstaclegroup.isTouching(trex)){
     
    play=1;
    die.play(); 
  }
    if (ground.x <= 0) {
    ground.x = ground.width / 2;
  }
    if (keyDown("space")&&trex.y>161) {
    trex.velocityY=-12;
      jump.play();
  }
  trex.velocityY=trex.velocityY+0.5; 
  }else if(play==1){
    obstaclegroup.setVelocityXEach(0);
    obstaclegroup.setLifetimeEach(-1);
    cloudgroup.setVelocityXEach(0);
    cloudgroup.setLifetimeEach(-1);
    ground.velocityX=0;
    trex.changeAnimation("collided");
    gameOver.visible=true;
    Restart.visible=true;
  } 
  
  trex.collide(invisibleground);
  drawSprites();
  
}

function spawnclouds() {
  if (frameCount % 60 == 0) {
    var clouds = createSprite(600, Math.round(random(10, 100)), 20, 20);
    clouds.lifetime=600/5;
    clouds.velocityX = -5;
    clouds.addImage(cloudimage);
    clouds.depth=trex.depth;
    trex.depth=trex.depth+1;
    cloudgroup.add(clouds);
  }
}

function spawnobstacles() {
  if (frameCount % 100 == 0) {
    var obstacle = Math.round(random(1, 6));
    var obstacles = createSprite(600, 170, 30, 20);
    obstacles.velocityX = -3;
    obstacles.lifetime=200;
    switch (obstacle) {
      case 1:
        obstacles.addImage(o1);
        obstacles.scale=0.85; 
        break;
      case 2:
        obstacles.addImage(o2);
        obstacles.scale=0.8;
        break;
      case 3:
        obstacles.addImage(o3);
        obstacles.scale=0.75;
        break;
      case 4:
        obstacles.addImage(o4);
        obstacles.scale=0.65;
        break;
      case 5:
        obstacles.addImage(o5);
        obstacles.scale=0.6;
        break;
      case 6:
        obstacles.addImage(o6);
        obstacles.scale=0.6;  
        break;
    }
       obstaclegroup.add(obstacles);
  }
}