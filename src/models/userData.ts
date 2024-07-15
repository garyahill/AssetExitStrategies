import { Profile } from './profile';
import { Asset } from './assets';

export type UserData = {
	Profile: Profile;
	Assets: Asset[]; // TODO: should this be readonly?
};

