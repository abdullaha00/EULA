//TO USE: 
//call getSurveyResults() which will do this: 
// chrome.storage.local.set({'categoryScores': adjustedScores})
// format of adjustedScores is same as category_array

// scoring of user preferences
// based on the survey results, have a multiplier on the score given by the LLM

const exampleSurveyData = {
    "age_group": "40 to 60",
    "content_creation": "often",
    "litigation_concern": "slightly_concerned",
    "privacy_concern": "slightly_concerned",
    "security_concern": "slightly_concerned",
    "timestamp": "2025-03-04T11:30:24.631Z"
};

// Predefined categories with default multiplier of 1
const example_category_array = {
    "Grant of License": 1,
    "Restrictions of Use": 1,
    "Ownership & IP": 1,
    "User responsibilities": 1,
    "Privacy & Data": 1,
    "Security": 1,
    "Third-party Services": 1,
    "Fees and Payments": 1,
    "Updates and Modifications": 1,
    "Support and Maintenance": 1,
    "Warranties": 1,
    "Liability": 1,
    "Dispute Resolution": 1,
    "Governing Law": 1,
    "Changes to EULA": 1,
};

function score_user_preferences(surveyData, category_array) {
    console.log(surveyData);
    console.log(category_array);
    // Ensure a valid survey result is passed
    if (!surveyData) {
        // console.log("Cannot read survey data!");
        console.error("No survey data provided");
        return category_array;
    }

    // Age group adjustments
    if (surveyData.age_group === "Above 60") {
        category_array["Support and Maintenance"] *= 1.2;
    } else if (surveyData.age_group === "18 to 24") {
        category_array["User responsibilities"] *= 1.2;
    }

    // Content creation adjustments for Ownership & IP
    const contentCreationMultipliers = {
        "never": 0.5,
        "rarely": 0.8,
        "sometimes": 1.0,
        "often": 1.2,
        "very_often": 1.5
    };
    if (surveyData.content_creation in contentCreationMultipliers) {
        category_array["Ownership & IP"] *= contentCreationMultipliers[surveyData.content_creation];
    }
    
    // Litigation concern adjustments
    const litigationMultipliers = {
        "not_concerned": 0.8,
        "slightly_concerned": 1.0,
        "moderately_concerned": 1.1,
        "very_concerned": 1.2
    };
    if (surveyData.litigation_concern in litigationMultipliers) {
        const multiplier = litigationMultipliers[surveyData.litigation_concern];
        category_array["Liability"] *= multiplier;
        category_array["Dispute Resolution"] *= multiplier;
        category_array["Governing Law"] *= multiplier;
    }
    
    // Privacy concern adjustments
    const privacyMultipliers = {
        "not_concerned": 0.8,
        "slightly_concerned": 1.0,
        "moderately_concerned": 1.1,
        "very_concerned": 1.2
    };
    if (surveyData.privacy_concern in privacyMultipliers) {
        const multiplier = privacyMultipliers[surveyData.privacy_concern];
        category_array["Privacy & Data"] *= multiplier;
        category_array["Third-party Services"] *= multiplier;
    }
    
    // Security concern adjustments
    const securityMultipliers = {
        "not_concerned": 0.8,
        "slightly_concerned": 1.0,
        "moderately_concerned": 1.1,
        "very_concerned": 1.2
    };
    if (surveyData.security_concern in securityMultipliers) {
        category_array["Security"] *= securityMultipliers[surveyData.security_concern];
    }
    return category_array;
}

//Usage example (for debugging)


// const adjustedScores = score_user_preferences(exampleSurveyData, example_category_array);
// console.log(adjustedScores);