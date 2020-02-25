/* eslint-disable no-console */
/* eslint-disable quotes */

import store from "./store.js";

//HTML FUNCTIONS//

function generateMainBookmarkElement() {
  return `
     <button class="newBookmark" type="submit">New Bookmark +</button>
     <select>
         <option disabled selected>Filter By Rating</option>
         <option>1 Star</option>
         <option>2 Stars</option>
         <option>3 Stars</option>
         <option>4 Stars</option>
         <option>5 Stars</option>
     </select>
     <ul>
     </ul>`;
}

function generateAddBookmarkElement() {
  return `
     <form id="addnew">
         <label for="addnew">Add New Bookmark</label>
         <input type="text" id="addnew" name="addnew">
         <select class="ratings-selector">
            <option>1 Star</option>
         </select>
         <input type="text" id="description" value="description">
         <input type="submit" value="create">
         <input type="submit" value="cancel">
     </form>`;
}

function generateBookmarkListing(listing) {
  return `
     <button type="button" class="collapsible">${listing.title}, ${listing.rating}</button>
      <div class="hidden">
        <a href="${listing.url}">Link</a>
      </div>
    </li>`;
}

console.log(store.store.bookmarks);

//EVENT LISTENERS//

function addBookmarkButton() {
  $("main").on("click", ".newBookmark", event => {
    event.preventDefault();
    store.adding = true;
    renderAddBookmarkPage();
  });
}

function openCollapsible() {
  $("main").on("click", ".collapsible", event => {
    event.preventDefault();
    $(".hidden").toggle();
  });
}

function createBookmarkButton() {}

function cancelButton() {}

//RENDER FUNCTIONS

function renderMainPage() {
  $("main").html(generateMainBookmarkElement());
}

function renderAddBookmarkPage() {
  $("main").html(generateAddBookmarkElement());
}

function renderList() {
  store.store.bookmarks.forEach(element => {
    $("ul").append(generateBookmarkListing(element));
  });
}

function render() {
  renderMainPage();
  renderList();
}

//APP HANDLERS//

function eventListenerBinder() {
  addBookmarkButton();
  openCollapsible();
}

export default {
  render,
  eventListenerBinder
};
