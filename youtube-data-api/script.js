const $qs = selector => document.querySelector(selector);
const inputElement = $qs("#url");
const output_container = $qs(".output-container");

function make_output_element(text) {
  const el = document.createElement("pre");
  el.setAttribute("class", "output");
  el.innerText = text;
  return el;
}

function empty_the_element(element) {
  const children = element.children;

  for (let index = 0; index < children.length; index++) children[index].remove();
}

async function get_description(id) {
  const url = "https://www.googleapis.com/youtube/v3/videos?key=AIzaSyD83gAJY1s5uWTNCzoUcftvCS1Llh_5Okk&part=snippet&fields=items(snippet(description))&id=" + id;
  let response = await fetch(url);
  response = await response.json();
  const description = response.items[0].snippet.description;
  return description;
}

const func = async (event) => {
  try {
    let url = new URL(event.target.value);
    let pathname = url.pathname;
    let id;

    if (pathname.startsWith("/shorts")) id = pathname.slice(8);
    else if (pathname.startsWith("/live")) id = pathname.slice(6);
    else if (pathname.startsWith("/watch")) id = url.searchParams.get("v");
    else id = pathname.slice(1);

    const description = await get_description(id);
    const div = make_output_element(description);

    empty_the_element(output_container);
    output_container.appendChild(div);
  } catch (error) {
    console.log(error);
    alert("Wrong URL.");
  }
}

inputElement.addEventListener("blur", func);