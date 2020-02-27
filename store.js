let bookmarks = [];
let adding = false;

const addBookmark = function(bookmark) {
  this.bookmarks.push(bookmark);
};

const findById = function(id) {
  return this.bookmarks.find(found => found.id === id);
};

const deleteBookmark = function(id) {
  let deletion = this.findById(id);
  this.bookmarks.splice(this.bookmarks.indexOf(deletion), 1);
};

export default {
  bookmarks,
  addBookmark,
  adding,
  findById,
  deleteBookmark
};
