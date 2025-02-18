from gensim.models import KeyedVectors

# Load a pre-trained Word2Vec model (e.g., Google News vectors)
word2vec_model = KeyedVectors.load_word2vec_format('GoogleNews-vectors-negative300.bin', binary=True)

# Predefined categories
categories = ["privacy", "arbitration", "availability", "advertising", "security"]

# Weights for combined score calculation
w_freq = 0.4  # Weight for frequency
w_sim = 0.6   # Weight for similarity

# Function to calculate similarity
def get_similarity(word1, word2):
    try:
        return word2vec_model.similarity(word1, word2)
    except KeyError:
        return 0

# Function to normalize values using min-max scaling
def min_max_normalize(values):
    min_val = min(values)
    max_val = max(values)
    return [(x - min_val) / (max_val - min_val) if max_val != min_val else 0 for x in values]

# Read the text file and extract words with their frequencies
words = []
frequencies = []
with open('normalized_word_frequencies2.txt', 'r', encoding='utf-8') as file:
    for line in file:
        parts = line.split(':')
        if len(parts) == 2:
            word = parts[0].strip()
            frequency = float(parts[1].strip())
            words.append(word)
            frequencies.append(frequency)

# Normalize frequencies
normalized_frequencies = min_max_normalize(frequencies)

# Compare each word with the predefined categories
all_similarities = []

# First pass to collect all similarity scores
for word in words:
    word_similarities = []
    for category in categories:
        similarity = get_similarity(word, category)
        word_similarities.append(similarity)
    all_similarities.extend(word_similarities)

# Calculate normalization parameters for similarities
min_similarity = min(all_similarities)
max_similarity = max(all_similarities)
print("Min:", min_similarity)
print("Max:", max_similarity)
similarity_range = max_similarity - min_similarity

# Second pass to get normalized scores and best categories
results = []
for word, frequency, norm_freq in zip(words, frequencies, normalized_frequencies):
    # Initialize variables for tracking best and second best
    best_category = None
    second_best_category = None
    best_similarity = -1
    second_best_similarity = -1
    best_normalized_similarity = -1
    second_best_normalized_similarity = -1
    
    # Track all category similarities to find best and second best
    category_scores = []
    for category in categories:
        similarity = get_similarity(word, category)
        # Min-max normalization for similarity
        normalized_similarity = (similarity - min_similarity) / similarity_range if similarity_range != 0 else 0
        
        category_scores.append({
            'category': category,
            'similarity': similarity,
            'normalized_similarity': normalized_similarity
        })
    
    # Sort by normalized similarity to easily get top 2
    category_scores.sort(key=lambda x: x['normalized_similarity'], reverse=True)
    
    # Get best match
    if len(category_scores) > 0:
        best_similarity = category_scores[0]['similarity']
        
        # Only process this word if its best similarity is >= 0.25
        if best_similarity >= 0.25:
            best_category = category_scores[0]['category']
            best_normalized_similarity = category_scores[0]['normalized_similarity']
            
            # Get second best match if it exists
            if len(category_scores) > 1:
                second_best_category = category_scores[1]['category']
                second_best_similarity = category_scores[1]['similarity']
                second_best_normalized_similarity = category_scores[1]['normalized_similarity']
            
            # Calculate combined score using best similarity
            combined_score = (w_freq * norm_freq) + (w_sim * best_normalized_similarity)
            
            results.append({
                'word': word,
                'frequency': frequency,
                'category': best_category,
                'second_best_category': second_best_category,
                'original_similarity': best_similarity,
                'second_best_similarity': second_best_similarity,
                'normalized_similarity': best_normalized_similarity,
                'second_best_normalized_similarity': second_best_normalized_similarity,
                'normalized_frequency': norm_freq,
                'combined_score': combined_score
            })

# Sort results by combined score in descending order
results.sort(key=lambda x: x['combined_score'], reverse=True)

##Save the results to a text file
with open('word_category_similarity_results3.txt', 'w', encoding='utf-8') as output_file:
    output_file.write("Rank, Word, Frequency, Most Similar Category, Original Similarity, Normalized Similarity, Normalized Frequency, Combined Score\n")
    for rank, result in enumerate(results, 1):
        output_file.write(
            f"{rank}, {result['word']}, {result['frequency']}, {result['category']}, "
            f"{result['original_similarity']:.4f}, {result['normalized_similarity']:.4f}, "
            f"{result['normalized_frequency']:.4f}, {result['combined_score']:.4f}\n"
        )

with open('Pure_word_list.txt', 'w', encoding='utf-8') as output_file:
    #output_file.write("Rank, Word, Frequency, Most Similar Category, Original Similarity, Normalized Similarity, Normalized Frequency, Combined Score\n")
    for rank, result in enumerate(results, 1):
        output_file.write(
            f"{result['word']}, {result['category']}, {result['second_best_category']}\n"
        )