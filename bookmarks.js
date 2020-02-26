/* eslint-disable no-console */
/* eslint-disable quotes */

import store from "./store.js";
import api from "./api.js";

//HTML FUNCTIONS//

function generateMainBookmarkElement() {
  return `
     <button class="newBookmark" type="submit">New Bookmark +</button>
     <select>
         <option disabled selected>Filter By Rating</option>
         <option>&#9733;</option>
         <option>&#9733;&#9733;</option>
         <option>&#9733;&#9733;&#9733;</option>
         <option>&#9733;&#9733;&#9733;&#9733;</option>
         <option>&#9733;&#9733;&#9733;&#9733;&#9733;</option>
     </select>
     <ul>
     </ul>`;
}

function generateAddBookmarkElement() {
  return `
  <div class="form">
     <form id="addnew">
         <label for="addnew">Add New Bookmark</label><br>
         <input type="text" id="url" name="url" placeholder="https://www.google.com/" required><br>
           <input type="text" placeholder="Title" name="title" required><br>
         <input type="text" id="description" placeholder="Description (optional)" name="desc"><br>
             <select class="ratings-selector" name="rating">
            <option disabled selected>Rate Your Bookmark</option>
            <option value="1">&#9733;</option>
            <option value="2">&#9733;&#9733;</option>
            <option value="3">&#9733;&#9733;&#9733;</option>
            <option value="4">&#9733;&#9733;&#9733;&#9733;</option>
            <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
         </select>
         <input class="createBookmark" type="submit" value="create">
         <input type="button" class="cancel" value="cancel">
     </form>
     </div>`;
}

function generateBookmarkListing(listing) {
  return `
     <button type="button" class="collapsible">${listing.title}, ${listing.rating}</button>
      <div class="hidden">
        <a href="${listing.url}">Visit Site</a><br>
        ${listing.desc}
        <button type="button" class="delete-button">Delete</button>
      </div>
    </li>`;
}

console.log(store.bookmarks);

//EVENT LISTENERS//

function addBookmarkButton() {
  $("main").on("click", ".newBookmark", event => {
    event.preventDefault();
    console.log("New bookmark button clicked");
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

function createBookmarkButton() {
  $("main").on("submit", "#addnew", event => {
    event.preventDefault();
    let formElement = $("#addnew")[0];
    let bookmarkInfo = serializeJson(formElement);
    console.log(bookmarkInfo);
    api.createBookmark(bookmarkInfo).then(newBookmark => {
      store.addBookmark(newBookmark);
      render();
    });
  });
}

function cancelButton() {
  $("main").on("click", ".cancel", event => {
    event.preventDefault();
    console.log("Cancelled new bookmark");
    render();
  });
}

function deleteBookmark() {
  $("main").on("click", ".delete-button", event => {
    event.preventDefault();
    console.log("Deletion of bookmark successful");
  });
}

function serializeJson(form) {
  const formData = new FormData(form);
  const o = {};
  formData.forEach((val, name) => (o[name] = val));
  return JSON.stringify(o);
}

//RENDER FUNCTIONS

function renderMainPage() {
  $("main").html(generateMainBookmarkElement());
}

function renderAddBookmarkPage() {
  $("main").html(generateAddBookmarkElement());
}

function renderList() {
  store.bookmarks.forEach(element => {
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
  createBookmarkButton();
  cancelButton();
  deleteBookmark();
}

export default {
  render,
  eventListenerBinder
};
