var striptags = require('striptags');




exports.strip = function(string){
    // Remove HTML and other char
    string = striptags(string);
    string = string.replace(/!+\[.*\]|\[.*\]/,'');
    string = string.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
    string = string.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,' ');
    // Get only the first 20 words
    string = string.split(/\s+/).slice(0,30).join(" ");
    string = string + " ...";
    return string;
    
}

