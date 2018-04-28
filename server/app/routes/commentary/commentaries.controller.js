const SharedController = require('../shared.controller');

class CommentaryController extends SharedController {
  constructor(data) {
    super(data, 'commentaries');
    this.data = data;
  }

  createCommentary() {
    return async (req, res, next) => {
      const result = await this.data.commentaries.findOrCreate(req.body);

      console.log(result);
      // return created object to api
      return res.status(200).send({
        result,
      });
    };
  }
}

module.exports = CommentaryController;
