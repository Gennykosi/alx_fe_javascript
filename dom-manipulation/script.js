// Array to manage quote objects
const quotes = [
    { text: "The journey of a thousand miles begins with one step.", category: "Wisdom" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" }
  ];
  
  // Reference to DOM elements
  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteButton = document.getElementById('newQuote');
  
  // Function to display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p>"${quote.text}"</p><p><em>- ${quote.category}</em></p>`;
  }
  
  // Function to add a new quote dynamically
  function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value.trim();
    const quoteCategory = document.getElementById('newQuoteCategory').value.trim();
  
    if (quoteText && quoteCategory) {
      quotes.push({ text: quoteText, category: quoteCategory });
      document.getElementById('newQuoteText').value = ''; // Clear input
      document.getElementById('newQuoteCategory').value = ''; // Clear input
    }
  }
  
  // Event listener to show a new random quote on button click
  newQuoteButton.addEventListener('click', showRandomQuote);
  
  // Show a quote initially when the page loads
  document.addEventListener('DOMContentLoaded', showRandomQuote);
  