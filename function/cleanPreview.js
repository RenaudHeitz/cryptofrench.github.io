var striptags = require('striptags');




exports.strip = function(string){
    
    string = striptags(string);
    string = string.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
    string = string.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'');
    string = string.replace(/!+\[.*\]/,'');
    string = string.split(/\s+/).slice(0,30).join(" ");
    string = string + " ...";
    return string;
    
}

