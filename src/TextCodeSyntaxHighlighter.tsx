import React from 'react';
import { View, Text, Platform, ColorValue, TextStyle } from 'react-native';
import Highlighter, { SyntaxHighlighterProps as HighlighterProps } from 'react-syntax-highlighter';
import * as HLJSSyntaxStyles from 'react-syntax-highlighter/dist/esm/styles/hljs';

type Node = {
    children?: Node[];
    properties?: {
        className: string[];
    };
    tagName?: string;
    type: string;
    value?: string;
};

type StyleSheet = {
    [key: string]: TextStyle & {
        background?: string;
    };
};

type RendererParams = {
    rows: Node[];
    stylesheet: StyleSheet;
};

export type TextCodeSyntaxHighlighterStyleType = {
    fontFamily?: string;
    fontSize?: number;
    backgroundColor?: ColorValue;
    padding?: number;
    lineNumbersColor?: ColorValue;
    lineNumbersBackgroundColor?: ColorValue;
    highlighterLineHeight?: number;
    highlighterColor?: ColorValue;
    isInline?: boolean;
};

export type TextCodeSyntaxHighlighterProps = HighlighterProps & {
    children: string;
    syntaxStyle?: typeof HLJSSyntaxStyles;
    addedStyle?: TextCodeSyntaxHighlighterStyleType;
    scrollEnabled?: boolean;
    testID?: string;
};

const TextCodeSyntaxHighlighter = (props: TextCodeSyntaxHighlighterProps): JSX.Element => {
    const {
        syntaxStyle = HLJSSyntaxStyles.atomOneDark,
        addedStyle,
        scrollEnabled,
        showLineNumbers = false,
        testID,
        ...highlighterProps
    } = props;

    const {
        fontFamily = Platform.OS === 'ios' ? 'Menlo-Regular' : 'monospace',
        fontSize = 16,
        backgroundColor = undefined,
        padding = 16,
        lineNumbersColor = 'rgba(127, 127, 127, 0.9)',
        lineNumbersBackgroundColor = undefined,
        highlighterLineHeight = undefined,
        highlighterColor = undefined,
        isInline = false,
    } = addedStyle || {};

    const lineNumbersPadding = showLineNumbers ? 1.75 * fontSize : undefined;
    const lineNumbersFontSize = 0.7 * fontSize;

    const cleanStyle = (style: TextStyle) => ({
        ...style,
        display: undefined,
    });

    const stylesheet: StyleSheet = Object.fromEntries(
        Object.entries(syntaxStyle as StyleSheet).map(([className, style]) => [
            className,
            cleanStyle(style),
        ])
    );

    const renderNode = (nodes: Node[], key = '0') =>
        nodes.reduce<React.ReactNode[]>((acc, node, index) => {
            if (node.children) {
                const textElement = (
                    <Text
                        key={`${key}.${index}`}
                        style={[
                            {
                                color: highlighterColor || stylesheet.hljs.color,
                            },
                            ...(node.properties?.className || []).map((c) => stylesheet[c]),
                            {
                                lineHeight: highlighterLineHeight,
                                fontFamily,
                                fontSize,
                                paddingLeft: isInline ? 0 : (lineNumbersPadding ?? padding),
                            },
                        ]}
                    >
                        {renderNode(node.children, `${key}.${index}`)}
                    </Text>
                );

                if (isInline) {
                    return [...acc, textElement];
                }

                if (key === '0' && showLineNumbers) {
                    const lineNumberElement = (
                        <Text
                            key={`line.${index}`}
                            style={{
                                position: 'absolute',
                                left: 0,
                                width: lineNumbersPadding ? lineNumbersPadding - 5 : 0,
                                color: lineNumbersColor,
                                fontFamily,
                                fontSize: lineNumbersFontSize,
                                textAlign: 'right',
                                paddingRight: 5,
                            }}
                        >
                            {index + 1}
                        </Text>
                    );

                    acc.push(
                        <View
                            key={`line-container.${index}`}
                            style={{
                                flexDirection: 'row',
                                minHeight: highlighterLineHeight,
                            }}
                        >
                            {lineNumberElement}
                            {textElement}
                        </View>
                    );
                } else {
                    acc.push(textElement);
                }
            }

            if (node.value) {
                node.value = node.value.length ? node.value : ' ';
                acc.push(node.value);
            }

            return acc;
        }, []);

    const nativeRenderer = ({ rows }: RendererParams) => {
        return isInline ? (
            <Text
                style={[
                    stylesheet.hljs,
                    {
                        backgroundColor: backgroundColor || stylesheet.hljs.background,
                        padding: 0,
                        margin: 0,
                    }
                ]}
            >
                {renderNode(rows)}
            </Text>
        ) : (
            <View
                style={[
                    stylesheet.hljs,
                    {
                        backgroundColor: backgroundColor || stylesheet.hljs.background,
                        padding,
                        margin: 0,
                        flex: 1,
                    }
                ]}
            >
                {renderNode(rows)}
            </View>
        );
    };

    return (
        <Highlighter
            {...highlighterProps}
            customStyle={{
                padding: 0,
                margin: 0,
                background: 'transparent',
            }}
            CodeTag={isInline ? Text : View}
            PreTag={isInline ? Text : View}
            renderer={nativeRenderer}
            testID={testID}
            style={stylesheet}
        />
    );
};

export default TextCodeSyntaxHighlighter; 