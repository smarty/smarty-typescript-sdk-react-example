export interface AutoCompleteForm {
	address1: string;
	address2: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
}

export interface UsAutocompleteSuggestion {
	city: string;
	entries: number;
	secondary: string;
	state: string;
	streetLine: string;
	zipcode: string;
}

export interface Result extends UsAutocompleteSuggestion {
  results: Result[];
}

export interface Country {
	name: string;
	iso2: string;
}


