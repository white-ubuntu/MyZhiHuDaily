/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
} from 'react-native';

import WelcomeScreen from './WelcomeScreen'
import ListScreen from './ListScreen'
const toobarActions=[
    {title:'提醒',icon:require('image!ic_message_white'),show:'always'},
    {title: '夜间模式', show: 'never'},
    {title: '设置选项', show: 'never'}
];
class MyZhiHuDaily extends Component {
    constructor(){
        super();
        this.state={
            splashed:false
        }
    }
    onActionSelected(){

    }
    componentDidMount() {
        this.timer=setTimeout(
            ()=>{this.setState({splashed:true})},2000
        );
  }
    componentWillUnmount(){
        clearTimeout(this.timer);
    }
  render() {
      if(!this.state.splashed){
          return(
            <WelcomeScreen/>
          );
      }
      return(
          <View style={styles.container}>
              <ToolbarAndroid
                  style={styles.toolbar}
                  navIcon={require('image!ic_menu_white')}
                  title="知乎日报"
                  titleColor="white"
                  actions={toobarActions}
              />
              <ListScreen/>
              </View>

      )
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    toolbar:{
        backgroundColor:'#00a2ed',
        height:56,
    }
});

AppRegistry.registerComponent('MyZhiHuDaily', () => MyZhiHuDaily);
