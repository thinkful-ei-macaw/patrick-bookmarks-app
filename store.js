let bookmarks = [];
let error = null;

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

const setError = function(error) {
  this.error = error;
};

export default {
  bookmarks,
  addBookmark,
  findById,
  deleteBookmark,
  setError,
  error
};
