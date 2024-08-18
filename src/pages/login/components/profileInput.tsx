import React from "react";
import { Profile } from "../../../models";
import { Link } from "react-router-dom";
import "./profileInput.less";

interface ProfileInputProps {
	isCreate?: boolean;
	buttonText?: string;
	profile: Profile;
	onChange: (profile: Profile) => void;
	onButtonClick?: (e: React.FormEvent) => void;
}

const ProfileInput: React.FC<ProfileInputProps> = (props) => {
	const { isCreate, profile, buttonText, onChange, onButtonClick } = props;
	const loginButtonDisabled = !profile.UserName || !profile.ProfileKey;
	const createButtonDisabled = !profile.UserName || (profile.ProfileKey.length < 4) || !profile.Name;

	const item = isCreate ? { Text: "Home", Location: "/", Watermark: "Minimum 4 characters", Type: "text" } :
		{ Text: "New Account", Location: "/newaccount", Watermark: undefined, Type: "password" };

	function handleChange(property: keyof typeof profile) {
		return (e: React.ChangeEvent<HTMLInputElement>) =>
			onChange({ ...profile, [property]: e.target.value });
	}

	function clearInputs() {
		onChange({ UserName: "", ProfileKey: "", Name: "" });
	}

	return (
		<div className="profile-form-container">
			<form>
				{isCreate &&
                <div className="form-group">
                	<label htmlFor="NameInput">Name</label>
                	<input
                		type="text"
                		id="NameInput"
                		name="NameInput"
                		value={profile.Name}
                		onChange={handleChange("Name")}
                		autoComplete="off"
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
						onChange={handleChange("UserName")}
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
						onChange={handleChange("ProfileKey")}
						placeholder={item.Watermark}
						minLength={4}
						autoComplete="off"
						required
					/>
				</div>
				<div className="form-group">
					<Link className="link-button" onClick={clearInputs} to={item.Location}>{item.Text}</Link>
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