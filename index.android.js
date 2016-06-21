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
    Dimensions,
    DrawerLayoutAndroid,
    ToastAndroid,
} from 'react-native';

import ThemesList from './ThemesList'
import WelcomeScreen from './WelcomeScreen'
import ListScreen from './ListScreen'
import StoryScreen from './StoryScreen'
const toobarActions=[
    {title:'提醒',icon:require('./img/ic_message_white.png'),show:'always'},
    {title: '夜间模式', show: 'never'},
    {title: '设置选项', show: 'never'}
];
var _navigator;
const DRAWER_WIDTH_LEFT=56;
BackAndroid.addEventListener('hardwareBackPress',function(){
    if(_navigator && _navigator.getCurrentRoutes().length>1){
        _navigator.pop();
        return true;
    }
    return false;
})


class MyZhiHuDaily extends Component {
    constructor(){
        super();
        this.state={
            splashed:false
        }
    }
    RouteMapper(route,navigationOperations){
        _navigator=navigationOperations;
        if(route.name==='home'){
            return(
                <View style={styles.container}>
                    <ToolbarAndroid
                        style={styles.toolbar}
                        navIcon={require('./img/ic_menu_white.png')}
                        title="知乎日报"
                        actions={toobarActions}
                    />
                    <ListScreen navigator={navigationOperations}/>
                </View>
            );
        }else if(route.name==='story'){
            return(
                <View style={styles.container}>
                    <StoryScreen
                        style={{flex:1}}
                        navigator={navigationOperations}
                        story={route.story}
                    />
                </View>
            );
        }

    }


    _renderNavigationView(){
        return(
          <ThemesList />
        );
    }
    componentDidMount()
{
    this.timer = setTimeout(
        ()=> {
            this.setState({splashed: true})
        }, 2000
    );
}
    componentWillUnmount(){
        clearTimeout(this.timer);
    }

  render(){
      var initialRoute={name:'home'};
      return(
          <DrawerLayoutAndroid
              drawerWidth={Dimensions.get("window").width-DRAWER_WIDTH_LEFT}
              drawerPosition={DrawerLayoutAndroid.positions.Left}
              renderNavigationView={this._renderNavigationView}>
               <Navigator
                    style={styles.container}
                    initialRoute={initialRoute}
                    configureScene={()=>Navigator.SceneConfigs.FadeAndroid}
                    renderScene={this.RouteMapper}
               />
              </DrawerLayoutAndroid>




      );
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
