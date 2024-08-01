import React, { useState, useEffect}  from "react";

interface NumberInputProps {
	id: string;
	name: string;
	value: string | number;
	min?: number;
	max?: number
	required?: boolean;
	disabled?: boolean;
	enforceMinMax?: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({min = 0, max, value, disabled = false, ...props }) => {
	const [internalValue, setInternalValue] = useState(value === 0 ? "" : value);

	useEffect(() => {
		setInternalValue(value);
	}, [value]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;

		if (!isNaN(Number(newValue)) && Number(newValue) >= min) {
			props.onChange(e);
		}
	};

	const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(e.target.value);
		if (value >= min && max !== undefined ? value <= max : true) {
			setInternalValue(value);
			handleChange(e);
		}
	}

	return (
		<input
			id={props.id}
			name={props.name}
			type="number"
			value={internalValue}
			min={min}
			disabled={disabled}
			onInput={props.enforceMinMax ? onInput : handleChange}
			placeholder={props.placeholder}
		/>
	);
};

export default NumberInput;