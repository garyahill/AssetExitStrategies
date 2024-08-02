export type MethodType = "Units" | "Percentage";

export interface Asset {
	Id: number;
	AssetName: string;
	Method: MethodType;
	Quantity: number;
	PriceLevels: PriceLevel[];
	SortOrder: number;
}

export interface PriceLevel {
	Id: number;
	Price: number;
	Quantity: number;
}

export interface TransientPriceLevel {
	Id: number;
	Price: number | string;
	Quantity: number | string;
}


