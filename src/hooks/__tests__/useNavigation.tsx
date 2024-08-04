// import React from "react";
// import { render } from "@testing-library/react";
// import { useNavigate } from "react-router-dom";
// import useNavigation  from "../useNavigation";

// // Mock the useNavigate function from react-router-dom
// jest.mock("react-router-dom", () => ({
// 	...jest.requireActual("react-router-dom"),
// 	useNavigate: jest.fn(), // Mock useNavigate
// }));

// type TestComponentProps = {
// 	callback: () => void;
// };

// const TestComponent: React.FC<TestComponentProps> = ({ callback }) => {
// 	// Log when the component is rendered for debugging purposes
// 	// console.log("TestComponent rendered");
// 	callback(); // Execute the callback
// 	return null; // This component doesn't render any UI
// };

// describe("useNavigation", () => {
// 	let navigateMock: jest.Mock;

// 	beforeEach(() => {
// 		jest.clearAllMocks(); // Clear any existing mocks
// 		navigateMock = jest.fn();
// 		(useNavigate as jest.Mock).mockImplementation(() => navigateMock);
// 	});

// 	it("should navigate to home", () => {
// 		render(<TestComponent callback={() => useNavigation().navigateToHome()} />);
// 		// console.log("Navigate Mock Calls:", navigateMock.mock.calls); // Debug the calls
// 		expect(navigateMock).toHaveBeenCalledWith("/");
// 	});

// 	it("should navigate to new account", () => {
// 		render(<TestComponent callback={() => useNavigation().navigateToNewAccount()} />);
// 		expect(navigateMock).toHaveBeenCalledWith("/newaccount");
// 	});

// 	it("should navigate to login", () => {
// 		render(<TestComponent callback={() => useNavigation().navigateToLogin()} />);
// 		expect(navigateMock).toHaveBeenCalledWith("/login");
// 	});

// 	it("should navigate to main", () => {
// 		render(<TestComponent callback={() => useNavigation().navigateToMain()} />);
// 		expect(navigateMock).toHaveBeenCalledWith("/main");
// 	});

// 	it("should navigate to scenario", () => {
// 		render(<TestComponent callback={() => useNavigation().navigateToScenario()} />);
// 		expect(navigateMock).toHaveBeenCalledWith("/scenario");
// 	});

// 	it("should navigate to display", () => {
// 		render(<TestComponent callback={() => useNavigation().navigateToDisplay()} />);
// 		expect(navigateMock).toHaveBeenCalledWith("/display");
// 	});
// });