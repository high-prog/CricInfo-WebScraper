const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";

const request = require("request");
const cheerio = require("cheerio"); //uses css selectors to read data
const fs = require("fs");
const path = require("path");
const allMatchObj = require("./allMatch");

const iplPath = path.join(__dirname, "ipl");
dirCreator(iplPath);


//HOMEPAGE

request(url, cb);  // requests method use to request for a site and then call the extractLink FUnction to extract data
function cb(err, response, html){
    if(err){
        console.log(err)
    }else{
        // console.log(html);
        extractLink(html);
    }
}

function extractLink(html){
    let $ = cheerio.load(html); //$ --> works as an interface 
    let anchorElem =  $("a[data-hover='View All Results']"); //Using Attribute to get link of page
    let link = anchorElem.attr("href"); //not full link cause
    // console.log(link)
    let fullLink = "https://www.espncricinfo.com" + link;
    // console.log(fullLink)
    allMatchObj.getAllMatches(fullLink);
}

function dirCreator(filepath){
    if(fs.existsSync(filepath) == false){
        fs.mkdirSync(filepath);
    }
}