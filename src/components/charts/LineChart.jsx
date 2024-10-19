
import useDemoConfig from "./useDemoConfig.jsx";
import React, { useContext } from "react";
import { AxisOptions, Chart } from "react-charts";
import AppContext from "../../contexts/AppContext.jsx";

export default function LineChart({series, getValueForPrimaryAxis, getValueForSecondaryAxis}) {
  const {theme} = useContext(AppContext)
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
    <div className="flex w-1/2 h-52 bg-white dark:bg-slate-950 rounded-md drop-shadow-md p-1">
      <Chart
          options={{
            data:series,
            primaryAxis,
            secondaryAxes,
            dark: theme === 'dark'
          }}

        />
    </div>
  );
}
