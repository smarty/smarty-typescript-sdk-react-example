import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Suggestion.scss";
import { UsAutocompleteSuggestion} from "../interfaces/usAutocomplete";

interface Props {
	suggestion: UsAutocompleteSuggestion;
	selectSuggestion: (suggestion: UsAutocompleteSuggestion) => void;
}

const Suggestion: React.FC<Props> = ({ suggestion, selectSuggestion }) => {
	const [isHovered, setIsHovered] = useState(false);

	const formatAutocompleteSuggestion = (suggestion: UsAutocompleteSuggestion) => {
			const street = suggestion.streetLine ? `${suggestion.streetLine} ` : "";
			const secondary = suggestion?.secondary ? `${suggestion.secondary} ` : "";
			const entries = suggestion?.entries > 1 ? `(${suggestion.entries} more entries) ` : "";
			const city = suggestion?.city ? `${suggestion.city} ` : "";
			const state = suggestion?.state ? `${suggestion.state}, ` : "";
			const zip = suggestion?.zipcode ? `${suggestion.zipcode}` : "";

			return street + secondary + entries + city + state + zip;
	};

	const buildResultHoverClass = () => {
		const className = "autocomplete--suggestion";
		return isHovered ? className + " autocomplete--suggestion-hover" : className;
	};

	return (
		<div
			className={buildResultHoverClass()}
			onClick={()=>selectSuggestion(suggestion)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{formatAutocompleteSuggestion(suggestion)}
		</div>
	);
};

Suggestion.propTypes = {
	suggestion: PropTypes.any,
	selectSuggestion: PropTypes.func.isRequired,
};

export default Suggestion;