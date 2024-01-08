describe(' when search button is clicked ', () => {
    var videoData = {
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
    
    it(" retrieves data related to search item ", async () => {

        var searchElement = {
            'value': 'javascript',
        }
        spyOn(document, 'getElementById').and.returnValue(searchElement);
        
        var query = document.getElementById.value;
        
        spyOn(window, 'getSearchResults').and.returnValue(videoData.items);
        spyOn(window, 'paginate');
        
        spyOn(window, 'showResults');
        var data = getSearchResults(query);
        expect(data).toEqual(videoData.items);
        
        await searchResults();
        expect(paginate).toHaveBeenCalled();
        expect(getSearchResults).toHaveBeenCalledWith(query);
        expect(showResults).toHaveBeenCalled(); 

    });

    it("get videos related to a search query", async () => {
        var dataMockObject = {
            items: [
                {
                    snippet: {}
                }
            ]
        }
        var query = "Javascript";
        spyOn(window, "getData").and.returnValue(dataMockObject);
        var data = await getSearchResults(query);
        expect(data).toEqual(dataMockObject.items);
    });

});

describe(' searching for a video next time ', () => {
    var videoData = {
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
        var pagination = document.createElement('div');
        pagination.setAttribute('class', 'pagination');
        document.querySelector('.container').appendChild(pagination);
    });

    afterEach(() => {
        document.body.textContent = "";
    });
    
    it(" retrieves data related to search item ", async () => {

        var searchElement = {
            'value': 'javascript',
        }
        spyOn(document, 'getElementById').and.returnValue(searchElement);
        spyOn(window, 'getSearchResults').and.returnValue(videoData.items);
        spyOn(window, 'paginate');
        spyOn(window, 'showResults');

        await searchResults();
        expect(paginate).toHaveBeenCalled();

    });
})