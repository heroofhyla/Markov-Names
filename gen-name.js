(function(){

  let sample = function(arr){
    return arr[Math.floor(Math.random() * arr.length)];
  };

  let generateName = function(namesList, minLength, maxLength){
    let markovName = "";
    while (markovName.length < minLength || markovName.length > maxLength){
      let namesArray = namesList.split("\n");
      markovName = sample(namesArray)[0];
      while (true){
        let splitStr = markovName[markovName.length - 1];
        if (markovName.length > 1){
          splitStr = (markovName[markovName.length - 2]) + splitStr;
        }
        namesArray = namesList.split(splitStr);
        namesArray.shift();
        let nextSample = sample(namesArray);
        if (nextSample.length > 0){
          let nextChar = nextSample[0];
          if (nextChar == "\n"){
            break;
          }
          markovName += nextChar;
        }
      }
    }
    return markovName;

  };

  let nameCountField = document.getElementById("Name-count");
  let minimumLengthField = document.getElementById("Minimum-length");
  let maximumLengthField = document.getElementById("Maximum-length");
  let generatorForm = document.getElementById("Generator");
  let outputDiv = document.getElementById("Output");
  let namesList = document.getElementById("Names-list").innerHTML.trim();

  generatorForm.addEventListener("submit", function(event){
    event.preventDefault();
    let nameCount = nameCountField.value;
    let minLength = minimumLengthField.value;
    let maxLength = maximumLengthField.value;
    let names = [];
    for (let ii = 0; ii < nameCount; ii++){
      names.push(generateName(namesList, minLength, maxLength));
    }
    outputDiv.innerHTML = names.join("<br>");
    return false;

  });

})();
