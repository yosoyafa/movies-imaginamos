import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const MovieCard = ({ movie }) => {
    return (
        <View style={styles.container}>
            {
                movie.poster_path ?
                    <Image
                        style={styles.image}
                        source={{
                            uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        }}
                    />
                    :
                    null
            }
            <View style={{ margin: 15 }}>
                <Text numberOfLines={1} style={styles.title}>
                    {movie.title}
                </Text>

                {
                    movie.release_date ?
                        <Text style={{ color: 'white' }}>
                            {new Date(movie.release_date).getFullYear()}
                        </Text>
                        :
                        null
                }
                {
                    movie.overview ?

                        <Text numberOfLines={5} style={{ color: 'white', flex: 1 }}>{movie.overview}</Text>
                        :
                        null
                }

            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        width: 230,
        margin: 10,
        flexDirection: 'row'
    },
    image: {
        borderRadius: 20,
        height: 160,
        width: 110,
        marginVertical: 10
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default MovieCard;