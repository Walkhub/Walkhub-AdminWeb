import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    color: {
      main: string;
      green: string;
      red: string;
    };
  }
}
