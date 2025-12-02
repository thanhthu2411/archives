import { getJson, updateFavoList} from "./bookService.mjs";
import { bookTemplate } from "./templates.mjs";

async function getBookData() {
    const bookContainer = document.querySelector(".book-details");

    const params = new URLSearchParams(window.location.search);
    const bookId = params.get("id");

    const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
    const bookData = await getJson(url);
    
    const bookHtml = bookTemplate(bookData);
    bookContainer.innerHTML = bookHtml;
}

async function init() {
  await getBookData(); 
  updateFavoList();
}

init();