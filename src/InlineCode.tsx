import React from 'react';
import { Text } from 'react-native';
import SyntaxHighlighter from './TextCodeSyntaxHighlighter';
import { Languages } from './languages';
import { resolveTheme } from './utils/themeResolver';

type Props = {
    code: string;
    language?: Languages;
    style?: {
        fontSize?: number;
        backgroundColor?: string;
    };
    themeName?: string;
};

const InlineCode = ({
    code,
    language = 'python',
    style = {},
    themeName = 'atomOneDark',
}: Props): JSX.Element => {
    const {
        fontSize = 14,
        backgroundColor = 'transparent',
    } = style;

    return (
        <Text>
            <SyntaxHighlighter
                language={language}
                syntaxStyle={resolveTheme(themeName)}
                addedStyle={{
                    fontSize,
                    padding: 0,
                    backgroundColor,
                    isInline: true,
                }}
                scrollEnabled={false}
            >
                {code}
            </SyntaxHighlighter>
        </Text>
    );
};

export default InlineCode; 