// this file is to create templates for each part

// top favorite books and recommended for you templates (index.html)
export function trendingBookTemplate(item) {
    const data = item.volumeInfo;
    const description = data.description.split(" ").slice(0, 20).join(" ") + "...";
    return `<div class="book" data-book-id="${item.id}">
                <div class="img-container">
                    <img class="book-img" src="${data.imageLinks.smallThumbnail}" />
                </div>
                <div class="book-info-container">
                    <a href="book.html"><h2>${data.title}</h2></a>
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
            <button>
              <svg class="icon">
                <use xlink:href="images/sprite.symbol.svg#plus-sign"></use></svg>Add to favorites
            </button>
            <a href="book.html">More ></a>
          </div>
        </li>
    `

}