import React from "react";
import { Profile } from "../../../models";
import "./profileInput.less";

interface ProfileInputProps {
	isCreate?: boolean;
	buttonText?: string;
	profile: Profile;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onButtonClick?: () => void;
}

const ProfileInput: React.FC<ProfileInputProps> = (props) => {
	const { isCreate, profile, buttonText, onChange } = props;
	const loginButtonDisabled = !profile.UserName || !profile.ProfileKey;
	const createButtonDisabled = !profile.UserName || !profile.ProfileKey || !profile.Name;

	const profileKeyWatermark = isCreate ? "Minimum 8 characters" : undefined;
	return (
		<div className="form-container">
			<form>
				{isCreate &&
                <div className="form-group">
                	<label htmlFor="FirstName">Name</label>
                	<input
                		type="text"
                		id="FirstName"
                		name="Name"
                		value={profile.Name}
                		onChange={onChange}
                		required
                	/>
                </div>
				}
				<div className="form-group">
					<label htmlFor="UserName">Username</label>
					<input
						type="text"
						id="UserName"
						name="UserName"
						value={profile.UserName}
						onChange={onChange}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="ProfileKey">Profile Key</label>
					<input
						type="text"
						id="ProfileKey"
						name="ProfileKey"
						value={profile.ProfileKey}
						onChange={onChange}
						placeholder={profileKeyWatermark}
						required
					/>
				</div>
				<div className="form-group">
					<button
						className={"button-primary"}
						disabled={isCreate ? createButtonDisabled : loginButtonDisabled}>
						{buttonText ? buttonText : "Login"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default ProfileInput;