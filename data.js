const quotesDatabase = [
    // --- 1-WORD PROMPTS ---
    { text: "Joy.", author: "Unknown", mood: "Happy", wordCount: 1 },
    { text: "Smile.", author: "Unknown", mood: "Happy", wordCount: 1 },
    { text: "Bliss.", author: "Unknown", mood: "Happy", wordCount: 1 },
    { text: "Om.", author: "Hinduism", mood: "Spiritual", wordCount: 1 },
    { text: "Grace.", author: "Christianity", mood: "Spiritual", wordCount: 1 },
    { text: "Breathe.", author: "Buddhism", mood: "Spiritual", wordCount: 1 },
    { text: "Rise.", author: "Unknown", mood: "Motivational", wordCount: 1 },
    { text: "Begin.", author: "Unknown", mood: "Motivational", wordCount: 1 },
    { text: "Soar.", author: "Unknown", mood: "Motivational", wordCount: 1 },
    { text: "Why?", author: "Philosophy", mood: "Provoking", wordCount: 1 },
    { text: "Think.", author: "Unknown", mood: "Provoking", wordCount: 1 },
    { text: "Listen.", author: "Unknown", mood: "Provoking", wordCount: 1 },
    { text: "Love.", author: "Rumi", mood: "Poetry", wordCount: 1 },
    { text: "Eternity.", author: "William Blake", mood: "Poetry", wordCount: 1 },
    { text: "Dream.", author: "Edgar Allan Poe", mood: "Poetry", wordCount: 1 },

    // --- 2-WORD PROMPTS ---
    { text: "Choose joy.", author: "Unknown", mood: "Happy", wordCount: 2 },
    { text: "Pure bliss.", author: "Unknown", mood: "Happy", wordCount: 2 },
    { text: "Be still.", author: "Bible (Psalm 46:10)", mood: "Spiritual", wordCount: 2 },
    { text: "God is.", author: "Unknown", mood: "Spiritual", wordCount: 2 },
    { text: "Keep going.", author: "Unknown", mood: "Motivational", wordCount: 2 },
    { text: "Never settle.", author: "Unknown", mood: "Motivational", wordCount: 2 },
    { text: "Know thyself.", author: "Socrates", mood: "Provoking", wordCount: 2 },
    { text: "Stay curious.", author: "Unknown", mood: "Provoking", wordCount: 2 },
    { text: "Silent night.", author: "Joseph Mohr", mood: "Poetry", wordCount: 2 },
    { text: "Endless sky.", author: "Unknown", mood: "Poetry", wordCount: 2 },

    // --- HAPPY ---
    { text: "Joy is exactly what's happening.", author: "Alan Watts", mood: "Happy", wordCount: 5 },
    { text: "Keep your face to the sunshine.", author: "Walt Whitman", mood: "Happy", wordCount: 6 },
    { text: "Choose joy.", author: "Unknown", mood: "Happy", wordCount: 2 },
    { text: "Happiness depends upon ourselves.", author: "Aristotle", mood: "Happy", wordCount: 4 },
    { text: "Every moment is a fresh beginning.", author: "T.S. Eliot", mood: "Happy", wordCount: 6 },
    { text: "Smile, breathe, and go slowly.", author: "Thich Nhat Hanh", mood: "Happy", wordCount: 5 },
    { text: "Be happy for this moment.", author: "Omar Khayyam", mood: "Happy", wordCount: 5 },
    { text: "There is no way to happiness.", author: "Thich Nhat Hanh", mood: "Happy", wordCount: 6 },
    { text: "Radiate boundless love towards the entire world.", author: "Buddha", mood: "Happy", wordCount: 7 },
    { text: "Light tomorrow with today.", author: "Elizabeth Barrett Browning", mood: "Happy", wordCount: 4 },

    // --- SPIRITUAL ---
    { text: "The soul is neither born, nor dies.", author: "Bhagavad Gita", mood: "Spiritual", wordCount: 7 },
    { text: "Perform your duty equipoised.", author: "Bhagavad Gita", mood: "Spiritual", wordCount: 4 },
    { text: "With hardship comes ease.", author: "Quran 94:5", mood: "Spiritual", wordCount: 4 },
    { text: "Wherever you turn, there is the face of God.", author: "Quran 2:115", mood: "Spiritual", wordCount: 9 },
    { text: "God is love.", author: "Bible (1 John 4:8)", mood: "Spiritual", wordCount: 3 },
    { text: "Walk by faith, not by sight.", author: "Bible (2 Corinthians 5:7)", mood: "Spiritual", wordCount: 6 },
    { text: "Recognize the Lord's Light within all.", author: "Guru Granth Sahib", mood: "Spiritual", wordCount: 6 },
    { text: "Truth is the highest virtue.", author: "Guru Nanak", mood: "Spiritual", wordCount: 5 },
    { text: "Peace comes from within. Do not seek it without.", author: "Buddha", mood: "Spiritual", wordCount: 9 },
    { text: "Surrender to the divine will.", author: "Spiritual Proverb", mood: "Spiritual", wordCount: 5 },

    // --- MOTIVATIONAL ---
    { text: "I can and I will.", author: "Unknown", mood: "Motivational", wordCount: 5 },
    { text: "Make each day your masterpiece.", author: "John Wooden", mood: "Motivational", wordCount: 5 },
    { text: "Never give up.", author: "Winston Churchill", mood: "Motivational", wordCount: 3 },
    { text: "Believe you can.", author: "Theodore Roosevelt", mood: "Motivational", wordCount: 3 },
    { text: "Dream big, work hard.", author: "Unknown", mood: "Motivational", wordCount: 4 },
    { text: "Fall seven times, stand up eight.", author: "Japanese Proverb", mood: "Motivational", wordCount: 6 },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela", mood: "Motivational", wordCount: 7 },
    { text: "Action is the foundational key to all success.", author: "Pablo Picasso", mood: "Motivational", wordCount: 8 },
    { text: "Do what you can, with what you have.", author: "Theodore Roosevelt", mood: "Motivational", wordCount: 8 },
    { text: "Focus on the step in front of you.", author: "Unknown", mood: "Motivational", wordCount: 8 },

    // --- PROVOKING ---
    { text: "I think, therefore I am.", author: "René Descartes", mood: "Provoking", wordCount: 5 },
    { text: "Knowledge speaks, but wisdom listens.", author: "Jimi Hendrix", mood: "Provoking", wordCount: 5 },
    { text: "To be or not to be.", author: "William Shakespeare", mood: "Provoking", wordCount: 6 },
    { text: "Reality is merely an illusion.", author: "Albert Einstein", mood: "Provoking", wordCount: 5 },
    { text: "The unexamined life is not worth living.", author: "Socrates", mood: "Provoking", wordCount: 7 },
    { text: "This too shall pass.", author: "Persian Adage", mood: "Provoking", wordCount: 4 },
    { text: "We suffer more often in imagination than in reality.", author: "Seneca", mood: "Provoking", wordCount: 9 },
    { text: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche", mood: "Provoking", wordCount: 12 }, // Oops, 12 words. Let's fix this in runtime or keep as is. Actually I will ensure script recalculates exact word counts.
    { text: "A mind all logic is like a knife all blade.", author: "Rabindranath Tagore", mood: "Provoking", wordCount: 10 },
    { text: "Man is condemned to be free.", author: "Jean-Paul Sartre", mood: "Provoking", wordCount: 6 },
    { text: "No mud, no lotus.", author: "Thich Nhat Hanh", mood: "Provoking", wordCount: 4 },

    // --- POETRY ---
    { text: "What you seek is seeking you.", author: "Rumi", mood: "Poetry", wordCount: 6 },
    { text: "Be a lamp, or a lifeboat.", author: "Rumi", mood: "Poetry", wordCount: 6 },
    { text: "Only from the heart can you touch the sky.", author: "Rumi", mood: "Poetry", wordCount: 9 },
    { text: "Let the beauty we love be what we do.", author: "Rumi", mood: "Poetry", wordCount: 9 },
    { text: "Hope is the thing with feathers.", author: "Emily Dickinson", mood: "Poetry", wordCount: 6 },
    { text: "I wandered lonely as a cloud.", author: "William Wordsworth", mood: "Poetry", wordCount: 6 },
    { text: "She walks in beauty, like the night.", author: "Lord Byron", mood: "Poetry", wordCount: 7 },
    { text: "A thing of beauty is a joy forever.", author: "John Keats", mood: "Poetry", wordCount: 8 },
    { text: "The poetry of the earth is never dead.", author: "John Keats", mood: "Poetry", wordCount: 8 },
    { text: "Out of the ash I rise with my red hair.", author: "Sylvia Plath", mood: "Poetry", wordCount: 10 }
];

// Helper to pre-calculate word counts accurately for the database
quotesDatabase.forEach(quote => {
    // Basic word count splitting by spaces after stripping punctuation
    const cleanText = quote.text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    const words = cleanText.split(/\s+/).filter(word => word.length > 0);
    quote.wordCount = words.length;
});
