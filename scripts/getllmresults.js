// Main analysis pipeline
async function analyzeEulaText(text) {
    try {
        // Parse sentence
        const categorized = categorizeSentences(text, category_items);
        
        // Send to LLM for analysis
        const results = await processLLMResults(categorized, categories);
        //return score_by_category;
        // Send to score multiplier
        const surveyData = await getSurveyData();
        results.categoryAverages = score_user_preferences(surveyData, results.categoryAverages);

        return results;
    
    } catch (error) {
        console.error('Analysis failed:', error);
        throw error;
    }
}

async function getSurveyData() {
    try {
        const result = await chrome.storage.local.get(['surveyResults']);
        return result;
    } catch (error) {
        //console.error('Error retrieving survey results:', error);
        return exampleSurveyData;
    }
}


// For Debugging Use 
async function main() {
    const test = await analyzeEulaText(sentences)
    console.log(test)
}
main();
