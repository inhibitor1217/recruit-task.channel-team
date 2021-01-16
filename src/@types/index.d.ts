/* eslint-disable @typescript-eslint/no-explicit-any */

type Country = {
  name: string;
  alpha2Code: string;
  callingCodes: string[];
  capital: string;
  region: string;
};

type AnyJson = boolean | number | string | null | JsonArray | JsonMap;
type JsonMap = {
  [key: string]: AnyJson;
};
type JsonArray = Array<AnyJson>;

interface JSON {
  parse(
    text: string,
    reviver?: ((this: any, key: string, value: any) => any) | undefined
  ): AnyJson;
}

interface Response {
  json(): Promise<AnyJson>;
}
