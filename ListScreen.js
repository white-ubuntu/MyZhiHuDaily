/**
 * Created by ijoy on 16-6-19.
 *
 * ListScreen   main view
 */

import React from 'react'
import {
   AsyncStorage,
   Image,
    StyleSheet,
    Text,
    View,
} from 'react-native'

export default class ListScreen extends  React.Component{
    render(){
        return(
          <View style={styles.container}>
              <Text>
                  This is the list Screen.
              </Text>
          </View>
        );
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#F5FCFF',
    },
});
