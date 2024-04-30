const qs = selector => document.querySelector(selector);
const input = qs("input");
const button = qs("button");
const id = qs(".id > p");
const date = qs(".date > p");
const title = qs(".title > p");
const description = qs(".description > pre");
const api_url = "https://www.googleapis.com/youtube/v3/channels?key=AIzaSyD83gAJY1s5uWTNCzoUcftvCS1Llh_5Okk&part=snippet,statistics&fields=items(id,snippet(title,description,publishedAt,thumbnails(default)),statistics)";

function getHandle(element) {
  try {
    const value = element.value;
    if (value.startsWith("@")) return value;
    const url = new URL(value);
    const pathname = url.pathname;
    if (!pathname.startsWith("/@")) return false;
    return pathname.slice(1);
  } catch (error) {
    console.error(error);
    return false;
  }
}

function getId(element) {
  try {
    var value = element.value;
    const url = new URL(value);
    const pathname = url.pathname;
    if (pathname.startsWith("/channel/")) return pathname.slice(9);
    return false;
  } catch (error) {
    console.log(error);
    return value;
  }
}

button.addEventListener("click", () => {
  let url;
  const handle = getHandle(input);

  if (handle) url = api_url + `&forHandle=${handle}`;
  else {
    const id = getId(input);
    if (!id) {
      alert("Wrong Channel ID, Handle or link.");
      return;
    }
    url = api_url + `&id=${id}`;
  }

  fetch(url)
  .then(data => data.json())
  .then(({error, items}) => {
    if (error) {
      console.log(error);
      alert("Error..");
      return;
    } else if (!items) {
      alert("Something is wrong.");
    }
    const {id:Id, snippet, statistics} = items[0];
    id.innerText = Id;
    date.innerText = snippet.publishedAt;
    title.innerText = snippet.title;
    description.innerText = snippet.description;
  })
})