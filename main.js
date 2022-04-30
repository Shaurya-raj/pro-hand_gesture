//https://teachablemachine.withgoogle.com/models/hQtB9SgW1/
pre_1=""
pre_2=""

Webcam.set({
    width:350,
    height:300,
    image_format:'png'
});

camera=document.getElementById("camera");

Webcam.attach('#camera');

function snap()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);
  
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/hQtB9SgW1/.json',modelLoaded);

  function modelLoaded() {
    console.log('Model Loaded!');
  }

  function speak(){
    var synth = window.speechSynthesis;
    sdata_1 = "The first prediction is " + pre_1;
    sdata_2 = "And the second prediction is " + pre_2;
    var utterThis = new SpeechSynthesisUtterance(sdata_1 + sdata_2);
    synth.speak(utterThis);
  }

  function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResults);
  }

  function gotResults(error,results){
    if(error){
console.log(error);
    }
    else{
      console.log(results);
      pre_1=results[0].label;
      pre_2=results[1].label;
      speak()
      document.getElementById("emo_1").innerHTML=pre_1;
      document.getElementById("emo_2").innerHTML=pre_2;
      if(results[0].label=="Peace"){
        document.getElementById("emoji_1").innerHTML="&#9996;"
      }
      else if(results[0].label=="nice"){
        document.getElementById("emoji_1").innerHTML="&#128076;"
      }
      else if(results[0].label=="high five"){
        document.getElementById("emoji_1").innerHTML="&#128400;"
      }
      else if(results[0].label=="thumbs up"){
        document.getElementById("emoji_1").innerHTML="&#128077;"
      }
      if(results[1].label=="Peace"){
        document.getElementById("emoji_2").innerHTML="&#9996;"
      }
      else if(results[1].label=="nice"){
        document.getElementById("emoji_2").innerHTML="&#128076;"
      }
      else if(results[1].label=="high five"){
        document.getElementById("emoji_2").innerHTML="&#128400;"
      }
      else if(results[1].label=="thumbs up"){
        document.getElementById("emoji_2").innerHTML="&#128077;"
      }

      
    }


  }