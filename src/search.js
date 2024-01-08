var fetch_data

async function searchResults() {
  
  var query = document.getElementById("item").value; 
  fetch_data = await getSearchResults(query);
  
  if (document.querySelector('.pagination')) {
    document.querySelector('.pagination').remove();
  }

  paginate();
  showResults(0);
}

async function getSearchResults(query) {
  var URL = "https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=15&q=" + query;
  //return await getData(URL);
  let { items } = await getData(URL);
  return items;
}

async function getData(URL) {
  return await (await fetch(URL)).json();
}