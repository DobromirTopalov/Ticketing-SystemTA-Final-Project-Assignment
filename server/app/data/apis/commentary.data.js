const SharedData = require('./shared.data');

class CommentaryData extends SharedData {
  constructor(Model) {
    super();
    this.Model = Model;
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
