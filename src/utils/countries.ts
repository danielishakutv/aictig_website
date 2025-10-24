import { Country } from '../types';

export function getCountryByCode(code: string, countries: Country[]): Country | undefined {
  return countries.find((c) => c.iso2.toLowerCase() === code.toLowerCase());
}

export function getCountryName(code: string, countries: Country[]): string {
  const country = getCountryByCode(code, countries);
  return country ? country.name : '';
}

export function getCountriesByRegion(region: string, countries: Country[]): Country[] {
  return countries.filter((c) => c.region === region);
}

export function getAllRegions(countries: Country[]): string[] {
  const regions = new Set(countries.map((c) => c.region));
  return Array.from(regions).sort();
}
