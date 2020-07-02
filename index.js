addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request));
});

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
    try {
        const endpoint =
            "https://raw.githubusercontent.com/asharp02/be-the-best/master/trivia.json";
        const response = await fetch(endpoint);
        const triviaData = await response.json();
        random = Math.floor(Math.random() * triviaData.length);
        triviaJSON = JSON.stringify({ trivia: triviaData[random] });
        return new Response(triviaJSON, { status: 200 });
    } catch (err) {
        return new Response("An error occurred", { status: 500 });
    }
}
