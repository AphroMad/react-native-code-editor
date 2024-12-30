import React from 'react';
import { Text } from 'react-native';
import SyntaxHighlighter from './TextCodeSyntaxHighlighter';
import { Languages } from './languages';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type Props = {
    code: string;
    language?: Languages;
    style?: {
        fontSize?: number;
    };
};

const InlineCode = ({ code, language = 'python', style = {} }: Props): JSX.Element => {
    const { fontSize = 14 } = style;

    return (
        <Text>
            <SyntaxHighlighter
                language={language}
                syntaxStyle={atomOneDark}
                addedStyle={{
                    fontSize,
                    padding: 0,
                    backgroundColor: 'transparent',
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