import React, { Component } from 'react';
import {
    View,
    Animated,
    PanResponder,
    Dimensions
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_TRESHOLD = Dimensions.get('window').width * 0.25;
const SWIPE_OUT_DURATION = 500;
const LEFT = 'left';
const RIGHT = 'right';

class Deck extends Component {

    static defaultProps = {
        onSwipeRight: ({ text }) => console.log(`${text} has been swiped to the right`)
    };

    position = new Animated.ValueXY();
    panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gesture) => {
            this.position.setValue({
                x: gesture.dx,
                y: gesture.dy
            });
        },
        onPanResponderRelease: (event, gesture) => {
            if (gesture.dx > SWIPE_TRESHOLD) {
                this.forceSwipe(RIGHT);
            } else if (gesture.dx < -SWIPE_TRESHOLD) {
                this.forceSwipe(LEFT);
            } else {
                this.resetPosition();
            }
        }
    });
    state = {
        index: 0
    };

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

    forceSwipe(direction) {
        Animated.timing(this.position, {
            toValue: {
                x: direction === RIGHT ? SCREEN_WIDTH : -SCREEN_WIDTH,
                y: 0
            },
            duration: SWIPE_OUT_DURATION
        }).start(() => this.onSwipeComplete(direction));
    };

    onSwipeComplete(direction) {
        const { onSwipeLeft, onSwipeRight, data } = this.props;
        const { index } = this.state;
        const item = data[index];
        direction === RIGHT ? onSwipeRight(item) : onSwipeLeft(item);
        this.setState(prevState => ({
            index: ++prevState.index
        }));
        this.position.setValue({
            x: 0,
            y: 0
        });
    };

    resetPosition() {
        Animated.spring(this.position, {
            toValue: {
                x: 0,
                y: 0
            }
        }).start();
    };

    renderCards = () => {
    const { index } = this.state;
    const { renderNoMoreCards, data } = this.props;
    console.log('DATA', data);
    if (index >= data.length) {
        console.log('RENDER_NO_MORE_CARDS', renderNoMoreCards);
        return renderNoMoreCards();
    };
    return data.map((item, ind, arr) => {
        console.log('ARR', arr, "length", arr.length);
            if (ind < index) {
                console.log('RETURN NULL');
                return null;
            } else if (ind === index) {
                return (
                    <Animated.View key={item.text} style={this.getCardStyle()} {...this.panResponder.panHandlers}>
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }  else {
            return (this.props.renderCard(item));
            }
        })
    };

    render() {
        console.log('iNDEX', this.state.index, 'DATA LENGTH', this.props.data.length);
        return (
            <View>
                {this.renderCards()}
            </View>
        );
    }
};

export default Deck;