import React, { useState, useEffect } from "react";
import { Text } from "react-native";

export default () => {
  /****************** HELPER FUNCTION ****************************/
  const filterResults = (data, index, country) => {
    /*
    data = the entire API response in Json form
    index = a number or null. the number represent the countire's index num in the API response.
    The function returns global and country objects containing all the information
    */
    // Handling the case of requesting data of country that does not exist.
    if (index === null && country != "Global") {
      console.log("index is null and country != Global");
      return null;
    }
    if (index === null && country === "Global") {
      console.log("index is null and country === Global");

      // Gets globalStats object's stats
      let globalStats = {
        countryName: "Gloabl",
        newConfirmed: data.Global.NewConfirmed,
        newDeaths: data.Global.NewDeaths,
        newRecovered: data.Global.NewRecovered,
        totalConfirmed: data.Global.TotalConfirmed,
        totalDeaths: data.Global.TotalDeaths,
        totalRecovered: data.Global.TotalRecovered,
      };
      return [globalStats];
    }

    //if the user indeed searches for a country that exist in the API DB:
    // Why index +1? because it can be that the index is 0 which is False
    if (index + 1) {
      console.log("index is found! and country != Global");

      let countryStats = {
        countryName: data.Countries[index].Country,
        newConfirmed: data.Countries[index].NewConfirmed,
        newDeaths: data.Countries[index].NewDeaths,
        newRecovered: data.Countries[index].NewRecovered,
        totalConfirmed: data.Countries[index].TotalConfirmed,
        totalDeaths: data.Countries[index].TotalDeaths,
        totalRecovered: data.Countries[index].TotalRecovered,
      };
      return [countryStats];
    }
  };
  /**************************************************************************************** */
  // const [results, setResults] = useState([]);
  const getData = async (country) => {
    try {
      // TO GET GLOBAL STATS JUST results.Global
      // https://api.covid19api.com/live/country/italy

      let response = await fetch("https://api.covid19api.com/summary");
      let json = await response.json();
      let index = null;
      // If the user search for a country and not global:
      if (country != "Global") {
        // Finding the countrie's object index
        for (let i = 0; i < json.Countries.length; i++) {
          if (json.Countries[i].Country === country) {
            // console.log(`API.js 57 index number is: ${i}`);
            index = i;
            break;
          }
        }
      }
      // filterResults(json, index, country);
      // Returning the data filtered and ready to use
      let fullData = filterResults(json, index, country);
      // console.log(`This is the FULLLLLLLL DATAAAAAAAA API.js 67: ${fullData}`);
      // console.log(fullData);
      // console.log(fullData);

      return fullData;
      // console.log(json.Countries[2]);
    } catch (err) {
      console.error(`API.js error line 45 ${err}`);
    }
  };
  return [getData];
};
