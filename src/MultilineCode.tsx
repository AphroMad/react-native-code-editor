import React from 'react';
import { View, StyleSheet } from 'react-native';
import SyntaxHighlighter from './SyntaxHighlighter';
import { Languages } from './languages';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type Props = {
    code: string;
    language?: Languages;
    style?: {
        fontSize?: number;
        padding?: number;
        backgroundColor?: string;
    };
    showLineNumbers?: boolean;
};

const MultilineCode = ({ 
    code, 
    language = 'python', 
    style = {}, 
    showLineNumbers = false 
}: Props): JSX.Element => {
    const { 
        fontSize = 14,
        padding = 16,
        backgroundColor = '#282c34',
    } = style;

    return (
        <View style={styles.container}>
            <SyntaxHighlighter
                language={language}
                syntaxStyle={atomOneDark}
                addedStyle={{
                    fontSize,
                    padding,
                    backgroundColor,
                }}
                showLineNumbers={showLineNumbers}
                scrollEnabled={false}
            >
                {code}
            </SyntaxHighlighter>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        overflow: 'hidden',
        marginVertical: 8,
    },
});

export default MultilineCode; 