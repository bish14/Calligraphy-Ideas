document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const moodSelect = document.getElementById('mood-select');
    const wordCountSlider = document.getElementById('word-count');
    const wordCountDisplay = document.getElementById('word-count-display');
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    
    const quoteCard = document.getElementById('quote-card');
    const emptyState = document.getElementById('empty-state');
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const quoteMood = document.getElementById('quote-mood');

    // State
    let currentQuoteText = "";

    // Event Listeners
    wordCountSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        wordCountDisplay.textContent = val;
    });

    generateBtn.addEventListener('click', generatePrompt);

    copyBtn.addEventListener('click', () => {
        if (!currentQuoteText) return;
        
        navigator.clipboard.writeText(currentQuoteText).then(() => {
            // Visual feedback
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            setTimeout(() => {
                copyBtn.innerHTML = originalHTML;
            }, 2000);
        });
    });

    // Logic
    function generatePrompt() {
        // Add subtle animation to button
        generateBtn.style.transform = 'scale(0.95)';
        setTimeout(() => generateBtn.style.transform = 'none', 150);

        const selectedMood = moodSelect.value;
        const selectedCount = parseInt(wordCountSlider.value);

        // Filter database
        let validQuotes = quotesDatabase.filter(quote => {
            const matchMood = selectedMood === 'Any' || quote.mood === selectedMood;
            const matchCount = quote.wordCount === selectedCount;
            return matchMood && matchCount;
        });

        // Fallback logic if no exact match for word count
        if (validQuotes.length === 0) {
            if (selectedCount > 0 && selectedCount <= 3) {
                // For very short lengths, length is more important than mood
                const lengthOnlyQuotes = quotesDatabase.filter(quote => quote.wordCount === selectedCount);
                if (lengthOnlyQuotes.length > 0) {
                    validQuotes = lengthOnlyQuotes;
                } else {
                    // This shouldn't happen now with our updated DB, but just in case
                    validQuotes = quotesDatabase; 
                }
            } else {
                // Relax constraints: try finding just by mood
                const moodOnlyQuotes = quotesDatabase.filter(quote => selectedMood === 'Any' || quote.mood === selectedMood);
                
                if (moodOnlyQuotes.length > 0) {
                    // Find closest word count match within that mood
                    let closestDist = Infinity;
                    moodOnlyQuotes.forEach(q => {
                        const dist = Math.abs(q.wordCount - selectedCount);
                        if (dist < closestDist) closestDist = dist;
                    });
                    validQuotes = moodOnlyQuotes.filter(q => Math.abs(q.wordCount - selectedCount) === closestDist);
                } else {
                    // Absolute fallback, pick from entire DB
                    validQuotes = quotesDatabase;
                }
            }
        }

        // Pick random quote from valid pool
        const randomIndex = Math.floor(Math.random() * validQuotes.length);
        const selectedQuote = validQuotes[randomIndex];

        displayQuote(selectedQuote);
    }

    function displayQuote(quote) {
        currentQuoteText = `"${quote.text}" — ${quote.author}`;
        
        // Hide empty state, show card
        emptyState.classList.add('hidden');
        quoteCard.classList.remove('hidden');

        // Reset animation
        quoteCard.classList.remove('fade-in');
        void quoteCard.offsetWidth; // trigger reflow
        quoteCard.classList.add('fade-in');

        // Populate text
        quoteText.textContent = quote.text;
        quoteAuthor.textContent = quote.author;
        quoteMood.textContent = quote.mood;
    }
});
