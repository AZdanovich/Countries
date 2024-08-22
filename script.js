async function fetchCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countries = await response.json();
    createCountryCards(countries);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

function createCountryCards(countries) {
  const container = document.getElementById("countries-container");
  countries.forEach((country, index) => {
    if (index % 10 === 0) {
      const languages = Object.values(country.languages || {}).join(", ");
      const currencies = Object.values(country.currencies || {})
        .map((currency) => currency.name)
        .join(", ");
      const populationInMillions = (country.population / 1000000).toFixed(2);

      const card = `
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <img src="${country.flags.png}" class="card-img-top" alt="${country.name.common}">
                        <div class="card-body">
                            <h5 class="card-title">${country.name.common}</h5>
                            <p class="card-text">
                                <strong>Регион:</strong> ${country.region} <br>
                                <strong>Население:</strong> ${populationInMillions} млн <br>
                                <strong>Языки:</strong> ${languages} <br>
                                <strong>Валюты:</strong> ${currencies}
                            </p>
                        </div>
                    </div>
                </div>
            `;
      container.innerHTML += card;
    }
  });
}

fetchCountries();
