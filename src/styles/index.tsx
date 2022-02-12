import { ThemeProvider, Global } from "@emotion/react";
import theme from "./theme";
import global from "./global";

const StyleProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={global} />
      {children}
    </ThemeProvider>
  );
};

export default StyleProvider;
