async function showResults(page_no) {
    let items = fetch_data.slice(page_no * 3, page_no * 3 + 3);
    createVideoContainer();
 
    for (let item of items) {
        await createMainVideoContainer(item);
    }
    
}

function createVideoContainer() {
  if (document.querySelector("#video-container")) {
    document.querySelector("#video-container").remove();
  }
  let video_container = document.createElement("div");
  video_container.setAttribute("id", "video-container");
  document.querySelector(".search-container").insertAdjacentElement("afterend", video_container);
}

async function createMainVideoContainer(item) {
    let stats = await fetch_stats(item);
    var mainVideo = createMainVideo();

    createVideoFrame(mainVideo, item);

    var video_content = createVideoContent(item, stats);
    mainVideo.appendChild(video_content);

    if (document.querySelector(".pagination").style.visibility == "hidden") {
      document.querySelector(".pagination").style.visibility = "visible";
    }
}

async function fetch_stats(item) {

  var URL = "https://www.googleapis.com/youtube/v3/videos?key=" + key + "&id=" + item.id.videoId + "&part=statistics";
  return getData(URL);
 
}

function createMainVideo() {

    let mainVideo = document.createElement("div");
    mainVideo.setAttribute("class", "mainVideo");
    document.querySelector("#video-container").appendChild(mainVideo);
    return mainVideo;
    
}

function createVideoFrame(mainVideo, item) {
    let videoFrame = document.createElement("div");
    videoFrame.setAttribute("id", item.id.videoId);
    mainVideo.appendChild(videoFrame);
    //Iframe replaces videoframe div
    let player;
    player = new YT.Player(item.id.videoId, {
      height: "150",
      width: "300",
      videoId: item.id.videoId,
      playerVars: {
        controls: 0,
        start: 40,
        end: 6,
        loop: 1,
        iv_load_policy: 3,
        showinfo: 0,
        modestbranding: 1,
      },

      events: {
        // 'onStateChange': onPlayerStateChange
        onReady: onPlayerReady,
      },
    });

    function onPlayerReady(event) {
      event.target.cueVideoById(item.id.videoId, 10);
      event.target.mute();
    }

    // mouseover event
    mainVideo.addEventListener("mouseover", function () {
        player.seekTo(1);
        player.playVideo();
    });

    //mousout event
    mainVideo.addEventListener("mouseout", function () {
      player.stopVideo();
    });

    mainVideo.addEventListener("click", function () {
        var url = player.getVideoUrl();
        window.location.href = url;
    });
    
    return videoFrame;

}

function createVideoContent(item,stats) {
    let video_content = document.createElement("div");
    video_content.setAttribute("class", "video-content");

    let video_title = document.createElement("div");
    video_title.setAttribute("class", "video-title");
    let title_text = document.createTextNode(item.snippet.title);
    video_title.appendChild(title_text);
    video_content.appendChild(video_title);

    let video_author = document.createElement("div");
    video_author.setAttribute("class", "video-author");
    let author_text = document.createTextNode(item.snippet.channelTitle);
    video_author.appendChild(author_text);
    video_content.appendChild(video_author);

    let published_count = document.createElement("div");
    published_count.setAttribute("class", "published-count");
    let video_published_date = document.createElement("div");
    video_published_date.setAttribute("class", "video-published-date");
    var td = new Date(item.snippet.publishedAt);
    td = td.toDateString().substring(4).split(" ");
    td = td[0] + " " + td[1] + "," + td[2];
    let published_text = document.createTextNode(td);
    video_published_date.appendChild(published_text);

    let video_no_of_counts = document.createElement("div");
    video_no_of_counts.setAttribute("class", "video-no-of-counts");
    let count = document.createTextNode(
      stats.items[0].statistics.viewCount + " views"
    );
    video_no_of_counts.appendChild(count);

    published_count.appendChild(video_published_date);
    published_count.appendChild(video_no_of_counts);
    video_content.appendChild(published_count);

    let video_description = document.createElement("div");
    video_description.setAttribute("class", "video-description");
    let description_text = document.createTextNode(item.snippet.description);
    video_description.appendChild(description_text);
    video_content.appendChild(video_description);

    return video_content;

}