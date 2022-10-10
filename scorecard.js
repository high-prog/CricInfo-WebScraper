// const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard";

const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

function processScorecard(url){
    request(url, cb);

}

function cb(err, response, html){
    if(err){
        console.log(err)
    }else{
        // console.log(html);
        extractMatchDetail(html);
    }
}

function extractMatchDetail(html){
    //venue(.match-header-container .description)date  
    //result(.event .status-text)  

    let $ = cheerio.load(html);
    
    //venue and date (same for both teams);
    let data = $(".match-header-container .description").text();
    data = data.split(",");
    let venue = data[1].trim();
    let date = data[2].trim();
    let result = $(".event .status-text").text();
    // console.log(result);

    let innings = $(".card.content-block.match-scorecard-table>.Collapsible");
    for(let i=0;i<innings.length;i++){
        //team opponent
        let teamName = $(innings[i]).find("h5").text();
        teamName = teamName.split("INNINGS");
        teamName = teamName[0].trim();
        let opponentIdx = i==0?1:0;
        let opponentName = $(innings[opponentIdx]).find("h5").text();
        opponentName = opponentName.split("INNINGS");
        opponentName = opponentName[0].trim();

        let currInning = $(innings[i]);
        
        let allRows = currInning.find(".table.batsman tbody tr");

        for(let j =0;j< allRows.length;j++){
            let allCols = $(allRows[j]).find("td");
            let isWorthy = $(allCols[0]).hasClass("batsman-cell");
            if(isWorthy == true){
                 let playerName = $(allCols[0]).text().trim();
                 let runs = $(allCols[2]).text().trim();
                 let balls = $(allCols[3]).text().trim();
                 let fours = $(allCols[5]).text().trim();
                 let sixes = $(allCols[6]).text().trim();
                 let sr = $(allCols[7]).text().trim();
                console.log(`${playerName}  ${runs} ${balls} ${fours} ${sixes} ${sr} `);
                processPlayer(teamName, playerName, runs, balls, fours,sixes,sr, opponentName, venue, date, result);
            }
        }

    }

    function dirCreator(filepath){
        if(fs.existsSync(filepath) == false){
            fs.mkdirSync(filepath);
        }
    }
    
    const { fstat } = require('fs');
    
    //to write data in excel sheet from json
    function excelWriter(filepath, json, sheetname){
        let newWB = xlsx.utils.book_new();
        let newS = xlsx.utils.json_to_sheet(json);
        xlsx.utils.book_append_sheet(newWB,newS,sheetname);
        xlsx.writeFile(newWB, filepath);
    }
    
    function excelReader(filepath,sheetname){
        if(fs.existsSync(filepath) == false){
            return [];
        }
        let wb = xlsx.readFile(filepath);
        let excelData = wb.Sheets[sheetname];
        let ans = xlsx.utils.sheet_to_json(excelData);
        return ans;
    }


    function processPlayer(teamName, playerName, runs, balls, fours,sixes,sr, opponentName, venue, date, result){
        let teamPath = path.join(__dirname,"ipl", teamName);
        dirCreator(teamPath);

        let filepath = path.join(teamPath, playerName + ".xlsx");

        let content = excelReader(filepath,playerName);
        let playerObj = {
            teamName,
            playerName,
            runs,
            balls,
            fours,
            sixes,
            sr,
            opponentName,
            venue,
            date,
            result
        }
        content.push(playerObj);
        excelWriter(filepath,content,playerName);
    }
    



}

module.exports = {
    ps: processScorecard
}