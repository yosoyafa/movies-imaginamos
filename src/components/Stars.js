import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Stars = ({ count }) => {
    const realCount = count / 2;
    const full = Math.floor(realCount);
    const half = realCount % 1 !== 0;
    const empty = half ? 4 - full : 5 - full;

    const stars = [];

    for (let i = 0; i < full; i++) {
        stars.push({ st: 'f' });
    }
    if (half) {
        stars.push({ st: 'h' });
    }
    for (let i = 0; i < empty; i++) {
        stars.push({ st: 'e' });
    }
    // ../../assets/stars/starFilled.png

    return (
        <View style={styles.container}>
            {stars.map((star, i) => {
                return (
                    star.st === 'h' ?
                        <Image
                            source={require('../../assets/stars/starHalf.png')}
                            style={styles.star}
                            key={i.toString()}
                        />
                        :
                        star.st === 'f' ?
                            <Image
                                source={require('../../assets/stars/starFilled.png')}
                                style={styles.star}
                                key={i.toString()}
                            />
                            :
                            <Image
                                source={require('../../assets/stars/starEmpty.png')}
                                style={styles.star}
                                key={i.toString()}
                            />
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    star: {
        height: 14,
        width: 15,
        margin: 2
    }
});

export default Stars;