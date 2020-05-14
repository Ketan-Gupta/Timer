const axios = require('axios');
const fs = require('fs');
const converter = require('json-2-csv');
const { Parser } = require('json2csv');

let start = 0;
let running_counter = 0;
let receivedCsv;

const fields = ['id', 'name', 'username', 'email'];
const jsonParser = new Parser({ fields, header: false, quote: '' });


function timer() {
    counter();
    console.clear();
    console.log(start);
    if (start === 30) {
        clearTimeout(timer);
        return;
    }
    setTimeout(timer, 1000);
}

function counter() {
    if (start < 30)
        start = start + 1;
    else
        start = 0;
}

const setFactors = () => {
    for (running_counter = 0; running_counter < 3; running_counter++) {
        axios.get('https://jsonplaceholder.typicode.com/users').then(function (response) {
            let responseReceived = response.data;
            //fs.appendFile('/Users/guptak/permission-services-integrationtest/Data.txt', running_counter + "\n", () => { });
            //fs.appendFile('/Users/guptak/permission-services-integrationtest/Data.txt', responseReceived, () => { });
            receivedCsv = jsonParser.parse(responseReceived);
            // fs.appendFile('/Users/guptak/permission-services-integrationtest/Data.csv', running_counter, () => { });
            if (running_counter < 3) {
                console.log(running_counter)
                fs.appendFileSync('/Users/guptak/permission-services-integrationtest/Data.csv', "Row : " + running_counter + " " + new Date() + "\n", () => { });
                fs.appendFileSync('/Users/guptak/permission-services-integrationtest/Data.csv', JSON.stringify(receivedCsv) + "\n", () => { });
                running_counter++;
                timer();
                setTimeout(setFactors, 30000);
            }
            else {
                return;
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
}

setFactors();
// csv parser to parse json to csv format style and append it to a csv file.
