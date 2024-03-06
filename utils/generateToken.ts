const generateCharacters = () => Math.random().toString(36).slice(2);

export const generateToken = () => generateCharacters() + generateCharacters();
