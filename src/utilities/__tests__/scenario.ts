import {
	getDefaultAsset,
	getNewPriceLevel,
	calculateRemainingAsset,
	projectedRevenue,
	filterPriceLevelsWithoutRevenue,
	getTableData,
	invalidTableData,
} from "../scenario"; // Adjust the path as necessary

import { Asset, PriceLevel, ScenarioDisplayData } from "../../models" // Adjust the import path

// Mock Data
const mockAssets: Asset[] = [
	{ Id: 1, AssetName: "Asset 1", Method: "Units", Quantity: 100, PriceLevels: [], SortOrder: 1 },
	{ Id: 2, AssetName: "Asset 2", Method: "Percentage", Quantity: 200, PriceLevels: [], SortOrder: 2 },
];

const mockAsset: Asset = {
	Id: 1,
	AssetName: "Test Asset",
	Method: "Units",
	Quantity: 100,
	PriceLevels: [
		{ Id: 1, Price: 10, Quantity: 5 },
		{ Id: 2, Price: 15, Quantity: 10 },
	],
	SortOrder: 1,
};

describe("getDefaultAsset", () => {
	it("returns a new default asset with an incremented Id", () => {
		const newAsset = getDefaultAsset(mockAssets);
		expect(newAsset.Id).toBe(3);
		expect(newAsset.AssetName).toBe("");
		expect(newAsset.Method).toBe("Units");
		expect(newAsset.Quantity).toBe(0);
		expect(newAsset.PriceLevels).toEqual([]);
	});

	it("returns an asset with Id 1 if asset list is empty", () => {
		const newAsset = getDefaultAsset([]);
		expect(newAsset.Id).toBe(1);
	});
});

describe("getNewPriceLevel", () => {
	it("returns a new transient price level with an incremented Id", () => {
		const newPriceLevel = getNewPriceLevel(mockAsset);
		expect(newPriceLevel.Id).toBe(3);
		expect(newPriceLevel.Price).toBe("");
		expect(newPriceLevel.Quantity).toBe("");
	});

	it("returns a price level with Id 1 if no existing levels", () => {
		const newPriceLevel = getNewPriceLevel({ ...mockAsset, PriceLevels: [] });
		expect(newPriceLevel.Id).toBe(1);
	});
});

describe("calculateRemainingAsset", () => {
	it("calculates remaining assets correctly using Units method", () => {
		const remaining = calculateRemainingAsset(mockAsset);
		expect(remaining).toBe(85); // 100 - (5 + 10)
	});

	it("calculates remaining assets correctly using Percentage method", () => {
		const percentageAsset: Asset = {
			...mockAsset,
			Method: "Percentage",
			PriceLevels: [
				{ Id: 1, Price: 10, Quantity: 0.1 },
				{ Id: 2, Price: 15, Quantity: 0.2 },
			],
		};
		const remaining = calculateRemainingAsset(percentageAsset);
		expect(remaining).toBeCloseTo(72, 0); // 100 - (10% of 100 + 20% of 90)
	});
});

describe("projectedRevenue", () => {
	it("calculates projected revenue using Units method", () => {
		const revenue = projectedRevenue(mockAsset);
		expect(revenue).toBe(200); // (10*5) + (15*10)
	});

	it("calculates projected revenue using Percentage method", () => {
		const percentageAsset: Asset = {
			...mockAsset,
			Method: "Percentage",
			PriceLevels: [
				{ Id: 1, Price: 10, Quantity: 0.1 },
				{ Id: 2, Price: 15, Quantity: 0.2 },
			],
		};
		const revenue = projectedRevenue(percentageAsset);
		expect(revenue).toBeCloseTo(370, 0); // (10% of 100)*10 + (20% of 90)*15
	});
});

describe("filterPriceLevelsWithoutRevenue", () => {
	it("filters out price levels with zero revenue", () => {
		const priceLevels: PriceLevel[] = [
			{ Id: 1, Price: 10, Quantity: 0.0 },
			{ Id: 2, Price: 15, Quantity: 0.2 },
			{ Id: 3, Price: 20, Quantity: 0.0 },
		];
		const filtered = filterPriceLevelsWithoutRevenue(100, priceLevels);
		expect(filtered.length).toBe(1);
		expect(filtered[0].Id).toBe(2);
	});
});

describe("getTableData", () => {
	it("returns correctly structured ScenarioDisplayData", () => {
		const tableData = getTableData(mockAsset);
		expect(tableData.length).toBe(2);
		expect(tableData[0]).toMatchObject({
			Id: 1,
			Price: 10,
			PercentSold: expect.any(Number),
			AmountSold: 5,
			CumulativeSold: 5,
			RemainingAsset: 95,
			Revenue: 50,
			CumulativeRevenue: 50,
			HasError: false,
		});
	});

	it("flags errors in data with negative remaining assets or zero revenue", () => {
		const problematicAsset: Asset = {
			...mockAsset,
			PriceLevels: [
				{ Id: 1, Price: 0, Quantity: 10 },
				{ Id: 2, Price: 0, Quantity: 95 },
			],
		};
		const tableData = getTableData(problematicAsset);
		expect(tableData.some(data => data.HasError)).toBe(true);
	});
});

describe("invalidTableData", () => {
	it("returns true if any table data has errors", () => {
		const problematicAsset: Asset = {
			...mockAsset,
			PriceLevels: [
				{ Id: 1, Price: 0, Quantity: 10 },
				{ Id: 2, Price: 0, Quantity: 95 },
			],
		};
		const isInvalid = invalidTableData(problematicAsset);
		expect(isInvalid).toBe(true);
	});

	it("returns false if all table data are valid", () => {
		const isInvalid = invalidTableData(mockAsset);
		expect(isInvalid).toBe(false);
	});
});