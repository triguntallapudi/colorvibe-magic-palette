
// Default theme colors with themed presets
export const THEME_COLORS: Record<string, string[]> = {
  // Nature & Environment
  tree: ['#1B4D3E', '#226F54', '#3F7F5F', '#7FB685', '#A5C9AC'],
  wood: ['#966F33', '#7C4700', '#8B5E3C', '#DEB887', '#F5DEB3'],
  ocean: ['#006994', '#0099CC', '#00B7EB', '#59C1BD', '#006D77'],
  forest: ['#228B22', '#145214', '#355E3B', '#4A5D23', '#8B7355'],
  grass: ['#55A630', '#2D5A27', '#3F7D20', '#72B01D', '#90B77D'],
  apple: ['#BF0000', '#008000', '#FEFF00', '#FF4B4B', '#59BE28'], // Updated apple colors
  moon: ['#C0C0C0', '#D3D3D3', '#E6E6E6', '#F0F0F0', '#FFFFFF'],
  // Additional color themes
  sunset: ['#F9ED69', '#F08A5D', '#B83B5E', '#6A2C70', '#521945'],
  neon: ['#F0F600', '#00FF00', '#00F0FF', '#0000FF', '#FF00FF'],
  pastel: ['#FFC8DD', '#FFAFCC', '#BDE0FE', '#A2D2FF', '#CDB4DB'],
  monochrome: ['#000000', '#1A1A1A', '#4D4D4D', '#BABABA', '#FFFFFF'], // Updated monochrome colors
  beach: ['#FDCA40', '#F79824', '#1597BB', '#A9D6E5', '#FFF1D0'],
  autumn: ['#FF8C42', '#FE6D73', '#941B0C', '#A0522D', '#CD853F'],
  spring: ['#FF69B4', '#FFB6C1', '#98FB98', '#87CEFA', '#F0E68C'],
  winter: ['#FFFFFF', '#F0F8FF', '#E0FFFF', '#B0E0E6', '#87CEEB'],
  vintage: ['#D4A373', '#E9EDC9', '#FEFAE0', '#FAEDCD', '#CCD5AE'],
  candy: ['#FF85EA', '#FF5757', '#FFA357', '#FFFA6A', '#52FF57'],
  galaxy: ['#0C164F', '#092A5E', '#144587', '#29648A', '#469AA7'],
  coffee: ['#4A2C2A', '#5D392D', '#744B36', '#C19A6B', '#E6C9A8'],
  desert: ['#E5C185', '#D6A26F', '#C57D56', '#9E6240', '#774731'],
  // New color themes
  lavender: ['#E6E6FA', '#D8BFD8', '#DDA0DD', '#DA70D6', '#9370DB'],
  mint: ['#F5FFFA', '#98FB98', '#3CB371', '#2E8B57', '#006400'],
  coral: ['#FF7F50', '#FF6347', '#FF4500', '#FF8C00', '#FFA07A'],
  ruby: ['#E0115F', '#CC0033', '#990033', '#800020', '#5C0819'],
  emerald: ['#50C878', '#00A36C', '#2E8B57', '#046307', '#123524'],
  sapphire: ['#082567', '#0F52BA', '#0066CC', '#5D8AA8', '#0080FF'],
  gold: ['#FFD700', '#FFC000', '#FFB000', '#FFA000', '#FF9000'],
  silver: ['#C0C0C0', '#A9A9A9', '#808080', '#696969', '#778899'],
  bronze: ['#CD7F32', '#B87333', '#A56C35', '#954535', '#85452C'],
  chocolate: ['#7B3F00', '#8B4513', '#A0522D', '#D2691E', '#CD853F'],
  strawberry: ['#FC5A8D', '#FF69B4', '#F8C8DC', '#FFBAD2', '#FF91A4'],
  citrus: ['#FFF700', '#FFFF00', '#FFEF00', '#FFE302', '#FFD700'],
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
    tree: ['wood', 'forest', 'plant', 'garden', 'nature', 'leaf', 'leaves', 'green', 'botanical'],
    ocean: ['water', 'sea', 'wave', 'beach', 'marine', 'coastal', 'aquatic', 'lake', 'river', 'blue', 'aqua', 'deep', 'underwater'],
    grass: ['lawn', 'meadow', 'field', 'prairie', 'pasture', 'green', 'yard', 'moss', 'turf'],
    sunset: ['dusk', 'twilight', 'evening', 'sun down', 'horizon', 'orange', 'pink sky', 'golden hour'],
    neon: ['bright', 'glow', 'electric', 'vibrant', 'laser', 'fluorescent', 'glowing', 'luminous', 'cyberpunk'],
    pastel: ['soft', 'light', 'gentle', 'muted', 'pale', 'baby', 'subtle', 'delicate'],
    monochrome: ['black and white', 'grayscale', 'neutral', 'bw', 'simple', 'minimalist', 'gray', 'grey', 'achromatic'],
    beach: ['shore', 'coast', 'sand', 'tropical', 'vacation', 'island', 'paradise', 'sunny', 'seaside'],
    autumn: ['fall', 'harvest', 'orange', 'seasonal', 'leaf', 'brown', 'rusty', 'auburn', 'amber'],
    spring: ['bloom', 'flower', 'fresh', 'bright', 'floral', 'blossom', 'garden', 'pastel', 'renewal'],
    winter: ['snow', 'cold', 'ice', 'frost', 'chill', 'holidays', 'frosty', 'freezing', 'christmas', 'white'],
    vintage: ['retro', 'classic', 'old', 'antique', 'nostalgic', 'aged', 'timeless', 'sepia', 'faded'],
    candy: ['sweet', 'colorful', 'confection', 'sugar', 'treat', 'dessert', 'bubblegum', 'lollipop', 'bright'],
    galaxy: ['space', 'stars', 'cosmic', 'universe', 'astronomy', 'night sky', 'nebula', 'celestial', 'stellar'],
    coffee: ['brown', 'espresso', 'caffeine', 'mocha', 'warm', 'cozy', 'latte', 'earthy', 'chocolate'],
    desert: ['sand', 'arid', 'dry', 'cactus', 'hot', 'dune', 'barren', 'western', 'canyon', 'mesa'],
    apple: ['fruit', 'crisp', 'orchard', 'fresh', 'juicy', 'sweet', 'red', 'green'],
    moon: ['night', 'lunar', 'silver', 'glow', 'pale', 'mysterious', 'celestial', 'dark'],
    lavender: ['purple', 'lilac', 'violet', 'floral', 'scent', 'relaxing', 'calming', 'soothing'],
    mint: ['cool', 'fresh', 'herb', 'green', 'clean', 'crisp', 'refreshing', 'spearmint', 'peppermint'],
    coral: ['pink', 'orange', 'reef', 'tropical', 'warm', 'sea', 'marine', 'salmon'],
    ruby: ['red', 'gem', 'crimson', 'garnet', 'wine', 'blood', 'scarlet', 'cherry'],
    emerald: ['green', 'gem', 'jade', 'jewel', 'precious', 'grass', 'forest', 'rich'],
    sapphire: ['blue', 'gem', 'royal', 'deep', 'ocean', 'navy', 'cobalt', 'midnight'],
    gold: ['yellow', 'metal', 'wealth', 'luxury', 'shiny', 'precious', 'golden', 'rich'],
    silver: ['gray', 'metal', 'shiny', 'sleek', 'modern', 'chrome', 'steel', 'platinum'],
    bronze: ['brown', 'metal', 'copper', 'rust', 'earthy', 'aged', 'antique', 'medal'],
    chocolate: ['brown', 'sweet', 'rich', 'dark', 'cocoa', 'candy', 'dessert', 'mocha'],
    strawberry: ['red', 'pink', 'fruit', 'sweet', 'berry', 'juice', 'fresh', 'summer'],
    citrus: ['yellow', 'orange', 'lime', 'lemon', 'bright', 'tangy', 'fresh', 'zesty', 'sour'],
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
