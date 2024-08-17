import React, { useState, useEffect } from "react";

interface NumberInputProps {
	id: string;
	name: string;
	value: string | number;
	min?: number;
	max?: number;
	required?: boolean;
	disabled?: boolean;
	enforceMinMax?: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({ min = 0, max, value, disabled = false, ...props }) => {
	const [internalValue, setInternalValue] = useState(value === 0 ? "" : value);

	useEffect(() => {
		setInternalValue(value);
	}, [value]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;

		// Allow the value to be '.' so that the user can enter a decimal without a leading zero
		if (newValue === "." || (!isNaN(Number(newValue)) && Number(newValue) >= min)) {
			setInternalValue(newValue);
			props.onChange(e);
		}
	};

	const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(e.target.value);
		if (value >= min && (max !== undefined ? value <= max : true)) {
			setInternalValue(value);
			handleChange(e);
		}
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value;

		if (e.key === "." || e.key === "Decimal") {
			if (value === "") {
				// Prevent the default behavior of entering the period directly
				e.preventDefault();
				// Set the value to "0." when the user enters a decimal without a leading zero
				const newValue = "0.";
				setInternalValue(newValue);
				props.onChange({
					...e,
					target: {
						...e.target,
						value: newValue,
					} as EventTarget & HTMLInputElement,
				});
			}
		}
	};

	return (
		<input
			id={props.id}
			name={props.name}
			type="text" // Set to "text" to allow flexibility in handling '.' as first character
			value={internalValue}
			min={min}
			disabled={disabled}
			onInput={props.enforceMinMax ? onInput : handleChange}
			placeholder={props.placeholder}
			onKeyDown={onKeyDown}
			autoComplete="off"
		/>
	);
};

export default NumberInput;
