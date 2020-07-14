import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBar = props => {
    return <View style={styles.background}>
        <Icon
            name='search'
            size={20}
            color='white'
            style={styles.icon}
        />
        <TextInput
            style={styles.input}
            placeholder='Search'
            value={props.term}
            onChangeText={props.onChangedTerm}
            onEndEditing={props.onSubmitTerm}
        />
    </View>
};

const styles = StyleSheet.create({
    background: {
        marginTop: 20,
        backgroundColor: 'rgba(255,255,255,0.3)',
        height: 45,
        borderRadius: 90,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        fontSize: 16,
        flex: 1,
        color: 'white'
    },
    icon: {
        marginStart: 20,
        marginEnd: 5
    }
});

export default SearchBar;
