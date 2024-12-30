import React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import InlineCode from './src/InlineCode';
import MultilineCode from './src/MultilineCode';
import Example from './Example';

const App = (): JSX.Element => {
    const multilineCode = `def calculate_sum(numbers):
    total = 0
    for num in numbers:
        total += num
    return total

# Example usage
numbers = [1, 2, 3, 4, 5]
result = calculate_sum(numbers)
print(f"The sum is {result}")`;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Première partie: Texte avec code inline et bloc de code */}
                <View style={styles.section}>
                    <Text style={styles.title}>Affichage de code</Text>
                    <Text style={styles.text}>
                        En Python, on utilise{' '}
                        <InlineCode
                            code="range()"
                            style={{ fontSize: 16 }}
                        />
                        {' '}comme dans{' '}
                        <InlineCode
                            code="for i in range(10):"
                            style={{ fontSize: 16 }}
                        />
                    </Text>

                    <Text style={styles.text}>
                        Voici un exemple plus complet :
                    </Text>

                    <MultilineCode
                        code={multilineCode}
                        language="python"
                        style={{
                            fontSize: 16,
                            padding: 16,
                        }}
                        showLineNumbers={true}
                    />
                </View>

                {/* Séparateur */}
                <View style={styles.separator} />

                {/* Deuxième partie: Éditeur de code interactif */}
                <View style={styles.section}>
                    <Text style={styles.title}>Éditeur de code</Text>
                    <Example />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    section: {
        marginBottom: 24,
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
});

export default App;
