import { getUserDataFromLocalStorage, saveUserDataToLocalStorage } from "../storage";
import log from "../logger";
import { UserData } from "../../models";

jest.mock("../logger", () => ({
	__esModule: true,
	default: {
	  error: jest.fn(),
	  setLevel: jest.fn(),
	},
}));

const key = "JohnnyB_1234";
const value: any = {
	UserName: "JohnnyB",
	ProfileKey: "1234",
};

describe("getUserDataFromLocalStorage", () => {

	afterEach(() => {
		jest.clearAllMocks();
		localStorage.clear();
	});

	it("should return the parsed object when the key exists in localStorage", () => {
		localStorage.setItem(key, JSON.stringify(value));
		const result = getUserDataFromLocalStorage(key);
		expect(result).toEqual(value);
	});

	it("should return null when the key does not exist in localStorage", () => {
		const result = getUserDataFromLocalStorage(key);
		expect(result).toBeNull();
	});

	it("should return null and log an error when JSON.parse throws an error", () => {
		localStorage.setItem(key, "invalid JSON");
		const result = getUserDataFromLocalStorage(key);
		expect(result).toBeNull();
		expect(log.error).toHaveBeenCalledWith(
			"Error retrieving object from local storage:",
			expect.any(SyntaxError)
		);
	});

	it("should return null and log an error when localStorage throws an error", () => {
		const getItemSpy = jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
			throw new Error("localStorage error");
		});

		const result = getUserDataFromLocalStorage(key);
		expect(result).toBeNull();
		expect(log.error).toHaveBeenCalledWith(
			"Error retrieving object from local storage:",
			expect.any(Error)
		);

		getItemSpy.mockRestore();
	});
});

describe("saveUserDataToLocalStorage", () => {

	afterEach(() => {
	  jest.clearAllMocks();
	  localStorage.clear();
	});

	it("should save a valid object to local storage", () => {
	  saveUserDataToLocalStorage(key, value);
	  const item = localStorage.getItem(key);
	  expect(item).toBe(JSON.stringify(value));
	});

	it("should log an error if JSON.stringify throws an error", () => {
		jest.spyOn(JSON, "stringify").mockImplementation(() => {
			throw new Error("StringifyParsingError");
	  	});

	  saveUserDataToLocalStorage(key, {} as UserData);
	  expect(log.error).toHaveBeenCalledWith(
			"Error saving object to local storage:",
			expect.any(Error)
	  );
	});

	it("should log an error if localStorage.setItem throws an error", () => {
	  jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
			throw new Error("QuotaExceededError");
	  });

	  saveUserDataToLocalStorage(key, value);
	  expect(log.error).toHaveBeenCalledWith(
			"Error saving object to local storage:",
			expect.any(Error)
	  );
	});
});