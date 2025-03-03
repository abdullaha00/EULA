submitBtn = document.getElementById('submitPastedEulaBtn');

if (submitBtn) {
    pastedEula = document.getElementById('pastedEula');
    if (pastedEula) {
        submitBtn.addEventListener('click', () => {analyse(pastedEula.value);});
    }
}

resultArea = document.getElementById('analysisResult');

function analyse(text) {
    if (resultArea) {
        resultArea.textContent = "EULA submitted: " + text;
    }
}
