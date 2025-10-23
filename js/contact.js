
const userType = document.getElementById("user-type");
const readerFields = document.getElementById("reader-fields");
const authorFields = document.getElementById("author-fields");

userType.addEventListener("change", () => {
  const type = userType.value;
  if (type === "reader") {
    readerFields.classList.remove("hidden");
    authorFields.classList.add("hidden");
  } else if (type === "author") {
    authorFields.classList.remove("hidden");
    readerFields.classList.add("hidden");
  } else {
    readerFields.classList.add("hidden");
    authorFields.classList.add("hidden");
  }
});