
export const THEME_COLORS: Record<string, string[]> = {
  apple: ['#FF1E1E', '#FF4B4B', '#FF7676', '#FFA1A1', '#FFCCCC'],
  ocean: ['#001F3F', '#003366', '#0066CC', '#0099FF', '#66CCFF'],
  forest: ['#004D1A', '#006622', '#008C2A', '#00B333', '#00D93B'],
  sunset: ['#FF8C00', '#FFA500', '#FFB732', '#FFCC66', '#FFE199'],
  lavender: ['#E6E6FA', '#D8BFD8', '#DDA0DD', '#DA70D6', '#BA55D3'],
  tree: ['#1B4D3E', '#226F54', '#3F7F5F', '#7FB685', '#A5C9AC'],
  grass: ['#2D5A27', '#4A8B38', '#87AB66', '#BEDC7F', '#D4E79E'],
  sky: ['#B4E1FF', '#89CFF0', '#52B2FF', '#1E90FF', '#0066CC'],
  default: ['#0B0742', '#120C6E', '#5E72EB', '#FF9190', '#FDC094'],
};

export const generateAIColors = async (keyword: string): Promise<string[]> => {
  // For now, we'll use predefined palettes and semantic matching
  const lowercaseKeyword = keyword.toLowerCase();
  
  // Direct matches
  if (lowercaseKeyword in THEME_COLORS) {
    return THEME_COLORS[lowercaseKeyword];
  }

  // Semantic matches
  if (lowercaseKeyword.includes('tree') || 
      lowercaseKeyword.includes('forest') || 
      lowercaseKeyword.includes('plant')) {
    return THEME_COLORS.tree;
  }

  if (lowercaseKeyword.includes('water') || 
      lowercaseKeyword.includes('sea') || 
      lowercaseKeyword.includes('wave')) {
    return THEME_COLORS.ocean;
  }

  // Default fallback
  return THEME_COLORS.default;
};
