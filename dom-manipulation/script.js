// Initialize the quotes array from local storage or use a default set of quotes
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The journey of a thousand miles begins with one step.", category: "Wisdom" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" }
  ];
  
  // DOM elements
  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteButton = document.getElementById('newQuote');
  const exportQuotesButton = document.getElementById('exportQuotes');
  
  // Save quotes to local storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  // Display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
  
    // Save the last viewed quote to session storage
    sessionStorage.setItem('lastQuote', JSON.stringify(quote));
  
    quoteDisplay.innerHTML = '';
    const quoteText = document.createElement('p');
    quoteText.textContent = `"${quote.text}"`;
    const quoteCategory = document.createElement('p');
    quoteCategory.innerHTML = `<em>- ${quote.category}</em>`;
  
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
  }
  
  // Create form to add new quotes
  function createAddQuoteForm() {
    const formContainer = document.getElementById('quoteFormContainer');
  
    const quoteTextInput = document.createElement('input');
    quoteTextInput.id = 'newQuoteText';
    quoteTextInput.type = 'text';
    quoteTextInput.placeholder = 'Enter a new quote';
  
    const quoteCategoryInput = document.createElement('input');
    quoteCategoryInput.id = 'newQuoteCategory';
    quoteCategoryInput.type = 'text';
    quoteCategoryInput.placeholder = 'Enter quote category';
  
    const addQuoteButton = document.createElement('button');
    addQuoteButton.textContent = 'Add Quote';
    addQuoteButton.addEventListener('click', addQuote);
  
    formContainer.appendChild(quoteTextInput);
    formContainer.appendChild(quoteCategoryInput);
    formContainer.appendChild(addQuoteButton);
  }
  
  // Add a new quote to the array and update the DOM
  function addQuote() {
    const text = document.getElementById('newQuoteText').value.trim();
    const category = document.getElementById('newQuoteCategory').value.trim();
  
    if (text && category) {
      quotes.push({ text, category });
      saveQuotes(); // Save to local storage
  
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
  
      showRandomQuote();
    } else {
      alert('Both quote and category are required!');
    }
  }
  
  // Export quotes to a JSON file
  function exportQuotes() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
  }
  
  // Import quotes from a JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      try {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes(); // Save to local storage
        alert('Quotes imported successfully!');
        showRandomQuote(); // Refresh the displayed quote
      } catch (error) {
        alert('Invalid JSON file!');
      }
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Load the last viewed quote from session storage (optional)
  function loadLastViewedQuote() {
    const lastQuote = JSON.parse(sessionStorage.getItem('lastQuote'));
    if (lastQuote) {
      quoteDisplay.innerHTML = `
        <p>"${lastQuote.text}"</p>
        <p><em>- ${lastQuote.category}</em></p>`;
    } else {
      showRandomQuote();
    }
  }
  
  // Event Listeners
  newQuoteButton.addEventListener('click', showRandomQuote);
  exportQuotesButton.addEventListener('click', exportQuotes);
  
  // Initialize the application
  document.addEventListener('DOMContentLoaded', () => {
    createAddQuoteForm();
    loadLastViewedQuote(); // Load last viewed quote or show a random one
  });
  