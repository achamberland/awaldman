import $ from "jquery";

/*
 * Shitty templating(?) engine
 * Like Handlebars, but if a dictator came along and ruined it
 */
const Chaplin = {
    replaceTemplateStrings: function(element, data) {
        var template = typeof element === 'string' ? element : $(element).html();
        if (data.description) {
           data.description = this.addDescriptionTags(data.description); 
        }
        var search = /\{\{.+?\}\}/g;
        return template.replace(search, function(str) {
            var unwrapped = str.slice(2, -2);
            return data.hasOwnProperty(unwrapped) ? data[unwrapped] : '';
        });
    },

    // :(
    addDescriptionTags: function(template) {
        var urlRegex = /(https?\:\/\/|www\.)[^\s()\[\]]+[^\s()\[\]\.\,\!\?]/g;
        var tagReplacement = '<a href="$&" target="_blank">$&</a>';
        return template.replace(urlRegex, tagReplacement);
    }
}

export default Chaplin;