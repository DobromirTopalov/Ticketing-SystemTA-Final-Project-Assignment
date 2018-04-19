class Event {
    constructor(date = '', coverPhoto = '', locationName = '',
        location_country = '', location_city = '',
        location_address = '', title = '', description = '', category = '',
        subcateogry = '', prices = '', capacity = '', time = '') {

        this.setDate(date);
        this.setTime(time);

        if (locationName.length > 0) {
            this.location_name = locationName;
        }

        if (location_country.length > 0) {
            this.setLocationParams(location_country, 'country');
        }

        if (location_city.length > 0) {
            this.setLocationParams(location_city, 'city');
        }

        if (location_address.length > 0) {
            this.setLocationParams(location_address, 'address');
        }

        if (title.length > 0) {
            this.setTitle(title);
        }

        this.setDescription(description);

        if (capacity.length > 0) {
            this.setCapacity(capacity);
        }

        if (category.length > 0) {
            this.setCategory(category);
        }

        if (category.length > 0) {
            this.setCategory(category);
        }

        if (subcateogry.length > 0) {
            this.subcateogry = category;
        }

        if (prices.length > 0) {
            this.setPrices(prices);
        }
        //   this.setCoverPhoto(coverPhoto);
    }

    setDate(date) {
        date = date.trim();
        const dateReg = /^\d{2}([./-])\d{2}\1\d{4}$/;
        if (!date.length || !date || (date.length > 11) || date.length < 4) {
            throw new Error('Please add a date in the required format');
        }

        if (date.match(dateReg)) {
            this.date = date;
        } else {
            throw new Error('Date is not in the required format');
        }
    }
    setTime(time) {
        time = time.trim();
        const timeReg = /^(?:\d|[01]\d|2[0-3]):[0-5]\d$/;
        if (!time.length || !time || (time.length > 6) || time.length < 4) {
            throw new Error('Please add time in the required format');
        }

        if (time.match(timeReg)) {
            this.time = time;
        } else {
            throw new Error('Time is not in the required format');
        }
    }
    setLocationParams(input, attr) {
        input = input.trim();

        if (!input.length || !input || input.length > 100) {
            throw new Error(`${attr} name is too long`);
        }

        if (attr === 'country') {
            this.location_country = input;
        } else if (attr === 'city') {
            this.location_city = input;
        } else if (attr === 'address') {
            this.location_address = input;
        }
    }

    setCoverPhoto(coverPhoto) {
        coverPhoto = coverPhoto.trim();
        const urlRegex = `/(ftp|http|https):\/\/(\w+:{0,1}
            \w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/`;

        if (!coverPhoto.length || !coverPhoto) {
            throw new Error('The cover image is not correct');
        }

        if (coverPhoto.match(urlRegex)) {
            this.coverPhoto = coverPhoto;
        }
    }

    setTitle(title) {
        title = title.trim();
        const symbolRestrictRegex = /[!$%^&*()+|~=`{}\[\]:";'<>?,.\/]/;
        const titleRegex = /^[a-zA-Z ]*$/;

        if (!title.length
            || !title
            || (title.length > 100)
        ) {
            throw new Error('Title is of invalid length');
        }

        this.title = title;
    }

    setDescription(description) {
        description = description.trim();

        if (!description.length
            || !description
            || (description.length > 8000)
        ) {
            throw new Error('Description is of invalid length');
        }

        this.description = description;
    }

    setCategory(category) {
        category = category.trim();
        const nameRegex = /^[a-zA-Z ]{1,30}$/;

        if (!category.length || !category || (category.length > 100)) {
            throw new Error('The cattegory is not correct');
        }

        if (category.match(nameRegex)) {
            this.category = category;
        }
    }

    setPrices(prices) {
        const priceRegex = /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/;

        if (!prices.length
            || !prices
            || (prices.length > 12)
        ) {
            throw new Error('Price is too big');
        }

        if (prices.match(priceRegex)) {
            this.prices = prices;
        } else {
            throw new Error('Price is not of valid format');
        }
    }

    setCapacity(capacity) {
        const capacityRegex = /^[0-9]{1,30}$/;

        if (!capacity.length
            || !capacity
            || (capacity.length > 12)
        ) {
            throw new Error('Capacity is too big');
        }

        if (capacity.match(capacityRegex)) {
            this.capacity = capacity;
        } else {
            throw new Error('Capacity is not of valid format');
        }
    }

    getDate() {
        const dateFormatted = this.date.split('/');
        const finalDate = new Date();

        finalDate.setMonth(dateFormatted[0] - 1);
        finalDate.setDate(dateFormatted[1]);
        finalDate.setFullYear(dateFormatted[2]);
        finalDate.setHours(Number(this.time.substring(0, 2))-3);
        finalDate.setMinutes(Number(this.time.substring(3, 5)));
        // console.log(finalDate)
        return finalDate;
    }

    getCoverPhoto() {
        return this.coverPhoto || null;
    }

    getCountry() {
        return this.location_country;
    }

    getCity() {
        return this.location_city;
    }

    getAddress() {
        return this.location_address;
    }

    getLocationName() {
        return this.location_name;
    }

    getTitle() {
        return this.title;
    }

    getDescription() {
        return this.description || null;
    }

    getCategory() {
        return this.category || null;
    }

    getPrices() {
        return this.prices || null;
    }

    getCapacity() {
        return this.capacity || null;
    }

    getAllInfo() {
        return {
            'date': this.getDate(),
            'coverPhoto': this.getCoverPhoto(),
            'country': this.getCountry(),
            'city': this.getCity(),
            'address': this.getAddress(),
            'title': this.getTitle(),
            'description': this.getDescription(),
            'category': this.getCategory(),
            'prices': this.getPrices(),
        };
    }
}

module.exports = Event;
