import { colors } from "theme/colors";
import { typography } from "theme/typography";

export interface TypographyProps {
  numberOfLines?: number;
  alignText?: "center";
  variant?: keyof typeof typography;
  color?: keyof typeof colors;
}
