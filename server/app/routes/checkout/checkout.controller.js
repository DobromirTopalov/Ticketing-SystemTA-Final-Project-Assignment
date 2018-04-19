const BillingObject = require('../../../data-class');

class BillingController {
    constructor(data) {
        this.data = data;
    }

    async createBilling(billingData, usernameId) {
        let thisBilling = null;
        try {
            thisBilling = new BillingObject(billingData.firstname,
                billingData.lastname, billingData.email, billingData.address,
                billingData.postalCode, billingData.city, billingData.country);

            const cityName = thisBilling.getCity();
            const countryName = thisBilling.getCountry();

            const city = await this.data.city.getByName(cityName);
            const country = await this.data.country.getByName(countryName);

            const result = await this.data
                .billings.addNewBilling(thisBilling,
                    country.id, city.id, usernameId);

            return result;
        } catch (err) {
            throw err;
        }
    }

    async checkOutData() {
        const result = {};

        result.countries = await this.data
            .country.getAll();

        return result;
    }

    async getEventInfo(eventId) {
        const result = await this.data
            .events.findById(eventId);

        return result;
    }

    async getTicketInfo(eventId) {
        const result = await this.data
            .tickets.getByEventId(eventId);

        return result;
    }

    async createPurchesInfo(quantity, UserId, EventId,
        TicketId, BillingInfoId) {
        const result = await this.data
            .purches.addNewPurches(quantity, UserId,
                EventId, TicketId, BillingInfoId);

        return result;
    }

    async updateTicketCapacity(ticketId, capacity) {
        const result = await this.data
            .tickets.updateCapacity(ticketId, capacity);

        return result;
    }

    async newPurches(userId, requestBody) {
        const usernameId = userId;
        const billingData = requestBody;
        const eventId = billingData.order.eventId;
        const amount = billingData.order.amount;
        let product;

        try {
            const eventInfo = await this.getEventInfo(eventId);
            if (eventInfo === null) {
                throw new Error('There is no such a event!');
            }

            const ticketInfo = await this.getTicketInfo(eventId);
            if (ticketInfo === null) {
                throw new Error('There is no such a ticket!');
            }

            const ticketCapacity = ticketInfo.capacity;
            if (ticketCapacity - amount < 0) {
                throw new Error('All tickets were sold out!');
            }

            const newBilling = await this
                .createBilling(billingData, usernameId);

            await this
                .createPurchesInfo(amount, usernameId, eventInfo.id,
                    ticketInfo.id, newBilling.id);

            await this
                .updateTicketCapacity(ticketInfo.id, ticketCapacity - amount);

            product = {
                infoEvent: eventInfo,
                infoTicket: ticketInfo.dataValues,
                amount,
            };
        } catch (err) {
            throw new Error(err);
        }

        return product;
    }
}

module.exports = BillingController;
