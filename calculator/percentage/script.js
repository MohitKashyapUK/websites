const $qs = selector => document.querySelector(selector);
const container = $qs("main > div");
const children = container.children;
const first_list = children[0].querySelector(".input").querySelectorAll("input");
const second_list = children[1].querySelector(".input").querySelectorAll("input");
const first_output = $qs(".formula-one-output");
const second_output = $qs(".formula-two-output");

function formula_one() {
  let part = Number(first_list[0].value);
  let whole = Number(first_list[1].value);
  let percent = Number(first_list[2].value);
  if (!(part && whole && percent)) {
    first_output.innerText = null;
    return;
  }
  first_output.innerText = parseFloat(((part/whole)*percent).toFixed(2));
}

function formula_two() {
  let percent = Number(second_list[0].value);
  let part = Number(second_list[1].value);
  let whole = Number(second_list[2].value);
  if (!(part && whole && percent)) {
    second_output.innerText = "Value";
    return;
  }
  second_output.innerText = parseFloat(((percent/part)*whole).toFixed(2));
}

for (let index = 0; index < second_list.length; index++) first_list[index].addEventListener("input", formula_one);
for (let index = 0; index < second_list.length; index++) second_list[index].addEventListener("input", formula_two);