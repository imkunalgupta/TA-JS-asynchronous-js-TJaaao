const ul = document.querySelector('ul');
const select = document.querySelector('select');
const divVisible = document.querySelector('div');
let allNews = [];

function renderNews(news = []) {
  ul.innerHTML = '';
  news.forEach((newsItem) => {
    let li = document.createElement('li');
    li.classList.add('flex');
    let img = document.createElement('img');
    img.src = newsItem.imageUrl;
    img.alt = newsItem.title;
    let div = document.createElement('div');
    let h4 = document.createElement('h4');
    h4.innerText = newsItem.newsSite;
    let p = document.createElement('p');
    p.innerText = newsItem.title;
    let a = document.createElement('a');
    a.href = newsItem.url;
    let button = document.createElement('button');
    a.append(button);
    button.innerText = 'Read More';
    div.append(h4, p, a);
    li.append(img, div);
    ul.append(li);
  });
}

function displayOption(sources) {
  sources.forEach((source) => {
    let option = document.createElement('option');
    option.innerText = source;
    option.value = source;
    select.append(option);
  });
}

const url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`;
fetch(url)
  .then((res) => {
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return res.json();
  })
  .then((news) => {
    if (!navigator.online) {
      throw new Error(`Network is not connected!`);
    }
    if (divVisible.classList === 'hidden') {
      divVisible.classList.remove('hidden');
      divVisible.classList.add('visible');
    }
    console.log(news);
    allNews = news;
    renderNews(news);
    let allSources = Array.from(new Set(news.map((n) => n.newsSite)));
    displayOption(allSources);
  })
  .catch((error) => {
    ul.innerText = error;
  })
  .finally(() => {
    divVisible.classList.add('hidden');
    divVisible.classList.remove('visible');
  });

select.addEventListener('change', (event) => {
  let source = event.target.value.trim();
  if (source) {
    var filterdNews = allNews.filter((news) => news.newsSite === source);
  } else {
    filterdNews = allNews;
  }
  renderNews(filterdNews);
});
