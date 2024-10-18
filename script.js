document.addEventListener("DOMContentLoaded", function () {

  //David Shableski
  //dbshableski@gmail.com
  //10-17-2024
  //This code uses batting averages and plate apperances from 2016-2020, as well as the age of the player to try to predict
  //the batting average for the 2021 season.

  var predictionsList = document.getElementById("predictions"); // List to display player data
  var totalErrorDiv = document.getElementById("totalError"); // Div to display the total absolute error

  //fetch the CSV file
  //https://stackoverflow.com/questions/22331886/read-csv-headers-using-javascript
  fetch("obp.csv")
    .then(function (response) {
      return response.text(); //parse it as text
    })
    .then(function (csvText) {
      //parse the csv using PapaParse
      //https://stackoverflow.com/questions/49752889/how-can-i-read-a-local-file-with-papa-parse
      Papa.parse(csvText, {
        header: true, //use the first row as header
        complete: function (results) {
          var players = results.data;

          //clear list before adding new data
          predictionsList.innerHTML = "";
          totalAbsoluteError = 0;
          //loop through parsed data and calculate predicted OBP for 2021
          for (var i = 0; i < players.length; i++) {
            var player = players[i];
            var li = document.createElement("li");
            var name = player["Name"];

            //get OBPs from previous years, convert them to numbers, set default to 0 if missing
            var obp2016 = parseFloat(player["OBP_16"]) || 0;
            var obp2017 = parseFloat(player["OBP_17"]) || 0;
            var obp2018 = parseFloat(player["OBP_18"]) || 0;
            var obp2019 = parseFloat(player["OBP_19"]) || 0;
            var obp2020 = parseFloat(player["OBP_20"]) || 0;

            var pa2016 = parseFloat(player["PA_16"]) || 0;
            var pa2017 = parseFloat(player["PA_17"]) || 0;
            var pa2018 = parseFloat(player["PA_18"]) || 0;
            var pa2019 = parseFloat(player["PA_19"]) || 0;
            var pa2020 = parseFloat(player["PA_20"]) || 0;

            //total plate appearances
            //var totalPA = pa2016 + pa2017 + pa2018 + pa2019 + pa2020;

            //assign weights 
            //more emphasis on recent years and years with more PAs
            var weights2016 = pa2016 * 1;
            var weights2017 = pa2017 * 2;
            var weights2018 = pa2018 * 3;
            var weights2019 = pa2019 * 4;
            var weights2020 = pa2020 * 5;

            /*increased error
            var weights2016 = (pa2016 / totalPA) * 1;
            var weights2017 = (pa2017 / totalPA) * 2;
            var weights2018 = (pa2018 / totalPA) * 3;
            var weights2019 = (pa2019 / totalPA) * 4;
            var weights2020 = (pa2020 / totalPA) * 5;
*/

            //set weights to zero if missing data
            if (obp2016 == 0) {
              weights2016 = 0;
            }
            if (obp2017 == 0) {
              weights2017 = 0;
            }
            if (obp2018 == 0) {
              weights2018 = 0;
            }
            if (obp2019 == 0) {
              weights2019 = 0;
            }
            if (obp2020 == 0) {
              weights2020 = 0;
            }

            //calculate OBP
            var weightedSum =
              obp2016 * weights2016 +
              obp2017 * weights2017 +
              obp2018 * weights2018 +
              obp2019 * weights2019 +
              obp2020 * weights2020;

            var totalWeight =
              weights2016 +
              weights2017 +
              weights2018 +
              weights2019 +
              weights2020;

            //calculate the predicted OBP for 2021
            var predictedOBP2021;
            if (totalWeight > 0) {
              predictedOBP2021 = (weightedSum / totalWeight).toFixed(3); // round to 3 decimal places
            } else {
              predictedOBP2021 = "N/A"; //if no valid data
            }

            //get the actucal OBP for 2021
            var obp2021 = parseFloat(player["OBP_21"]);

            //https://www.w3schools.com/jsref/jsref_getfullyear.asp
            var birthDate = new Date(player["birth_date"]);
            var playerAge = 2021 - birthDate.getFullYear(); // Calculate player age

            //apply an age factor to reduce OBP slightly for older players (> 30)
            if (playerAge > 30 && predictedOBP2021 !== "N/A") {
              predictedOBP2021 *= 0.95; // 5% reduction if over 30
              predictedOBP2021 = parseFloat(predictedOBP2021).toFixed(3);
            }
            /* apply an age factor to increase OBP slightly for younger players
            //icreased error
            if (playerAge < 23 && predictedOBP2021 !== "N/A") {
              predictedOBP2021 *= 1.05; // 5% increase if under 23
              predictedOBP2021 = parseFloat(predictedOBP2021).toFixed(3);
            }
*/

            if (predictedOBP2021 !== "N/A") {
              var error = Math.abs(predictedOBP2021 - obp2021);
              totalAbsoluteError += error; //add to total error
              var star = "";
              if (error == 0) { //if prediction is 100% put star next to their name
                star = " *"
              }


            }
            //display the player's name and predicted OBP for 2021
            li.textContent =
              name +
              ": Predicted OBP for 2021: " +
              predictedOBP2021 +
              " | Actual OBP for 2021: " +
              obp2021.toFixed(3) + star;
            predictionsList.appendChild(li);
          }
          totalErrorDiv.textContent = totalAbsoluteError.toFixed(3);
        },
        error: function (error) {
          console.error("Error parsing CSV:", error);
        },
      });
    })
    .catch(function (error) {
      console.error("Error fetching the CSV file:", error);
    });
});
