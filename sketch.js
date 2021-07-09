var ground, groundImg;
var appleImg, bananaImg, pearImg, orangeImg;
var strawberryVendImg, halloweenImg;
var star, starImg;
var boy, boyImg;
var score=0;
var gameState="play";
var distance =0;


function preload(){
appleImg=loadImage("apple.png")
bananaImg=loadImage("banana.png")
pearImg=loadImage("pear.png")
orangeImg=loadImage("orange.png")
boyImg=loadImage("goodBoy.png")
groundImg=loadImage("ground2.png")
halloweenImg=loadImage("halloween.png")
starImg=loadImage("star.png")
strawberryVendImg=loadImage("strawberry_vendor.png")
}



function setup() {
 createCanvas(windowWidth, windowHeight);
  
 
ground = createSprite(width/2,height-100,width,500);
ground.addImage(groundImg)
ground.scale=15.0
ground.velocityX=-20
  
  boy = createSprite(70,height-270,20,50);
  boy.addImage(boyImg)
  boy.scale=0.2

  
  invisibleGround = createSprite(width/2,height-50,width,125);
  invisibleGround.visible = false;
  
  edges= createEdgeSprites();
  
  halloweenG= new Group();
  strawberryG= new Group();
  fruitsG= new Group();
  starG= new Group();
  
  
}

function draw() {
  background("lightblue");
  
  textSize(25);
  text("score:"+score,30,50);

 
  distance=frameCount;
  console.log("distance"+distance);
 
 if(gameState==="play"){
   score = score + Math.round(getFrameRate()/60);
   if(ground.x<0)
     {
       ground.x= width/2;
     }

   if(keyDown("space")&& boy.y>=100)
     {
      // boy.velocityY=-10;
       camera.position.x=boy.x;
       camera.position.y=boy.y;
       text("score:"+score,camera.position.x-600,camera.position.y-200);
     }
    boy.velocityY=  boy.velocityY+0.5;

   boy.collide(invisibleGround); 

   spawnFruits();
   
   createObstacles();

   if(fruitsG.isTouching(boy))
     {
       //fruitsG.destroyEach();
       textSize(25);
       fill("green");
       text("Added 5 points",300,300);
       score= score+5;
     }

    

     if(halloweenG.isTouching(boy))
       {
         textSize(25);
         fill("green");
         text("Lost all points",300,300);
         score=0;

       }



   drawSprites();
 }

if (distance>1000){

  gameState="end";
   fill("yellow");
   textSize(30);
   text("Game Over", width/16,height/2- 50)
   text("Final Score:"+score, width/16,height/2- 10)
 }
}




function spawnFruits(){
if(frameCount%100===0){
  var fruits = createSprite(600,height-199.999,20,30);
  fruits.velocityX=-10
  var num=Math.round(random(1,4))
  switch(num) { 
    case 1: fruits.addImage(appleImg); break; 
    case 2: fruits.addImage(bananaImg); break;
    case 3: fruits.addImage(pearImg);break;
    case 4: fruits.addImage(orangeImg); 
    break; 
    default: break; }
    fruits.scale=0.2
    fruits.lifetime=300
    fruits.depth=boy.depth
    boy.depth=boy.depth+1
    fruitsG.add(fruits)
}


}

function createObstacles(){
if(frameCount%350===0){
  var halloween = createSprite(Math.round(random(150,600)),height-199.99,20,30);
  halloween.addImage(halloweenImg)
  fruits.depth=boy.depth
    boy.depth=boy.depth+1
  halloween.velocityX=-15
  halloween.scale=0.1
}
}
