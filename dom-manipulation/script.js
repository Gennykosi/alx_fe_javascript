// Initialize the quotes array from local storage or use a default set of quotes
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The journey of a thousand miles begins with one step.", category: "Wisdom" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" }
  ];
  
  // DOM Elements
  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteButton = document.getElementById('newQuote');
  const exportQuotesButton = document.getElementById('exportQuotes');
  const categoryFilter = document.getElementById('categoryFilter');
  
  // Save quotes to local storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  // Populate the category dropdown with unique categories
  function populateCategories() {
    const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
    categoryFilter.innerHTML = '<option value="all">All Categories</option>'; // Reset dropdown
  
    uniqueCategories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  
    // Restore the last selected filter from local storage
    const savedFilter = localStorage.getItem('selectedCategory') || 'all';
    categoryFilter.value = savedFilter;
  }
  
  // Filter quotes based on the selected category
  function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    localStorage.setItem('selectedCategory', selectedCategory); // Save filter preference
  
    const filteredQuotes = selectedCategory === 'all' 
      ? quotes 
      : quotes.filter(quote => quote.category === selectedCategory);
  
    displayQuotes(filteredQuotes);
  }
  
  // Display a list of quotes
  function displayQuotes(quoteList) {
    quoteDisplay.innerHTML = ''; // Clear previous content
  
    if (quoteList.length === 0) {
      quoteDisplay.textContent = 'No quotes available for this category.';
      return;
    }
  
    quoteList.forEach(quote => {
      const quoteText = document.createElement('p');
      quoteText.textContent = `"${quote.text}"`;
  
      const quoteCategory = document.createElement('p');
      quoteCategory.innerHTML = `<em>- ${quote.category}</em>`;
  
      quoteDisplay.appendChild(quoteText);
      quoteDisplay.appendChild(quoteCategory);
    });
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
  
  // Add a new quote and update the DOM
  function addQuote() {
    const text = document.getElementById('newQuoteText').value.trim();
    const category = document.getElementById('newQuoteCategory').value.trim();
  
    if (text && category) {
      quotes.push({ text, category });
      saveQuotes(); // Save to local storage
  
      populateCategories(); // Update category dropdown if needed
      filterQuotes(); // Refresh the displayed quotes
  
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
    } else {
      alert('Both quote and category are required!');
    }
  }
  
  // Show a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length); // Get random index
    const randomQuote = quotes[randomIndex];
  
    quoteDisplay.innerHTML = `
      <p>"${randomQuote.text}"</p>
      <p><em>- ${randomQuote.category}</em></p>
    `;
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
  
        populateCategories(); // Update categories
        filterQuotes(); // Refresh displayed quotes
  
        alert('Quotes imported successfully!');
      } catch (error) {
        alert('Invalid JSON file!');
      }
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Event Listeners
  newQuoteButton.addEventListener('click', showRandomQuote);
  exportQuotesButton.addEventListener('click', exportQuotes);
  
  // Initialize the application
  document.addEventListener('DOMContentLoaded', () => {
    createAddQuoteForm();
    populateCategories(); // Populate categories at startup
    filterQuotes(); // Apply the last saved filter or show all
  });
  
  