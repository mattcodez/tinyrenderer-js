"use strict";

document.getElementById('runCode').addEventListener('click', runCode);
document.getElementById('chooseCode').addEventListener('click', e => {
  //TODO: get selected value to build path for retrieveCode()
});

let myCodeMirror;
function runCode(e){
  try{
    let newInit = eval(myCodeMirror.getValue());
    newInit(document.getElementById('renderPort'));
  }
  catch(err){
    alert('Error running code ' + err);
  }
}

function retrieveCode(path){
  document.addEventListener("DOMContentLoaded", function(event) {
    fetch(path)
    .then(r => r.text())
    .then(mainjs => {
      myCodeMirror = CodeMirror(document.body, {
        value: mainjs,
        mode:  "javascript"
      });

      runCode(mainjs);
    });
  });
}
