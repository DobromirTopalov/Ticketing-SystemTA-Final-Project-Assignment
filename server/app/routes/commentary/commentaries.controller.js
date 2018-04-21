const SharedController = require('../shared.controller');

class CommentaryController extends SharedController {
  constructor(data) {
    super(data, 'commentaries');
    this.data = data;
  }
}

module.exports = CommentaryController;
