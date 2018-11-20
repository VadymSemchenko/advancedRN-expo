import React, { Component } from 'react';
import {
    View,
    Animated,
    PanResponder,
    Dimensions
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Deck extends Component {

    position = new Animated.ValueXY();
    panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gesture) => {
            this.position.setValue({
                x: gesture.dx,
                y: gesture.dy
            });
        },
        onPanResponderRelease: () => {
            this.resetPosition();
        }
    });

    getCardStyle() {
        const rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, +SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg', '0deg', '120deg']
        });
        const cardStyle = {
            ...this.position.getLayout(),
            transform: [{
                rotate
            }]
        };
        return cardStyle;
    };

    resetPosition() {
        Animated.spring(this.position, {
            toValue: {
                x: 0,
                y: 0
            }
        }).start();
    };

    renderCards = () => this.props.data.map((item, index) => {
            if (index === 0) {
                return (
                    <Animated.View key={item.text} style={this.getCardStyle()} {...this.panResponder.panHandlers}>
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            };
            return (this.props.renderCard(item));
        });

    render() {
        console.log('RENDER');
        return (
            <View>
                {this.renderCards()}
            </View>
        );
    }
};

export default Deck;