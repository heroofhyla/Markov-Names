(function(){

  let sample = function(arr){
    return arr[Math.floor(Math.random() * arr.length)];
  };

  let generateName = function(namesList, minLength, maxLength){
    let markovName = "";
    respectingLimits:
    while (markovName.length < minLength || markovName.length > maxLength){
      let namesArray = namesList.split("\n");
      markovName = sample(namesArray)[0];
      buildingName:
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
            if (markovName.length >= minLength && markovName.length <= maxLength){
              break respectingLimits;
            } else{
              for (let ii = 0, imax = namesArray.length; ii < imax; ii++){
                if (namesArray[ii][0] != "\n"){
                  continue buildingName;
                }
                continue respectingLimits;
              }
            }
          }
          markovName += nextChar;
          if (markovName.length > maxLength){
            continue respectingLimits;
          }
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
    let nameCount = parseInt(nameCountField.value);
    let minLength = parseInt(minimumLengthField.value);
    let maxLength = parseInt(maximumLengthField.value);
    if ((minLength > maxLength) || (maxLength < 0)){
      minLength = 1;
      minimumLengthField.value = 1;
      maxLength = 25;
      maximumLengthField.value = 25;
    }

    if (maxLength < 2){
      maxLength = 2;
      maximumLengthField.value = 2;
    }
    if (nameCount < 1){
      nameCount = 1;
      nameCountField.value = 1;
    }
    let names = [];
    for (let ii = 0; ii < nameCount; ii++){
      names.push(generateName(namesList, minLength, maxLength));
    }
    outputDiv.innerHTML = names.join("<br>");
    return false;

  });

})();
