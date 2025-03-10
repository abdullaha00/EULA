// script to perform analysis on user submitted EULA

submitBtn = document.getElementById('submitPastedEulaBtn');

if (submitBtn) {
    pastedEula = document.getElementById('pastedEula');
    if (pastedEula) {
        submitBtn.addEventListener('click', () => {handleAnalyseButton(pastedEula.value);});
    }
}

// Create or get a progress element from the DOM
let progressElement = document.getElementById('progressIndicator');
if (!progressElement) {
    progressElement = document.createElement('div');
    progressElement.id = 'progressIndicator';
    // Append it to your result area or another container
    document.body.appendChild(progressElement);
}

// Function to update the progress indicator
function updateProgress(current, total) {
    progressElement.textContent = `Some sentences may have been filtered out. Processing sentence ${current} of ${total}`;
}

resultArea = document.getElementById('analysisResult');

async function handleAnalyseButton(text) {
    if (resultArea) {
        // this should replace resultArea with a graph view of the analysis
        customEulaAnalysis = await analyzeEulaText(text);
        // resultArea.innerHTML = visualise(analysis);
        // resultArea.textContent = "EULA submitted: " + text;
        resultArea.textContent = "EULA submitted: " + JSON.stringify(customEulaAnalysis);
        
        // add objects necessary to save analysis
        var centerDiv = document.createElement('div');
        centerDiv.classList.add('center-items');
        resultArea.appendChild(centerDiv);

        var nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.id = 'analysisName';
        nameInput.placeholder = 'Service name';
        centerDiv.appendChild(nameInput);

        var saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save';
        centerDiv.appendChild(saveBtn);
        analysis = text; // delete once analysis is implemented
        saveBtn.addEventListener('click', () => {saveAnalysis(analysis);});
    }
}

function saveAnalysis(analysis) {
    var nameInput = document.getElementById('analysisName');
    var key = nameInput.value;
    chrome.storage.local.get([key], function(result) {
        if (result[key] !== undefined) {
            alert('An analysis with this name already exists.');
        } else {
            chrome.storage.local.set({ [key]: analysis });
        }
    });
}