import React from "react";
import { Profile } from "../../../models";
import { Link } from "react-router-dom";
import "./profileInput.less";

interface ProfileInputProps {
	isCreate?: boolean;
	buttonText?: string;
	profile: Profile;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onButtonClick?: (e: React.FormEvent) => void;
}

const ProfileInput: React.FC<ProfileInputProps> = (props) => {
	const { isCreate, profile, buttonText, onChange, onButtonClick } = props;
	const loginButtonDisabled = !profile.UserName || !profile.ProfileKey;
	const createButtonDisabled = !profile.UserName || (profile.ProfileKey.length < 8) || !profile.Name;

	const item = isCreate ? { Text: "Home", Location: "/", Watermark: "Minimum 8 characters", Type: "text" } :
		{ Text: "New Account", Location: "/newaccount", Watermark: undefined, Type: "password" };

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
						type={item.Type}
						id="ProfileKey"
						name="ProfileKey"
						value={profile.ProfileKey}
						onChange={onChange}
						placeholder={item.Watermark}
						minLength={8}
						required
					/>
				</div>
				<div className="form-group">
					<Link className="link-button" to={item.Location}>{item.Text}</Link>
					<button
						className={"button-primary"}
						disabled={isCreate ? createButtonDisabled : loginButtonDisabled}
						onClick={onButtonClick}>
						{buttonText ? buttonText : "Login"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default ProfileInput;