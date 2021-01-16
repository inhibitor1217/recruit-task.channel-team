import { createSelector } from 'reselect';
import { countryContainsKeyword } from '../../utils';
import { RootState } from '../modules';
import { CountriesOrder, CountriesOrderBy } from '../modules/countries';

type CountryItem = {
  id: string;
  country: Country;
};

const filteredCountries = createSelector<
  RootState,
  CountryItem[] | undefined,
  string,
  CountryItem[] | undefined
>(
  (state) => state.countries.list,
  (state) => state.countries.keyword,
  (list, keyword) => {
    if (!list) {
      return list;
    }

    return list.filter(({ country }) =>
      countryContainsKeyword(country, keyword)
    );
  }
);

const compareArray = (
  one: string[],
  other: string[],
  comparator: (a: string, b: string) => number
): number => {
  if (one.length === 0 || other.length === 0) {
    return one.length - other.length;
  }

  const compared = comparator(one[0], other[0]);
  return compared !== 0
    ? compared
    : compareArray(one.slice(1), other.slice(1), comparator);
};

const countriesComparator = (orderBy: CountriesOrderBy) => (
  one: Country,
  other: Country
): number => {
  const compare = (a: string, b: string): number =>
    a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase());

  switch (orderBy) {
    case CountriesOrderBy.code:
      return compare(one.alpha2Code, other.alpha2Code);
    case CountriesOrderBy.name:
      return compare(one.name, other.name);
    case CountriesOrderBy.capital:
      return compare(one.capital, other.capital);
    case CountriesOrderBy.region:
      return compare(one.region, other.region);
    case CountriesOrderBy.callingCode:
      return compareArray(one.callingCodes, other.callingCodes, (a, b) =>
        a.length === 0 || b.length === 0
          ? a.length - b.length
          : parseInt(a, 10) - parseInt(b, 10)
      );
    default:
      return 0;
  }
};

export const sortedCountries = createSelector<
  RootState,
  CountryItem[] | undefined,
  CountriesOrderBy,
  CountriesOrder,
  CountryItem[] | undefined
>(
  filteredCountries,
  (state) => state.countries.orderBy,
  (state) => state.countries.order,
  (list, orderBy, order) => {
    if (!list) {
      return list;
    }

    const comparator = countriesComparator(orderBy);

    return [...list].sort(
      (one, other) =>
        comparator(one.country, other.country) *
        (order === CountriesOrder.ascending ? 1 : -1)
    );
  }
);

export const canStartAddingCountry = createSelector<
  RootState,
  boolean,
  boolean,
  boolean
>(
  (state) => state.countries.pending,
  (state) => state.countries.add,
  (pending, add) => !pending && !add
);
