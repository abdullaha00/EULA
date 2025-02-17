const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

phrases = ["policy", "terms", "privacy"]

async function fetch_EULA_content(link) {
    const response = await fetch(link);
    const text = await response.text();
    const dom = new JSDOM(text);
    const body = dom.window.document.body;
    const headings = Array.from(body.querySelectorAll("h1, h2, h3")).map(h => h.textContent.trim());
    const texts = Array.from(body.querySelectorAll("p, li")).map(p => p.textContent.trim());
    return headings, texts;

}
app.get('/:link', async (request, response) => {
    try{
        console.log("good", decodeURIComponent(request.params.link))
        response.send(await fetch_EULA_content(decodeURIComponent(request.params.link)));
    }catch (error){
        response.status(500).json({ error: error.message });''
        console.log("bad", error.message, decodeURIComponent(request.params.link));
    }
});

app.listen(process.env.PORT || 3000, () => console.log("App available on http://localhost:3000"))