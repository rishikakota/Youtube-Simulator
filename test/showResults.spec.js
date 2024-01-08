describe(' after retrieving data, results are rendered in the page  ', () => {

    var mockVideoData = {
        "items": [
            {
                "etag": "jvEUI_pdKHgdarpsJtXfzksYsiA",
                "id": {
                    "kind": "youtube#video",
                    "videoId": "miul8Nmc9dY"
                },
                "kind": "youtube#searchResult",
                "snippet": {
                    "publishedAt": "2019-12-11T20:17:24Z",
                    "channelId": "UCZny4nHHsdHTXe4HyqDEEpw",
                    "title": "RUDRANSH Jain RR  |simbha | rhythm revolution crew | Mera Wala dance",
                    "description": "Rhythm revolution dance crew Choreography by = UK Manish RR Song = Mera Wala dance Movie= simbha Insta _meghna_jain Insta_ rhythm_revolution_crew.",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/miul8Nmc9dY/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/miul8Nmc9dY/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/miul8Nmc9dY/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        }
                    },
                    "channelTitle": "Rudransh r. r",
                    "liveBroadcastContent": "none",
                    "publishTime": "2019-12-11T20:17:24Z"
                }
            }
        ]
    };

    beforeEach(() => {
        var parser = new DOMParser();
        let str = __html__['index.html'];
        var doc = parser.parseFromString(str, 'text/html');
        document.body.innerHTML = doc.body.innerHTML;
        var video_container = document.createElement("div");
        video_container.setAttribute('id', 'video-container');
        document.querySelector('.container').appendChild(video_container);
    });

    afterEach(() => {
        document.body.textContent = "";
    });

    it(' should call createvideo-container and appendvideos method as the page no ', async () => {
        var page_no = 0;
        fetch_data = [mockVideoData];
        spyOn(window, 'createVideoContainer');
        spyOn(window, 'createMainVideoContainer');
        
        await showResults(page_no);
        expect(createVideoContainer).toHaveBeenCalled();
        expect(createMainVideoContainer).toHaveBeenCalled();

    });

    it('should videoframe contatiner for each video', async () => {
        var dataMockObject = {
            "items": [
                {
                    "statistics": {
                        "viewCount": "1940300",
                    }
                }
            ]
        };
        var item = [mockVideoData][0];
        spyOn(window, 'fetch_stats').and.returnValue(dataMockObject);

        var divElement_1 = document.createElement('div');
        spyOn(window, 'createMainVideo').and.returnValue(divElement_1);
        spyOn(window, 'createVideoFrame');
        var divElement_2 = document.createElement('div');
        spyOn(window, 'createVideoContent').and.returnValue(divElement_2);

        var pagination = document.createElement('div');
        pagination.setAttribute('class', 'pagination');
        pagination.style.visibility = 'hidden';
        document.querySelector('.container').appendChild(pagination);
        
        await createMainVideoContainer();
        
        //expect(stats).toEqual(dataMockObject);
        expect(createMainVideo).toHaveBeenCalled();
        expect(createVideoFrame).toHaveBeenCalled();
        expect(createVideoContent).toHaveBeenCalled();

    });

    it(' checking the format of stats ', async () => {

        var dataMockObject = {
            items: [
                {
                    statistics: {
                        viewCount: 1000
                    }
                }
            ]
        };

        spyOn(window, "getData").and.returnValue(dataMockObject);
        var data = await fetch_stats(mockVideoData.items[0]);
        expect(data).toEqual(dataMockObject);
    });

    it(' should create a div for a video frame ', () => {
        var main_video = createMainVideo();
        expect(document.querySelector('.mainVideo')).toBeDefined();
    });

    it(' should append video content', async () => {
        var statsdataMockObject = {
            items: [
                {
                    statistics: {
                        viewCount: 1000
                    }
                }
            ]
        };
        var itemdataMockObject = mockVideoData.items[0];
        document.querySelector('#video-container').appendChild(createVideoContent(itemdataMockObject, statsdataMockObject));

        expect(document.querySelector('.video-content')).toBeDefined();

        expect(document.querySelector('.video-title').textContent).toBe(itemdataMockObject.snippet.title);
        expect(document.querySelector('.video-author').textContent).toBe(itemdataMockObject.snippet.channelTitle);
        expect(document.querySelector('.published-count')).toBeDefined();
        expect(document.querySelector('.video-published-date').textContent).toBe('Dec 12,2019');
        expect(document.querySelector('.video-no-of-counts').textContent).toBe(statsdataMockObject.items[0].statistics.viewCount + ' views');
        expect(document.querySelector('.video-description').textContent).toBe(itemdataMockObject.snippet.description);

    });
});

describe('video-container method', () => {
    beforeEach(() => {
        var parser = new DOMParser();
        let str = __html__['index.html'];
        var doc = parser.parseFromString(str, 'text/html');
        document.body.innerHTML = doc.body.innerHTML;
        
        var search_container = document.createElement("div");
        search_container.setAttribute('class', 'search-container');
        document.querySelector('.container').appendChild(search_container);
        
        var video_container = document.createElement("div");
        video_container.setAttribute('id', 'video-container');
        document.querySelector('.container').appendChild(video_container);
    });

    afterEach(() => {
        document.body.textContent = "";
    });

    it('removing video-container', () => {
        createVideoContainer();
        expect(document.querySelector('#video-container')).toBeDefined();
    });
});



