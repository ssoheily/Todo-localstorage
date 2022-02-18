let $ = document;
let inputText = $.querySelector(".main-inputDiv_input");
let ul_ContainerElement = $.querySelector(".main-showList__ul");
let arrayLocaleStorage = [];
function addTodo(event) {
  if (event.keyCode == 13) {
    let valueInput = inputText.value;
    if (valueInput === "") {
      alert("Hava you forget your Task, please write your task.");
    } else {
      //  createLI(valueInput);
      inputText.value = "";

      let objItem = {
        id: arrayLocaleStorage.length + 1,
        task: valueInput,
        statusTask: true,
      };
      arrayLocaleStorage.push(objItem);
      setValuelocaleStorage(arrayLocaleStorage);
      getInfoLoclastorage();
    }
  }
}
function setValuelocaleStorage(arrayLocaleStorage) {
  /* save new object(page-info) in localStorage */
  let jsonLocalSotrage = JSON.stringify(arrayLocaleStorage);
  localStorage.setItem("boxStorage", jsonLocalSotrage);
}
function getInfoLoclastorage() {
  let boxInfoFromStorage = JSON.parse(localStorage.getItem("boxStorage"));
  if (boxInfoFromStorage) {
    arrayLocaleStorage = boxInfoFromStorage;
  } else {
    arrayLocaleStorage = [];
  }
  createLI(arrayLocaleStorage);
}
function removeItemCompelte(selectedItem) {
  let boxInfoFromStorage = JSON.parse(localStorage.getItem("boxStorage"));
  let indexItemSelected = boxInfoFromStorage.findIndex((itemsStorage) => {
    return itemsStorage.task == selectedItem;
  });

  boxInfoFromStorage.splice(indexItemSelected, 1);
  setValuelocaleStorage(boxInfoFromStorage);
  getInfoLoclastorage();
}
inputText.addEventListener("keydown", addTodo);
function createLI(valuesFromStorage) {
  ul_ContainerElement.innerHTML = "";
  valuesFromStorage.forEach((object) => {
    /* create element  li > div+button > i   */
    let newLiEle = $.createElement("li");
    newLiEle.className = "main-showList__text";
    let newDivEle = $.createElement("div");
    newDivEle.className = "newsletter__txt";
    // newDivEle.innerHTML = object.task;

    /* button > i 'cut' */
    let newbtnCut = $.createElement("button");
    newbtnCut.className = "newsletter__btn";
    let newIconEle1 = $.createElement("i");
    newIconEle1.className = "fa fa-cut";
    newbtnCut.appendChild(newIconEle1);
    /* click button remove : item = event */
    newbtnCut.addEventListener("click", (item1) => {
      removeItemCompelte(item1.target.parentElement.parentElement.textContent);
    });
    /* button > i 'edit' */
    let newbtnEdit = $.createElement("button");
    newbtnEdit.className = "newsletter__btn";
    let newIconEle2 = $.createElement("i");
    newIconEle2.className = "fa fa-edit";
    newbtnEdit.appendChild(newIconEle2);
    /* click button Edit : item = event */
    newbtnEdit.addEventListener("click", (item2) => {
      removeItemCompelte(item2.target.parentElement.parentElement.textContent);
    });
    /* button > i 'check' */
    let newbtnCheck = $.createElement("button");
    newbtnCheck.className = "newsletter__btn";
    let newIconEle3 = $.createElement("i");
    newIconEle3.className = "fa fa-check-circle";
    newbtnCheck.appendChild(newIconEle3);
    /* click button Check : item = event */
    newbtnCheck.addEventListener("click", (item3) => {
      let boxInfoFromStorage = JSON.parse(localStorage.getItem("boxStorage"));
      let itemCheck=item3.target.parentElement.parentElement;    
      console.log(itemCheck);
        /* find check item from local storage */
        let indexItemcheck=boxInfoFromStorage.findIndex((selectItem2)=>{
          return selectItem2.task===itemCheck.textContent;
        })
      if(boxInfoFromStorage[indexItemcheck].statusTask){
        /* deativ button */
        itemCheck.classList.add("main-showList__deactive");
        /* change status in locale storage */
        boxInfoFromStorage[indexItemcheck].statusTask=false;
       
      }
      else{
        // change status in locale storage *
        boxInfoFromStorage[indexItemcheck].statusTask=true;
        itemCheck.classList.remove("main-showList__deactive");
      }
      console.log( boxInfoFromStorage);
      setValuelocaleStorage( boxInfoFromStorage);
    });
    newDivEle.innerHTML = object.task;

    /* append div and 3 button to li */
    newLiEle.append(newDivEle, newbtnCut, newbtnEdit, newbtnCheck);
    /* append li to ul */
    ul_ContainerElement.append(newLiEle);
  });
}

window.addEventListener("load", getInfoLoclastorage());
