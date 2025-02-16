const phrases = ["policy", "terms", "privacy", "notice"];
const base = 'http://localhost:3000/';
const relevant_links = Array.from(document.body.querySelectorAll('a'))
    .filter(a => phrases.some(phrase => a.textContent.toLowerCase().includes(phrase)))
    .map(a => a.href);

const unique_links = [...new Set(relevant_links)];
console.log(unique_links);

relevant_links.forEach(link => {
    fetch(base.concat(encodeURIComponent(link)))
    .then(res => res.json())
    .then(console.log)
});
