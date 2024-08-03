import React from "react"; // Ensure React is imported
import { render } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import useNavigation from "../useNavigation";

// Mock the useNavigate function from react-router-dom
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"), // Preserve other exports
	useNavigate: jest.fn(), // Mock useNavigate
}));

type TestComponentProps = {
	callback: () => void;
};

const TestComponent: React.FC<TestComponentProps> = ({ callback }) => {
	callback(); // Execute the callback
	return null;
};

describe("useNavigation", () => {
	let navigateMock: jest.Mock;

	beforeEach(() => {
		jest.clearAllMocks();
		navigateMock = jest.fn();
		(useNavigate as jest.Mock).mockImplementation(() => navigateMock);
	});

	it("should navigate to home", () => {
		render(<TestComponent callback={() => useNavigation().navigateToHome()} />);
		expect(navigateMock).toHaveBeenCalledWith("/");
	});

	it("should navigate to new account", () => {
		render(<TestComponent callback={() => useNavigation().navigateToNewAccount()} />);
		expect(navigateMock).toHaveBeenCalledWith("/newaccount");
	});

	it("should navigate to login", () => {
		render(<TestComponent callback={() => useNavigation().navigateToLogin()} />);
		expect(navigateMock).toHaveBeenCalledWith("/login");
	});

	it("should navigate to main", () => {
		render(<TestComponent callback={() => useNavigation().navigateToMain()} />);
		expect(navigateMock).toHaveBeenCalledWith("/main");
	});

	it("should navigate to scenario", () => {
		render(<TestComponent callback={() => useNavigation().navigateToScenario()} />);
		expect(navigateMock).toHaveBeenCalledWith("/scenario");
	});

	it("should navigate to display", () => {
		render(<TestComponent callback={() => useNavigation().navigateToDisplay()} />);
		expect(navigateMock).toHaveBeenCalledWith("/display");
	});
});