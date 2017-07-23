import $ from "jquery";

const Bio = {

	init: function() {
		$(".expand-bio-link").click(function() {
			$(".more-bio").removeClass("collapsed");
		});
	}
};

export default Bio;