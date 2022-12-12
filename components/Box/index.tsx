import React, { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "theme/colors";
import { hex2rgba } from "utils/hexToRGB";
import { BoxProps } from "./types";

const Box: React.FC<PropsWithChildren<BoxProps>> = ({ children, ...rest }) => (
  <View style={styles({ ...rest }).viewComponent}>{children}</View>
);

export default Box;

const styles = ({
  position,
  top,
  bottom,
  left,
  right,
  maxWidth,
  width,
  maxHeight,
  height,
  flex,
  flexGrow,
  flexShrink,
  flexDirection,
  justifyContent,
  alignItems,
  opacity,
  bg,
  br,
  bbw,
  bw,
  btlr,
  btrr,
  bblr,
  bbrr,
  bc,
  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl,
  m,
  mx,
  my,
  mt,
  mr,
  mb,
  ml,
  rotate,
}: BoxProps) =>
  StyleSheet.create({
    viewComponent: {
      position,
      top,
      bottom,
      left,
      right,
      maxHeight,
      width,
      maxWidth,
      height,
      flex,
      flexGrow,
      flexShrink,
      flexDirection,
      justifyContent,
      alignItems,
      backgroundColor: opacity
        ? hex2rgba(colors[bg as keyof typeof colors], opacity)
        : colors[bg as keyof typeof colors] || bg,
      borderRadius: br,
      borderWidth: bw,
      borderBottomWidth: bbw,
      borderTopLeftRadius: btlr,
      borderTopRightRadius: btrr,
      borderBottomLeftRadius: bblr,
      borderBottomRightRadius: bbrr,
      borderColor: colors[bc as keyof typeof colors] || bc,
      padding: p,
      paddingHorizontal: px,
      paddingVertical: py,
      paddingTop: pt,
      paddingRight: pr,
      paddingBottom: pb,
      paddingLeft: pl,
      margin: m,
      marginHorizontal: mx,
      marginVertical: my,
      marginTop: mt,
      marginRight: mr,
      marginBottom: mb,
      marginLeft: ml,
      transform: rotate ? [{ rotate: rotate }] : undefined,
    },
  });
