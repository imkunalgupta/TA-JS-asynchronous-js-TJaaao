const ul = document.querySelector('ul');
const select = document.querySelector('select');
let allNews = [];

const url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`;
