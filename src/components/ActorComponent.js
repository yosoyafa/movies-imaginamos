import React, { useContext } from 'react';
import { Avatar } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';

import MoviesContext from '../context/MoviesContext';

const ActorComponent = (props) => {

    const { theme } = useContext(MoviesContext);

    return (
        <View style={{ marginEnd: 10 }}>
            <Avatar.Image
                size={48}
                source={{
                    uri: `https://image.tmdb.org/t/p/w500/${props.pic}`
                }}
                margin={10}
                style={{ backgroundColor: theme.accent }}
            />
            <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#d3d3d3', textAlign: 'center' }}>{props.name.replace(' ', '\n')}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default ActorComponent;