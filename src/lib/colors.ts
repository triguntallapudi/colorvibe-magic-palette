
// Default theme colors with themed presets
export const THEME_COLORS: Record<string, string[]> = {
  // Nature & Environment
  tree: ['#1B4D3E', '#226F54', '#3F7F5F', '#7FB685', '#A5C9AC'],
  wood: ['#966F33', '#7C4700', '#8B5E3C', '#DEB887', '#F5DEB3'],
  ocean: ['#006994', '#0099CC', '#00B7EB', '#59C1BD', '#006D77'],
  forest: ['#228B22', '#145214', '#355E3B', '#4A5D23', '#8B7355'],
  grass: ['#55A630', '#2D5A27', '#3F7D20', '#72B01D', '#90B77D'],
  apple: ['#FF0000', '#8DB600', '#FFFF00', '#FF1E1E', '#FF4B4B'],
  // Default palette (used as initial state)
  default: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD']
};

const findSimilarKeywords = (keyword: string): string => {
  const normalizedKeyword = keyword.toLowerCase().trim();
  
  // Direct match
  if (normalizedKeyword in THEME_COLORS) {
    return normalizedKeyword;
  }

  // Simple keyword matching
  const keywordGroups: Record<string, string[]> = {
    tree: ['wood', 'forest', 'plant'],
    ocean: ['water', 'sea', 'wave'],
    grass: ['lawn', 'meadow', 'field']
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
  console.log("Generating colors for keyword:", keyword); // Debug log
  const themeKey = findSimilarKeywords(keyword);
  console.log("Selected theme:", themeKey); // Debug log
  return THEME_COLORS[themeKey] || THEME_COLORS.default;
};
