export interface Asset {
	Id: number;
	AssetName: string;
	Method: "Units" | "Percentage";
	Quantity: number;
	PriceLevels: PriceLevel[];
}

export interface PriceLevel {
	Id: number;
	Price: number;
	Quantity: number;
}


