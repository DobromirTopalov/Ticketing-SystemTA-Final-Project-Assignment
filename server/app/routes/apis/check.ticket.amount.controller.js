class TicketAmountController {
  constructor(data) {
      this.data = data;
  }

  async getEventInfo(eventId) {
    const result = await this.data.events.findById(eventId);

    return result;
  }

  async getTicketInfo(eventId) {
    const result = await this.data.tickets.getByEventId(eventId);

    return result;
  }

  async createPurchesInfo(quantity, UserId, EventId, TicketId, BillingInfoId) {
    const result = await this.data
      .purches.addNewPurches(quantity, UserId,
        EventId, TicketId, BillingInfoId);

    return result;
  }

  async updateTicketCapacity(ticketId, capacity) {
    const result = await this.data.tickets.updateCapacity(ticketId, capacity);

    return result;
  }
}

module.exports = TicketAmountController;
