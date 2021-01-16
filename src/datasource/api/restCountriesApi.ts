import { isValidCountryList } from '../../utils';
import { ICountriesDataSource } from '../interface';

const defaultUrl =
  'https://restcountries.eu/rest/v2/all?fields=alpha2Code;capital;name;region;callingCodes';

export type RestCountriesApiParams = {
  url?: string;
};

export default class RestCountriesApi implements ICountriesDataSource {
  private url: string;

  constructor(params?: RestCountriesApiParams) {
    this.url = params?.url ?? defaultUrl;
  }

  public async get(): Promise<Country[]> {
    const response = await fetch(this.url);
    const body = await response.json();

    if (!Array.isArray(body) || !isValidCountryList(body)) {
      throw Error(
        `response body is in invalid format: ${JSON.stringify(body)}`
      );
    }

    return body;
  }
}
