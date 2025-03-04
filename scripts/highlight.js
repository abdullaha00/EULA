// page highlighting script

const categories = ['privacy', 'availability', 'security', 'arbitration', 'advertising']
const keywords = {
    'privacy': ['privacy', 'terms', 'information', 'confidentiality', 'data', 'rights', 'personal', 'copyright', 'confidential', 'law', 'anonymized', 'users', 'secrecy', 'user', 'safeguards', 'intrusive', 'protections', 'identity', 'passwords', 'disclosure', 'dignity', 'identities', 'freedoms', 'laws', 'breach', 'freedom', 'breaches', 'respect', 'protect', 'consent'], 
    'availability': ['use', 'availability', 'available', 'access', 'unavailability', 'provide', 'including', 'usage', 'supply', 'applicable', 'quality', 'delivery', 'pricing', 'reliability', 'operability', 'compatibility', 'purchase', 'demand', 'limited', 'connectivity', 'effectiveness', 'features', 'additional', 'distribution', 'introduction', 'quantity', 'provided', 'requirements', 'ability', 'functionality', 'product', 'products', 'using', 'selection', 'productivity', 'sale', 'acceptance', 'applicability', 'accuracy'],
    'security': ['security', 'services', 'software', 'service', 'cybersecurity', 'encryption', 'protection', 'safety', 'cryptographic', 'account', 'cyber', 'authentication', 'intelligence', 'vulnerabilities', 'secure', 'infrastructure', 'threats', 'vulnerability', 'antiterrorism', 'safeguarding', 'policy', 'governance', 'police', 'heightened', 'compliance', 'guard', 'border', 'intruders', 'biometric', 'encrypted', 'malware'],
    'arbitration': ['arbitration', 'arbitrators', 'arbitrator', 'arbitrate', 'arbitrated', 'arbitrations', 'mediation', 'contract', 'agreement', 'litigation', 'legal', 'contractual', 'dispute', 'tribunal', 'disputes', 'settlement', 'termination', 'court', 'arb', 'indemnification', 'waiver', 'damages', 'mediator', 'litigating', 'litigated', 'clause', 'compensation', 'waive', 'liability', 'bankruptcy', 'agree', 'contracts', 'indemnity', 'third', 'injunctive', 'severability', 'waivers', 'lawsuit', 'negotiate', 'creditor', 'tort', 'negotiated', 'lawsuits', 'appeals', 'courts', 'trade', 'jurisdiction'],
    'advertising': ['advertising', 'content', 'ads', 'advertisements', 'advertisers', 'marketing', 'advertisement', 'promotional', 'advertise', 'campaigns', 'branding', 'promotions', 'billboard', 'sponsorships', 'print', 'digital', 'online', 'signage', 'sponsorship', 'monetization', 'customer', 'business', 'mailings', 'brand', 'sales', 'media', 'revenue', 'newspapers', 'subscription', 'publishers', 'creative', 'consumer', 'internet', 'brands', 'commercial', 'interactive', 'app', 'promotion', 'mobile', 'listings', 'publishing', 'websites', 'subscriptions', 'revenues', 'television', 'advertised', 'publicity', 'messaging', 'syndication', 'magazines', 'entertainment', 'google', 'spamming']
}

const colours = ["FFFF77", "AEFF77", "77C9FF", "7777FF", "FF7792"]
const colour_map = {};
for (let i = 0; i < categories.length; i ++){
    colour_map[categories[i]] = colours[i];
}

function highlight(phrase) {
    const walker = document.createTreeWalker(phrase, NodeFilter.SHOW_TEXT, null, false)
    let nodes = [];
    while (walker.nextNode()) {
        nodes.push(walker.currentNode);
    }
    for (let node of nodes){
        let sentences = node.textContent.match(/[^\.!\?;,-]+[\.!\?;,-]+|[^\.!\?;,-]+$/g) || [];
        out = []
        const scores = {};
        for (let i = 0; i < categories.length; i ++){
            scores[categories[i]] = 0;}
        
        for (sentence of sentences){
            const sentenceWords = sentence.toLowerCase().split(/\s+/); // Split into words, lowercase for case-insensitivity  
            for (const category of categories) {
                const categoryWords = keywords[category];
                for (const word of sentenceWords) {
                    if (categoryWords.includes(word)) {
                        scores[category] ++;
            }}}
            max_score = 0;
            max_cat = null;
            for(const category of categories){
                if (scores[category] > max_score){
                    max_cat = category;
                    max_score = scores[category];
                }
            }
            if (max_score === 0){
                out.push(sentence)
            }
            else{
                out.push(`<mark style="background: #${colour_map[max_cat]}!important">${sentence}</mark>`)
            }
        }
        // create a new HTML element with the marked nodes
        const span = document.createElement("span");
        span.innerHTML = out.join("");
        node.replaceWith(span);
    }
    
  }

const phrases = Array.from(document.querySelectorAll("p, li"))
  .forEach(p => {highlight(p);});


