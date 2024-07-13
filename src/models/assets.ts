export interface Asset {
	AssetName: string;
	Method: "Units" | "Percentage";
	Quantity: number;
	PriceLevels: ReadonlyArray<PriceLevel>;
}

export interface PriceLevel {
	Price: number;
	Amount: number;
}


