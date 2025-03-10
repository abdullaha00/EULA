// Main analysis pipeline
async function analyzeEulaText(text) {
    try {
        text = splitTextIntoSentences(text);
        // Parse sentence
        console.log("text:", text);
        const categorized = categorizeSentences(text, category_items);
        console.log("Categorized sentences:", categorized);
        // Send to LLM for analysis
        const results = await processLLMResults(categorized, categories);
        console.log("results parsed!")
        console.log(results);

        // Send to score multiplier
        const surveyData = await getSurveyData();
        // console.log("survey data!");
        // console.log(surveyData);
        results.categoryAverages = score_user_preferences(surveyData, results.categoryAverages); 
       
        console.log(results)
        return results;
    
    } catch (error) {
        console.log("catch error...")
        console.error('Analysis failed:', error);
        throw error;
    }
}

async function getSurveyData() {
    try {
        const result = await chrome.storage.local.get(['surveyResults']);
        return result.surveyResults || exampleSurveyData;
    } catch (error) {
        console.error('Error with Chrome storage', error);
        return exampleSurveyData;
    }
}


// For Debugging Use 
// async function main() {
//     const test = await analyzeEulaText(debug_sentences)
//     console.log(test)
// }
// main();
