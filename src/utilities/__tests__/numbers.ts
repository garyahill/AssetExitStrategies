import { FormatAsDollars, RoundToPlaces, FormatAsPercentage, IsNumber } from "../numbers"; // Adjust path as necessary

describe("FormatAsDollars", () => {
	it("formats a positive number as USD", () => {
		expect(FormatAsDollars(1234.56)).toBe("$1,234.56");
	});

	it("formats a negative number as USD", () => {
		expect(FormatAsDollars(-1234.56)).toBe("-$1,234.56");
	});

	it("formats zero as USD", () => {
		expect(FormatAsDollars(0)).toBe("$0.00");
	});

	it("handles large numbers with commas", () => {
		expect(FormatAsDollars(123456789)).toBe("$123,456,789.00");
	});
});

describe("RoundToPlaces", () => {
	it("rounds a number to the default 4 decimal places", () => {
		expect(RoundToPlaces(3.1415926535)).toBe("3.1416");
	});

	it("rounds a number to 2 decimal places", () => {
		expect(RoundToPlaces(3.1415926535, 2)).toBe("3.14");
	});

	it("rounds a number to 0 decimal places", () => {
		expect(RoundToPlaces(3.9, 0)).toBe("4");
	});

	it("handles rounding of a negative number", () => {
		expect(RoundToPlaces(-2.71828, 3)).toBe("-2.718");
	});
});

describe("FormatAsPercentage", () => {
	it("formats a decimal as a percentage with default 4 decimal places", () => {
		expect(FormatAsPercentage(0.123456)).toBe("12.3456%");
	});

	it("formats a decimal as a percentage with 2 decimal places", () => {
		expect(FormatAsPercentage(0.123456, 2)).toBe("12.35%");
	});

	it("formats a whole number as a percentage", () => {
		expect(FormatAsPercentage(1)).toBe("100%");
	});

	it("formats zero as a percentage", () => {
		expect(FormatAsPercentage(0)).toBe("0%");
	});

	it("handles negative percentages", () => {
		expect(FormatAsPercentage(-0.25)).toBe("-25%");
	});
});

describe("IsNumber", () => {
	it("returns true for a valid number", () => {
		expect(IsNumber(123)).toBe(true);
	});

	it("returns true for a valid string number", () => {
		expect(IsNumber("456")).toBe(true);
	});

	it("returns false for an invalid string", () => {
		expect(IsNumber("abc")).toBe(false);
	});

	it("returns false for an object", () => {
		expect(IsNumber({})).toBe(false);
	});

	it("returns false for an array", () => {
		expect(IsNumber([])).toBe(false);
	});

	it("returns false for undefined", () => {
		expect(IsNumber(undefined)).toBe(false);
	});

	it("returns false for NaN", () => {
		expect(IsNumber(NaN)).toBe(false);
	});
});
