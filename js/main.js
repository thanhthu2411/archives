import {trendingBookTemplate} from "./templates.mjs";
import {getTrendingBooks, topBookQueries,recommendedBookQueries, getRecommendedBooks} from "./bookService.mjs";

function setTrendingBooks(item) {
    const trendingBookSection = document.querySelector("#trending .books");
    trendingBookSection.innerHTML = item.map(book => trendingBookTemplate(book)).join("");
}

function setRecommendedBooks(item) {
    const recommendedBookSection = document.querySelector("#recommended .books");
    recommendedBookSection.innerHTML = item.map(book => trendingBookTemplate(book)).join("");
}



async function init() {
    const trendingBookData = await getTrendingBooks(topBookQueries); 
    const recommendedBookData =  await getRecommendedBooks(recommendedBookQueries);

    setTrendingBooks(trendingBookData);
    setRecommendedBooks(recommendedBookData);
}

init();