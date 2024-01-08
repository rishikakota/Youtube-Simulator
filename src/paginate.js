function paginate() {
    var container = document.querySelector(".container")
    var pagination = document.createElement("div");
    pagination.setAttribute("class", "pagination");
    var button_container = document.createElement("div");
    button_container.setAttribute("class", "button-container");
    pagination.style.visibility = "hidden";
    for (let p = 0; p < 5; p++){
        let page_button_container = document.createElement("div");
        let page_button = document.createElement("input");
        
        page_button.setAttribute("class", "page-button");
        page_button.setAttribute("type", "button");
        page_button.setAttribute("value", p+1);
        page_button.addEventListener("click", function () {
            var buttons = document.querySelectorAll('.page-button');
            buttons.forEach(button => {
                button.style.border = 'none';
            });
            pagination.style.visibility = "hidden";
            showResults(p);
            page_button.style.border = '1px solid #ff0000';
        });
        if (p == 0) {
            page_button.style.border = '1px solid #ff0000';
        }
        page_button_container.appendChild(page_button)
        button_container.appendChild(page_button_container);
    }

    pagination.appendChild(button_container);
    container.appendChild(pagination);
}