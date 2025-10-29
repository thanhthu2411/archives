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

    const url = `${baseUrl}?q=${searchQuery}&maxResults=${resultNumber}&key=${apiKey}`;
    
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
    console.log("Found links:", links.length);

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            const bookId = link.dataset.bookId;

            if (!bookId) {
                console.warn("⚠️ No book ID found for this link.");
                return;
            }

            // console.log("Book ID:", bookId);
            const url = `book.html?id=${bookId}`;
            window.location.href = url;
        });
    })
}


// favorite books section
export function updateFavoriteList() {
    const buttons = document.querySelectorAll(".add-favorite-btn");
    console.log("Button found", buttons.length);

    buttons.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            event.preventDefault();

            const bookId = btn.dataset.bookId;

            if (!bookId) {
                console.warn("⚠️ No book ID found for this link.");
                return;
            }

            if(!favoriteBooks.includes(bookId)) {
                favoriteBooks.push(bookId);
                localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks));
            } else {
                alert("This book is already in the list!")
            }

        })
    })
}

export function removeFavoriteBook() {
    const removeBtns = document.querySelectorAll(".remove-favorite-btn");
    console.log("Button found", removeBtns.length);

    removeBtns.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            event.preventDefault();

            const bookId = btn.dataset.bookId;
            favoriteBooks = favoriteBooks.filter(id => id !== bookId);
            localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks));

            location.reload();
        })
    })
}

export async function getFavoriteBook(favoriteBooks) {
    let favoriteBookData = [];
    for (const id of favoriteBooks) {
        const url = `https://www.googleapis.com/books/v1/volumes/${id}`;
        const favoriteBook = await getJson(url);
        favoriteBookData.push(favoriteBook);
    }

    return favoriteBookData;
}