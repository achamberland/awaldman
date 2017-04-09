// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"

import Header from "web/static/js/layout/header";
import Scroll from "web/static/js/layout/scroll";
import Booking from "web/static/js/layout/booking";
import VideosPage from "web/static/js/pages/videos";
import MusicPage from "web/static/js/pages/music";
import Shows from "web/static/js/pages/shows";

export var App = {
	modules: {
		Booking: Booking,
		Header: Header,
		Scroll: Scroll,
		VideosPage: VideosPage,
		MusicPage: MusicPage,
		Shows: Shows
	},

	run: function() {
		 // Repetitive keys are needed for easy dependency loading
	    for (var moduleKey in this.modules) {
	        try {
	            var context = this.modules[moduleKey];
	            if (typeof context.loadDependencies === 'function') {
	                context.loadDependencies()
		                .done((optParams) => context.init(optParams))
		                .fail(() => {
		                	console.warn(`dependencies for module ${module} failed to load, continuing with init`);
		                	context.init();
	                	});
	            }
	            else if (context && typeof context.init === 'function') {
	                context.init();
	            }
	            else {
	                console.warn("Uhh what happened to " + moduleKey + "?");
	            }
	        }
	        catch(e) {
	            console.error("Error initializing module: " + moduleKey + " - Msg:", e);
	        }
	    }
	}
}