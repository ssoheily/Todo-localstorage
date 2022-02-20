let $ = document;
let inputText = $.querySelector(".main-inputDiv_input");
let ul_ContainerElement = $.querySelector(".main-showList__ul");
let input_modaltext = $.querySelector(".modal-text__edit");
let input_Confirm = $.querySelector(".confirms");
let close_modalClass = $.querySelector(".modal");

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
function showModal() {
  // Get the modal
  var modal = document.querySelector(".modal");
  // Get the <span> element that closes the modal
  var x_span = document.querySelector(".close");

  // When the user clicks the button-edit, open the modal
  modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  x_span.onclick = function () {
    modal.style.display = "none";
    // $.body.style.filter="blur(10px)";
  };

  // When the user clicks anywhere outside of the modal, close it
  document.body.addEventListener("keyup",hideenModalwithESC);
  function hideenModalwithESC(event) {
    if (event.keyCode == 27) {
      modal.style.display = "none";
    }
  };
  
}

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
    /* click button Edit : item = event  that opens the modal*/
    newbtnEdit.addEventListener("click", (item2) => {
      showModal();
      /* get text from localStrage */
      let itemCheckText = item2.target.parentElement.parentElement.textContent;
      /* find check item from local storage */
      let boxInfoFromStorage2 = JSON.parse(localStorage.getItem("boxStorage"));
      //  console.log(boxInfoFromStorage2);
      let indexItem2check = boxInfoFromStorage2.findIndex((selectItem2) => {
        return selectItem2.task === itemCheckText;
      });
      /* show value items in modal  */
      input_modaltext.value = itemCheckText;
      input_Confirm.addEventListener("click", () => {
        let newTask = input_modaltext.value;
        boxInfoFromStorage2[indexItem2check].task = newTask;
        setValuelocaleStorage(boxInfoFromStorage2);
        close_modalClass.style.display = "none";
        /* show  locale Storage*/
        getInfoLoclastorage();
      });
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
      let itemCheck = item3.target.parentElement.parentElement;
      /* find check item from local storage */
      let indexItemcheck = boxInfoFromStorage.findIndex((selectItem3) => {
        return selectItem3.task === itemCheck.textContent;
      });
      if (boxInfoFromStorage[indexItemcheck].statusTask) {
        /* deativ button */
        itemCheck.classList.add("main-showList__deactive");
        /* change status in locale storage */
        boxInfoFromStorage[indexItemcheck].statusTask = false;
        /* deaktive edit and cut -button */
        newbtnEdit.disabled = true;
        newbtnCut.disabled = true;
        newbtnCheck.style.background = "pink";
      } else {
        // change status in locale storage *
        boxInfoFromStorage[indexItemcheck].statusTask = true;
        itemCheck.classList.remove("main-showList__deactive");
        /* aktive edit and cut -button */
        newbtnEdit.disabled = false;
        newbtnCut.disabled = false;
        newbtnCheck.style.background = "#2f5bea";
      }
      setValuelocaleStorage(boxInfoFromStorage);
    });
    /* object is from keydown => line 52 */
    newDivEle.innerHTML = object.task;

    /* append div and 3 button to li */
    newLiEle.append(newDivEle, newbtnCut, newbtnEdit, newbtnCheck);
    /* append li to ul */
    ul_ContainerElement.append(newLiEle);
  });
}
function saveDate(indexItem2check) {
  let newTask = input_modaltext.value;
  boxInfoFromStorage2[indexItem2check].task = newTask;
  setValuelocaleStorage(boxInfoFromStorage2);
}

inputText.addEventListener("keydown", addTodo);
window.addEventListener("load", getInfoLoclastorage());

