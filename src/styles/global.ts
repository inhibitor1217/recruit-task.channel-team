import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const typography = `
  font-family: 'NanumSquare', Roboto, Arial, sans-serif;
`;

const GlobalStyle = createGlobalStyle`
  ${normalize}

  html,
  body {
    overflow: hidden;
    ${typography}
    font-size: 16px;
    font-weight: 400;

    width: 100vw;
    height: 100vh;
  }

  #root {
    width: 100%;
    height: 100%;
  }

  * {
    box-sizing: border-box;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    ${typography}
    font-size: 16px;
    font-weight: 400;
  }

  a,
  span,
  p {
    ${typography}
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  span,
  p {
    margin: 0;
  }

  h1 {
    font-size: 28px;
    line-height: 42px;
  }

  h2 {
    font-size: 24px;
    line-height: 36px;
  }

  h3 {
    font-size: 20px;
    line-height: 30px;
  }

  h4 {
    font-size: 18px;
    line-height: 27px;
  }

  h5 {
    font-size: 16px;
    line-height: 24px;
  }

  h6 {
    font-size: 12px;
    line-height: 18px;
  }

  p,
  span {
    font-size: 14px;
    line-height: 20px;
  }

  p.small,
  span.small {
    font-size: 10px;
    line-height: 15px;
  }

  /* Material Icons */
  .material-icon {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;

    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;
  
    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;
  
    /* Support for IE. */
    font-feature-settings: 'liga';
  }

  /* Rules for sizing the icon. */
  .material-icons.md-16 { font-size: 16px; }
  .material-icons.md-24 { font-size: 24px; }
  .material-icons.md-32 { font-size: 32px; }
  .material-icons.md-48 { font-size: 48px; }
  /* Rules for using icons as black on a light background. */
  .material-icons.md-dark { color: rgba(0, 0, 0, 0.54); }
  .material-icons.md-dark.md-inactive { color: rgba(0, 0, 0, 0.26); }
  /* Rules for using icons as white on a dark background. */
  .material-icons.md-light { color: rgba(255, 255, 255, 1); }
  .material-icons.md-light.md-inactive { color: rgba(255, 255, 255, 0.3); }
  
  .hidden {
    display: none !important;
  }
`;

export default GlobalStyle;
