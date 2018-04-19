const SharedData = require('./shared.data');

class CompanyData extends SharedData {
  constructor(Model) {
    super();
    this.Model = Model;
  }

  createCompany(CompanyObject, UserId, TicketId) {
    try {
      const result = this.Model
        .create({
          name: CompanyObject.getName(),
          description: CompanyObject.getDescription(),
          companyImgUrl: CompanyObject.getImg(),
          sector: CompanyObject.getSector(),
          webpage: CompanyObject.getWebpage(),
          UserId: UserId,
          TicketId: TicketId,
        });
      return result;
    } catch (error) {
      throw error;
    }
  }

  updateCompany(CompanyId, CompanyObject, UserId, TicketId) {
    try {
      const result = this.Model.update({
        name: CompanyObject.getName(),
        description: CompanyObject.getDescription(),
        companyImgUrl: CompanyObject.getImg(),
        sector: CompanyObject.getSector(),
        webpage: CompanyObject.getWebpage(),
        UserId: UserId,
        TicketId: TicketId,
      }, {
        where: {
          id: CompanyId,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CompanyData;
