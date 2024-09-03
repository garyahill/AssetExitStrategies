import { Asset } from "../models";

function GetDemoData(): ReadonlyArray<Asset> {
	return [
		{
			"id": 1,
			"AssetName": "Acme Inc",
			"Method": "Percentage",
			"Quantity": 100,
			"PriceLevels": [
				{
					"Id": 1,
					"Price": 50,
					"Quantity": 0.25,
				},
				{
					"Id": 2,
					"Price": 75,
					"Quantity": 0.50,
				},
				{
					"Id": 3,
					"Price": 90,
					"Quantity": 0.50,
				},
				{
					"Id": 4,
					"Price": 100,
					"Quantity": 0.50,
				},
				{
					"Id": 5,
					"Price": 125,
					"Quantity": 0.5,
				},
			],
			"SortOrder": 1,
		},
		{
			"id": 2,
			"AssetName": "Mega Corp",
			"Method": "Units",
			"Quantity": 250,
			"PriceLevels": [
				{
					"Id": 1,
					"Price": 400,
					"Quantity": 75,
				},
				{
					"Id": 2,
					"Price": 450,
					"Quantity": 75,
				},
				{
					"Id": 3,
					"Price": 475,
					"Quantity": 50,
				},
				{
					"Id": 4,
					"Price": 500,
					"Quantity": 25,
				},
			],
			"SortOrder": 2,
		},
		{
			"id": 3,
			"AssetName": "SaveCo",
			"Method": "Percentage",
			"Quantity": 300,
			"PriceLevels": [
				{
					"Id": 1,
					"Price": 1000,
					"Quantity": 0.5,
				},
				{
					"Id": 2,
					"Price": 1200,
					"Quantity": 0.5,
				},
				{
					"Id": 3,
					"Price": 1800,
					"Quantity": 0.5,
				},
				{
					"Id": 4,
					"Price": 2000,
					"Quantity": 1,
				},
			],
			"SortOrder": 3,
		},
		{
			"id": 4,
			"AssetName": "SmartInvest",
			"Method": "Units",
			"Quantity": 100,
			"PriceLevels": [
				{
					"Id": 2,
					"Price": 12.5,
					"Quantity": 20,
				},
				{
					"Id": 3,
					"Price": 14.25,
					"Quantity": 10,
				},
				{
					"Id": 4,
					"Price": 20,
					"Quantity": 15,
				},
				{
					"Id": 1,
					"Price": 32.5,
					"Quantity": 20,
				},
				{
					"Id": 5,
					"Price": 40,
					"Quantity": 15,
				},
				{
					"Id": 6,
					"Price": 45,
					"Quantity": 10,
				},
			],
			"SortOrder": 4,
		},
	];
}

export default GetDemoData;