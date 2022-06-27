import { environment } from 'src/environments/environment';
export const ROOT_CONTEXT = environment.baseURL;

export const END_POINTS = {
    GET_COUNTRIES: ROOT_CONTEXT + `/countries`,
    GET_STATISTICS: ROOT_CONTEXT + `/statistics`,
    GET_HISTORY: ROOT_CONTEXT + `/history`,
};