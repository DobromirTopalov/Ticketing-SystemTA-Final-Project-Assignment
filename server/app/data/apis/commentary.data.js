const SharedData = require('./shared.data');

const {
  Commentary,
  User,
  Ticket,
} = require('../../../database/models');

class CommentaryData extends SharedData {
  constructor(Model) {
    super(Commentary, [User, Ticket]);
  }

  createCommentary(CommentaryObject, UserId, TicketId) {
    try {
      const result = this.Model
        .create({
          content: CommentaryObject.getContent(),
          date: CommentaryObject.getDate(),
          UserId: UserId,
          TicketId: TicketId,
        });
      return result;
    } catch (error) {
      throw error;
    }
  }

  updateCommentary(CommentaryId, CommentaryObject, UserId, TicketId) {
    try {
      const result = this.Model.update({
        content: CommentaryObject.getContent(),
        date: CommentaryObject.getDate(),
        UserId: UserId,
        TicketId: TicketId,
      }, {
        where: {
          id: CommentaryId,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CommentaryData;
