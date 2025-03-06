import {askLLMForAll} from '../text_extraction/llmparse.js';
import {categorizeSentences, categories, sentences} from '../text_extraction/filter.js';
import {exampleSurveyData, example_category_array, score_user_preferences} from './score-multiplier.js';

// Main analysis pipeline
export async function analyzeEulaText(text, categories) {
    try {
        // Parse sentence
        const categorized = categorizeSentences(text, categories);
        
        // Send to LLM for analysis
        const score_by_category = await askLLMForAll(categorized);
        return score_by_category;
        // Send to score multiplier
        //const final_score_by_category_array = score_user_preferences(exampleSurveyData, example_category_array);

        //return final_score_by_category_array;
    
    } catch (error) {
        console.error('Analysis failed:', error);
        throw error;
    }
}

const test = analyzeEulaText(sentences, categories)
console.log(test)