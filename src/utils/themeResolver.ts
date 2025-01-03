import * as HLJSSyntaxStyles from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const resolveTheme = (themeName: string = 'atomOneDark') => {
    // @ts-ignore - HLJSSyntaxStyles has dynamic keys
    return HLJSSyntaxStyles[themeName] || HLJSSyntaxStyles.atomOneDark;
}; 