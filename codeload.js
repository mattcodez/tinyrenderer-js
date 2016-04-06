"use strict";

document.getElementById('runCode').addEventListener('click', runCode);
document.getElementById('chooseCode').addEventListener('change', e => {
  const select = e.target;
  const opt = select.options[select.selectedIndex];
  retrieveCode(`lesson_code/${opt.value}/main.js`);
});

const myCodeMirror = CodeMirror(document.body, {
  mode:  "javascript"
});

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
    myCodeMirror.setValue(mainjs);

    runCode(mainjs);
  });
}
