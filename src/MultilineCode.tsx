import React from 'react';
import { View, StyleSheet } from 'react-native';
import SyntaxHighlighter from './SyntaxHighlighter';
import { Languages } from './languages';
import { resolveTheme } from './utils/themeResolver';

type Props = {
    code: string;
    language?: Languages;
    style?: {
        fontSize?: number;
        padding?: number;
        backgroundColor?: string;
    };
    showLineNumbers?: boolean;
    themeName?: string;
};

const MultilineCode = ({ 
    code, 
    language = 'python', 
    style = {}, 
    showLineNumbers = false,
    themeName = 'atomOneDark',
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
                syntaxStyle={resolveTheme(themeName)}
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