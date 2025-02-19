import os
import re
from nltk.corpus import stopwords
from collections import defaultdict

# Load stopwords and prepare regex for tokenization
stop_words = set(stopwords.words('english'))
pattern = re.compile(r'\b[a-zA-Z]+\b')

# Dictionary to store accumulated relative frequencies across documents
accumulated_relative_freq = defaultdict(float)

directory = 'EULA/'
for filename in os.listdir(directory):
    if filename.endswith('.txt'):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as file:
            text = file.read().lower()
            tokens = pattern.findall(text)
            # Filter out stopwords and short words
            filtered_tokens = [word for word in tokens if word not in stop_words and len(word) > 2]
            
            # Skip empty documents
            if not filtered_tokens:
                continue  
            
            # Calculate relative frequency for this document
            total_words_in_doc = len(filtered_tokens)
            doc_word_counts = defaultdict(int)
            for word in filtered_tokens:
                doc_word_counts[word] += 1
            
            # Accumulate relative frequencies
            for word, count in doc_word_counts.items():
                accumulated_relative_freq[word] += count / total_words_in_doc

# Normalize frequencies between 0 and 1
if accumulated_relative_freq:
    max_freq = max(accumulated_relative_freq.values())
    normalized_freqs = {word: freq / max_freq for word, freq in accumulated_relative_freq.items()}
else:
    normalized_freqs = {}

# Sort words by normalized frequency (descending)
sorted_words = sorted(normalized_freqs.items(), key=lambda x: x[1], reverse=True)

# Write results to a text file
with open('normalized_word_frequencies2.txt', 'w', encoding='utf-8') as output_file:
    for word, norm_freq in sorted_words:
        output_file.write(f"{word}: {norm_freq:.6f}\n")