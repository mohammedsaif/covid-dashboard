export interface Countries {
    get: string;
    parameters: any[];
    errors: any[];
    results: number;
    response: string[];
}


export interface IStatsData {
    continent: string;
    country: string;
    population: number;
    cases: any;
    deaths: any;
    tests: any;
    day: string;
    time: Date;
}


