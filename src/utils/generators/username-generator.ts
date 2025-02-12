import { generate } from 'random-words';

export const generateUsername = (): string => {
  // Generate two random words
  const words = generate({ exactly: 2 }) as string[];

  // Capitalize each word
  const formattedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1),
  );

  // Add a 4-digit number (1000-9999)
  const number = Math.floor(Math.random() * 9000) + 1000;

  // Combine with Reddit-style format
  return `${formattedWords.join('_')}${number}`;
};
