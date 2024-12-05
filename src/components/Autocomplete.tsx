import React, {useState} from "react";
import * as SmartySDK from "smartystreets-javascript-sdk";
import InputForm from "./InputForm";
import Suggestions from "./Suggestions";
import {
	AutoCompleteForm,
	UsAutocompleteSuggestion,
} from "../interfaces/usAutocomplete";
import {usAutocompletePro} from "smartystreets-javascript-sdk";
import {AddressResponse} from "../interfaces/usVerificationResponse";


const Autocomplete = () => {
	const [formValues, setFormValues] = useState({
		address1: "",
		address2: "",
		city: "",
		state: "",
		zipCode: "",
		country: "US",
	});
	const [suggestions, setSuggestions] = useState<UsAutocompleteSuggestion[]>([]);
	const [shouldValidate, setShouldValidate] = useState<boolean>(true);
	const [error, setError] = useState<string>("");

	const SmartyCore = SmartySDK.core;
	const websiteKey = ""; // Your website key here
	const smartySharedCredentials = new SmartyCore.SharedCredentials(websiteKey);

	const usStreetClient = new SmartyCore.ClientBuilder(smartySharedCredentials).buildUsStreetApiClient();
	const autoCompleteClient = new SmartyCore.ClientBuilder(smartySharedCredentials).withLicenses(["us-autocomplete-pro-cloud"]).buildUsAutocompleteProClient();


	const formatUsAutocompleteSuggestion = (suggestion: UsAutocompleteSuggestion) => {
		const street = suggestion.streetLine ? `${suggestion.streetLine} ` : "";
		const secondary = suggestion?.secondary ? `${suggestion.secondary} ` : "";
		const entries = suggestion?.entries !== 0 ? `(${suggestion.entries}) ` : "";
		const city = suggestion?.city ? `${suggestion.city} ` : "";
		const state = suggestion?.state ? `${suggestion.state}, ` : "";
		const zip = suggestion?.zipcode ? `${suggestion.zipcode}` : "";

		return street + secondary + entries + city + state + zip;
	}

	const createUSLookup = (query: string, hasSecondaries: boolean): usAutocompletePro.Lookup => {
		const lookup = new SmartySDK.usAutocompletePro.Lookup(query);
		if (hasSecondaries) {
			lookup.selected = query;
		}
		return lookup;
	};

	const queryAutocompleteForSuggestions = async (query: string, hasSecondaries = false) => {
		const lookup = createUSLookup(query, hasSecondaries)

		try {
			const {result}: usAutocompletePro.Lookup = await autoCompleteClient.send(lookup)
			setSuggestions(result);
		} catch (error) {
			console.warn(error);
		}
	};

	// Address
	const convertUsAutocompleteSuggestionToFormValues = (address: UsAutocompleteSuggestion) => {
			return {
				...formValues,
				address1: address.streetLine || "",
				address2: address.secondary || "",
				city: address.city || "",
				state: address.state || "",
				zipCode: address.zipcode || "",
			};
	};

	const validateAddress = async (addressToValidate: AutoCompleteForm ) => {

		setError("");
		// if (addressToValidate.country === "US") {
		const lookup = new SmartySDK.usStreet.Lookup();
		lookup.street = addressToValidate.address1;
		lookup.street2 = addressToValidate.address2;
		lookup.city = addressToValidate.city;
		lookup.state = addressToValidate.state;
		lookup.zipCode = addressToValidate.zipCode;

		if (!!lookup.street) {
			try {
				const response = await usStreetClient.send(lookup);
				const candidate: AddressResponse = response.lookups[0].result[0];

				if (!candidate) {
					setError("Invalid address");
				}

				updateStateFromValidatedUsAddress(candidate, true);
			} catch (e: any) {
				setError(e.error);
			}
		} else {
			setError("A street address is required.");
		}
	};

	const updateStateFromValidatedUsAddress = (candidate: AddressResponse, isAutocomplete = false) => {

		const newFormValues: AutoCompleteForm = {
			address1: candidate.deliveryLine1,
			address2: candidate.deliveryLine2 || "",
			city: candidate.components.cityName,
			state: candidate.components.state,
			zipCode: `${candidate.components.zipCode}-${candidate.components.plus4Code}`,
			country: "US"
		};

		setFormValues(newFormValues);
	};

	const selectSuggestion = async (suggestion: UsAutocompleteSuggestion) => {
		if (suggestion.entries > 1) {
				await queryAutocompleteForSuggestions(formatUsAutocompleteSuggestion(suggestion), true);
		} else {
			const newFormValues = convertUsAutocompleteSuggestionToFormValues(suggestion);

			setFormValues(newFormValues);
			if (shouldValidate) {
				await validateAddress(newFormValues);
			}
		}
	};


	return (
		<div>
			<div>
				<InputForm
					queryAutocompleteForSuggestions={queryAutocompleteForSuggestions}
					formValues={formValues}
					setFormValues={setFormValues}
					shouldValidate={shouldValidate}
					setShouldValidate={setShouldValidate}
					validateCallback={validateAddress}
				/>
				<Suggestions
					suggestions={suggestions}
					selectSuggestion={selectSuggestion}
				/>
			</div>
			{error &&
				<div>
					<h3>Validation Error:</h3>
					{error}
				</div>
			}
		</div>
	);
};

export default Autocomplete;