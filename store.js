/* eslint-disable quotes */
let bookmarks = [];
let adding = false;

const addBookmark = function(bookmark) {
  this.bookmarks.push(bookmark);
};

export default {
  bookmarks,
  addBookmark,
  adding
};
