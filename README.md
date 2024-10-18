# Predicted OBP for 2021 Season

## Objective

The OBP Prediction project aims to predict the on-base percentage (OBP) for MLB players in the 2021 season using historical data from 2016-2020. The project utilizes player OBP, plate appearances (PA), and age to estimate future performance, applying a weighted average approach. The predictions are compared to the actual 2021 OBP to calculate total error.

### Skills Learned

- Understanding of statistical methods for prediction.
- Experience with CSV data parsing and manipulation.
- Ability to apply weighted averaging to historical data.
- Proficiency in JavaScript for data processing and DOM manipulation.
- Incorporating real-world data, such as player age, into statistical models.

### Tools Used

- **JavaScript**: To calculate OBP predictions, handle data processing, and manage interactions.
- **PapaParse**: For CSV parsing and data manipulation.
- **HTML & CSS**: For structuring and styling the webpage.
- **GitHub**: For version control and project collaboration.

## Steps

### Initial Setup

The project involves a simple web-based setup using JavaScript, HTML, and CSS. The CSV file with player stats is fetched and parsed using the PapaParse library. A list of predicted OBP values for each player is then displayed on the webpage.

### Prediction Process

1. **Fetching CSV Data**:
    - Player data from 2016-2020, including OBP, plate appearances, and birthdates, is fetched and parsed from a CSV file using PapaParse.
    
2. **Weighted Average Calculation**:
    - Historical OBP from 2016 to 2020 is used, with more recent years and those with more plate appearances weighted more heavily. Missing data is handled by assigning zero weight.
    - An arbitrary 5% reduction is applied to players over the age of 30 to account for age-related performance decline.

3. **Error Calculation**:
    - The predicted OBP for 2021 is compared to the actual OBP for each player, and the total absolute error is calculated.

### Running the Prediction

1. **Fetch Player Data**: Fetch the CSV file containing player OBP and PA data from 2016-2020.
2. **Calculate Predictions**: Apply weighted averaging to predict the OBP for the 2021 season.
3. **Display Results**: Display each player's predicted OBP and compare it to the actual OBP from 2021, alongside the total error.

### Future Improvements

- Refine weight calculations with data-driven approaches, possibly using machine learning for better accuracy.
- Incorporate additional data, such as exit velocity and launch angle, to improve predictions.
- Explore advanced models that dynamically adjust weights based on historical trends.
