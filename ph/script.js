const qs = selector => document.querySelector(selector);
const ce = name => document.createElement(name);
const input = qs("input");
const button = qs("button");
const output_container = qs(".urls");
// const list_container = output_container.querySelector("div.list");

function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function removeOutput() {
  output_container.style.display = "none";
  removeAllChildren(output_container);
}

function addItem(quality, url) {
  const container = ce("div");
  const div = ce("div");
  const p = ce("p");
  container.setAttribute("class", "ui segment");
  div.setAttribute("class", "ui top attached label");
  div.innerText = quality;
  p.appendChild(document.createTextNode(url));
  container.appendChild(div);
  container.appendChild(p);
  output_container.appendChild(container);
}

function loading() {
  button.classList.add("loading", "disabled");
  // output_container.classList.add("loading");
}

function loadingOver() {
  button.classList.remove("loading", "disabled");
  // output_container.classList.remove("loading");
}

button.addEventListener("click", () => {
  loading();
  
  const ph_url = input.value;
  const url = `https://node-api.cyclic.app/api/ph?url=${encodeURIComponent(ph_url)}`;
  
  fetch(url)
  .then(data => data.json())
  .then(({mediaDefinitions, error}) => {
    if (error) {
      loadingOver();
      console.error(error);
      return;
    }
    removeOutput();
    mediaDefinitions.forEach(({videoUrl, quality}) => {
      if ((typeof quality) == "number") addItem(quality, videoUrl.replace(/\\\//g, "/"));
    });
    output_container.style.display = "initial";
    loadingOver();
  }).catch(error => {
    loadingOver();
    console.error(error);
  })
});