
export const THEME_COLORS: Record<string, string[]> = {
  // Nature & Environment
  tree: ['#1B4D3E', '#226F54', '#3F7F5F', '#7FB685', '#A5C9AC'],
  wood: ['#966F33', '#7C4700', '#8B5E3C', '#DEB887', '#F5DEB3'],
  ocean: ['#006994', '#0099CC', '#00B7EB', '#59C1BD', '#006D77'],
  forest: ['#228B22', '#145214', '#355E3B', '#4A5D23', '#8B7355'],
  grass: ['#55A630', '#2D5A27', '#3F7D20', '#72B01D', '#90B77D'],
  
  // Celestial & Weather
  sun: ['#FFD700', '#FFA500', '#FF8C00', '#FFAA33', '#FFB433'],
  moon: ['#C0C0C0', '#D3D3D3', '#E6E6E6', '#F0F0F0', '#FFFFFF'],
  cloud: ['#FFFFFF', '#F0F0F0', '#E6E6FA', '#B0C4DE', '#E6E6E6'],
  sky: ['#87CEEB', '#00BFFF', '#1E90FF', '#6CB4EE', '#B0E0E6'],
  sunset: ['#FF8C00', '#FFA500', '#FF6B6B', '#FAA0A0', '#E0115F'],
  sunrise: ['#FFB6C1', '#FFA07A', '#FF8C00', '#FFD700', '#FFDAB9'],
  
  // Fruits & Food
  apple: ['#FF0000', '#8DB600', '#FFFF00', '#FF1E1E', '#FF4B4B'],
  banana: ['#FFE135', '#FFFDD0', '#FFF68F', '#FFE5B4', '#FFF8DC'],
  cherry: ['#C41E3A', '#800000', '#FFB6C1', '#FF0000', '#8B0000'],
  blueberry: ['#4169E1', '#483D8B', '#6A5ACD', '#000080', '#4B0082'],
  grape: ['#6B2C70', '#663399', '#8B008B', '#4B0082', '#800080'],
  
  // Flowers
  rose: ['#FF0000', '#FF69B4', '#800000', '#DC143C', '#C71585'],
  lavender: ['#E6E6FA', '#9370DB', '#8E4585', '#CC99FF', '#DCD0FF'],
  violet: ['#8F00FF', '#4B0082', '#FF00FF', '#9400D3', '#800080'],
  daisy: ['#FFFFFF', '#FFFF00', '#90EE90', '#FFFAFA', '#FFFFF0'],
  
  // Elements & Materials
  fire: ['#FF4500', '#FF6B6B', '#FFD700', '#FF4444', '#FF0000'],
  lava: ['#FF4500', '#FF6B6B', '#000000', '#8B0000', '#800000'],
  metal: ['#C0C0C0', '#808080', '#71797E', '#A8A9AD', '#848482'],
  gold: ['#FFD700', '#FFDF00', '#FFA500', '#DAA520', '#B8860B'],
  silver: ['#C0C0C0', '#A9A9A9', '#FFFFFF', '#E6E6E6', '#D3D3D3'],
  
  // Space
  galaxy: ['#483D8B', '#4169E1', '#000000', '#301934', '#4B0082'],
  nebula: ['#FF69B4', '#9370DB', '#4169E1', '#000000', '#8A2BE2'],
  space: ['#000000', '#000080', '#301934', '#191970', '#483D8B'],
  
  // Default palette
  default: ['#0B0742', '#120C6E', '#5E72EB', '#FF9190', '#FDC094']
};

const findSimilarKeywords = (keyword: string): string => {
  const normalizedKeyword = keyword.toLowerCase().trim();
  
  // Direct match
  if (normalizedKeyword in THEME_COLORS) {
    return normalizedKeyword;
  }

  // Keyword groupings
  const keywordGroups: Record<string, string[]> = {
    tree: ['wood', 'forest', 'plant', 'bamboo', 'fern'],
    ocean: ['water', 'sea', 'wave', 'river', 'lake'],
    sun: ['sunny', 'sunshine', 'daylight', 'dawn'],
    moon: ['night', 'lunar', 'starlight'],
    fire: ['flame', 'ember', 'burning', 'lava'],
    metal: ['iron', 'steel', 'silver', 'metallic'],
    galaxy: ['space', 'nebula', 'cosmic', 'universe'],
    rose: ['flower', 'blossom', 'petal', 'bloom'],
    grass: ['lawn', 'meadow', 'field', 'pasture']
  };

  // Check if keyword is in any group
  for (const [mainKeyword, synonyms] of Object.entries(keywordGroups)) {
    if (synonyms.some(synonym => normalizedKeyword.includes(synonym))) {
      return mainKeyword;
    }
  }

  return 'default';
};

export const generateAIColors = async (keyword: string): Promise<string[]> => {
  const themeKey = findSimilarKeywords(keyword);
  return THEME_COLORS[themeKey] || THEME_COLORS.default;
};
