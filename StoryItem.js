/**
 * Created by ijoy on 16-6-19.
 */
import React from 'react'
import {
    Image,
    PixelRatio,
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback,
    View
} from 'react-native'

export default class StoryItem extends React.Component{
    render(){
        return(
            <View>
                <TouchableNativeFeedback>
                <View style={styles.row}>
                    <Text style={styles.storyTitle} numberOfLines={5}>
                        {this.props.story.title}
                    </Text>
                    <Image
                        source={{uri:(this.props.story.images && this.props.story.images[0])?this.props.story.images[0]:null}}
                        style={styles.cellImage}
                    />
                </View>
                    </TouchableNativeFeedback>
                </View>
        );
    }
}


const styles = StyleSheet.create({
    storyTitle: {
        flex: 1,
        fontSize: 16,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        marginVertical: 5,
        borderColor: '#dddddd',
        borderStyle: null,
        borderWidth: 0.5,
        borderRadius: 2,
    },
    cellImage: {
        backgroundColor: '#dddddd',
        height: 60,
        marginLeft: 10,
        width: 80,
    },
});

