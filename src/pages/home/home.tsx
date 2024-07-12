import React from 'react';
import NoAssets from './components/noAssets';
import Greeting from './components/greeting';
import { getObjectFromLocalStorage } from '../../utilities/storage';
import { UserData } from '../../models';
import './home.less';

// TODO: What props does this component take in if any?
interface HomeProps {
	children?: React.ReactNode;
}

const Home = (props: HomeProps) => {

	// TODO: How should the key name be defined?
	const data = retrieveData("garyahill_1234");
	// TODO: Retrieve correct data type
	const display = data ? <Greeting name={data.Profile.Name} /> : <NoAssets />;
	return display;
};

// TODO: Retrieve correct data type
function retrieveData(key: string): UserData | null{
	return getObjectFromLocalStorage(key);
}

export default Home;