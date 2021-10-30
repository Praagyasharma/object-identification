Status= " ";
object=[];

function preload()
{
  
}

function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    
    video=createCapture(VIDEO);
    video.hide();

    objectdetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("hi").innerHTML = "Status : Detecting Objects" ; 
}

function modelloaded()
{
    console.log("model Loaded!!");
        Status = true;
      

}

function gotresult(error, results)
{
    if(error)
    {
        console.error(error);

    }
    else{
    console.log(results);
     object=results;
    }
 
}

function draw()
{
    image(video,0,0,380,380);
  if(Status !="")
    {
      r=random(255);
      g=random(255);
      b=random(255);
      objectdetector.detect(video, gotresult);
      for(i=0; i<object.length; i++)
        {
          document.getElementById("hi").innerHTML="Status:Object detected";
          document.getElementById("numberob").innerHTML="Number of object:"+object.length;
  fill(r,g,b);
  percent=floor(object[i].confidence*100);
  text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
  noFill();
  stroke(r,g,b);
  rect(object[i].x,object[i].y,object[i].width,object[i].height);
          
        }
    }
  }