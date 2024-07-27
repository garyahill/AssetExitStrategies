import { Asset } from "./assets";

export interface AppState {
	editingScenario: boolean;
	assetBeingEdited: Asset | undefined;
	assetBeingDisplayed: Asset | undefined;
}