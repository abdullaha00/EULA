async function getLLMResponse(prompt) {
    try {
        //console.log("Sending request with prompt:", prompt);
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

        //console.log("Response status:", response.status);
        const data = await response.json();
        //console.log("Response data:", data);

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
    console.log("Processing sentences...", sentences);
    const results = [];
    for (let i = 0; i < sentences.length; i++) {
        // Get the category for the sentence
        const categoryPrompt = `Answer with only one category - sort the following sentence into one of these categories: ${categories.join(", ")}; '${sentences[i]}'`;
        const categoryResponse = await getLLMResponse(categoryPrompt);
        
        // Add a delay between requests
        await new Promise(resolve => setTimeout(resolve, 1000)); // in milliseconds

        // Get the importance score for the sentence
        const scorePrompt = `Answer with only one decimal and nothing else. On a scale from 0 to 1, where 0 is least important and 1 is most important, rate how important this sentence is to a user in the context of a EULA, ranked against potential other sentences: '${sentences[i]}'. Answer with only the decimal. A sentence picked at random from a EULA should have a uniform distribution.`;
        const scoreResponse = await getLLMResponse(scorePrompt);

        // Parse the score as a float (ensure it's within the valid range)
        const score = parseFloat(scoreResponse); 

        results.push({
            sentence: sentences[i],
            category: categoryResponse,
            importanceScore: score
        });

        // Add a delay between requests
        await new Promise(resolve => setTimeout(resolve, 1000)); // in milliseconds
    }

    return results;
}

// Function to assign ranks based on quintiles
function assignRanks(sortedResults) {
    const totalItems = sortedResults.length;
    const quintileSize = Math.ceil(totalItems / 5); // Size of each quintile

    return sortedResults.map((result, index) => {
        const quintile = Math.floor(index / quintileSize) + 1; // Determine quintile (1 to 5)
        return {
            ...result,
            rank: quintile
        };
    });
}

// Function to calculate the average rank for each category
function calculateCategoryAverageRanks(rankedResults, categories) {
    const categoryMap = {};

    // Initialize all categories with totalRank: 0 and count: 0
    categories.forEach(category => {
        categoryMap[category] = { totalRank: 0, count: 0 };
    });

    // Group sentences by category and calculate total rank and count
    rankedResults.forEach(result => {
        const { category, rank } = result;

        if (categoryMap[category]) {
            categoryMap[category].totalRank += rank;
            categoryMap[category].count += 1;
        }
    });

    // Calculate the average rank for each category
    const categoryAverageRanks = {};
    for (const category of categories) {
        const { totalRank, count } = categoryMap[category];
        const averageRank = count > 0 ? totalRank / count : 0; // Default to 0 if no sentences in the category

        // Round the average rank to the nearest integer (1 to 5)
        categoryAverageRanks[category] = Math.round(averageRank);
    }

    return categoryAverageRanks;
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

// Call the function and transform the output
// askLLMForAll(sentences).then(results => {
//     console.log("Original Output:");
//     console.log(results); // Original output (array of objects)

//     // Sort the results based on importanceScore (ascending order)
//     const sortedResults = results.sort((a, b) => a.importanceScore - b.importanceScore);

//     // Assign ranks based on quintiles
//     const rankedResults = assignRanks(sortedResults);

//     console.log("Ranked Output:");
//     console.log(rankedResults); // Output with ranks

//     // Transform the ranked results into triples
//     const triples = rankedResults.map(result => [result.sentence, result.category, result.importanceScore, result.rank]);
//     console.log("Transformed Output (Triples with Ranks):");
//     console.log(triples); // Outputs a list of triples (sentence, category, score, rank)

//     // Calculate category average ranks (using the ranks already assigned)
//     const categoryAverageRanks = calculateCategoryAverageRanks(rankedResults, categories);
//     console.log("Category Average Ranks (1 to 5, with 0 for missing categories):");
//     console.log(categoryAverageRanks); // Outputs a hashmap of category to average rank
// });

async function processLLMResults(sentences, categories) {
    console.log("calling LLM...");
    const results = await askLLMForAll(sentences);
    console.log("results obtained!");
    console.log(results);
    
    // Your existing processing logic
    const sortedResults = results.sort((a, b) => a.importanceScore - b.importanceScore);
    const rankedResults = assignRanks(sortedResults);
    const triples = rankedResults.map(result => [result.sentence, result.category, result.importanceScore, result.rank]);
    const categoryAverageRanks = calculateCategoryAverageRanks(rankedResults, categories);

    return {
        raw: results,
        ranked: rankedResults,
        triples,
        categoryAverages: categoryAverageRanks
    };
}