import { favoriteBookTemplate } from "./templates.mjs";
import { getFavoriteBook, favoriteBooks, updateBookUrl, removeFavoriteBook } from "./bookService.mjs";

function setFavoriteBook(data) {
    const favoriteList = document.querySelector(".favorite-list");
    favoriteList.innerHTML = data.map(favoriteBookTemplate).join("");
}

async function init() {
    const favoriteBookData = await getFavoriteBook(favoriteBooks);
    setFavoriteBook(favoriteBookData);
    // console.log(favoriteBooks[0]);
    updateBookUrl();
    removeFavoriteBook();
}

init()