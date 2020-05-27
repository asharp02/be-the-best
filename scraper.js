const jsdom = require("jsdom");
const fetch = require("isomorphic-fetch");

const { JSDOM } = jsdom;
const fs = require("fs");

async function scrapeIMDB() {
    const response = await fetch("https://www.imdb.com/title/tt0288937/trivia");
    const text = await response.text();
    const dom = await new JSDOM(text);
    const triviaDivList = [
        ...dom.window.document.querySelectorAll(".sodatext")
    ];
    triviaList = triviaDivList.map(triviaDiv => {
        return `"${triviaDiv.textContent.replace(/"/g, "'").trim()}"`;
    });

    await updateFile(triviaList);
}

scrapeIMDB();
async function updateFile(trivia) {
    fs.writeFile("trivia.json", `[${trivia}]`, function(err) {
        if (err) throw err;
        console.log("Updated");
    });
}
