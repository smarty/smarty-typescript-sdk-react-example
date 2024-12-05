import React from "react";
import Suggestion from "./Suggestion";
import {UsAutocompleteSuggestion} from "../interfaces/usAutocomplete";

interface SuggestionsProps {
	suggestions: UsAutocompleteSuggestion[];
	selectSuggestion: (suggestion: UsAutocompleteSuggestion)=> void;
}


const Suggestions: React.FC<SuggestionsProps> = ({ suggestions, selectSuggestion }) => {

	return (
		<div className="autocomplete--suggestions">
			{suggestions.map((suggestion, index) => (
				<Suggestion
					key={index}
					suggestion={suggestion}
					selectSuggestion={selectSuggestion}
				/>
			))}
		</div>
	);
};

export default Suggestions;