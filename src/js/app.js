/************************************DOM*********************************************/

// Variables DOM
let containerBigPizza = document.querySelector('.container-bigpizza');
let containerFamilyPizza = document.querySelector('.container-familypizza');
let radioBtnSize = document.querySelector('#radiotipo');

// function initialize 
const init = () => {
  hideSection(containerFamilyPizza);
}

// Functions of hide/show views
const hideSection = (element) => {
  element.classList.add('pizza--hide');
}

const showSection = (element) => {
  element.classList.remove('pizza--hide');
}

// get Value of Radio Button
const getValueRadio = (name) => {
  let size = document.querySelector(`input[name="${name}"]:checked`).value;
  return size;
}

// function that hides according to the type of value Big or family
const viewSizeContainerPizzas = () => {
  let valueSelection = getValueRadio('tipo');
  if (valueSelection === 'Grande') {
    hideSection(containerFamilyPizza);
    showSection(containerBigPizza);
  }
  if (valueSelection === 'Familiar') {
    hideSection(containerBigPizza);
    showSection(containerFamilyPizza);
  }
}

const incrementTotal = (idNumberBox) => {
  let number = document.querySelector(`#${idNumberBox}`).textContent;
  number = parseInt(number, 10) + 1; // valor del número central
  document.querySelector(`#${idNumberBox}`).innerText = number;
};

const decrementTotal = (idNumberBox) => {
  let numberCountPizza = document.querySelector(`#${idNumberBox}`).textContent;
  numberCountPizza = parseInt(numberCountPizza, 10) - 1;
  if (numberCountPizza >= 0) {
    document.querySelector(`#${idNumberBox}`).innerText = numberCountPizza;
  }

}

const activeButtonIncrement = (element, idNumber) => {
  const number = element.parentElement.previousElementSibling;
  const btnDecrement = number.previousElementSibling.children[0].id;
  const btnIncrement = element.id;
  if (document.querySelector(`#${idNumber}`).textContent > 0) {
    document.querySelector(`#${btnDecrement}`).classList.add('btn-active');
    document.querySelector(`#${btnIncrement}`).classList.add('btn-active');
  }
}

const desactiveButtonIncrement = (element, idNumber) => {
  const number = element.parentElement.nextElementSibling;
  const btnIncrement = number.nextElementSibling.children[0].id;
  const btnDecrement = element.id;
  if (document.querySelector(`#${idNumber}`).textContent == 0) {
    document.querySelector(`#${btnIncrement}`).classList.remove('btn-active');
    document.querySelector(`#${btnDecrement}`).classList.remove('btn-active');
  }
}


// Execute
// Function that initializes when loading
init();

// Events

radioBtnSize.addEventListener('change', viewSizeContainerPizzas);
document.addEventListener('click', (event) => {
  const arrayELements = event.path;
  for (let i = 0; i < arrayELements.length; i += 1) {
    if (arrayELements[i].localName === 'button') {
      if (arrayELements[i].classList[0] === 'increment') {
        const idNumber = arrayELements[i].parentElement.previousElementSibling.id;
        incrementTotal(idNumber);
        activeButtonIncrement(arrayELements[i], idNumber);
      }
      if (arrayELements[i].classList[0] === 'decrement') {
        const idNumber = arrayELements[i].parentElement.nextElementSibling.id;
        decrementTotal(idNumber);
        desactiveButtonIncrement(arrayELements[i], idNumber);
      }
    }
  }
});

const templateProducts = (element, container) => {
  const boxContainer = container;

  const template = ` <div class="pizza-item">
  <div>
    <div class="title">
      <p class="mb-0 pizza__name text-center">${element.name}</p>
    </div>
  </div>
  <div><img class="img-fluid" src="${element.image}"></div>
  <div><p class="text-center mb-0 pizza__name">S/ ${element.price}</p></div>
  <div> <p class="pizza--font14 text-center mb-2">${element.description}</p></div>
  <div class="botones">
    <div><button class="decrement pizza__button" id="${element.id}decrement"> <i class="fas fa-minus"></i></button></div>
    <div class="text-center pizza__number-span" id=${element.id}${element.name}>0</div>
    <div><button class="increment pizza__button"  id="${element.id}aument"><i class="fas fa-plus"></i></button></div>
  </div>
</div>`;
  boxContainer.innerHTML += template;
};


const { pizzas } = data.products;

pizzas.grande.forEach((element) => {
  templateProducts(element, containerBigPizza);
});
pizzas.familiar.forEach((element) => {
  templateProducts(element, containerFamilyPizza);
});
