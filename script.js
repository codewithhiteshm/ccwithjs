document.addEventListener('DOMContentLoaded', () => {
    // Fetch and populate currency dropdowns
    const currencyDropdowns = document.querySelectorAll('select');
    const apiKey = '456757776f84a699ea18d367';
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                const rates = data.conversion_rates;
                for (const currencyCode in rates) {
                    currencyDropdowns.forEach(dropdown => {
                        const option = document.createElement('option');
                        option.value = currencyCode;
                        option.text = `${currencyCode} - ${rates[currencyCode]}`;
                        dropdown.add(option);
                    });
                }
            } else {
                console.error('Error fetching exchange rates:', data.error);
            }
        })
        .catch(error => console.error('Error fetching exchange rates:', error));
});

function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const resultElement = document.getElementById('result');

    const apiKey = '456757776f84a699ea18d367';
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                const exchangeRate = data.conversion_rates[toCurrency];
                const convertedAmount = (amount * exchangeRate).toFixed(2);
                resultElement.innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            } else {
                console.error('Error fetching exchange rates:', data.error);
                resultElement.innerText = 'Error converting currency. Please try again.';
            }
        })
        .catch(error => {
            console.error('Error fetching exchange rates:', error);
            resultElement.innerText = 'Error converting currency. Please try again.';
        });
}
