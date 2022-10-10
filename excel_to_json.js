const { fstat } = require('fs');
let xlsx = require('xlsx');

//to write data in excel sheet from json
function excelWriter(filepath, json, sheetname){
    let newWB = xlsx.utils.book_new();
    let newS = xlsx.utis.json_to_sheet(json);
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