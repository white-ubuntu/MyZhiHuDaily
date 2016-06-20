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
    BackAndroid,
   Navigator,
} from 'react-native';

import WelcomeScreen from './WelcomeScreen'
import ListScreen from './ListScreen'
import StoryScreen from './StoryScreen'
const toobarActions=[
    {title:'提醒',icon:require('image!ic_message_white'),show:'always'},
    {title: '夜间模式', show: 'never'},
    {title: '设置选项', show: 'never'}
];
var _navigator;
BackAndroid.addEventListener('hardwareBackPress',function(){
    if(_navigator && _navigator.getCurrentRoutes().length>1){
        _navigator.pop();
        return true;
    }
    return false;
})
var  RouteMapper=(route,navigationOperations)=>{
    _navigator=navigationOperations;
    if(route.name==='home'){
        return(
            <View style={styles.container}>
                <ToolbarAndroid
                    style={styles.toolbar}
                    navIcon={require('image!ic_menu_white')}
                    title="知乎日报"
                    titleColor="white"
                    actions={toobarActions}
                />
                <ListScreen navigator={navigationOperations}/>
            </View>
        );
    }else if(route.name==='story'){
        return(
            <View style={styles.container}>
                <ToolbarAndroid
                    style={styles.toolbar}
                    navIcon={require('image!ic_back_white')}
                    title='故事题目'
                    onIconClicked={navigationOperations.pop}
                    titleColor="white"
                    actions={[]}
                />
                <StoryScreen
                    style={{flex:1}}
                    navigator={navigationOperations}
                    story={route.story}
                />
            </View>
        );
    }

}

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
      };
      let initialRouteStack=[{name:'home'}];
      return(
          <Navigator
            style={styles.container}
            initialRouteStack={initialRouteStack}
            configureScene={()=>Navigator.SceneConfigs.HorizontalSwipeJump}
            renderScene={RouteMapper}

          />




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
