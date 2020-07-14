import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Linking, Alert, StyleSheet } from 'react-native';

const WatchNowButton = ({ url }) => {

    const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    return (
        <TouchableOpacity onPress={() => handlePress()}>
            <View style={styles.button}>
                <Text style={styles.text}>WATCH NOW</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginVertical: 20,
        paddingVertical: 12,
        paddingHorizontal: 25,
        alignSelf: 'baseline',
        borderRadius: 90
    },
    text: {
        fontSize: 15,
        color: 'white'
    }
});

export default WatchNowButton;