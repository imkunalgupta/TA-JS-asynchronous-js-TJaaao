(function () {
  const url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`;
  const ul = document.querySelector('ul');
  const error = document.querySelector('.error');
  const select = document.querySelector('select');
  const main = document.querySelector('.main');
  const errorElm = document.querySelector('.error-msg');
  let allNews = [];

  function handleErrorMsg(message = 'Something Went Wrong!') {
    main.style.display = 'none';
    errorElm.style.display = 'block';
    errorElm.innerText = message;
  }

  function handleSpinner(status = false) {
    if (status) {
      ul.innerHTML = `<div class ="spinner"><div class="donut"></div></div>`;
    }
  }

  function renderNews(news) {
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

  function init() {
    handleSpinner(true);
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Response not ok!');
        }
      })
      .then((news) => {
        handleSpinner();
        allNews = news;
        renderNews(news);
        let allSources = Array.from(new Set(news.map((n) => n.newsSite)));
        displayOption(allSources);
      })
      .catch((error) => {
        handleErrorMsg(error);
      })
      .catch((error) => {
        handleSpinner();
      });
  }

  select.addEventListener('change', (event) => {
    let source = event.target.value.trim();
    if (source) {
      var filterdNews = allNews.filter((news) => news.newsSite === source);
    } else {
      filterdNews = allNews;
    }
    renderNews(filterdNews);
  });

  if (!navigator.online) {
    init();
  } else {
    handleErrorMsg('check your internet connection :crossed_swords:');
  }
})();
