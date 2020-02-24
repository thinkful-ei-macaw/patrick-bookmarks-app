/* eslint-disable no-console */
/* eslint-disable quotes */

//import $ from "jquery";
import store from "./store.js";

//HTML FUNCTIONS//

function generateMainBookmarkElement() {
  return `
     <button class="newBookmark" type="submit">New Bookmark +</button>
     <select>
         <option disabled selected>Filter By...</option>
     </select>`;
}

function generateAddBookmarkElement() {
  return `
     <form id="addnew">
         <label for="addnew">Add New Bookmark</label>
         <input type="text" id="addnew" name="addnew">
         <input type="submit" value="create">
     </form>`;
}

//EVENT LISTENERS//

function addBookmarkButton() {
  $(".newBookmark").on("submit", event => {
    event.preventDefault();
    store.adding = true;
    console.log("Add Bookmark Button Linked");
    renderAddBookmarkPage();
  });
}

//RENDER FUNCTIONS

function renderMainPage() {
  $("#mainPage").html(generateMainBookmarkElement());
}

function renderAddBookmarkPage() {
  $("#mainPage").html(generateAddBookmarkElement());
}

function render() {
  if (store.adding === false) {
    renderMainPage();
  }
}

//APP HANDLERS//

function handleApp() {
  render();
}

function eventListenerBinder() {
  addBookmarkButton();
}

$(handleApp);

export default {
  render,
  eventListenerBinder
};
