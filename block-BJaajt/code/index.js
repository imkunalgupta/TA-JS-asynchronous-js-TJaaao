const input = document.querySelector('input');
const user = document.querySelector('.user');
const image = document.querySelector('.user img');
const name = document.querySelector('.user h2');
const p = document.querySelector('.user p');
const following = document.querySelector('.following');
const followers = document.querySelector('.followers');

function fetch(url, successHandler) {
  let xhr = new XMLHttpRequest();

  xhr.open('GET', url);

  xhr.onload = () => successHandler(JSON.parse(xhr.response));

  xhr.onerror = function () {
    console.error('Something went wrong');
  };

  xhr.send();
}

function display(url, rootElm) {
  rootElm.innerHTML = '';
  fetch(url, function (followingList) {
    let topFive = followingList.slice(0, 5);
    topFive.forEach((info) => {
      let li = document.createElement('li');
      let img = document.createElement('img');
      img.src = info.avatar_url;
      img.alt = info.name;
      li.append(img);
      rootElm.append(li);
    });
  });
}

function displayUI(data) {
  image.src = data.avatar_url;
  image.alt = data.name;
  name.innerText = data.name;
  p.innerText = '@' + data.login;
  display(`https://api.github.com/users/${data.login}/followers`, followers);
  display(`https://api.github.com/users/${data.login}/following`, following);
}

function handleChange(event) {
  if (event.keyCode === 13 && input.value) {
    let username = input.value;
    const url = 'https://api.github.com/users/';
    fetch(url + username, displayUI);
    input.value = '';
  }
}

input.addEventListener('keydown', handleChange);

const img = document.querySelector('.cat');
const reload = document.querySelector('button');

function handleClick() {
  fetch(
    `https://api.thecatapi.com/v1/images/search?limit=1&size=full`,
    function (catInfo) {
      img.src = catInfo[0].url;
    }
  );
}

reload.addEventListener('click', handleClick);
