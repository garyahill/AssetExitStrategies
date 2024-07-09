import * as React from "react";
import "./content.less";

interface ContentProps {
	children?: React.ReactNode;
}

const Content = (props: ContentProps) => {
	return (
		<main className={"content"}>{props.children}</main>
	);
};

export default Content;

