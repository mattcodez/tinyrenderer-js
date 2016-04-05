"use strict";

document.getElementById('runCode').addEventListener('click', runCode);
document.getElementById('chooseCode').addEventListener('change', e => {
  const select = e.target;
  const opt = select.options[select.selectedIndex];
  retrieveCode(`lesson_code/${opt.value}/main.js`);
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
  fetch(path)
  .then(r => r.text())
  .then(mainjs => {
    //TODO: only create one CodeMirror instance 
    myCodeMirror = CodeMirror(document.body, {
      value: mainjs,
      mode:  "javascript"
    });

    runCode(mainjs);
  });
}
