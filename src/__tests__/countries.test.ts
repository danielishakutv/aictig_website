import { describe, it, expect } from 'vitest';
import { getCountryByCode, getCountryName, getCountriesByRegion } from '../utils/countries';
import type { Country } from '../types';

const mockCountries: Country[] = [
  { name: 'Kenya', iso2: 'KE', region: 'East Africa' },
  { name: 'Nigeria', iso2: 'NG', region: 'West Africa' },
  { name: 'South Africa', iso2: 'ZA', region: 'Southern Africa' },
  { name: 'Ghana', iso2: 'GH', region: 'West Africa' },
  { name: 'Egypt', iso2: 'EG', region: 'North Africa' },
];

describe('Countries Utility Functions', () => {
  describe('getCountryByCode', () => {
    it('returns country for valid code', () => {
      const country = getCountryByCode('KE', mockCountries);
      expect(country).toEqual({ name: 'Kenya', iso2: 'KE', region: 'East Africa' });
    });

    it('returns undefined for invalid code', () => {
      const country = getCountryByCode('XX', mockCountries);
      expect(country).toBeUndefined();
    });

    it('is case insensitive', () => {
      const country = getCountryByCode('ke', mockCountries);
      expect(country).toEqual({ name: 'Kenya', iso2: 'KE', region: 'East Africa' });
    });
  });

  describe('getCountryName', () => {
    it('returns country name for valid code', () => {
      const name = getCountryName('NG', mockCountries);
      expect(name).toBe('Nigeria');
    });

    it('returns empty string for invalid code', () => {
      const name = getCountryName('XX', mockCountries);
      expect(name).toBe('');
    });

    it('handles lowercase codes', () => {
      const name = getCountryName('za', mockCountries);
      expect(name).toBe('South Africa');
    });
  });

  describe('getCountriesByRegion', () => {
    it('returns all countries in West Africa', () => {
      const countries = getCountriesByRegion('West Africa', mockCountries);
      expect(countries).toHaveLength(2);
      expect(countries.map((c) => c.name)).toEqual(['Nigeria', 'Ghana']);
    });

    it('returns all countries in East Africa', () => {
      const countries = getCountriesByRegion('East Africa', mockCountries);
      expect(countries).toHaveLength(1);
      expect(countries[0].name).toBe('Kenya');
    });

    it('returns empty array for invalid region', () => {
      const countries = getCountriesByRegion('Central Africa', mockCountries);
      expect(countries).toHaveLength(0);
    });

    it('returns all countries in Southern Africa', () => {
      const countries = getCountriesByRegion('Southern Africa', mockCountries);
      expect(countries).toHaveLength(1);
      expect(countries[0].name).toBe('South Africa');
    });
  });
});
