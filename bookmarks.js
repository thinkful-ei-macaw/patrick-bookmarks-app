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
         <input type="text" id="url" name="url" placeholder="https://www.google.com/" required autocomplete="off"><br>
           <input type="text" placeholder="Title" name="title" required autocomplete="off"><br>
         <input type="text" id="description" placeholder="Description (optional)" name="desc"  autocomplete="off"><br>
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
  let stars = "No Rating";
  if (listing.rating === 1) {
    stars = "&#9733;";
  } else if (listing.rating === 2) {
    stars = "&#9733;;&#9733;";
  } else if (listing.rating === 3) {
    stars = "&#9733;&#9733;&#9733;";
  } else if (listing.rating === 4) {
    stars = "&#9733;&#9733;&#9733;&#9733;";
  } else if (listing.rating === 5) {
    stars = "&#9733;&#9733;&#9733;&#9733;&#9733;";
  }
  return `
    <li class="listing" data-id="${listing.id}">
     <button type="button" class="collapsible" id="${listing.id}">${listing.title}, ${stars}</button>
      <div class="hidden">
        <a href="${listing.url}">Visit Site</a><br>
        <p>${listing.desc}</p>
        <button type="button" class="delete-button">Delete</button>
      </div>
    </li>`;
}

//EVENT LISTENERS + ID FINDER//

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
    const menu = event.currentTarget;

    console.log(menu);

    $(event.currentTarget)
      .closest("li")
      .find("div")
      .toggle(".hidden");
  });
}

function createBookmarkButton() {
  $("main").on("submit", "#addnew", event => {
    event.preventDefault();
    let formElement = $("#addnew")[0];
    let bookmarkInfo = serializeJson(formElement);
    console.log(bookmarkInfo);
    api
      .createBookmark(bookmarkInfo)
      .then(newBookmark => {
        store.addBookmark(newBookmark);
        render();
      })
      .catch(error => {
        console.error(error);
        store.setError(error.message);
        renderError();
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
    const id = getBookmarkId(event.currentTarget);
    console.log(id);
    api
      .deleteBookmark(id)
      .then(function() {
        store.deleteBookmark(id);
        render();
      })
      .catch(error => {
        console.error(error);
        store.setError(error.message);
        renderError();
      });
  });
}

function serializeJson(form) {
  const formData = new FormData(form);
  const o = {};
  formData.forEach((val, name) => (o[name] = val));
  return JSON.stringify(o);
}

function getBookmarkId(bookmark) {
  console.log(bookmark);
  return $(bookmark)
    .closest(".listing")
    .data("id");
}

//ERROR FUNCTIONS

function generateError(message) {
  return `
    <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
    </section>`;
}

function handleCloseError() {
  $("main").on("click", "#cancel-error", () => {
    store.setError(null);
    renderError();
  });
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

function renderError() {
  if (store.error) {
    const el = generateError(store.error);
    $("main").append(el);
  } else {
    $(".error-text").remove();
  }
}

function render() {
  renderMainPage();
  renderList();
  renderError();
}

//APP HANDLERS//

function eventListenerBinder() {
  addBookmarkButton();
  openCollapsible();
  createBookmarkButton();
  cancelButton();
  deleteBookmark();
  handleCloseError();
}

export default {
  render,
  eventListenerBinder
};
