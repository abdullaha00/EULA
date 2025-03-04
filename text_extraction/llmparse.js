async function getLLMResponse(prompt) {
    try {
        console.log("Sending request with prompt:", prompt);
        const response = await fetch("https://api.together.xyz/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer d9a96b122fbb7c131ba05a0f3c67ffda5eba4f2db58f6e5c5edff31d887550c1"
            },
            body: JSON.stringify({
                model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.0
            })
        });

        console.log("Response status:", response.status);
        const data = await response.json();
        console.log("Response data:", data);

        if (!response.ok) {
            throw new Error(data.error?.message || "API request failed");
        }

        // Extract the first line of the response
        const fullResponse = data.choices?.[0]?.message?.content || "No response from model";
        const firstLine = fullResponse.split('\n')[0].trim(); // Take the first line and trim any extra spaces

        return firstLine;
    } catch (error) {
        console.error("Error details:", error);
        return "Error getting response!";
    }
}

async function askLLMForAll(sentences) {

    console.log("Processing sentences...");
    const results = [];
    for (let i = 0; i < sentences.length; i++) {
        // Get the category for the sentence
        const categoryPrompt = `Answer with only one category - sort the following sentence into one of these categories: ${categories.join(", ")}; '${sentences[i]}'`;
        const categoryResponse = await getLLMResponse(categoryPrompt);
        
        // Add a delay between requests
        await new Promise(resolve => setTimeout(resolve, 1000)); // in milisecs

        // Get the importance score for the sentence
        const scorePrompt = `Answer with only one number and nothing else. On a scale of 1 to 5, where 1 is least important and 5 is most important, rate how important this sentence is to a user in the context of a EULA compared to potentially other sentences: '${sentences[i]}'. Answer with only the number.`;
        const scoreResponse = await getLLMResponse(scorePrompt);

        // Parse the score as an integer (ensure it's within the valid range)
        const score = scoreResponse; 

        results.push({
            sentence: sentences[i],
            category: categoryResponse,
            importanceScore: score
        });

        // Add a delay between requests
        await new Promise(resolve => setTimeout(resolve, 1000)); // in milisecs
    }

    return results;
}

const categories = [
    "Grant of License",
    "Restrictions of Use",
    "Ownership & IP",
    "User responsibilities",
    "Privacy & Data",
    "Security",
    "Third-party Services",
    "Fees and Payments",
    "Updates and Modifications",
    "Support and Maintenance",
    "Warranties",
    "Liability",
    "Dispute Resolution",
    "Governing Law",
    "Changes to EULA"
];

const sentences = [
    "The user is granted a non-exclusive, non-transferable license to use the software.", // Grant of License
    "You may not reverse-engineer, decompile, or disassemble the software.", // Restrictions of Use
    "All intellectual property rights in the software remain with the company.", // Ownership & IP
    "Users must ensure their login credentials are kept secure.", // User responsibilities
    "Your personal data will not be shared with third parties without consent.", // Privacy & Data
    "The software includes encryption to protect user data.", // Security
    "The software may integrate with third-party services like payment gateways.", // Third-party Services
    "A monthly subscription fee is required to access premium features.", // Fees and Payments
    "We may update the software to improve functionality or fix bugs.", // Updates and Modifications
    "Technical support is available during business hours for all users.", // Support and Maintenance
    "The software is provided 'as is' without any warranties.", // Warranties
    "The company is not liable for any indirect damages caused by the software.", // Liability
    "Any disputes will be resolved through arbitration.", // Dispute Resolution
    "This agreement is governed by the laws of the State of California.", // Governing Law
    "We reserve the right to modify this EULA at any time." // Changes to EULA
];

askLLMForAll(sentences).then(results => {
    console.log("Sentence to Category and Importance Score Mapping:");
    console.log(results);
});
