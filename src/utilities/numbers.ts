const FormatAsDollars = (num: number): string => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(num);
};

const RoundToPlaces = (num: number, places = 4): string => {
	const roundedNum = num.toFixed(places);
	return parseFloat(roundedNum).toString();
};

const FormatAsPercentage = (num: number, maxDecimalPlaces = 4): string => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "percent",
		minimumFractionDigits: 0,
		maximumFractionDigits: maxDecimalPlaces,
	});

	const decimalValue = (num * 100).toFixed(maxDecimalPlaces);
	if (parseFloat(decimalValue) % 1 !== 0) {
		return formatter.format(num);
	} else {
		return formatter.format(Math.floor(num * 100) / 100);
	}
};

const IsNumber = (value: any) => {
	return !isNaN(parseFloat(value)) && isFinite(value);
}

export { FormatAsDollars, RoundToPlaces, FormatAsPercentage, IsNumber };
