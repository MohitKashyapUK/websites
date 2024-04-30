const $qs = selector => document.querySelector(selector);
const $ce = name => document.createElement(name);
const submit = $qs(".submit");
const url = $qs("#url");
const reset = $qs(".reset");
const list = $qs(".list");
const text = $qs(".text");
const magic_container = $qs(".magic-container");
const error_message = $qs(".error.message");

function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function hide(element) {
  element.style.display = "none";
}

function show(element) {
  element.style.display = "initial";
}

function makeItemElement(thumbnail, id, title) {
  const div = $ce("div");
  const img = $ce("img");
  const child_div = $ce("div");
  const a = $ce("a");
  div.setAttribute("class", "item");
  img.setAttribute("class", "ui small image");
  img.setAttribute("src", thumbnail);
  child_div.setAttribute("class", "content");
  a.setAttribute("class", "header");
  a.setAttribute("href", id);
  a.innerText = title;
  child_div.appendChild(a);
  div.appendChild(img);
  div.appendChild(child_div);
  return div;
}

function getId(str) {
  try {
    const url = new URL(str);
    const id = url.searchParams.get("list");
    if (!(url.pathname == "/playlist" && id)) return false;
    return id;
  } catch {
    return false;
  }
}

reset.addEventListener("click", () => {
  url.value = null;
  removeAllChildren(list);
  text.style.color = "initial";
  text.innerText = "Enter link to see the magic!";
  show(magic_container);
});

submit.addEventListener("click", () => {
  const id = getId(url.value);
  if (!id) {
    text.innerText = "Invalid link.";
    text.style.color = "red";
    return;
  }
  text.style.color = "initial";
  submit.classList.add("loading", "disabled");
  text.innerText = "Wait for the magic!";
  const api_url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&key=AIzaSyD83gAJY1s5uWTNCzoUcftvCS1Llh_5Okk&fields=nextPageToken,items(snippet(title,resourceId(videoId),thumbnails(default(url))))&maxResults=50`;
  fetch(api_url)
  .then(data => data.json())
  .then(({nextPageToken, items}) => {
    submit.classList.remove("loading", "disabled");
    hide(magic_container);
    // console.log(data);
    items.forEach(({snippet}) => {
      const title = snippet.title;
      const thumbnail = snippet.thumbnails.default.url;
      const id = snippet.resourceId.videoId;
      const item = makeItemElement(thumbnail, id, title);
      list.appendChild(item);
    });
  }).catch((error) => {
    show(magic_container);
    text.innerText = "Error!!!";
    text.style.color = "red";
    removeAllChildren(list);
    console.error(error);
  });
});