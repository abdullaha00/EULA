const link_words = ["policy", "terms", "privacy", "notice"];
const base = 'https://as3495.user.srcf.net/';

function find_links(){
    const relevant_links = Array.from(document.querySelectorAll('a'))
    .filter(a => link_words.some(phrase => a.textContent.toLowerCase().includes(phrase)))
    .map(a => a.href);

    const unique_links = [...new Set(relevant_links)];

    relevant_links.forEach(link => {
        fetch(base.concat(encodeURIComponent(encodeURIComponent(link))))
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
