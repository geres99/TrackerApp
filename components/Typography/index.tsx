import React, { PropsWithChildren } from "react";
import { StyleSheet, Text } from "react-native";
import { colors } from "theme/colors";
import { typography } from "theme/typography";
import { TypographyProps } from "./types";

const Typography: React.FC<PropsWithChildren<TypographyProps>> = ({
  numberOfLines,
  alignText,
  variant = "h4",
  color = "dark",
  children,
}) => (
  <Text
    numberOfLines={numberOfLines}
    style={styles(typography[variant], color, alignText).textComponent}
  >
    {children}
  </Text>
);

export default Typography;

const styles = (
  textStyles: any,
  color: keyof typeof colors,
  alignText?: "center"
) =>
  StyleSheet.create({
    textComponent: {
      ...textStyles,
      textAlign: alignText,
      color: colors[color],
    },
  });
