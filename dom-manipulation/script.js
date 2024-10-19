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
  
    // Clear previous quote and append new content
    quoteDisplay.innerHTML = '';
    const quoteText = document.createElement('p');
    quoteText.textContent = `"${quote.text}"`;
    const quoteCategory = document.createElement('p');
    quoteCategory.innerHTML = `<em>- ${quote.category}</em>`;
  
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
  }
  
  // Function to create the form for adding new quotes
  function createAddQuoteForm() {
    const formContainer = document.getElementById('quoteFormContainer');
  
    // Create input for quote text
    const quoteTextInput = document.createElement('input');
    quoteTextInput.id = 'newQuoteText';
    quoteTextInput.type = 'text';
    quoteTextInput.placeholder = 'Enter a new quote';
  
    // Create input for quote category
    const quoteCategoryInput = document.createElement('input');
    quoteCategoryInput.id = 'newQuoteCategory';
    quoteCategoryInput.type = 'text';
    quoteCategoryInput.placeholder = 'Enter quote category';
  
    // Create the Add Quote button
    const addQuoteButton = document.createElement('button');
    addQuoteButton.id = 'addQuoteButton';
    addQuoteButton.textContent = 'Add Quote';
  
    // Append all elements to the form container
    formContainer.appendChild(quoteTextInput);
    formContainer.appendChild(quoteCategoryInput);
    formContainer.appendChild(addQuoteButton);
  
    // Add event listener to the Add Quote button
    addQuoteButton.addEventListener('click', addQuote);
  }
  
  // Function to add a new quote to the array and update the DOM
  function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value.trim();
    const quoteCategory = document.getElementById('newQuoteCategory').value.trim();
  
    if (quoteText && quoteCategory) {
      // Add the new quote to the array
      quotes.push({ text: quoteText, category: quoteCategory });
  
      // Clear the input fields
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
  
      // Immediately update the DOM with the new quote
      quoteDisplay.innerHTML = '';
      const newQuoteText = document.createElement('p');
      newQuoteText.textContent = `"${quoteText}"`;
      const newQuoteCategory = document.createElement('p');
      newQuoteCategory.innerHTML = `<em>- ${quoteCategory}</em>`;
  
      quoteDisplay.appendChild(newQuoteText);
      quoteDisplay.appendChild(newQuoteCategory);
    } else {
      alert('Both quote and category are required!');
    }
  }
  
  // Add event listener to the "Show New Quote" button
  newQuoteButton.addEventListener('click', showRandomQuote);
  
  // Show a random quote initially and create the form on page load
  document.addEventListener('DOMContentLoaded', () => {
    showRandomQuote();
    createAddQuoteForm();
  });  