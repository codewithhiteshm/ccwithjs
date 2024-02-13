// Replace 'YOUR_API_KEY' with your IEX Cloud API key
const apiKey = 'sk_a10c2ce371e540afac466aa91b9559e6'
const topStocksUrl = `https://cloud.iexapis.com/stable/stock/market/list/mostactive?token=${apiKey}&listLimit=10`;

// DOM elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const topStocksList = document.getElementById('topStocksList');

// Function to fetch top stocks
function fetchTopStocks() {
  axios.get(topStocksUrl)
    .then(response => {
      const topStocks = response.data;
      displayStocks(topStocks);
    })
    .catch(error => {
      console.error('Error fetching top stocks:', error);
      topStocksList.innerHTML = '<li>Error fetching top stocks. Please try again later.</li>';
    });
}

// Function to display top stocks
function displayStocks(stocks) {
  topStocksList.innerHTML = ''; // Clear previous list items
  stocks.forEach(stock => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <h3>${stock.companyName}</h3>
      <p><strong>Symbol:</strong> ${stock.symbol} | <strong>Price:</strong> $${stock.latestPrice.toFixed(2)}</p>
    `;
    topStocksList.appendChild(listItem);
  });
}

// Function to fetch stock information by symbol
function fetchStockBySymbol(symbol) {
  const stockUrl = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${apiKey}`;

  axios.get(stockUrl)
    .then(response => {
      const stock = response.data;
      displayStock(stock);
    })
    .catch(error => {
      console.error('Error fetching stock information:', error);
      alert('Stock not found. Please try again.');
    });
}

// Function to display stock information
function displayStock(stock) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <h3>${stock.companyName}</h3>
    <p><strong>Symbol:</strong> ${stock.symbol} | <strong>Price:</strong> $${stock.latestPrice.toFixed(2)}</p>
  `;
  topStocksList.prepend(listItem); // Add the stock at the top of the list
}

// Event listener for search button
searchBtn.addEventListener('click', () => {
  const symbol = searchInput.value.trim().toUpperCase();
  if (symbol) {
    fetchStockBySymbol(symbol);
    searchInput.value = ''; // Clear the search input after search
  } else {
    alert('Please enter a valid stock symbol.');
  }
});

// Fetch top stocks and display on page load
fetchTopStocks();
