
// Default theme colors
export const THEME_COLORS: string[] = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD"
];

export const generateAIColors = async (prompt: string): Promise<string[]> => {
  console.log("Generating colors for prompt:", prompt); // Debug log
  return THEME_COLORS; // For now, return default colors
};
