export const isValidCountry = (json: AnyJson): json is Country => {
  if (!json || typeof json !== 'object' || Array.isArray(json)) {
    return false;
  }

  if (
    ['name', 'alpha2Code', 'callingCodes', 'capital', 'region'].some(
      (field) => !Object.prototype.hasOwnProperty.call(json, field)
    )
  ) {
    return false;
  }

  if (
    ['name', 'alpha2Code', 'capital', 'region'].some(
      (stringTypedField) => typeof json[stringTypedField] !== 'string'
    )
  ) {
    return false;
  }

  if (
    !Array.isArray(json.callingCodes) ||
    json.callingCodes.some((item) => typeof item !== 'string')
  ) {
    return false;
  }

  return true;
};

export const isValidCountryList = (array: JsonArray): array is Country[] =>
  array.every((item) => isValidCountry(item));

export const countryStartsWithKeyword = (
  country: Country,
  keyword: string
): boolean => {
  if (keyword.length === 0) {
    return true;
  }

  const startsWith = (haystick: string, needle: string): boolean =>
    haystick.toLocaleLowerCase().startsWith(needle.toLocaleLowerCase());

  return (
    startsWith(country.name, keyword) ||
    startsWith(country.capital, keyword) ||
    startsWith(country.region, keyword) ||
    startsWith(country.alpha2Code, keyword) ||
    country.callingCodes.some((el) => startsWith(el, keyword))
  );
};

export const countryContainsKeyword = (
  country: Country,
  keyword: string
): boolean => {
  if (keyword.length === 0) {
    return true;
  }

  const contains = (haystick: string, needle: string): boolean =>
    haystick.toLocaleLowerCase().includes(needle.toLocaleLowerCase());

  return (
    contains(country.name, keyword) ||
    contains(country.capital, keyword) ||
    contains(country.region, keyword) ||
    contains(country.alpha2Code, keyword) ||
    country.callingCodes.some((el) => contains(el, keyword))
  );
};
