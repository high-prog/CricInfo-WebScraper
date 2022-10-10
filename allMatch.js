const request = require("request");
const cheerio = require("cheerio");
const scoreCard = require("./scorecard");

function getAllMatchesLink(url){
    request(url, function(err, response, html) {
        if(err){
            console.log(err)
        }else{
            // console.log(html);
            extractAllLinks(html);
        }
    });
}

function extractAllLinks(html){
    let $ = cheerio.load(html);
    let scoreCardElements =  $("a[data-hover='Scorecard']"); //FOund attribute to get all scorecards
    for(let i=0;i< scoreCardElements.length;i++){
        let link = $(scoreCardElements[i]).attr("href");
        let fullLink = "https://www.espncricinfo.com" + link;
        console.log(fullLink); 
        scoreCard.ps(fullLink);
    }
    
}





module.exports = {
    getAllMatches: getAllMatchesLink
}