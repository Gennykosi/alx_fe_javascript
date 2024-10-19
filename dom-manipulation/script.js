// Array to manage quote objects
let quotes = [
    { text: "The journey of a thousand miles begins with one step.", category: "Wisdom" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" }
  ];
  
  // References to DOM elements
  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteButton = document.getElementById('newQuote');
  
  // Function to display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p>"${quote.text}"</p><p><em>- ${quote.category}</em></p>`;
  }
  
  // Function to create the form for adding new quotes
  function createAddQuoteForm() {
    const formContainer = document.getElementById('quoteFormContainer');
    formContainer.innerHTML = `
      <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
      <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
      <button id="addQuoteButton">Add Quote</button>
    `;
  
    // Add event listener to the Add Quote button
    document.getElementById('addQuoteButton').addEventListener('click', addQuote);
  }
  
  // Function to add a new quote and update the DOM
  function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value.trim();
    const quoteCategory = document.getElementById('newQuoteCategory').value.trim();
  
    if (quoteText && quoteCategory) {
      // Add the new quote to the array
      quotes.push({ text: quoteText, category: quoteCategory });
  
      // Clear the input fields
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
  
      // Update the DOM to show the newly added quote
      quoteDisplay.innerHTML = `<p>"${quoteText}"</p><p><em>- ${quoteCategory}</em></p>`;
    } else {
      alert("Both quote and category are required!");
    }
  }
  
  // Add event listener to the "Show New Quote" button
  newQuoteButton.addEventListener('click', showRandomQuote);
  
  // Show a quote initially and create the form on page load
  document.addEventListener('DOMContentLoaded', () => {
    showRandomQuote();
    createAddQuoteForm();
  });
  