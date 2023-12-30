import React, { useEffect, useRef, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";

const LinearGraph = ({ data }) => {
  const chartRef = useRef();

  const [chartOptions, setChartOptions] = useState({
    xAxis: {
      crosshair: {
        color: "#4E7DD9",
        dashStyle: "Dash",
        zIndex: 3,
      },
      title: {
        text: "",
      },
      type: "datetime",
    },
    yAxis: {
      type: "logarithmic",
      title: {
        text: "",
      },
      labels: {
        format: "{value}",
      },
      visible: false,
    },
    series: [
      {
        name: "Nav",
        type: "area",
        showInLegend: false,
        data: null,
        lineWidth: 4,
        lineColor: "#9800FD",
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 1,
            x2: 0,
            y2: 0,
          },
          stops: [
            [0, "black"],
            [1, "#2B0941"],
          ],
        },
        marker: {
          enabled: false,
        },
        animation: {
          duration: 500,
        },
      },
    ],
    chart: {
      backgroundColor: "transparent",
      margin: 40,
    },
    navigation: {
      enabled: false,
      buttonOptions: {
        enabled: false,
      },
    },
    rangeSelector: {
      verticalAlign: "bottom",
      selected: 4,
      y: 25,
      enabled: true,
      buttonTheme: {
        width: 60,
      },
      inputEnabled: false,
      buttons: [
        {
          type: "day",
          count: 1,
          text: "1D",
        },
        {
          type: "day",
          count: 7,
          text: "1W",
        },
        {
          type: "month",
          count: 1,
          text: "1M",
          dataGrouping: {
            forced: true,
            units: [["day", [1]]],
          },
        },
        {
          type: "ytd",
          count: 1,
          text: "YTD",
        },
        {
          type: "all",
          text: "All",
        },
      ],
    },
    credits: { enabled: false },
    tooltip: {
      animation: true,
      useHTML: true,
      backgroundColor: "rgba(255, 255, 255)",
      borderWidth: 1,
      borderRadius: 15,
      borderColor: "#B0C4DB",
      shadow: {
        offsetX: 1,
        offsetY: 2,
        width: 2,
        opacity: 0.05,
      },
      shape: "square",
      hideDelay: 100,
      outside: false,
    },
    navigator: {
      handles: {
        width: 20,
        height: 30,
      },
      maskFill: "rgba(78, 125, 217, 0.2)",
      outlineWidth: 0,
      enabled: false,
      xAxis: {},
    },
    title: {
      text: "",
    },
    scrollbar: {
      enabled: false,
    },
  });

  const resize = () => {
    setChartOptions({
      rangeSelector: {
        ...chartOptions.rangeSelector,
        x: window.innerWidth - 60 * 5 - 200,
      },
    });
  };

  useEffect(() => {
    setChartOptions({
      lang: {
        rangeSelectorZoom: "",
      },
      rangeSelector: {
        ...chartOptions.rangeSelector,
        x: window.innerWidth - 60 * 5 - 200,
      },
      series: {
        data,
      },
    });
  }, [data]);

  useEffect(() => {
    //Workaround to support rangeSelector horizontal alignment
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        constructorType="chart"
        ref={chartRef}
      />
    </div>
  );
};

export default LinearGraph;
