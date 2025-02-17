console.log("start test eula!");
const phrases = ["policy", "terms", "privacy", "notice"];
const base = 'http://localhost:3000/';

function find_links(){
    const relevant_links = Array.from(document.querySelectorAll('a'))
    .filter(a => phrases.some(phrase => a.textContent.toLowerCase().includes(phrase)))
    .map(a => a.href);

    const unique_links = [...new Set(relevant_links)];
    console.log(unique_links);

    relevant_links.forEach(link => {
        console.log(base.concat(encodeURIComponent(link)));
        fetch(base.concat(encodeURIComponent(link)))
        .then(res => res.json())
        .then(console.log)
    });
}

if (document.readyState === "loading") {
    setTimeout(() => {
        find_links();
    }, 1000);
} else {
    setTimeout(() => {
        find_links();
    }, 1000);
    
}
