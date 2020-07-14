import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

import Stars from './Stars';

const MovieCard = ({ movie }) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{
                    uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                }}
            />
            <View style={styles.infoContainer}>
                <Text numberOfLines={1} style={styles.title}>
                    {movie.title}
                </Text>
                <Stars count={movie.vote_average} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        width: 120,
    },
    image: {
        borderRadius: 20,
        height: 160,
        width: 110,
        marginVertical: 10
    },
    infoContainer: {
        alignItems: 'flex-start',
        marginStart: 5
    },
    title: {
        color: 'white',
        flex: 1,
        marginBottom: 5
    }
});

export default MovieCard;