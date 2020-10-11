
var dog,dogHappy,database,foodS,foodStock,boneImage;
 
function preload(){
   dogImage = loadImage("images/Dog.png");
   dogHappy = loadImage("images/DogHappyIMG.png");
   boneImage = loadImage("images/bone.png");
 }

function setup() {
  database = firebase.database();
  createCanvas(500,500);



  dog = createSprite(width/2,300,10,10);
  dog.addImage("Dog",dogImage);
  dog.scale = 0.22;

  bone = createSprite(310,40,10,10);
  bone.addImage("bone",boneImage);
  bone.scale = 0.09;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}

function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage("Dog",dogHappy);
  }

  drawSprites();
  textSize(30);
  strokeWeight(5);
  stroke("Blue");
  fill("white");
  text("FOOD STOCK       : "+foodS,80,50);
  textSize(20);
  text("NOTE: PRESS UP_ARROW TO FEED MILO MILK!",15,470);
}

function readStock(data){
    foodS = data.val(); 
}

function writeStock(x){
  
  if(x<=0){
    x = 0;
  } else{
    x = x-1;
  }

    database.ref('/').update({
    Food:x
    })
}
