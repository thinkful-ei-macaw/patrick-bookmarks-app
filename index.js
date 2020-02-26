/* eslint-disable quotes */
import bookmarks from "./bookmarks.js";
import api from "./api.js";
import store from "./store.js";

const main = function() {
  bookmarks.render();
  api.getBookmarks().then(bookmarkData => {
    bookmarkData.forEach(bookmark => store.addBookmark(bookmark));
    bookmarks.eventListenerBinder();
    bookmarks.render();
  });
};

$(main);
