import React, { Component, Fragment } from 'react';
import {
    View,
    Animated,
    PanResponder,
    Dimensions,
    StyleSheet,
    LayoutAnimation,
    UIManager
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

    componentDidUpdate(prevProps) {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
        if(prevProps.data !== this.props.data) {
            this.setState(() => ({
                index: 0
            }));
        }
    };

    state = {
        index: 0
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

    getCardStyle = () => {
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
        this.position.setValue({
            x: 0,
            y: 0
        });
        this.setState(prevState => ({
            index: ++prevState.index
        }));
        // this.setState({
        //     index: this.state.index + 1
        // });
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
    if (index >= data.length) {
        return renderNoMoreCards();
    };
    return data.map((item, ind) => {
        if (ind < index) {
            return null;
        };
        if (ind === index) {
            return (
                <Animated.View key={item.text} style={[this.getCardStyle(), styles.cardStyle]} {...this.panResponder.panHandlers}>
                    {this.props.renderCard(item)}
                </Animated.View>
            );
        } else {
            const movedDownInStack = StyleSheet.create({
                top: 70 * (ind - index)
            });
            return (
                <Animated.View
                    key={item.text}
                    style={[
                        styles.cardStyle,
                        styles.backgroundLayerCard,
                        movedDownInStack
                        ]}>
                    {this.props.renderCard(item)}
                </Animated.View>
                );
        };
        }).reverse();
    };

    render() {
        return (
            <View>
                {this.renderCards()}
            </View>
        );
    }
};

const styles = {
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH
    },
    backgroundLayerCard: {
        zIndex: -10
    }
};

export default Deck;