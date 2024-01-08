describe(' form is created ', () => {

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

    it('should create a form to take inputs to search videos', () => {
        spyOn(window, 'searchResults');
        header();
        expect(document.querySelector('.search-container')).toBeDefined();
        expect(document.querySelector('.youtube-search')).toBeDefined();
        expect(document.querySelector('h1').textContent).toBe('YouTube Search');
        expect(document.querySelector('#item').getAttribute('type')).toBe('text');
        expect(document.querySelector('#item').getAttribute('placeholder')).toBe('Enter a search item');
        expect(document.querySelector(".search-button").getAttribute('type')).toBe('button');
    });

    it('when button is clicked, should call searchResults method', () => {
        header();
        var clickEvent = new Event('click');
        spyOn(window, 'searchResults');
        document.querySelector('.search-button').dispatchEvent(clickEvent);
        expect(searchResults).toHaveBeenCalled();    
    });
});