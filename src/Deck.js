import React, { Component } from 'react';
import { View, Animated, PanResponder } from 'react-native';

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
        onPanResponderRelease: () => {}
    });


    renderCards = () => this.props.data.map(item => {
            return (this.props.renderCard(item));
        });

    render() {
        return (
            <Animated.View style={this.position.getLayout()} {...this.panResponder.panHandlers}>
                {this.renderCards()}
            </Animated.View>
        );
    }
};

export default Deck;