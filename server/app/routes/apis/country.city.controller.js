class CountryCityController {
    constructor(data) {
        this.data = data;
    }

    getAllCities(country) {
        const result = this.data.city.getAll(country);

        return result;
    }

    getAllCountries() {
        const result = this.data.country.getAll();

        return result;
    }

    getCountry(country) {
        const result = this.data.country.getByName(country);

        return result;
    }

    getCity(city) {
        const result = this.data.city.getByName(city);

        return result;
    }
}

module.exports = CountryCityController;
