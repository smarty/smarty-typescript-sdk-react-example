interface Analysis {
    active: string;
    cmra: string;
    dpvFootnotes: string;
    dpvMatchCode?: string | undefined;
    enhancedMatch?: string | undefined;
    footnotes?: string | undefined;
    isEwsMatch?: boolean | undefined;
    isSuiteLinkMatch?: boolean | undefined;
    lacsLinkCode?: string | undefined;
    lacsLinkIndicator?: string | undefined;
    noStat: string;
    vacant: string;
}

interface AddressComponents {
    cityName: string;
    defaultCityName: string;
    deliveryPoint: string;
    deliveryPointCheckDigit: string;
    extraSecondaryDesignator?: string | undefined;
    extraSecondaryNumber?: string | undefined;
    plus4Code: string;
    pmbDesignator?: string | undefined;
    pmbNumber?: string | undefined;
    primaryNumber: string;
    secondaryDesignator?: string | undefined;
    secondaryNumber?: string | undefined;
    state: string;
    streetName: string;
    streetPostdirection?: string | undefined;
    streetPredirection?: string | undefined;
    streetSuffix?: string | undefined;
    urbanization?: string | undefined;
    zipCode: string;
}

interface Metadata {
    buildingDefaultIndicator?: boolean | undefined;
    carrierRoute: string;
    congressionalDistrict: string;
    coordinateLicense: string;
    countyFips: string;
    countyName: string;
    elotSequence: string;
    elotSort: string;
    isEwsMatch?: boolean | undefined;
    latitude: number;
    longitude: number;
    obeysDst: boolean;
    precision: string;
    rdi?: string | undefined;
    recordType: string;
    timeZone: string;
    utcOffset: number;
    zipType: string;
}

export interface AddressResponse {
    addressee?: string | undefined;
    analysis: Analysis;
    candidateIndex: number;
    components: AddressComponents;
    deliveryLine1: string;
    deliveryLine2?: string | undefined;
    deliveryPointBarcode: string;
    inputIndex: number;
    lastLine: string;
    metadata: Metadata;
    smartyKey?: string | undefined;
}