import "@emotion/react";
import theme from "./theme";

declare module "@emotion/react" {
  type ThemeType = typeof theme;
  interface Theme extends ThemeType {}
}
