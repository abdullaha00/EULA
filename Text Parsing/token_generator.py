import spacy

# Load English language model 
nlp = spacy.load("en_core_web_sm")

def find_sentences_with_word(text, target_word):
       
    # Process the text
    doc = nlp(text)
    
    # Get sentences containing the target word (case insensitive)
    target_word = target_word.lower()
    matching_sentences = [sent.text.strip() for sent in doc.sents 
                        if target_word in sent.text.lower()]
    
    return matching_sentences

# open text file
with open("file1.txt", 'r', encoding='utf-8') as file:
    text = file.read()

word = "security"
sentences = find_sentences_with_word(text, word)

# print(f"\nSentences containing '{word}':")
# for sentence in sentences:
#     print(f"- {sentence}")

for sentence in sentences:
    doc = nlp(sentence)
    #tokens = [token.text for token in doc]    
    # Remove stop words and punctuation
    clean_tokens = [token.text for token in doc if not token.is_stop and not token.is_punct]
    print(f"Original: {sentence}")
    print(f"Tokens: {clean_tokens}\n")