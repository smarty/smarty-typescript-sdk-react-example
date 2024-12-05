import React from "react";
import "./InputForm.scss";
import inputFields from "../data/input_fields";
import {countries} from "../data/countries";
import {Country} from "../interfaces/usAutocomplete";
import {AutoCompleteForm} from "../interfaces/usAutocomplete";

interface Props {
	queryAutocompleteForSuggestions: (query: string)=> void;
	formValues: AutoCompleteForm;
	setFormValues: React.Dispatch<React.SetStateAction<AutoCompleteForm>>;
	shouldValidate: boolean;
	setShouldValidate: (shouldValidate: boolean) => void;
	validateCallback: (address: AutoCompleteForm) => void;
}

const InputForm: React.FC<Props> = ({
		queryAutocompleteForSuggestions,
		formValues,
		setFormValues,
		shouldValidate,
		setShouldValidate,
		validateCallback
}) => {
	const updateField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const key = e.target.id;
		const value = e.target.value;
		setFormValues(prevState => ({...prevState, [key]: value}));
	};

	return (
		<form className="autocomplete--input-form">
			<div className="autocomplete--input-group">
				<label
					htmlFor="shouldValidate"
					className="autocomplete--input-label"
				>
					Validate on Selection
				</label>
				<input
					className="autocomplete--input-field"
					id="shouldValidate"
					type="checkbox"
					checked={shouldValidate}
					onChange={() => setShouldValidate(!shouldValidate)}
				/>
			</div>
			{inputFields.map((inputField: {fieldName: string, fieldLabel: string}) => {
				const name: string = inputField.fieldName;
				const label: string = inputField.fieldLabel;

				return (
					<div className="autocomplete--input-group" key={name}>
						<label
							className="autocomplete--input-label"
							htmlFor={name}
						>
							{label}
						</label>

						<input
							className="autocomplete--input-field"
							type="text"
							id={name}
							value={formValues[name as keyof AutoCompleteForm]}
							onChange={e => {
								updateField(e);

								if (name === "address1") {
									queryAutocompleteForSuggestions(e.target.value);
								}
							}}
						/>
					</div>
				);
			})}
			<div className="autocomplete--input-group">
				<label
					className="autocomplete--input-label"
					htmlFor="country"
				>
					Country
				</label>
				<select
					// Example is currently available for US only. For Intl logic see Javascript Sdk example.
					disabled={true}
					value={formValues.country}
					onChange={updateField}
					id="country"
					className="autocomplete--input-field"
				>
					{countries.map((country: Country)  => (
						<option value={country.iso2} key={country.iso2}>{country.name}</option>
					))}
				</select>
			</div>
			<button onClick={e => {
				e.preventDefault();
				validateCallback(formValues);
			}}>Validate</button>
		</form>
	);
};

export default InputForm;