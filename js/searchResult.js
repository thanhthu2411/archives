import { getUrl, getJson, updateBookUrl, updateFavoList} from "./bookService.mjs";
import { searchResultTemplate } from "./templates.mjs";


 async function fetchData() {

    const params = new URLSearchParams(window.location.search);
    const searchValue = params.get("q");
    const searchOption = params.get("option").toLowerCase();
    const searchResultContainer = document.querySelector(".book-list");
    const header = document.querySelector("h1 span");
    header.innerText = `"${searchValue}"`;

    const url = getUrl(searchOption, searchValue, 40);
    const searchData = await getJson(url);
    const searchItems = searchData.items;

    const searchHtml = searchItems.map(searchResultTemplate);
    searchResultContainer.innerHTML = searchHtml.join(" ");

    updateBookUrl();
    updateFavoList();

}

fetchData();
