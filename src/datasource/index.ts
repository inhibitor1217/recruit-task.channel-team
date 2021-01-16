import { RestCountriesApi } from './api';
import { ICountriesDataSource } from './interface';

const datasource = (() => {
  let countries: ICountriesDataSource | undefined;

  return {
    countries: (): ICountriesDataSource => {
      if (!countries) {
        countries = new RestCountriesApi();
      }
      return countries;
    },
  };
})();

export default datasource;
export { ICountriesDataSource } from './interface';
