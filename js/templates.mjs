// this file is to create templates for each part
import { favoriteBooks } from "./bookService.mjs";

// top favorite books and recommended for you templates (index.html)
export function trendingBookTemplate(item) {
    const data = item.volumeInfo;
    const description = data.description.split(" ").slice(0, 20).join(" ") + "...";
    return `<div class="book" data-book-id="${item.id}">
                <div class="img-container">
                    <img class="book-img" src="${data.imageLinks.smallThumbnail}" />
                </div>
                <div class="book-info-container">
                    <a class="book-link" href="book.html" data-book-id="${item.id}"><h2>${data.title}</h2></a>
                    <p><strong>Author</strong>: ${data.authors.join(", ")}</p>
                    <p><strong>Description</strong>: ${description}</p>
                    <p><strong>Genre</strong>: ${data.categories.join(", ")}</p>
                </div>
          </div>
    `
}

export function searchResultTemplate(item) {
    const data = item.volumeInfo;
    const description = data.description ? data.description.split(" ").slice(0, 30).join(" ") + "..." : "No description available";
    const authors = data.authors ? data.authors.join(", ") : "Unknown author";
    const genre = data.categories ? data.categories.join(", ") : "Not known";
    const thumbnail = data.imageLinks ? data.imageLinks.thumbnail : "images/no-photo.jpg";
    const favoriteBtnHtml = favoriteBooks.includes(item.id) ? "Remove from favorites" : `<svg class="icon">
              <use xlink:href="images/sprite.symbol.svg#plus-sign"></use>
            </svg>Add to favorites`;
    const favoriteBtnClass = favoriteBooks.includes(item.id) ? "remove-favorite-btn" : "add-favorite-btn";

    return ` <li data-book-id="${item.id}">
          <img class="book-img" src="${thumbnail}" />
          <h2>${data.title}</h2>

          <div class="book-info-container">
            <p>By <span>${authors}</span></p>
            <p>Genre: ${genre}</p>
            <p>
              Description: ${description}
              elit. 
            </p>
            <button class="${favoriteBtnClass}" data-book-id="${item.id}">
                ${favoriteBtnHtml}
            </button>
            <a class="book-link" href="book.html" data-book-id="${item.id}">More ></a>
          </div>
        </li>
    `

}


export function bookTemplate(item) {
    const data = item.volumeInfo;
    const description = data.description ? data.description : "No description available";
    const authors = data.authors ? data.authors.join(", ") : "Unknown author";
    const genre = data.categories ? data.categories.join(", ") : "Not known";
    const thumbnail = data.imageLinks ? data.imageLinks.thumbnail : "images/no-photo.jpg";
    const averageRating = data.averageRating ? data.averageRating : "--";
    const ratingsCount = data.ratingsCount ? data.ratingsCount : "Not known";
    // const favoriteBtnText = favoriteBooks.includes(item.id) ? "Remove from favorites" : "Add to favorites";
    const favoriteBtnClass = favoriteBooks.includes(item.id) ? "remove-favorite-btn" : "add-favorite-btn";
    const favoriteBtnHtml = favoriteBooks.includes(item.id) ? "Remove from favorites" : `<svg class="icon">
              <use xlink:href="images/sprite.symbol.svg#plus-sign"></use>
            </svg>Add to favorites`;

    return `<h1 class="book-title">${data.title}</h1>
      <p class="book-rating">Rating: ${averageRating}/5 (${ratingsCount} ratings)</p>
      <p class="book-author">By <span>${authors}</span></p>

      <section class="book-info">
        <img
          class="book-thumbnail"
          src="${thumbnail}"
          alt="Book cover of Book Title"
        />

        <div class="extra-info">
          <p><strong>Publisher:</strong> <span>${data.publisher}</span></p>
          <p><strong>Publish Date:</strong> <span>${data.publishedDate}</span></p>
          <p><strong>Page Count:</strong> <span>${data.pageCount}</span></p>
          <p><strong>Category:</strong> <span>${genre}</span></p>
          <button class="${favoriteBtnClass}" data-book-id="${item.id}">
            
            ${favoriteBtnHtml}
          </button>
        </div>
      </section>

      <section class="book-description">
        <h2>Description</h2>
        <p>${description}
        </p>
      </section>`
}

export function favoriteBookTemplate(item) {
    const data = item.volumeInfo;
    const authors = data.authors ? data.authors.join(", ") : "Unknown author";

    return `
          <li class="book-info-container" data-book-id="${item.id}">
            <a class="book-link" href="book.html" data-book-id="${item.id}">
                <h2>${data.title}</h2>
            </a>
            <p>by <span>${authors}</span></p>
            <button class="remove-favorite-btn" data-book-id="${item.id}">
              Remove from favorites
            </button>
        </li>
    `
}