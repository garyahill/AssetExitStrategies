import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface PercentageSoldChartProps {
	chartLabel?: string;
	dataSetLabel?: string;
	dataPoints: number[];
	dataPointLabelData: string[];
	showLegend?: boolean;
	hideTooltipColorBoxAndLabel?: boolean;
	tooltipTextSuffix?: string;
	tooltipTextPrefix?: string;
	chartColor?: string;
	legendPosition?: "top" | "bottom" | "left" | "right";
}

const predefinedColors = [
	"#FF6384", // Red
	"#36A2EB", // Blue
	"#FFCE56", // Yellow
	"#4BC0C0", // Green
	"#9966FF", // Purple
	"#FF9F40", // Orange
];

const generateBackgroundColors = (dataLength: number) => {
	const colors = [];
	for (let i = 0; i < dataLength; i++) {
		// Cycle through the predefined colors
		colors.push(predefinedColors[i % predefinedColors.length]);
	}
	return colors;
};

const BarChart: React.FC<PercentageSoldChartProps> = ({ showLegend = false, hideTooltipColorBoxAndLabel = false, ...props }) => {
	const { dataPoints, dataPointLabelData, dataSetLabel, chartLabel, chartColor } = props;

	const chartData = {
		labels: dataPointLabelData,
		datasets: [
		  {
				label: dataSetLabel,
				data: dataPoints,
				backgroundColor: chartColor|| generateBackgroundColors(dataPoints.length),
				borderWidth: 1,
		  },
		],
	  };

	  const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: props.legendPosition || "bottom" as const,
				display: showLegend, // when true, props should include dataSetLabel property
			},
			title: {
				display: true,
				text: chartLabel,
			},
			tooltip: {
				backgroundColor: "#000000",
				titleColor: "#FFFFFF",
				displayColors: !hideTooltipColorBoxAndLabel,
				callbacks: {
					label(tooltipItem: any) {
						const { tooltipTextSuffix: suffix, tooltipTextPrefix: prefix } = props;
						const tip = `${prefix || ""}${tooltipItem.raw}${suffix || ""}`;
						return hideTooltipColorBoxAndLabel ? "" : tip;
					},
				},
			},
		},
	  };

	return (
		<Bar data={chartData} options={chartOptions} />
	);
};

export default BarChart;