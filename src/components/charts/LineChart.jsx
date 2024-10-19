
import useDemoConfig from "./useDemoConfig.jsx";
import React from "react";
import { AxisOptions, Chart } from "react-charts";

export default function LineChart({series, getValueForPrimaryAxis, getValueForSecondaryAxis}) {
  const { data, randomizeData } = useDemoConfig({
    series: 10,
    dataType: "time",
  });

  const primaryAxis = React.useMemo(
    () => ({
      getValue: getValueForPrimaryAxis,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: getValueForSecondaryAxis,
      },
    ],
    []
  );

  return (
    <div className="flex w-1/2 h-52 bg-white dark:bg-slate-100 rounded-md drop-shadow-md">
      <Chart
          options={{
            data:series,
            primaryAxis,
            secondaryAxes,
          }}
        />
    </div>
  );
}
