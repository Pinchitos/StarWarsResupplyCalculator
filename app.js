//Open the console process instance
var stdin = process.openStdin();

//API url
var api = "https://swapi.co/api/starships/";
var requestApi = require("./connections/apiConn.js");

//Request initialization
var starshipList = requestApi.requestApi(api);

//Initialization of the console UI 
console.log("+-------------------------------------------------------------+");
console.log("|  ·      *              ·        *              *        ·   |");
console.log("|                             ·                      ·        |");
console.log("|       Welcome to the Star Wars trip stops calculator        |");
console.log("|         *              ·                       ·            |");
console.log("|  ·               ·       *         *                 *      |");
console.log("+-------------------------------------------------------------+");
console.log("");
console.log("Enter the number of MGLT to calculate the number of resupply stops required");
console.log("Type 'exit' if you want to stop calculating");
console.log("");

//Initialization of the console data listener
stdin.addListener("data", function (data) {
    var trimmedData = data.toString().trim();
    //Exit condition
    if (trimmedData === "exit") {
        process.exit(0);

    //IsFinite to ensure the input is a number
    } else if (!isFinite(trimmedData)) {
        console.log("Please enter a valid number");
    //Make sure the number is positive to perform a logic operation
    } else if (data <= 0) {
        console.log("Please enter a positive number");
    } else {
        console.log("");
        console.log("+-------------------------------------------------------------+");
        console.log("For the distance of",trimmedData,"MGLT,");
        console.log("the number of resupply stops required:");
        console.log("+-------------------------------------------------------------+");
        console.log("");
        //Iteration of the list retrieved from the API to print the data
        for (ship of starshipList) {

            //Print the method resultToString to output the desired string
            console.log(`${ship.resultToString(data)}`);
        }
        console.log("");
        console.log("+-------------------------------------------------------------+");
        console.log("");
        console.log("Enter a new distance or type 'exit' if you want to stop calculating");
        console.log("");
    }
});