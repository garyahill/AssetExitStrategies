import { Asset, PriceLevel, TransientPriceLevel, ScenarioDisplayData } from "../models";

const getDefaultAsset = (assets: Asset[]): Asset => {
	const maxVal = assets.length > 0 ? (Math.max(...assets.map(obj => obj.Id)) + 1) : 1;
	return {
		Id: maxVal,
		AssetName: "",
		Method: "Units",
		Quantity: 0,
		PriceLevels: [],
		SortOrder: maxVal,
	};
}

const getNewPriceLevel = (asset: Asset): TransientPriceLevel => {
	const levels = asset.PriceLevels;
	const maxVal = levels.length > 0 ? (Math.max(...levels.map(obj => obj.Id)) + 1) : 1;
	return { Id: maxVal, Price: "", Quantity: "" };
}

const calculateRemainingAsset = (asset: Asset) => {
	let remaining = asset.Quantity;

	const percentageFormula = () => {
		return asset.PriceLevels.reduce((acc, level) => {
			const amountSold = remaining * level.Quantity;
			remaining -= amountSold;
			return acc + amountSold;
		}, 0);
	};

	const unitsFormula = () => {
		return asset.PriceLevels.reduce((acc, level) => {
			return acc + level.Quantity;
		}, 0);
	};

	const allocated = asset.Method === "Percentage" ?
		percentageFormula() : unitsFormula();

	return asset.Quantity - allocated;
};

const projectedRevenue =  (asset: Asset) => {
	let remaining = asset.Quantity;

	const percentageFormula = () => {
		return asset.PriceLevels.reduce((acc, level) => {
			const amountSold = remaining * level.Quantity;
			const revenue = level.Price * amountSold;
			remaining -= amountSold;
			return acc + revenue;
		}, 0);
	};

	const unitsFormula = () => {
		return asset.PriceLevels.reduce((acc, level) => {
			const revenue = level.Price * level.Quantity;
			return acc + revenue;
		}, 0);
	};

	return asset.Method === "Percentage" ? percentageFormula() : unitsFormula();
};

const filterPriceLevelsWithoutRevenue = (quantity: number, priceLevels: PriceLevel[]) => {
	const sortedLevels = priceLevels.sort((a, b) => a.Price - b.Price);

	let amountSold = 0;
	let revenue = 0;
	let remainingAsset = quantity;

	return sortedLevels.filter(level => {
		amountSold = remainingAsset * level.Quantity;
		revenue = level.Price * amountSold;
		remainingAsset -= amountSold;
		return revenue > 0;
	});
};

const getTableData = (asset: Asset): ScenarioDisplayData[] => {
	const sortedLevels = asset.PriceLevels.sort((a, b) => a.Price - b.Price);
	let [amountSold, revenue, cumulativeSold, cumulativeRevenue, percentSold] = [0, 0, 0, 0, 0];
	let remainingAsset = asset.Quantity;

	const displayData = sortedLevels.map((level)  => {
		if (asset.Method === "Percentage") {
			percentSold = level.Quantity;
			amountSold = remainingAsset * percentSold;
		} else {
			amountSold = level.Quantity;
			percentSold = amountSold / remainingAsset;
		}
		revenue = level.Price * amountSold;
		cumulativeSold += amountSold;
		remainingAsset -= amountSold;
		cumulativeRevenue += revenue;

		return {
			Id: level.Id,
			Price: level.Price,
			PercentSold: percentSold,
			AmountSold: amountSold,
			CumulativeSold: cumulativeSold,
			RemainingAsset: remainingAsset,
			Revenue: revenue,
			CumulativeRevenue: cumulativeRevenue,
			HasError: remainingAsset < 0 || revenue <= 0 || isNaN(percentSold),
		} as ScenarioDisplayData;
	});

	return displayData;
}

const invalidTableData = (asset: Asset): boolean => {
	const data = getTableData(asset);
	return data.some(row => row.HasError);
}

export {
	getDefaultAsset,
	getNewPriceLevel,
	calculateRemainingAsset,
	projectedRevenue,
	filterPriceLevelsWithoutRevenue,
	getTableData,
	invalidTableData,
};