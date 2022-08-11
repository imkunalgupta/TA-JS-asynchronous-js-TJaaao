const url =
  'https://api.unsplash.com/photos/?client_id=OIcnU_l9l8P4bJSigLntX5t3UmERrbV0KsQ8iGZYp9E';
const getSearchUrl = (query) =>
  `https://api.unsplash.com/search/photos?&query=${query}&client_id=OIcnU_l9l8P4bJSigLntX5t3UmERrbV0KsQ8iGZYp9E`;

const root = document.querySelector('.image');

const searchElm = document.querySelector('input');

function fetch(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => resolve(JSON.parse(xhr.response));
    xhr.onerror = function () {
      reject('Something went wrong...!');
    };
    xhr.send();
  });
}

function displayImages(images = []) {
  console.log(images);
  root.innerHTML = '';
  images.forEach((image) => {
    let li = document.createElement('li');
    let img = document.createElement('img');
    img.src = image.urls.thumb;
    li.append(img);
    root.append(li);
  });
}

fetch(url).then(displayImages);

function handleSearch(event) {
  if (event.keyCode === 13 && searchElm.value) {
    fetch(getSearchUrl(searchElm.value))
      .then((searchResult) => {
        console.log(searchResult);
        displayImages(searchResult.results);
      })
      .catch((error) => console.error(error));
    searchElm.value = '';
  }
}

searchElm.addEventListener('keyup', handleSearch);
