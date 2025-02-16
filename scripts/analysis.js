let submitBtn = document.getElementById('submitPastedEulaBtn')

if (submitBtn) {
    let pastedEula = document.getElementById('pastedEula')
    if (pastedEula) {
        submitBtn.addEventListener('click', () => {analyse(pastedEula.value)})
    }
    else {
        console.log("EULA textarea is missing")
        // TODO: handle error
    }
}

let resultArea = document.getElementById('analysisResult')
// handle not found

function analyse(text) {
    console.log("EULA submitted: " + text)
    resultArea.textContent = "EULA submitted: " + text
    // TODO: implement
    // @Alex
}
