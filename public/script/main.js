async function captureImage() {
  const deviceImage = document.getElementById("deviceCaptureImage").files[0]
  if(!deviceImage){
    return
  }
  const urlImageLoad = URL.createObjectURL(deviceImage)
  contentRenderImage.src = urlImageLoad


  loader()
  try{
    const modelCOCO = await cocoSsd.load()
    const prediction = await modelCOCO.detect(contentRenderImage)
      if(prediction.length == 0){
        setValuesPrediction()
        loader()
        return
      }
    setValuesPrediction(prediction[0].class,prediction[0].score)
    loader()
  }catch(error){
    loader()
    alert("error :",error)
  }
}

function setValuesPrediction(classifier = "None",percent = 0) {
  const Class = document.getElementById("idClassifier")
  const Percent = document.getElementById("idPercent")

  Class.innerText = classifier
  if(percent  == 0){
    Percent.innerText = "None"
    return
  }
  Percent.innerText = percent.toFixed(2)

}

function loader(){
  document.querySelector("#loader").classList.toggle('hidden')
}
