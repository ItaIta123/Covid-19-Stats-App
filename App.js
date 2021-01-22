import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-community/picker";
import CountrySelectDropdown from "react-native-searchable-country-dropdown";
import DropDownList from "./src/components/dropDownList";
import useResults from "./src/components/API/API";

export default function App() {
  const [getData] = useResults();

  return (
    <View
      style={{
        paddingTop: 100,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      > */}
      <DropDownList />
      {/* </ScrollView> */}

      <StatusBar style="auto" />
      {/* <Picker
        mode={"dropdown"}
        selectedValue={true}
        // selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker> */}
      {/* <CountrySelectDropdown
      
        countrySelect={(a) => {
          <Text>{a}</Text>;
        }}
        dropdownOffsetX={-20}
        error={<Text>errorMsg</Text>}
        // fontFamily={"Nunito-Regular"}
        fontSizeOffset={20}
        textColor={"#000000"}
      /> */}
    </View>
  );
}
