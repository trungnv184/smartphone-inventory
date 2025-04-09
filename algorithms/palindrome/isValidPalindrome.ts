//  * @param {string} s - The input string.
//  * @returns {boolean} - True if the string is a valid palindrome, false otherwise.
export function isValidPalindrome(s: string): boolean {
  // Check the input string is not empty and contains only alphanumeric characters
  if (!s || !/[a-zA-Z0-9]/.test(s)) return false;

  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Skip non-alphanumeric characters for both left and right pointers
    while (left < right && !isAlphaNumeric(s[left])) left++;
    while (left < right && !isAlphaNumeric(s[right])) right--;

    // Compare characters for left and right pointers
    if (s[left].toLocaleLowerCase() !== s[right].toLocaleLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

function isAlphaNumeric(char: string): boolean {
  return /^[a-zA-Z0-9]$/.test(char);
}
