const $qs = selector => document.querySelector(selector);

const container = $qs("main > div");
const children = container.children;

const first_container = children[0];
const second_container = children[1];
const third_container = children[2];

const first_container_inputs = first_container.querySelectorAll('input');
const second_container_inputs = second_container.querySelectorAll('input');
const third_container_inputs = third_container.querySelectorAll("input");

const first_output = first_container.querySelector("span");
const second_output = second_container.querySelector("span");
const third_output = third_container.querySelector('span');

function first() {
  const price = Number(first_container_inputs[0].value);
  const kg = Number(first_container_inputs[1].value);
  if (!(price && kg)) {
    first_output.innerText = "Price";
    return;
  }
  first_output.innerText = parseFloat((price / kg).toFixed(2));
}

function second() {
  const price = Number(second_container_inputs[0].value);
  const kg = Number(second_container_inputs[1].value);
  const weight = Number(second_container_inputs[2].value);
  if (!(price && kg && weight)) {
    second_output.innerText = "Price";
    return;
  }
  second_output.innerText = parseFloat(((price / kg)*weight).toFixed(2));
}

function third() {
  const total_price = Number(third_container_inputs[0].value);
  const kg = Number(third_container_inputs[1].value);
  const price = Number(third_container_inputs[2].value);
  if (!(total_price && kg && price)) {
    third_output.innerText = "";
    return;
  }
  // const kg_price = ;
  third_output.innerText = parseFloat((price/(total_price/kg)).toFixed(3));
}

for (let index = 0; index < first_container_inputs.length; index++) first_container_inputs[index].addEventListener("input", first);
for (let index = 0; index < second_container_inputs.length; index++) second_container_inputs[index].addEventListener("input", second);
for (let index = 0; index < third_container_inputs.length; index++) third_container_inputs[index].addEventListener("input", third);