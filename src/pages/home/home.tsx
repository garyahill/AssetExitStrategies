import React from 'react';
import NoAssets from './components/noAssets';
import './home.less';

interface HomeProps {
	children?: React.ReactNode;
}

const Home = (props: HomeProps) => {
	return (
		<NoAssets />
	);
};

export default Home;