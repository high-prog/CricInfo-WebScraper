# CricInfo-WebScraper

A nodejs Web SCraper which scrapes a IPL DEtails of all the matches given in the URL.
URL --> https://www.espncricinfo.com/series/ipl-2020-21-1210595

Will scrape all urls and store the data in the ipl folder 
Inside Ipl folder the data is distributed with different team names.
Each Team will contain the data of the players in their respective excel(csv) files
Each Excel File contains
    - venue of the match
    - Date on which the match was played
    - Opponent TEam
    - Runs Scored
    - Balls played
    - NUmber of FOurs and sixes 
    - Strike Rate

Modules Used --> -request
                 -cheerio
                 -fs
                 -path

MEthodology ---> 
            A link was given of the hompage --> FOund link of the page with All matches --> 
            Fetched Details Of one match --> CHeck if ipl folder is created --> if not created then create folder --> then create team folder and then create player csv file and store the data --> Perform this n number of times for all matches

RUn using command --> node main.js
might even use npm init -y
