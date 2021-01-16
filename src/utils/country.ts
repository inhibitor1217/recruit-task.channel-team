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
