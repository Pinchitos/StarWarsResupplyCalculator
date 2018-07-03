//Import the required files/modules
var Starship = require("../models/starship.js")
var request = require('request');

//Initialization of the output list
var starshipList = [];

//Declare HTTP status constants to avoid using "Magic numbers"
const responseStatus = {
    success: 200,
    serverError: 500,
    notFound: 404,
    forbidden: 403
}

//Declaration of the request API function
var requestApi = api => {

    //API request
    request.get(api, (err, res, body) => {

        //Callback handling
        if (err) {
            console.log("An error occured in the request:", err);
        }
        if (res.statusCode !== responseStatus.success) {
            console.log("Unexpected response", res.statusCode);

        } else {
            //Data parse after the successful response of the API
            var body = JSON.parse(body)
            var nextApiCall = body.next
            var shipsJSON = body.results;

            //Iteration over the retrieved list in the JSON
            for (ship of shipsJSON) {
                //Check if the MGLT is a number to avoid the 'unknown' or undesired values
                if (parseInt(ship.MGLT)) {
                    //Insert data in the output list creating new instance of StarShip for each valid object
                    starshipList.push(new Starship(ship.name, ship.MGLT, ship.consumables));
                }
            }
            //Perform the recursive calls to the API to get the data in all the pages asyncronously
            if (nextApiCall) {
                requestApi(nextApiCall);
            }
        }
    })
    return starshipList
}

//Export the method to start the API call wherever it´s needed
exports.requestApi = requestApi;