
export const THEME_COLORS: Record<string, string[]> = {
  apple: ['#FF1E1E', '#FF4B4B', '#FF7676', '#FFA1A1', '#FFCCCC'],
  ocean: ['#001F3F', '#003366', '#0066CC', '#0099FF', '#66CCFF'],
  forest: ['#004D1A', '#006622', '#008C2A', '#00B333', '#00D93B'],
  sunset: ['#FF8C00', '#FFA500', '#FFB732', '#FFCC66', '#FFE199'],
  lavender: ['#E6E6FA', '#D8BFD8', '#DDA0DD', '#DA70D6', '#BA55D3'],
  default: ['#0B0742', '#120C6E', '#5E72EB', '#FF9190', '#FDC094'],
};

export const generateAIColors = async (keyword: string): Promise<string[]> => {
  try {
    const response = await fetch('/api/generate-colors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keyword }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate colors');
    }
    
    const data = await response.json();
    return data.colors;
  } catch (error) {
    console.error('Error generating colors:', error);
    return THEME_COLORS.default;
  }
};
