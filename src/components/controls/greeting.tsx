import * as React from "react";

interface GreetingProps {
	name: string;
}

const Greeting = ({name}: GreetingProps) => {
	return (
		<h2>Welcome back {name}</h2>
	);
};

export default Greeting;