class Billing {
    constructor(firstname = '', lastname = '', email = '',
        address = '', postalCode = '', city = '', country = '') {

        this.setFirstName(firstname);
        this.setLastName(lastname);
        this.setEmail(email);
        this.setPostCode(postalCode);
        this.setAddress(address);
        this.setCity(city);
        this.setCountry(country);
    }

    setEmail(email) {
        email = email.trim();
        const emailRegex = (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
        if (!email.length || !email || (email.length > 100)) {
            throw new Error('Invalid email length');
        }

        if (email.match(emailRegex)) {
            this.email = email;
        } else {
            throw new Error('Email includes symbols that are not allowed')
        }
    }

    setFirstName(name) {
        name = name.trim();
        const symbolRestrictRegex = /[!$%^&*()+|~=`{}\[\]:";'<>?,.\/]/;
        const nameRegex = /^[a-zA-Z ]{1,100}$/;

        if (!name.length || !name || (name.length > 100)) {
            console.log(name);
            throw new Error('Invalid name length');
        }

        if (name.match(nameRegex)) {
            this.firstname = name;
        } else {
            throw new Error('Name includes symbols that are not allowed');
        }
    }

    setLastName(name) {
        name = name.trim();
        const symbolRestrictRegex = /[!$%^&*()+|~=`{}\[\]:";'<>?,.\/]/;
        const nameRegex = /^[a-zA-Z ]{1,100}$/;

        if (!name.length || !name || (name.length > 100)) {
            console.log(name);
            throw new Error('Invalid name length');
        }

        if (name.match(nameRegex)) {
            this.lastname = name;
        } else {
            throw new Error('Name includes symbols that are not allowed');
        }
    }

    setCountry(country) {
        country = country.trim();
        const alphaRegex = /^[a-zA-Z]+$/;

        if (!country.length || !country || (country.length > 100)) {
            throw new Error('Country name is not valid')
        }

        if (country.match(alphaRegex)) {
            this.country = country;
        } else {
            throw new Error('Please include only valid symbols in the country name');
        }
    }

    setPostCode(code) {
        code = code.trim();
        const postRegex = /^[a-zA-Z0-9 ]+([-_\.][a-zA-Z0-9 ]+)*[a-zA-Z0-9 ]$/;

        if (!code.length || !code || (code.length > 100)) {
            throw new Error('Invalid postcode');
        }

        if (code.match(postRegex)) {
            this.postCode = code;
        } else {
            throw new Error('Please include only valid symbols in the postcode');
        }
    }

    setCity(city) {
        city = city.trim();
        const alphaRegex = /^[a-zA-Z]+$/;

        if (!city.length || !city || (city.length > 100)) {
            throw new Error('City name is not valid')
        }

        if (city.match(alphaRegex)) {
            this.city = city;
        } else {
            throw new Error('Please include only valid symbols in the city name')
        }
    }

    setAddress(address) {
        address = address.trim();
        const alphaRegex = /^[a-zA-Z0-9 ]+([-_\.][a-zA-Z0-9 ]+)*[a-zA-Z0-9 ]$/;

        if (!address.length || !address || (address.length > 100)) {
            throw new Error('Address is too long ')
        }

        if (address.match(alphaRegex)) {
            this.address = address;
        } else {
            throw new Error('Please include only valid symbols in the address name')
        }
    }

    getEmail() {
        return this.email;
    }

    getAddress() {
        return this.address;
    }

    getPostCode() {
        return this.postCode;
    }

    getFirstName() {
        return this.firstname;
    }

    getLastName() {
        return this.lastname;
    }

    getCountry() {
        return this.country;
    }

    getCity() {
        return this.city;
    }
}

module.exports = Billing;
