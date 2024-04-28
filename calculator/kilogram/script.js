const $qs = selector => document.querySelector(selector);

const container = $qs("main > div");
const children = container.children;

const first_container = children[0];
const second_container = children[1];
const third_container = children[2];

const inputs = document.querySelectorAll("input");

const first_output = first_container.querySelector("span");
const second_output = second_container.querySelector("span");
const third_output = third_container.querySelector('span');

const price_per_kg = (total_price, weight_in_kg) => parseFloat((total_price/weight_in_kg).toFixed(2));
const unit_price = (price_per_kg, unit_in_kg) => parseFloat((price_per_kg*unit_in_kg).toFixed(2));
const kg_by_price = (price_unit, per_kg_price) => (price_unit/per_kg_price).toFixed(3);

function calculator() {
  const total_price = Number(inputs[0].value);
  const total_weight_in_kg = Number(inputs[1].value);

  if (!(total_price && total_weight_in_kg)) {
    first_output.innerText = null;
    second_output.innerText = null;
    third_output.innerText = null;
    return;
  }

  const per_kg_price = price_per_kg(total_price, total_weight_in_kg);
  first_output.innerText = per_kg_price;

  const unit_in_kg = Number(inputs[2].value);
  if (unit_in_kg) {
    second_output.innerText = unit_price(per_kg_price, unit_in_kg);
  } else second_output.innerText = null;

  const price_unit = Number(inputs[3].value);
  if (price_unit) {
    third_output.innerText = kg_by_price(price_unit, per_kg_price);
  } else third_output.innerText = null;
}

for (let index = 0; index < inputs.length; index++) inputs[index].addEventListener("input", calculator);