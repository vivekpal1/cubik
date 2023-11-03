import React from 'react';
import { createGlobalStyle } from 'styled-components';

const CustomStyles = createGlobalStyle`
  body {
    /* This sets the tap highlight color, you would replace purple.500 with the actual color value from your Tailwind config */
    -webkit-tap-highlight-color: #a855f7; /* Example color */
    
    /* The antialiased utility in Tailwind applies -webkit-font-smoothing: antialiased; and -moz-osx-font-smoothing: grayscale; */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const GlobalStyles = () => (
  <>
    <CustomStyles />
  </>
);

export default GlobalStyles;
