import React, { useEffect, useContext } from 'react';
import { IconButton } from 'react-native-paper';
import { View, Text, StyleSheet, FlatList, ScrollView, Image } from 'react-native';

import MoviesContext from '../context/MoviesContext';
import ActorComponent from '../components/ActorComponent';
import WatchNowButton from '../components/WatchNowButton';
import Stars from '../components/Stars';

const MovieScreen = (props) => {
    const { movie } = props.route.params;
    const { theme, likedMovies, addLikedMovie, removeLikedMovie, getCast, getDetails, cast, genres, release, homepage, company } = useContext(MoviesContext);

    useEffect(() => {
        getCast(movie.id);
        getDetails(movie.id);
    }, []);

    const Heart = () => {
        if (likedMovies.includes(movie.id)) {
            //if (like) {
            return <IconButton
                icon='heart'
                color='red'
                size={30}
                onPress={() => removeLikedMovie(movie.id)}
                style={styles.heartIcon}
            />
        }
        return <IconButton
            icon='heart-outline'
            color='white'
            size={30}
            onPress={() => addLikedMovie(movie.id)}
            style={styles.heartIcon}
        />
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.primary }]}>
            <IconButton
                icon='keyboard-backspace'
                color='white'
                size={30}
                onPress={() => props.navigation.goBack()}
                style={styles.backButton}
            />
            {Heart()}
            {
                movie.backdrop_path ?
                    <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}` }}
                        style={styles.backdropImage}
                    />
                    :
                    <View style={{ height: 40 }}></View>
            }
            <ScrollView style={{ flex: 1 }}>
                <View style={[styles.infoContainer, { backgroundColor: theme.primary }]}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                        {
                            homepage ?
                                <WatchNowButton url={homepage} />
                                :
                                null
                        }
                        <View style={styles.stars}>

                            <Stars count={movie.vote_average} />
                        </View>
                    </View>

                    <Text style={styles.overview}>{movie.overview}</Text>
                    <FlatList
                        marginVertical={20}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={cast}
                        renderItem={({ item }) => <ActorComponent name={item.name} pic={item.profile_path} />}
                        keyExtractor={item => item.cast_id.toString()}
                    />
                    <View style={styles.additionalInfoContainer}>
                        <View style={styles.labels}>
                            {
                                company ?
                                    <Text style={styles.label}>Studio</Text>
                                    :
                                    null
                            }
                            {
                                genres ?
                                    <Text style={styles.label}>Genre</Text>
                                    :
                                    null
                            }
                            {
                                release ?
                                    <Text style={styles.label}>Release</Text>
                                    :
                                    null
                            }
                        </View>
                        <View>
                            {
                                company ?
                                    <Text style={styles.additionalInfo}>{company}</Text>
                                    :
                                    null
                            }

                            {
                                genres.length !== 0 ?
                                    <Text style={styles.additionalInfo}>
                                        {genres.map((genre, i) => {
                                            return (
                                                <Text key={i}>{genre.name}{i + 1 !== genres.length ? ', ' : null}</Text>
                                            );
                                        })}
                                    </Text>
                                    :
                                    null
                            }
                            {
                                release ?
                                    <Text style={styles.additionalInfo}>{release}</Text>
                                    :
                                    null
                            }

                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 999,
    },
    heartIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 999
    },
    backdropImage: {
        width: '100%',
        height: '30%'
    },
    infoContainer: {
        flex: 1,
        paddingStart: 30,
        paddingVertical: 30
    },
    title: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold'
    },
    overview: {
        color: '#d3d3d3',
        fontSize: 15,
        marginTop: 40,
        marginEnd: 30
    },
    additionalInfoContainer: {
        flexDirection: 'row'
    },
    labels: {
        marginEnd: 30
    },
    label: {
        color: 'white',
        fontWeight: 'bold'
    },
    additionalInfo: {
        color: '#d3d3d3'
    },
    stars: {
        marginEnd: 30
    }
});

export default MovieScreen;