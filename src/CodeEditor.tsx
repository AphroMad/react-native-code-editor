import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
    View,
    TextInput,
    ScrollView,
    StyleSheet,
    Platform,
    ColorValue,
    NativeSyntheticEvent,
    TextInputScrollEventData,
    TextInputKeyPressEventData,
    TextInputSelectionChangeEventData,
    KeyboardAvoidingView,
} from 'react-native';
import SyntaxHighlighter, {
    SyntaxHighlighterStyleType,
    SyntaxHighlighterSyntaxStyles,
} from './SyntaxHighlighter';
import { Languages } from './languages';
import * as Braces from './braces';
import * as Indentation from './indentation';
import * as Strings from './strings';

export type CodeEditorStyleType = SyntaxHighlighterStyleType & {
    /**
     * Editor height.
     */
    height?: string | number;

    /**
     * Editor width.
     */
    width?: string | number;

    /**
     * Editor top margin.
     */
    marginTop?: string | number;

    /**
     * Editor bottom margin.
     */
    marginBottom?: string | number;

    /**
     * Use this property to align the text input with the syntax highlighter text.
     * @see highlighterLineHeight
     */
    inputLineHeight?: number;

    /**
     * Use this property to help you align the text input with the syntax highlighter text.
     * Do not use in production.
     * @see highlighterColor
     */
    inputColor?: ColorValue;
};

export const CodeEditorSyntaxStyles = SyntaxHighlighterSyntaxStyles;

type Props = {
    /**
     * Editor styles.
     */
    style?: CodeEditorStyleType;

    /**
     * Programming language to support.
     */
    language: Languages;

    /**
     * Syntax highlighting style.
     * @See https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_STYLES_HLJS.MD
     */
    syntaxStyle?: typeof CodeEditorSyntaxStyles;

    /**
     * Initial value on render.
     */
    initialValue?: string;

    /**
     * On value change.
     */
    onChange?: (newValue: string) => void;

    /**
     * On key press.
     */
    onKeyPress?: (key: string) => void;

    /**
     * Whether to show line numbers next to each line.
     */
    showLineNumbers?: boolean;

    /**
     * Make the editor read only.
     */
    readOnly?: boolean;

    /**
     * Focus the code editor on component mount.
     */
    autoFocus?: boolean;

    /**
     * Test ID used for testing.
     */
    testID?: string;
};

type PropsWithForwardRef = Props & {
    forwardedRef: React.Ref<TextInput>;
};

type TextInputSelectionType = {
    start: number;
    end: number;
};

type SelectionOperation = {
    newText: string;
    newSelection: { start: number; end: number };
};

const CodeEditor = (props: PropsWithForwardRef): JSX.Element => {
    const {
        style,
        language,
        syntaxStyle = CodeEditorSyntaxStyles.atomOneDark,
        initialValue = '',
        onChange,
        onKeyPress,
        showLineNumbers = false,
        readOnly = false,
        autoFocus = true,
        testID,
        forwardedRef,
    } = props;

    const {
        width = undefined,
        height = undefined,
        marginTop = undefined,
        marginBottom = undefined,
        inputLineHeight = undefined,
        inputColor = 'rgba(0,0,0,0)',
        ...addedStyle
    } = style || {};

    const {
        fontFamily = Platform.OS === 'ios' ? 'Menlo-Regular' : 'monospace',
        fontSize = 16,
        padding = 16,
    } = addedStyle;

    const [value, setValue] = useState<string>(initialValue);
    const [selection, setSelection] = useState<TextInputSelectionType>({ start: 0, end: 0 });
    const highlighterRef = useRef<ScrollView>(null);
    const inputRef = useRef<TextInput>(null);

    // Only when line numbers are showing
    const lineNumbersPadding = showLineNumbers ? 1.75 * fontSize : undefined;

    // Sync forwardedRef with inputRef
    useImperativeHandle(forwardedRef, () => inputRef.current!, [inputRef]);

    useEffect(() => {
        if (onChange) {
            onChange(value);
        }
    }, [onChange, value]);

    const handleChangeText = (text: string) => {
        setValue(Strings.convertTabsToSpaces(text));
    };

    const handleScroll = (e: NativeSyntheticEvent<TextInputScrollEventData>) => {
        // Match text input scroll with syntax highlighter scroll
        const y = e.nativeEvent.contentOffset.y;
        highlighterRef.current?.scrollTo({ y, animated: false });
    };

    const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (onKeyPress) {
            onKeyPress(e.nativeEvent.key);
        }
    };

    const handleSelectionChange = (e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
        setSelection(e.nativeEvent.selection);
    };

    // Calculer la hauteur de ligne appropriée pour Android
    const calculatedInputLineHeight = Platform.select({
        android: fontSize * 1.5,
        ios: inputLineHeight,
    });

    const calculatedHighlighterLineHeight = Platform.select({
        android: fontSize * 1.5,
        ios: addedStyle.highlighterLineHeight,
    });

    return (
        <KeyboardAvoidingView 
            style={{ height: '100%' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            <ScrollView 
                style={{ flex: 1 }}
                keyboardDismissMode="none"
                keyboardShouldPersistTaps="handled"
            >
                <View 
                    style={[
                        {
                            width,
                            height: height || '100%',
                            marginTop,
                            marginBottom,
                        },
                    ]} 
                    testID={testID}
                >
                    <SyntaxHighlighter
                        language={language}
                        addedStyle={{
                            ...addedStyle,
                            highlighterLineHeight: calculatedHighlighterLineHeight,
                        }}
                        syntaxStyle={syntaxStyle}
                        scrollEnabled={false}
                        showLineNumbers={showLineNumbers}
                        testID={`${testID}-syntax-highlighter`}
                        ref={highlighterRef}
                    >
                        {value}
                    </SyntaxHighlighter>
                    <TextInput
                        style={[
                            styles.input,
                            {
                                lineHeight: calculatedInputLineHeight,
                                color: inputColor,
                                fontFamily: fontFamily,
                                fontSize: fontSize,
                                padding,
                                paddingTop: padding,
                                paddingLeft: lineNumbersPadding,
                            },
                        ]}
                        value={value}
                        selection={selection}
                        onChangeText={handleChangeText}
                        onScroll={handleScroll}
                        onKeyPress={handleKeyPress}
                        onSelectionChange={handleSelectionChange}
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect={false}
                        autoFocus={autoFocus}
                        keyboardType="ascii-capable"
                        editable={!readOnly}
                        testID={`${testID}-text-input`}
                        ref={inputRef}
                        multiline
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const CodeEditorWithForwardRef = React.forwardRef<TextInput, Props>((props, ref) => (
    <CodeEditor {...props} forwardedRef={ref} />
));

export default CodeEditorWithForwardRef;

const styles = StyleSheet.create({
    input: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        textAlignVertical: 'top',
    },
});
