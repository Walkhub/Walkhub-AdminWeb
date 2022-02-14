import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    color: {
      main: string;
      black: string;
      white: string;
      light_gray: string;
      bright_gray: string;
      normal_gray: string;
      dark_gray: string;
    };
  }
}
