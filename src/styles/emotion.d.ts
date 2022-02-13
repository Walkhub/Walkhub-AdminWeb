import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    color: {
      main: string;
      system: string;
      black: string;
      white: string;
      light_gray: string;
      normal_graydu: string;
      dark_gray: string;
    };
  }
}
