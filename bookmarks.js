import store from "./store.js";
import api from "./api.js";

//HTML FUNCTIONS//

function generateMainBookmarkElement() {
  return `
   <button class="newBookmark" type="submit">New Bookmark +</button>
   <label for="filter">Filter By Rating:</label>
   <select id="ratingFilter" name="Filter By Rating" aria-label="filter-by-rating">
     <option disabled selected>Select from list</option>
     <option value="1">&#9733;</option>
     <option value="2">&#9733;&#9733;</option>
     <option value="3">&#9733;&#9733;&#9733;</option>
     <option value="4">&#9733;&#9733;&#9733;&#9733;</option>
     <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
    </select>
    <ul>
    </ul>`;
}

function generateAddBookmarkElement() {
  return `
    <form id="addnew" class="form">
      <label for="addnew">Add New Bookmark</label><br>
      <input type="text" id="url" name="url" placeholder="https://www.google.com/" autocomplete="off"><br>
      <input type="text" placeholder="Title" name="title" autocomplete="off"><br>
      <input type="text" id="description" placeholder="Description (optional)" name="desc"  autocomplete="off"><br>
      <select class="ratings-selector" name="rating" required>
        <option disabled>Select Rating</option>
        <option value="1">&#9733;</option>
        <option value="2">&#9733;&#9733;</option>
        <option value="3">&#9733;&#9733;&#9733;</option>
        <option value="4">&#9733;&#9733;&#9733;&#9733;</option>
        <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
      </select>
      <input class="createBookmark" type="submit" value="create">
      <input type="button" class="cancel" value="cancel">
    </form>`;
}

function generateBookmarkListing(listing) {
  let stars = "Unrated";
  if (listing.rating === 1) {
    stars = "&#9733;";
  } else if (listing.rating === 2) {
    stars = "&#9733;&#9733;";
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
      <div class="hidden"><br>
        <a href="${listing.url}" class="link">Visit Site</a><br>
        <p>${listing.desc}</p>
        <button type="button" class="delete-button">Delete</button>
      </div>
    </li>`;
}

//EVENT LISTENERS + ID FINDER//

function addBookmarkButton() {
  $("main").on("click", ".newBookmark", event => {
    event.preventDefault();
    renderAddBookmarkPage();
  });
}

function openCollapsible() {
  $("main").on("click", ".collapsible", event => {
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
    render();
  });
}

function deleteBookmark() {
  $("main").on("click", ".delete-button", event => {
    event.preventDefault();
    console.log("Deletion of bookmark successful");
    const id = getBookmarkId(event.currentTarget);
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

function filterBookmarks() {
  $("main").on("change", "#ratingFilter", function(event) {
    let ratingNum = $(event.target).val();
    if (ratingNum === "all") {
      store.filtered = false;
      store.filter = [];
    } else {
      store.filtered = true;
      store.filter = [];
    }
    let filtered = store.filter;
    for (let i = 0; i < store.bookmarks.length; i++) {
      if (store.bookmarks[i].rating >= parseInt(ratingNum)) {
        filtered.push(store.bookmarks[i]);
      }
    }
    render();
  });
}

function serializeJson(form) {
  const formData = new FormData(form);
  const o = {};
  formData.forEach((val, name) => (o[name] = val));
  return JSON.stringify(o);
}

function getBookmarkId(bookmark) {
  return $(bookmark)
    .closest(".listing")
    .data("id");
}

//ERROR FUNCTIONS

function generateError(message) {
  return `
    <section class="error-content">
        <p>${message}</p>
        <button id="cancel-error">Dismiss</button>
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
  if (store.filtered === false) {
    store.bookmarks.forEach(element => {
      $("ul").append(generateBookmarkListing(element));
    });
  } else {
    store.filter.forEach(element => {
      $("ul").append(generateBookmarkListing(element));
    });
  }
}

function renderError() {
  if (store.error) {
    const el = generateError(store.error);
    $("main").prepend(el);
  } else {
    $(".error-content").remove();
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
  filterBookmarks();
}

export default {
  render,
  eventListenerBinder
};
