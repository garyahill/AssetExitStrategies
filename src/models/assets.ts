export type MethodType = "Units" | "Percentage";

export interface Asset {
	// `id` property must be lowercase for SortableJS; Do not change
	id: number;
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


