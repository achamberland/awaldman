import $ from "jquery";

const Scroll = {

    header: null,
    body: null,

    headerOffset: null,

    activePage: "",

    changeTriggers: [/* {klass: string, yThreshold: 0} */],

    init: function() {
        this.window = $(window);
        this.header = $("#header");
   		this.body = $("body"),
        this.headerOffset = this.header.outerHeight();

        this.addScrollButtonEvents();

        this.setTriggerPositions();
        this.window.resize(this.setTriggerPositions.bind(this));

        this.window.scroll(this.handleScroll.bind(this));
        this.handleScroll();

        this.header.removeClass('noBg');
    },

    addScrollButtonEvents: function() {
		const nextButton = $("#next-page");
		nextButton.click(this.scrollNext.bind(this));
    },

    scrollNext: function() {
    	var activePageIndex = this.changeTriggers.indexOf(this.activePage);
    	var y = 0
    	if (activePageIndex > -1 && activePageIndex < (this.changeTriggers.length - 1)) {
    		var nextPage = this.changeTriggers[activePageIndex + 1];
    		var y = nextPage.yThreshold + this.headerOffset;
    	}
    	window.scrollTo(0, y);
    },

    setTriggerPositions: function() {
        var resetActivePage = this.changeTriggers.length && this.activePage;
        var activeIndex = this.changeTriggers.indexOf(this.activePage);
        this.changeTriggers = [{
            "klass": "videoPageOverlap",
            "yThreshold": -1,
        }, {
            "klass": "musicPageOverlap",
            "yThreshold": $("#music").offset().top - this.headerOffset
        }, {
            "klass": "showsPageOverlap",
            "yThreshold": $("#shows").offset().top - this.headerOffset
        }, {
            "klass": "bioPageOverlap",
            "yThreshold": $("#bio").offset().top - this.headerOffset
        }];

        this.changeTriggers.sort(function(a,b) {
            return a.yThreshold > b.yThreshold
        });

        this.activePage = this.changeTriggers[activeIndex]
    },

    handleScroll: function() {
        var bottomPos = this.window.scrollTop();
        var active = null;

        this.changeTriggers.forEach(function(trigger) {
            if (bottomPos > trigger.yThreshold) {
                active = trigger;
            }
        });

        if (!active && this.activePage) {
            this.body.removeClass(this.activePage.klass);
            this.activePage = null;
        }
        else if (active && active != this.activePage) {
            if (this.activePage) this.body.removeClass(this.activePage.klass);
            this.activePage = active;
            this.body.addClass(active.klass);
        }
    }
}

export default Scroll;