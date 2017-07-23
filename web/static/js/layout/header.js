import $ from "jquery";

const Header = {

    element: null,

    mobileNavToggle: null,

    pageLinks: null,

    init: function() {
        this.element = $("#header");
        this.mobileNavToggle = $('#header-links-toggle');
        
        this.setMobileMenuEvents();
    },

    setMobileMenuEvents: function() {
        $(this.mobileNavToggle).click(this.handleMobileMenuClick.bind(this));
        $(this.pageLinks).click(this.hideMobileMenu.bind(this));
    },

    handleMobileMenuClick: function(event) {
        event.stopPropagation();

        if (this.element.is(".show-mobile-nav")) {
            this.hideMobileMenu(event);
        }
        else {
            this.showMobileMenu(event);
        }
    },

    showMobileMenu: function(event) {
        var self = this;
        this.element.addClass("show-mobile-nav");

        $('body').one("click", function(newEvent) {
            if ($(newEvent.currentTarget).closest(this.element)) {
                self.handleActiveMenuClick(newEvent);
            }
        });
    },

    hideMobileMenu: function(event) {
        this.element.removeClass("show-mobile-nav");
    },

    handleActiveMenuClick: function(event) {
        var self = this;
        var isTargetHeader = $(event.target).closest("#header").length;
        event.stopPropagation();
        if (!isTargetHeader) {
            self.handleMobileMenuClick(event);
        } else {
            $('body').one("click", function(newEvent) {
                self.handleActiveMenuClick(newEvent);
            });
        }
    }
};

export default Header;
