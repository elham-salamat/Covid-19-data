
export interface GeographicalCovidData {
    'State': number;
    'City'?: string;
    'Total Covid Cases': number;
    'Total Covid Deaths': number;
    'Total Active Covid Cases': number;
    'Total Recovered Covid Cases': number;
    'New Covid Cases': number;
    'New Covid Deaths': number;
    'New Active Covid Cases': number;
    'New Recovered Covid Cases': number;
    '7day Covid Cases Count': number;
    'covidIncidence': number
}

export interface TableData {
    City: number;
    TotalCovidCases: number;
    NewCovidCases: number;
    TotalCovidDeaths: number;
    NewCovidDeaths: number;
}
