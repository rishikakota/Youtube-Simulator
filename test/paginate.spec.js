describe('paginating the results', () => {
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
    it('should create 5 pages', () => {
        paginate();

        expect(document.querySelector('.pagination')).toBeDefined();
        expect(document.querySelector('.pagination').style.visibility).toBe('hidden');
        expect(document.querySelectorAll('.page-button')).toBeDefined();
    });

    it('should call searchResults when button is clicked', () => {
        paginate();
        var clickEvent = new Event('click');
        spyOn(window, 'showResults').and.callThrough();
        document.querySelector('.page-button').dispatchEvent(clickEvent);
        expect(showResults).toHaveBeenCalled();
    });
})
