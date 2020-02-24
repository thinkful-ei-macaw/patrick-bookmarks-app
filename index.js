/* eslint-disable quotes */
import bookmarks from "./bookmarks.js";
//import $ from "jquery";

const main = function() {
  bookmarks.eventListenerBinder();
  bookmarks.render();
};

$(main);
