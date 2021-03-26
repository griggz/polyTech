import { ResponsiveLine } from "@nivo/line";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// chart toolbar styles
const useToolbarStyles = makeStyles((theme) => ({
  tools: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: "1 1 100%",
  },
}));

const PaperToolbar = () => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={classes.tools}>
      <Typography
        className={classes.title}
        color="secondary"
        variant="h6"
        id="tableTitle"
      >
        Metrics Consolidation
      </Typography>
    </Toolbar>
  );
};

export default function LineViz({ data }) {
  return (
    <>
      {/* <PaperToolbar /> */}
      <ResponsiveLine
        data={data}
        margin={{
          top: 50,
          right: 110,
          bottom: 50,
          left: 60,
        }}
        height={600}
        xScale={{
          type: "point",
        }}
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
          legend: "transportation",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
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
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
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
    </>
  );
}
