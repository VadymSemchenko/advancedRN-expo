import React, { Component } from 'react';
import { View, Animated, PanResponder } from 'react-native';

class Deck extends Component {

    position = new Animated.ValueXY();
    panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gesture) => {
            console.log('gesture', gesture);
            this.position.setValue({
                x: gesture.dx,
                y: gesture.dy
            });
        },
        onPanResponderRelease: () => {}
    });


    renderCards = () => this.props.data.map((item, index) => {
            if (index === 0) {
                console.log('FIRST ONE');
                return (
                    <Animated.View key={item.text} style={this.position.getLayout()} {...this.panResponder.panHandlers}>
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            };
            return (this.props.renderCard(item));
        });

    render() {
        return (
            <View>
                {this.renderCards()}
            </View>
        );
    }
};

export default Deck;