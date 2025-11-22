// this file is for getting data, handling api
const baseUrl = "https://www.googleapis.com/books/v1/volumes";
const apiKey ="AIzaSyAc0h13rs7TgenhCkJAC4h9FYCtODSWQlc";

export const topBookQueries = ["The Great Gatsby", "To Kill a Mockingbird", "1984 George Orwell"];

export const recommendedBookQueries = [
  "Atomic Habits",
  "The Alchemist",
  "Pride and Prejudice"
];

export let favoriteBooks = JSON.parse(localStorage.getItem("favoriteBooks")) || [];



export function getUrl(searchOption, endpoint, resultNumber) {
    let searchQuery = "";
    const formattedEndpoint = encodeURIComponent(endpoint.trim());

    if (searchOption == "all") {
        searchQuery = `${formattedEndpoint}`;
    } else if (searchOption == "author") {
        searchQuery = `inauthor:${formattedEndpoint}`;
    } else if (searchOption == "title") {
        searchQuery = `intitle:${formattedEndpoint}`;
    } else if (searchOption == "genre") {
        searchQuery = `subject:${formattedEndpoint}`;
    } else {
        searchQuery = `${formattedEndpoint}`;
    }

    const url = `${baseUrl}?q=${searchQuery}&maxResults=${resultNumber}&startIndex=0&key=${apiKey}`;
    
    return url;
}

export async function getJson(url) {
    let data = {};
    const response = await fetch(url);
    if (response.ok) {
        data = await response.json();
    } else throw new Error("response not ok");

    return data;
}


// get top trending book data
export async function getTrendingBooks(topBookQueries) {
    let trendingBooks = [];
    for (const query of topBookQueries) {
        const url = getUrl("all", query, 1);
        const trendingBook = await getJson(url);
        trendingBooks.push(trendingBook.items[0]);
    }

    return trendingBooks;
}

export async function getRecommendedBooks(recommendedBookQueries) {
    let recommendedBooks = [];

    for (const query of recommendedBookQueries) {
        const url = getUrl("all", query, 1);
        const recommendedBook = await getJson(url);
        recommendedBooks.push(recommendedBook.items[0]);
    }

    return recommendedBooks;
}


// book data attribute (for book.html)
export function updateBookUrl () {
    const links = document.querySelectorAll(".book-link");

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            const bookId = link.dataset.bookId;

            if (!bookId) {
                console.warn("No book ID for this link.");
            }

            const url = `book.html?id=${bookId}`;
            window.location.href = url;
        });
    })
}


// favorite books section
export async function getFavoriteBook(favoriteBooks) {
    let favoriteBookData = [];
    for (const id of favoriteBooks) {
        const url = `https://www.googleapis.com/books/v1/volumes/${id}`;
        const favoriteBook = await getJson(url);
        favoriteBookData.push(favoriteBook);
    }

    return favoriteBookData;
}

export function updateFavoriteList() {
    const buttons = document.querySelectorAll(".add-favorite-btn");
    // add a book to favorite list
    buttons.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            event.preventDefault();

            const bookId = btn.dataset.bookId;

            if (!bookId) {
                console.warn("No book ID for this link.");
            }

            if(!favoriteBooks.includes(bookId)) {
                favoriteBooks.push(bookId);
                localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks));

                //update btn
                btn.className = "remove-favorite-btn";
                btn.innerHTML = `Remove from favorites`;

            } else 
            {
                alert("This book is already in the list!")
            }

        })
    })
}

// export function removeFavoriteBook() {
//     const removeBtns = document.querySelectorAll(".remove-favorite-btn");
//     console.log("Button found", removeBtns.length);

//     removeBtns.forEach((btn) => {
//         btn.addEventListener("click", (event) => {
//             event.preventDefault();

//             const bookId = btn.dataset.bookId;
//             favoriteBooks = favoriteBooks.filter(id => id !== bookId);
//             localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks));

//         })
//     })
// }

function removeFavoriteId(id) {
  favoriteBooks = favoriteBooks.filter(x => x !== id);
  localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks));
}


// when remove btn is clicked, the btn change to add-to-favorite
// for book.html and searchresults.html
export function updateFavoriteBtn() {
    const removeBtns = document.querySelectorAll(".remove-favorite-btn");
    removeBtns.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            event.preventDefault();

            const bookId = btn.dataset.bookId;
            removeFavoriteId(bookId);

            btn.className = "add-favorite-btn";
            btn.innerHTML = `<svg class='icon'>
              <use xlink:href='images/sprite.symbol.svg#plus-sign'></use>
            </svg>Add to favorites`;
        })
    })
}



// when remove btn is clicked, the div of that book is removed
// for favorites.html
export function removeFavoriteCard() {
    const removeBtns = document.querySelectorAll(".remove-favorite-btn");
    removeBtns.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            event.preventDefault();

            const bookId = btn.dataset.bookId;
            removeFavoriteId(bookId);

            const li = btn.closest("li.book-info-container");
            li.remove();
            
        })
    })

}
