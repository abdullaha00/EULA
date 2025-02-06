const body = document.body;
const headings = Array.from(body.querySelectorAll("h1, h2, h3")).map(h => h.textContent.trim());
const texts = Array.from(body.querySelectorAll("p, li")).map(p => p.textContent.trim());

console.log("Headings found:", headings);
console.log("Bodies  found:", texts);