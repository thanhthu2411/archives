// header - small screen

export function searchFormToggle () {
    const searchBtn = document.querySelector(".search-btn");
    const searchForm = document.querySelector(".search-form");
    const closeBtn = document.createElement("button");
        closeBtn.innerHTML = `            <svg class="icon">
                <use xlink:href="images/sprite.symbol.svg#close"></use>
                </svg>`;
    closeBtn.classList = "close-btn";


    searchBtn.addEventListener("click", () => {
        searchForm.appendChild(closeBtn);
        searchForm.classList.add("active-form");
    })

    closeBtn.addEventListener("click", () => {
        searchForm.classList.remove("active-form");
        closeBtn.remove();
    })
};

export function dropdownMenuToggle () {
    const menuBtn = document.querySelector(".menu-btn");
    const navContainer = document.querySelector(".nav-container");
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = `            <svg class="icon">
                <use xlink:href="images/sprite.symbol.svg#close"></use>
                </svg>`;
    closeBtn.classList = "close-btn";

    menuBtn.addEventListener("click", () => {
    navContainer.appendChild(closeBtn);
    navContainer.classList.add("active-menu");
    })

    closeBtn.addEventListener("click", () => {
        navContainer.classList.remove("active-menu");
        closeBtn.remove();
    })
}




