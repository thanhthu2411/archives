import {trendingBookTemplate} from "./templates.mjs";
import {getTrendingBooks, topBookQueries,recommendedBookQueries, getRecommendedBooks, updateBookUrl} from "./bookService.mjs";

function setTrendingBooks(item) {
    const trendingBookSection = document.querySelector("#trending .books");
    trendingBookSection.innerHTML = item.map(book => trendingBookTemplate(book)).join("");
}

function setRecommendedBooks(item) {
    const recommendedBookSection = document.querySelector("#recommended .books");
    recommendedBookSection.innerHTML = item.map(book => trendingBookTemplate(book)).join("");
}

function feedbackAnimation() {
    const contactContainer = document.querySelector(".contact-us-container");
    const closeBtn = document.querySelector(".fb-close-btn");
    let isShown = false;
    let isClosed = false;

    window.addEventListener("scroll", () => {
        const scrollTop = document.documentElement.scrollTop;
        const screenHeight = document.documentElement.scrollHeight - window.innerHeight;

        if (!isShown && !isClosed) {
                if (scrollTop/screenHeight > 0.5) {
                contactContainer.classList.add("slide-in");
                isShown = true;
            }
        }

        closeBtn.addEventListener("click", () => {
            contactContainer.classList.remove("slide-in");
            isClosed = true;
        })
    })
}



async function init() {
    const trendingBookData = await getTrendingBooks(topBookQueries); 
    const recommendedBookData =  await getRecommendedBooks(recommendedBookQueries);

    setTrendingBooks(trendingBookData);
    setRecommendedBooks(recommendedBookData);

    updateBookUrl();
    feedbackAnimation();
}

init();