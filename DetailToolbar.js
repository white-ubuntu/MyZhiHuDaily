import React from 'react'
import {
    PixelRatio,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    ToastAndroid,
} from 'react-native'

export default class DetailToolbar extends  React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:false,
            extra:{comments:null},
        }
    }
    _onPressBackButton(){
        if(this.props.navigator){
            this.props.navigator.pop();
        }
    }
    _onPressShareButton() {
        // TODO:
        ToastAndroid.show('分享', ToastAndroid.SHORT);
    }
    _onPressCollectButton() {
        // TODO:
        ToastAndroid.show('收藏', ToastAndroid.SHORT);
    }
    _onPressCommentButton() {
        // TODO:
        ToastAndroid.show('评论', ToastAndroid.SHORT);
    }
    _onPressPriseButton() {
        // TODO:
        ToastAndroid.show('赞', ToastAndroid.SHORT);
    }
    render(){
        return(
            <View {...this.props}>
                <View style={styles.actionsContainer}>
                        <TouchableWithoutFeedback
                            onPress={this._onPressBackButton.bind(this)}
                            style={styles.actionItem}
                        >
                            <Image
                                style={styles.backIcon}
                                source={require('./img/ic_back_white.png')}
                                resizeMode='contain'
                            />
                        </TouchableWithoutFeedback>
                    <View style={{flex: 1}} />
                    <TouchableWithoutFeedback onPress={this._onPressShareButton}
                                              style={styles.actionItem}>
                        <Image
                            style={styles.actionIcon}
                            source={require('./img/ic_share_white.png')}
                            resizeMode='contain' />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this._onPressCollectButton}
                                              style={styles.actionItem}>
                        <Image
                            style={styles.actionIcon}
                            source={require('./img/ic_collect_white.png')}
                            resizeMode='contain' />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this._onPressCommentButton}
                                              style={styles.actionItem}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image
                                style={styles.actionIconWithCount}
                                source={require('./img/ic_comment_white.png')}
                                resizeMode='contain' />
                            <Text style={styles.count}>
                                {this.state.isLoading ? '...' : this.state.extra.comments}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this._onPressPraiseButton}
                                              style={styles.actionItem}>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 16}}>
                            <Image
                                style={styles.actionIconWithCount}
                                source={require('./img/ic_praise_white.png')}
                                resizeMode='contain' />
                            <Text style={styles.count}>
                                {this.state.isLoading ? '...' : this.state.extra.popularity}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    actionsContainer: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIcon: {
        width: 32,
        height: 32,
        marginLeft: 16,
        marginRight: 16,
    },
    actionItem: {
        height: 56,
        alignItems: 'center',

    },
    actionIcon: {
        width: 32,
        height: 32,
        marginLeft: 5,
        marginRight: 5,
    },
    actionIconWithCount: {
        width: 32,
        height: 32,
        marginLeft: 5,
    },
    count: {
        fontSize: 16,
        color: 'white',
        marginRight: 5,
    },
});