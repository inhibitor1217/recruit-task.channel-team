export interface ICountriesDataSource {
  get(): Promise<Country[]>;
}
