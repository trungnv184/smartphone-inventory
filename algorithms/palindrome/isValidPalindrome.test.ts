import { isValidPalindrome } from './isValidPalindrome';

describe('isValidPalindrome', () => {
  it('should return true for a valid palindrome with only alphanumeric characters', () => {
    expect(isValidPalindrome('madam')).toBe(true);
    expect(isValidPalindrome('level')).toBe(true);
    expect(isValidPalindrome('radar')).toBe(true);
  });

  it('should return true for a valid palindrome with mixed case characters', () => {
    expect(isValidPalindrome('RaceCar')).toBe(true);
    expect(isValidPalindrome('Deified')).toBe(true);
  });

  it('should return true for a valid palindrome with uppercase characters', () => {
    expect(isValidPalindrome('MADAM')).toBe(true);
  });

  it('should return true for a valid palindrome with more space between characters', () => {
    expect(isValidPalindrome('l  e  v  e  l')).toBe(true);
  });

  it('should return false for a string that is not a palindrome', () => {
    expect(isValidPalindrome('text')).toBe(false);
    expect(isValidPalindrome('paragraph')).toBe(false);
  });

  it('should return true for a single character string', () => {
    expect(isValidPalindrome('a')).toBe(true);
    expect(isValidPalindrome('1')).toBe(true);
  });

  it('should return true for a string with mixed alphanumeric and non-alphanumeric characters', () => {
    expect(isValidPalindrome('No lemon, no melon!')).toBe(true);
  });

  it('should return false for a string with only non-alphanumeric characters', () => {
    expect(isValidPalindrome('!!!')).toBe(false);
    expect(isValidPalindrome('@@@')).toBe(false);
    expect(isValidPalindrome('###!!!')).toBe(false);
  });

  it('should return false for an empty string', () => {
    expect(isValidPalindrome('')).toBe(false);
  });
});
