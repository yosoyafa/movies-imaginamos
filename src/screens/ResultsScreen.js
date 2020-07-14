import React, { useContext } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { IconButton } from 'react-native-paper';

import MovieItem from '../components/MovieItem';
import MoviesContext from '../context/MoviesContext';

const ResultsScreen = ({ route, navigation }) => {
    const { results, title } = route.params;
    const { theme } = useContext(MoviesContext);

    return (
        <View style={[styles.container, { backgroundColor: theme.primary }]}>
            <IconButton
                icon='keyboard-backspace'
                color='white'
                size={30}
                onPress={() => navigation.goBack()}
                style={styles.backButton}
            />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <FlatList
                data={results}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Movie', { 'movie': item })}>
                            <MovieItem movie={item} />
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={item => item.id.toString()}
            />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 999
    },
    titleContainer: {
        alignItems: 'center',
        marginVertical: 25,
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    }
});

export default ResultsScreen;