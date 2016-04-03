"use strict";
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

document.addEventListener("DOMContentLoaded", function(event) {
  fetch('main.js')
  .then(r => r.text())
  .then(mainjs => {
    myCodeMirror = CodeMirror(document.body, {
      value: mainjs,
      mode:  "javascript"
    });

    runCode(mainjs);
    document.getElementById('runCode').addEventListener('click', runCode);
  });
});
