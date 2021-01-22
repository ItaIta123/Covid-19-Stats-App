import React from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-svg-charts";

const PieChartExample = (props) => {
  const numbers = props.numbers;
  const data = [
    {
      key: 1,
      amount: numbers[0],
      svg: { fill: "orange" },
    },
    {
      key: 2,
      amount: numbers[1],
      svg: { fill: "red" },
    },
    {
      key: 3,
      amount: numbers[2],
      svg: { fill: "green" },
    },
  ];

  const Labels = ({ slices, height, width }) => {
    return slices.map((slice, index) => {
      const { labelCentroid, pieCentroid, data } = slice;
      return (
        <Text
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill={"white"}
          textAnchor={"middle"}
          alignmentBaseline={"middle"}
          fontSize={24}
          stroke={"black"}
          strokeWidth={0.2}
        >
          {/* {pieCentroid} */}
          {data.amount}
        </Text>
      );
    });
  };
  return (
    <View
      style={{
        borderWidth: 3,
        borderColor: "white",
      }}
    >
      <PieChart
        style={{ height: 200, width: 200 }}
        valueAccessor={({ item }) => item.amount}
        data={data}
        spacing={0}
        outerRadius={"95%"}
        innerRadius={"20%"}
      >
        {/* <Labels /> */}
      </PieChart>
    </View>
  );
};

export default PieChartExample;
