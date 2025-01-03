import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useKeyboard } from '@react-native-community/hooks';
import InlineCode from './src/InlineCode';
import MultilineCode from './src/MultilineCode';
import CodeEditor, { CodeEditorSyntaxStyles } from './src';

const App = (): JSX.Element => {
    const keyboard = useKeyboard();
    const multilineCode = `def calculate_sum(numbers):
    total = 0
    for num in numbers:
        total += num
    return total

# Example usage
numbers = [1, 2, 3, 4, 5]
result = calculate_sum(numbers)
print(f"The sum is {result}")`;

    const screenHeight = Dimensions.get('window').height;

    const editorStyle = {
        fontSize: 20,
        inputLineHeight: 26,
        highlighterLineHeight: 26,
        ...(keyboard.keyboardShown
            ? { marginBottom: keyboard.keyboardHeight }
            : {}),
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {/* Inline Code Examples */}
                <View style={[styles.section, { backgroundColor: '#000' }]}>
                    <View style={styles.content}>
                        <Text style={styles.title}>Inline Code (Dark Theme)</Text>
                        <Text style={styles.text}>
                            En Python, on utilise{' '}
                            <InlineCode 
                                code="range()" 
                                style={{ fontSize: 16 }}
                                themeName="atomOneDark"
                            />
                            {' '}comme dans{' '}
                            <InlineCode 
                                code="for i in range(10):" 
                                style={{ fontSize: 16 }}
                                themeName="atomOneDark"
                            />
                        </Text>
                    </View>
                </View>

                <View style={[styles.section, { backgroundColor: 'white' }]}>
                    <View style={styles.content}>
                        <Text style={[styles.title, styles.darkText]}>Inline Code (Light Theme)</Text>
                        <Text style={[styles.text, styles.darkText]}>
                            En Python, on utilise{' '}
                            <InlineCode 
                                code="range()" 
                                style={{ fontSize: 16 }}
                                themeName="docco"
                            />
                            {' '}comme dans{' '}
                            <InlineCode 
                                code="for i in range(10):" 
                                style={{ fontSize: 16 }}
                                themeName="docco"
                            />
                        </Text>
                    </View>
                </View>

                {/* Multiline Code Examples */}
                <View style={[styles.section, { backgroundColor: '#000' }]}>
                    <View style={styles.content}>
                        <Text style={styles.title}>Multiline Code (Dark Theme)</Text>
                        <MultilineCode
                            code={multilineCode}
                            language="python"
                            style={{ 
                                fontSize: 16, 
                                padding: 16,
                                backgroundColor: '#282c34'
                            }}
                            showLineNumbers={true}
                            themeName="atomOneDark"
                        />
                    </View>
                </View>

                <View style={[styles.section, { backgroundColor: 'white' }]}>
                    <View style={styles.content}>
                        <Text style={[styles.title, styles.darkText]}>Multiline Code (Light Theme)</Text>
                        <MultilineCode
                            code={multilineCode}
                            language="python"
                            style={{ 
                                fontSize: 16, 
                                padding: 16,
                                backgroundColor: '#f6f8fa'
                            }}
                            showLineNumbers={true}
                            themeName="docco"
                        />
                    </View>
                </View>

                {/* Code Editor Examples */}
                <View style={[styles.section, { backgroundColor: '#000', minHeight: 200 }]}>
                    <View style={styles.content}>
                        <Text style={styles.title}>Code Editor (Dark Theme)</Text>
                        <CodeEditor
                            style={editorStyle}
                            language="python"
                            syntaxStyle={CodeEditorSyntaxStyles.atomOneDark}
                            showLineNumbers
                        />
                    </View>
                </View>

                <View style={[styles.section, { backgroundColor: 'white', minHeight: 200 }]}>
                    <View style={styles.content}>
                        <Text style={[styles.title, styles.darkText]}>Code Editor (Light Theme)</Text>
                        <CodeEditor
                            style={editorStyle}
                            language="python"
                            syntaxStyle={CodeEditorSyntaxStyles.docco}
                            showLineNumbers
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    scrollView: {
        flex: 1,
    },
    section: {
        width: '100%',
    },
    content: {
        padding: 16,
    },
    separator: {
        height: 1,
        backgroundColor: '#61dafb',
        marginVertical: 24,
    },
    title: {
        color: '#61dafb',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    text: {
        color: 'white',
        fontSize: 16,
        marginBottom: 16,
    },
    darkText: {
        color: '#000000',
    },
    lightText: {
        color: 'white',
    },
});

export default App;
