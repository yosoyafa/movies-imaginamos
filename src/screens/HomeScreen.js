import React, { useState, useEffect, useContext } from 'react';
import { IconButton } from 'react-native-paper';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Alert } from 'react-native';

import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import MoviesContext from '../context/MoviesContext';

const HomeScreen = (props) => {
    const { APIkey, theme, changeTheme, getRecommended, recommended, getTopRated, topRated } = useContext(MoviesContext);

    const [term, setTerm] = useState('');
    const [headerHeight, setHeaderHeight] = useState(0);

    const searchMovie = async (word) => {
        try {
            let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${APIkey}&page=1&query=${word}`);
            let json = await response.json();
            if (json.total_results) {
                props.navigation.navigate('Results', { results: json.results, title: `Search: '${term}'` })
            } else {
                Alert.alert('empty');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getTopRated();
        getRecommended();
    }, []);

    return (
        <ScrollView>
            <View style={{ backgroundColor: theme.accent }}>
                {
                    theme.name === 'dark' ?
                        <IconButton
                            icon='weather-night'
                            color='white'
                            size={30}
                            onPress={changeTheme}
                            style={styles.themeButton}
                        />
                        :
                        <IconButton
                            icon='weather-sunny'
                            color='white'
                            size={30}
                            onPress={changeTheme}
                            style={styles.themeButton}
                        />
                }
                <View
                    style={styles.header}
                    onLayout={(event) => {
                        setHeaderHeight(event.nativeEvent.layout.height);
                    }}
                >
                    <Text style={styles.greeting}>Hello, what do you want to watch?</Text>
                    <SearchBar
                        onChangedTerm={setTerm}
                        onSubmitTerm={() => {
                            if (term) {
                                searchMovie(term)
                            }
                        }}
                    />
                </View>


                <View style={[styles.movies, { backgroundColor: theme.primary, marginTop: 70 + headerHeight }]}>
                    <View style={styles.list}>
                        <View style={styles.listTitleContainer}>
                            <Text style={styles.listTitle}>RECOMMENDED FOR YOU</Text>
                            <TouchableOpacity onPress={() => props.navigation.navigate('Results', { results: recommended, title: 'Recommended for you' })}>
                                <Text style={styles.seeAll}>See all</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            data={recommended}
                            renderItem={({ item }) => <TouchableOpacity onPress={() => props.navigation.navigate('Movie', { 'movie': item })}>
                                <MovieCard movie={item} />
                            </TouchableOpacity>}
                            keyExtractor={item => item.id.toString()}
                        />
                    </View>
                    <View style={styles.list}>
                        <View style={styles.listTitleContainer}>
                            <Text style={styles.listTitle}>TOP RATED</Text>
                            <TouchableOpacity onPress={() => props.navigation.navigate('Results', { results: topRated, title: 'Top Rated' })}>
                                <Text style={styles.seeAll}>See all</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            data={topRated}
                            renderItem={({ item }) => <TouchableOpacity onPress={() => props.navigation.navigate('Movie', { 'movie': item })}>
                                <MovieCard movie={item} />
                            </TouchableOpacity>}
                            keyExtractor={item => item.id.toString()}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    themeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 999
    },
    header: {
        position: 'absolute',
        marginHorizontal: 50,
        marginTop: 50,
        marginBottom: 20
    },
    greeting: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    },
    movies: {
        height: '100%',
        borderRadius: 20
    },
    list: {
        marginStart: 15,
        marginTop: 40
    },
    listTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    listTitle: {
        color: 'white',
        marginStart: 10,
        fontWeight: 'bold'
    },
    seeAll: {
        color: '#868c95',
        marginEnd: 30
    }
});

export default HomeScreen;