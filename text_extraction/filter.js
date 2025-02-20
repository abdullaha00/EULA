categories = {'privacy': ['privacy', 'terms', 'information', 'confidentiality', 'data', 'rights', 'personal', 'copyright', 'confidential', 'law', 'anonymized', 'users', 'secrecy', 'user', 'safeguards', 'intrusive', 'protections', 'identity', 'passwords', 'disclosure', 'dignity', 'identities', 'freedoms', 'laws', 'breach', 'freedom', 'breaches', 'respect', 'protect', 'consent'], 'availability': ['use', 'availability', 'available', 'access', 'unavailability', 'provide', 'including', 'usage', 'supply', 'applicable', 'quality', 'delivery', 'pricing', 'reliability', 'operability', 'compatibility', 'purchase', 'demand', 'limited', 'connectivity', 'effectiveness', 'features', 'additional', 'distribution', 'introduction', 'quantity', 'provided', 'requirements', 'ability', 'functionality', 'product', 'products', 'using', 'selection', 'productivity', 'sale', 'acceptance', 'applicability', 'accuracy'], 'security': ['security', 'services', 'software', 'service', 'cybersecurity', 'encryption', 'protection', 'safety', 'cryptographic', 'account', 'cyber', 'authentication', 'intelligence', 'vulnerabilities', 'secure', 'infrastructure', 'threats', 'vulnerability', 'antiterrorism', 'safeguarding', 'policy', 'governance', 'police', 'heightened', 'compliance', 'guard', 'border', 'intruders', 'biometric', 'encrypted', 'malware'], 'arbitration': ['arbitration', 'arbitrators', 'arbitrator', 'arbitrate', 'arbitrated', 'arbitrations', 'mediation', 'contract', 'agreement', 'litigation', 'legal', 'contractual', 'dispute', 'tribunal', 'disputes', 'settlement', 'termination', 'court', 'arb', 'indemnification', 'waiver', 'damages', 'mediator', 'litigating', 'litigated', 'clause', 'compensation', 'waive', 'liability', 'bankruptcy', 'agree', 'contracts', 'indemnity', 'third', 'injunctive', 'severability', 'waivers', 'lawsuit', 'negotiate', 'creditor', 'tort', 'negotiated', 'lawsuits', 'appeals', 'courts', 'trade', 'jurisdiction'], 'advertising': ['advertising', 'content', 'ads', 'advertisements', 'advertisers', 'marketing', 'advertisement', 'promotional', 'advertise', 'campaigns', 'branding', 'promotions', 'billboard', 'sponsorships', 'print', 'digital', 'online', 'signage', 'sponsorship', 'monetization', 'customer', 'business', 'mailings', 'brand', 'sales', 'media', 'revenue', 'newspapers', 'subscription', 'publishers', 'creative', 'consumer', 'internet', 'brands', 'commercial', 'interactive', 'app', 'promotion', 'mobile', 'listings', 'publishing', 'websites', 'subscriptions', 'revenues', 'television', 'advertised', 'publicity', 'messaging', 'syndication', 'magazines', 'entertainment', 'google', 'spamming']}

// Check if a sentence contains a word in one of the categories 
function categorizeSentences(sentences, categories) {
    const results = [];
  
    for (const sentence of sentences) {
      const sentenceWords = sentence.toLowerCase().split(/\s+/); // Split into words, lowercase for case-insensitivity
      const matchingCategories = {};
  
      for (const categoryName in categories) {
        const categoryWords = categories[categoryName];
        const foundWords = [];
  
        for (const word of sentenceWords) {
          if (categoryWords.includes(word)) {
            foundWords.push(word);
          }
        }
  
        if (foundWords.length > 0) {
          matchingCategories[categoryName] = foundWords; // for debugging if needed, to remove 
        }
      }
  
      results.push({
        sentence: sentence,
      });
    }
  
    return results;
  }