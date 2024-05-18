function displayResults(data) {
    const answerElement = document.getElementById('answer');
    answerElement.innerHTML = '';

    
    try {
        const jsonData = JSON.parse(data);
        jsonData.forEach(item => {
            const bar = document.createElement('div');
            bar.style.width = (item.probability * 100) + '%';
            bar.className = 'result-bar ' + item.className.toLowerCase();
            bar.textContent = `${item.className}: ${(item.probability * 100).toFixed(2)}%`;
            answerElement.appendChild(bar);
        });
    } catch (e) {
        answerElement.textContent = 'Fehler beim Parsen der Antwort: ' + e.message;
    }
    document.getElementById('answerPart').style.visibility = 'visible';
}

function getSentiment(event, text) {
    console.log(text);

    if (!text || event.key !== "Enter") {
        document.getElementById('answer').innerHTML = '';
        document.getElementById('answerPart').style.visibility = "hidden";
        return;
    }

    document.getElementById('answerPart').style.visibility = "visible";

    fetch('/sentiment?' + new URLSearchParams({
        text: text,
    }), {
        method: 'GET',
        headers: {}
    }).then(response => {
        console.log(response)
        response.text().then(function (text) {
            displayResults(text);
        });
    }).then(
        success => console.log(success)
    ).catch(
        error => console.log(error)
    );
}