//create gamestates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sword, swordImage;

var fruit1, fruit2, fruit3, fruit4, fruitGroup;
var monsterImage, EnemyGroup;

var score;

var GameOver, gameoverImage;

function preload() {

  //no animation, all are to be loaded as image
  swordImage = loadImage("sword.png");

  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");

  monsterImage = loadImage("alien1.png");

  gameoverImage = loadImage("gameover.png");
}


function setup() {

  //creating the sword
  sword = createSprite(40, 200, 20, 20);
  sword.addImage(swordImage);
  sword.debug = true;
  //variable name is not written inside double quotes
  // sword.addImage("swordImage");
  sword.scale = 0.7;

  score = 0;



  enemyGroup = new Group();

  //create a fruit group
  fruitGroup = new Group();

  //not needed
  //   GameOver = createSprite(200, 200);
  //   GameOver.addImage(gameoverImage);
  //   GameOver.scale = 1;
  //   GameOver.visible=false;

}

function draw() {
  //creating the bg
  background("white");




  if (gameState === PLAY) {

    //Call fruits and Enemy function
    fruits();
    Enemy();

    // Move sword with mouse
    sword.y = World.mouseY;
    sword.x = World.mouseX;

    // Increase score if sword touching fruit
    if (fruitGroup.isTouching(sword)) {
      fruitGroup.destroyEach();
      score = score + 2;
    } else {
      // Go to end state if sword touching enemy
      if (enemyGroup.isTouching(sword)) {
        gameState = END;

        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);

        // Change the animation of sword to gameover and reset its position
        sword.addImage(gameoverImage);
        sword.x = 200;
        sword.y = 200;
      }
    }
  }


  drawSprites();
  //displaying the score
  //display inside canvas. x should be <400
  text("score: " + score, 300, 50);
}

function fruits() {
  if (World.frameCount % 80 === 0) {
    //use = sign followed by createSprite not .
    fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;
    //fruit.debug=true;
    r = Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }

    fruit.y = Math.round(random(50, 340));

    fruit.velocityX = -7;
    fruit.setLifetime = 100;

    fruitGroup.add(fruit);
  }
}



function Enemy() {
  if (World.frameCount % 200 === 0) {
    monster = createSprite(400, 200, 20, 20);
    monster.addAnimation("moving", monsterImage);
    monster.y = Math.round(random(100, 300));
    monster.velocityX = -8;
    monster.setLifetime = 50;

    enemyGroup.add(monster);
  }
}