const feedbackForm = document.querySelector(".contact-form-container");
const userType = document.getElementById("user-type");
const readerFields = document.getElementById("reader-fields");
const authorFields = document.getElementById("author-fields");
const submitBtn = document.querySelector(".contact-form-container button");
const message = document.querySelector(".thankyou-message");
const closeBtn = document.querySelector(".thankyou-message button");
const overlay = document.querySelector(".overlay");

function setForm () {
    const type = userType.value;
    if (type === "reader") {
    readerFields.classList.remove("hidden");
    authorFields.classList.add("hidden");

    // remove required 
    authorFields.querySelectorAll("input, textarea").forEach((element) => {
        element.required = false;
    });
    readerFields.querySelectorAll("input, textarea").forEach((element) => {
        element.required = true;
    });

    } else if (type === "author") {
    authorFields.classList.remove("hidden");
    readerFields.classList.add("hidden");

    readerFields.querySelectorAll("input, textarea").forEach((element) => {
        element.required = false;
    });
    authorFields.querySelectorAll("input, textarea").forEach((element) => {
        element.required = true;
    });

    } 
};

setForm();

userType.addEventListener("change", () => {
    localStorage.setItem("userType", userType.value);
    setForm();

});

window.addEventListener("load", () => {
    userType.value = localStorage.getItem("userType") || "";
    setForm();
});


feedbackForm.addEventListener("submit", (event) => {
    event.preventDefault();
    message.classList.remove("hidden");
    overlay.classList.remove("hidden");
    
    feedbackForm.querySelectorAll("input, textarea").forEach((el) => {
        el.value = "";
    })
})

closeBtn.addEventListener("click", () => {
    message.classList.add("hidden");
    overlay.classList.add("hidden");
})

