import { colors } from "theme/colors";

export type BoxProps = {
  position?: "absolute";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  maxWidth?: number | string;
  width?: number | string;
  maxHeight?: number | string;
  height?: number | string;
  flex?: number;
  flexGrow?: number;
  flexShrink?: number;
  flexDirection?: "column" | "row" | "row-reverse" | "column-reverse";
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
  alignItems?: "flex-start" | "center" | "flex-end";
  opacity?: number;
  bg?: keyof typeof colors;
  br?: number;
  bbw?: number;
  bw?: number;
  btlr?: number;
  btrr?: number;
  bblr?: number;
  bbrr?: number;
  bc?: keyof typeof colors;
  p?: number;
  px?: number;
  py?: number;
  pt?: number;
  pr?: number;
  pb?: number;
  pl?: number;
  m?: number;
  mx?: number;
  my?: number;
  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;
  rotate?: string;
};
