function header() {
    var search_container = document.createElement("div");
    search_container.setAttribute("class", "search-container");
    var container = document.querySelector(".container")
    container.appendChild(search_container);
    
    var youtube_search = document.createElement("div");
    youtube_search.setAttribute("class", "youtube-search");
    search_container.appendChild(youtube_search);

    var h1 = document.createElement("h1");
    var text = document.createTextNode("YouTube Search");
    h1.appendChild(text);
    youtube_search.appendChild(h1);

    var item_search = document.createElement("div");
    item_search.setAttribute("class", "item-search");
    var type_text = document.createElement("div");
    var input_type_text = document.createElement("input");
    input_type_text.setAttribute("type", "text");
    input_type_text.setAttribute("id", "item");
    input_type_text.setAttribute("placeholder", "Enter a search item");
    type_text.appendChild(input_type_text);
    
    var type_button = document.createElement("div");
    var input_type_button = document.createElement("input");
    input_type_button.setAttribute("type", "button");
    input_type_button.setAttribute("class", "search-button");
    input_type_button.setAttribute("value", "SEARCH");
    input_type_button.addEventListener("click", function () {
        searchResults();
    });
    type_button.appendChild(input_type_button);
    item_search.appendChild(type_text);
    item_search.appendChild(type_button);
    search_container.appendChild(item_search);
}