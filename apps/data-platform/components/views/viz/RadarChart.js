import { ResponsiveRadar } from "@nivo/radar";
import PropTypes from "prop-types";

export default function RadarChart({ data }) {
  return (
    <ResponsiveRadar
      data={data}
      keys={["measurementA", "measurementB", "measurementC", "measurementD"]}
      indexBy="category"
      maxValue="auto"
      margin={{ top: 70, right: 80, bottom: 120, left: 80 }}
      curve="linearClosed"
      borderWidth={2}
      borderColor={{ from: "color" }}
      gridLevels={5}
      gridShape="circular"
      gridLabelOffset={36}
      enableDots={true}
      dotSize={10}
      dotColor={{ theme: "background" }}
      dotBorderWidth={2}
      dotBorderColor={{ from: "color" }}
      enableDotLabel={true}
      dotLabel="value"
      dotLabelYOffset={-12}
      colors={{ scheme: "nivo" }}
      fillOpacity={0.25}
      blendMode="multiply"
      animate={true}
      motionConfig="wobbly"
      isInteractive={true}
      legends={[
        {
          anchor: "top-left",
          direction: "column",
          translateX: -50,
          translateY: -40,
          itemWidth: 80,
          itemHeight: 20,
          itemTextColor: "#999",
          symbolSize: 12,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
}

RadarChart.propTypes = {
  data: PropTypes.array.isRequired,
};
