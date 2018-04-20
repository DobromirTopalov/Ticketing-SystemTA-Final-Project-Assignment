class CommentaryController {
  constructor(data) {
    this.data = data;
  }

  getCommentaries() {
    return async (req, res, next) => {
      const commentaries = await this.data.commentaries.getAll();

      return res.status(200).send({
        commentaries,
      });
    };
  }

  getById() {
    return async (req, res, next) => {
      const commentaries = await this.data.commentaries.getAll();
      const comment = commentaries.find((x) => x.id === +req.params.id);

      try {
        if (!comment) {
          throw new Error('Nothing found!');
        }
      } catch (error) {
        res.status(400).json({ 'error': error.message });
      }

      return res.status(200).send({
        comment,
      });
    };
  }

  getByUserId() {
    return async (req, res, next) => {
      const commentaries = await this.data.commentaries.getAll();
      const comment = commentaries.filter((x) =>
                                           x.UserId === +req.params.UserId);
      try {
        if (!comment) {
          throw new Error('Nothing found!');
        }
      } catch (error) {
        res.status(400).json({ 'error': error.message });
      }

      return res.status(200).send({
        comment,
      });
    };
  }

  getByTicketId() {
    return async (req, res, next) => {
      const commentaries = await this.data.commentaries.getAll();
      const comment = commentaries.filter((x) =>
                                          x.TicketId === +req.params.TicketId);
      try {
        if (!comment) {
          throw new Error('Nothing found!');
        }
      } catch (error) {
        res.status(400).json({ 'error': error.message });
      }

      return res.status(200).send({
        comment,
      });
    };
  }
}

module.exports = CommentaryController;
