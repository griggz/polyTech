import { ResponsiveLine } from "@nivo/line";

export default function LineViz({ data }) {
  return (
    <ResponsiveLine
      data={data}
      margin={{
        top: 10,
        right: 25,
        bottom: 100,
        left: 100,
      }}
      height={600}
      xScale={{
        type: "point",
      }}
      colors={{ scheme: "category10" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "YEAR",
        legendOffset: 45,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "CHEMICAL RATE TOTAL",
        legendOffset: -90,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{
        theme: "background",
      }}
      pointBorderWidth={2}
      pointBorderColor={{
        from: "serieColor",
      }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 95,
          itemsSpacing: 10,
          itemDirection: "top-to-bottom",
          itemWidth: 80,
          itemHeight: 30,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}
