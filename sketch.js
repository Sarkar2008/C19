var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200,200, 50, 50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.4;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
}

function draw() {
  background(200);

  if (gameState === "play") {
  
  if(tower.y > 400){
      tower.y = 300
    }

  if (keyDown("SPACE")) {
    ghost.velocityY = -5;
  }

  if (keyDown("RIGHT_ARROW")) {
    ghost.x = ghost.x + 3;
  }

  if (keyDown("LEFT_ARROW")) {
    ghost.x = ghost.x - 3;
  }

  ghost.velocityY = ghost.velocityY + 0.8;    
  
  if (climbersGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
  }

  if (invisibleBlockGroup.isTouching(ghost)) {
    ghost.destroy();
    gameState = "end";
  }
  
    spawnDoors()

    drawSprites ();
}

if (gameState === "end") {
  stroke("yellow");
  fill("yellow");
  textSize (30);
  text ("GAME OVER", 230, 250);
  
}
}

function spawnDoors() {
  if (frameCount%240 === 0) {
    door = createSprite(200, -50);
    door.velocityY = 1;
    door.addImage("door", doorImg);
    door.x = Math.round(random(120, 400));
    door.lifetime = 800;
    doorsGroup.add(door);       


    climber = createSprite(200, 10);
    climber.velocityY = 1;
    climber.addImage("climber", climberImg);
    door.x = climber.x
    climber.lifetime = 800;
    climbersGroup.add(climber);


    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1 ;


    invisibleBlock = createSprite(200, 15);
    invisibleBlock.velocityY = 1;
    door.x = invisibleBlock.x
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.debug = true;
  }
  
}




