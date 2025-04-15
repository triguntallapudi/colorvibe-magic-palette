
// Default theme colors with themed presets
export const THEME_COLORS: Record<string, string[]> = {
  // Nature & Environment
  tree: ['#1B4D3E', '#226F54', '#3F7F5F', '#7FB685', '#A5C9AC'],
  wood: ['#966F33', '#7C4700', '#8B5E3C', '#DEB887', '#F5DEB3'],
  ocean: ['#006994', '#0099CC', '#00B7EB', '#59C1BD', '#006D77'],
  forest: ['#228B22', '#145214', '#355E3B', '#4A5D23', '#8B7355'],
  grass: ['#55A630', '#2D5A27', '#3F7D20', '#72B01D', '#90B77D'],
  apple: ['#FF0000', '#8DB600', '#FFFF00', '#FF1E1E', '#FF4B4B'],
  moon: ['#C0C0C0', '#D3D3D3', '#E6E6E6', '#F0F0F0', '#FFFFFF'],
  // Additional color themes
  sunset: ['#F9ED69', '#F08A5D', '#B83B5E', '#6A2C70', '#521945'],
  neon: ['#F0F600', '#00FF00', '#00F0FF', '#0000FF', '#FF00FF'],
  pastel: ['#FFC8DD', '#FFAFCC', '#BDE0FE', '#A2D2FF', '#CDB4DB'],
  monochrome: ['#000000', '#333333', '#666666', '#999999', '#FFFFFF'],
  beach: ['#FDCA40', '#F79824', '#1597BB', '#A9D6E5', '#FFF1D0'],
  autumn: ['#FFA500', '#FF4500', '#8B4513', '#A0522D', '#CD853F'],
  spring: ['#FF69B4', '#FFB6C1', '#98FB98', '#87CEFA', '#F0E68C'],
  winter: ['#FFFFFF', '#F0F8FF', '#E0FFFF', '#B0E0E6', '#87CEEB'],
  vintage: ['#D4A373', '#E9EDC9', '#FEFAE0', '#FAEDCD', '#CCD5AE'],
  candy: ['#FF85EA', '#FF5757', '#FFA357', '#FFFA6A', '#52FF57'],
  galaxy: ['#0C164F', '#092A5E', '#144587', '#29648A', '#469AA7'],
  coffee: ['#4A2C2A', '#5D392D', '#744B36', '#C19A6B', '#E6C9A8'],
  desert: ['#E5C185', '#D6A26F', '#C57D56', '#9E6240', '#774731'],
  // Default palette (used as initial state)
  default: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'],
};

const findSimilarKeywords = (keyword: string): string => {
  const normalizedKeyword = keyword.toLowerCase().trim();
  
  // Direct match
  if (normalizedKeyword in THEME_COLORS) {
    return normalizedKeyword;
  }

  // Simple keyword matching
  const keywordGroups: Record<string, string[]> = {
    tree: ['wood', 'forest', 'plant', 'garden', 'nature', 'leaf', 'leaves'],
    ocean: ['water', 'sea', 'wave', 'beach', 'marine', 'coastal', 'aquatic', 'lake', 'river'],
    grass: ['lawn', 'meadow', 'field', 'prairie', 'pasture', 'green', 'yard'],
    sunset: ['dusk', 'twilight', 'evening', 'sun down', 'horizon'],
    neon: ['bright', 'glow', 'electric', 'vibrant', 'laser', 'fluorescent'],
    pastel: ['soft', 'light', 'gentle', 'muted', 'pale'],
    monochrome: ['black and white', 'grayscale', 'neutral', 'bw', 'simple'],
    beach: ['shore', 'coast', 'sand', 'tropical', 'vacation', 'island'],
    autumn: ['fall', 'harvest', 'orange', 'seasonal', 'leaf'],
    spring: ['bloom', 'flower', 'fresh', 'bright', 'floral'],
    winter: ['snow', 'cold', 'ice', 'frost', 'chill', 'holidays'],
    vintage: ['retro', 'classic', 'old', 'antique', 'nostalgic'],
    candy: ['sweet', 'colorful', 'confection', 'sugar', 'treat'],
    galaxy: ['space', 'stars', 'cosmic', 'universe', 'astronomy', 'night sky'],
    coffee: ['brown', 'espresso', 'caffeine', 'mocha', 'warm', 'cozy'],
    desert: ['sand', 'arid', 'dry', 'cactus', 'hot', 'dune'],
  };

  // Check if keyword is in any group
  for (const [mainKeyword, synonyms] of Object.entries(keywordGroups)) {
    if (synonyms.some(synonym => normalizedKeyword.includes(synonym))) {
      return mainKeyword;
    }
  }

  return 'default';
};

export const getRandomPalette = (): string[] => {
  const themes = Object.keys(THEME_COLORS);
  const randomTheme = themes[Math.floor(Math.random() * themes.length)];
  return THEME_COLORS[randomTheme];
};

export const generateAIColors = async (keyword: string): Promise<string[]> => {
  console.log("Generating colors for keyword:", keyword); // Debug log
  const themeKey = findSimilarKeywords(keyword);
  console.log("Selected theme:", themeKey); // Debug log
  return THEME_COLORS[themeKey] || THEME_COLORS.default;
};
