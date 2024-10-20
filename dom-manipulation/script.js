// Initialize quotes from local storage or use an empty array
let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

// DOM Elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const exportQuotesButton = document.getElementById('exportQuotes');
const categoryFilter = document.getElementById('categoryFilter');
const importFileInput = document.getElementById('importFile');

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Populate the category dropdown with unique categories
function populateCategories() {
  const uniqueCategories = [...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  uniqueCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  const savedFilter = localStorage.getItem('selectedCategory') || 'all';
  categoryFilter.value = savedFilter;
}

// Filter and display quotes based on the selected category
function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem('selectedCategory', selectedCategory);

  const filteredQuotes = selectedCategory === 'all'
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  displayQuotes(filteredQuotes);
}

// Display a list of quotes
function displayQuotes(quoteList) {
  quoteDisplay.innerHTML = '';

  if (quoteList.length === 0) {
    quoteDisplay.textContent = 'No quotes available.';
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

// Add a new quote and POST it to the server
async function addQuote() {
  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();

  if (text && category) {
    const newQuote = { text, category };

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuote)
      });

      if (response.ok) {
        const savedQuote = await response.json();
        quotes.push({ ...savedQuote, category });  // Add to local array
        saveQuotes();
        populateCategories();
        filterQuotes();
        alert('Quote added and saved to the server!');
      } else {
        alert('Failed to save the quote to the server.');
      }
    } catch (error) {
      console.error('Error posting the quote:', error);
      alert('Error communicating with the server.');
    }
  } else {
    alert('Both quote and category are required!');
  }
}

// Show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
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
      saveQuotes();
      populateCategories();
      filterQuotes();
      alert('Quotes imported successfully!');
    } catch (error) {
      alert('Invalid JSON file!');
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Fetch new quotes from the server periodically
async function fetchQuotesFromServer() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();

    const serverQuotes = data.map(post => ({
      text: post.title,
      category: 'Server'
    }));

    syncQuotes(serverQuotes);
  } catch (error) {
    console.error('Failed to fetch quotes from server:', error);
  }
}

// Sync quotes with conflict resolution (server takes precedence)
function syncQuotes(serverQuotes) {
  const newQuotes = serverQuotes.filter(serverQuote =>
    !quotes.some(localQuote => localQuote.text === serverQuote.text)
  );

  if (newQuotes.length > 0) {
    quotes.push(...newQuotes);
    saveQuotes();
    populateCategories();
    filterQuotes();
    alert('New quotes synced from server!');
  }
}

// Periodically fetch data every 30 seconds
setInterval(fetchQuotesFromServer, 30000);

// Event Listeners
newQuoteButton.addEventListener('click', showRandomQuote);
exportQuotesButton.addEventListener('click', exportQuotes);
importFileInput.addEventListener('change', importFromJsonFile);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  populateCategories();
  filterQuotes();
});
  