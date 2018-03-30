var striptags = require('striptags');




exports.strip = function(string){
    // Remove HTML and other char
    string = striptags(string);
    string = string.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
    string = string.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'');
    string = string.replace(/!+\[.*\]/,'');
    // Get only the first 50 words
    string = string.split(/\s+/).slice(0,50).join(" ");
    string = string + " ...";
    return string;
    
}

