import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import useResults from "./API/API";
import PieChartExample from "./pieChart";
import { PieChart } from "react-native-svg-charts";
import { Dimensions } from "react-native";
import countriesList from "./countriesList";

const DropDownList = () => {
  const screenWidth = Math.round(Dimensions.get("window").width);
  // let test = true;
  const [stats, setStats] = useState([]);
  const [getData] = useResults();
  const [dropDownOpen, setDropDownOpen] = useState(false);

  /********* USING useEffect Hook TO GET IMMEDIATELY THE GLOBAL STATS *********/
  useEffect(() => {
    async function fetchData() {
      setStats(await getData("Global"));
    }
    fetchData();
  }, []);

  /*************** SETTING UP & ASSIGNING VARIABLES *************/
  let countryName = "";
  let totalConfirmed = "";
  let newConfirmed = "";
  let newDeaths = "";
  let newRecovered = "";
  let totalDeaths = "";
  let totalRecovered = "";
  let persentRecovered = "";
  let persentDeaths = "";
  let persentNewRecovered = "";
  let persentNewDeaths = "";
  if (stats.length != 0) {
    countryName = stats[0].countryName;
    totalConfirmed = stats[0].totalConfirmed;
    newConfirmed = stats[0].newConfirmed;
    newDeaths = stats[0].newDeaths;
    newRecovered = stats[0].newRecovered;
    totalDeaths = stats[0].totalDeaths;
    totalRecovered = stats[0].totalRecovered;
    persentRecovered = ((totalRecovered / totalConfirmed) * 100).toFixed(2);
    persentDeaths = ((totalDeaths / totalConfirmed) * 100).toFixed(2);
    persentNewRecovered = ((newRecovered / newConfirmed) * 100).toFixed(2);
    persentNewDeaths = ((newDeaths / newConfirmed) * 100).toFixed(2);
    if (newDeaths === 0) {
      persentNewDeaths = 0;
    }
    if (newRecovered === 0) {
      persentNewRecovered = 0;
    }
  }

  // console.log(stats[0]);

  /***************** HELPER FUNCTION *****************/
  const changeNumberStyle = (num) => {
    if (num >= 1000 && num < 9999) {
      num = num / 1000;
      num = num.toFixed(1);
      num = num + "K";
      return num;
    }
    if (num >= 10000 && num < 99999) {
      num = num / 1000;
      num = num.toFixed(1);
      num = num + "K";
      return num;
    }
    if (num >= 100000 && num < 999999) {
      num = num / 1000;
      num = num.toFixed(1);
      num = num + "K";
      return num;
    }
    if (num >= 1000000 && num < 9999999) {
      num = num / 1000000;
      num = num.toFixed(1);
      num = num + "M";
      return num;
    }
    if (num >= 10000000 && num < 99999999) {
      num = num / 1000000;
      num = num.toFixed(1);
      num = num + "M";
      return num;
    }
    if (num >= 100000000 && num < 999999999) {
      num = num / 1000000;
      num = num.toFixed(1);
      num = num + "M";
      return num;
    } else {
      return num;
    }
  };
  /*************** SCREEN VIEW *****************/
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch",
      }}
    >
      <Text
        style={{
          fontSize: 55,
          textDecorationLine: "underline",
          textDecorationColor: "green",
          paddingBottom: 30,
          color: "green",
        }}
      >
        Covid-19 Stats
      </Text>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <DropDownPicker
        labelStyle={{
          fontSize: 25,
          color: "black",
        }}
        dropDownMaxHeight={300}
        placeholder="Select a country"
        containerStyle={{
          height: 40,
          width: screenWidth - 50,
        }}
        style={{ backgroundColor: "#C8CBC6" }}
        itemStyle={{
          justifyContent: "center",
        }}
        dropDownStyle={{
          backgroundColor: "#C8CBC6",
        }}
        onChangeItem={async (item) => setStats(await getData(item.value))}
        searchable={true}
        searchablePlaceholder="🔍 Search"
        searchablePlaceholderTextColor="blue"
        searchTextInputProps={{ height: 50, fontSize: 25 }}
        searchableError={() => <Text>Not Found</Text>}
        onOpen={() => {
          setDropDownOpen(true);
        }}
        onClose={() => {
          setDropDownOpen(false);
        }}
        // Countries list
        items={countriesList}
        // {
        //   label: "USA",
        //   value: "usa",
        //   icon: () => (
        //     <Text style={styles.icon}> {getUnicodeFlagIcon("us")} </Text>
        //   ),
        // },
      />
      {/* </View> */}

      {/* /****** STATS VIEW *****/}

      {/* /****** FIXING PHONE USAGE PROBLEM: WHEN OPENING THE COUNTRY LIST THE STATS DISAPPEAR *****/}
      {dropDownOpen ? null : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ alignSelf: "center" }}>
            <Text
              style={{
                fontSize: 35,
                textDecorationLine: "underline",
                alignSelf: "center",
                paddingBottom: 10,
                paddingTop: 5,
              }}
            >
              {countryName}
            </Text>
            {/* /******* TOTAL CONFIRMED ******/}
            <Text style={styles.stats}>
              Total Confirmed:{" "}
              <Text style={styles.confirmed}>
                {changeNumberStyle(totalConfirmed)}

                <Text style={{ fontSize: 20 }}>
                  {" "}
                  + ({changeNumberStyle(newConfirmed)})
                </Text>
              </Text>
            </Text>

            {/* /******* TOTAL RECOVERED ******/}
            <Text style={styles.stats}>
              Total Recovered:{" "}
              <Text style={styles.recovered}>
                {changeNumberStyle(totalRecovered)}

                <Text style={{ fontSize: 20 }}>
                  {" "}
                  + ({changeNumberStyle(newRecovered)})
                </Text>
              </Text>
            </Text>

            {/* /******* TOTAL DEATHS ******/}
            <Text style={styles.stats}>
              Total Deaths:{" "}
              <Text style={styles.deaths}>
                {changeNumberStyle(totalDeaths)}

                <Text style={{ fontSize: 20 }}>
                  {" "}
                  + ({changeNumberStyle(newDeaths)})
                </Text>
              </Text>
            </Text>

            {/* /******* PERSENT RECOVERED ******/}
            <Text style={styles.stats}>
              Recovered:{" "}
              <Text style={styles.recovered}>
                {persentRecovered}%
                <Text style={{ fontSize: 20 }}>
                  {" "}
                  + ({persentNewRecovered}%)
                </Text>
              </Text>
            </Text>

            {/* /******* PERSENT DEATHS ******/}
            <Text style={styles.stats}>
              Deaths:{" "}
              <Text style={styles.deaths}>
                {persentDeaths}%
                <Text style={{ fontSize: 20 }}> + ({persentNewDeaths}%)</Text>
              </Text>
            </Text>

            {/* <View style={{ flexDirection: "row", paddingTop: 10 }}>
              <View
                style={{
                  height: 20,
                  width: 20,
                  backgroundColor: "#F09748",
                  // borderRadius: "8%",
                }}
              ></View>
              <Text> - Total Confirmed</Text>
            </View> */}
            <View style={{ flexDirection: "row", paddingTop: 10 }}>
              <View
                style={{
                  height: 20,
                  width: 20,
                  backgroundColor: "red",
                  // borderRadius: "8%",
                }}
              ></View>
              <Text> - % Deaths </Text>
            </View>
            <View style={{ flexDirection: "row", paddingTop: 10 }}>
              <View
                style={{
                  height: 20,
                  width: 20,
                  backgroundColor: "green",
                  // borderRadius: "8%",
                }}
              ></View>
              <Text> - % Recovered</Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              <PieChartExample
                numbers={[0, persentDeaths, persentRecovered]}

                // numbers={[totalConfirmed, totalDeaths, totalRecovered]}
              />
            </View>
          </View>
        </ScrollView>
      )}

      {/* {test ? <Text> ture!</Text> : <Text>false</Text>} */}
      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  DropDownContainer: {
    borderColor: "red",
    borderWidth: 3,
  },
  icon: {
    fontSize: 30,
  },
  stats: {
    fontSize: 25,
    // fontFamily: "",
  },
  confirmed: {
    color: "#F09748",
  },
  deaths: {
    color: "red",
  },
  recovered: {
    color: "green",
  },
});

export default DropDownList;
