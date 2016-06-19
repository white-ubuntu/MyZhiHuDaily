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
  View
} from 'react-native';

import WelcomeScreen from './WelcomeScreen'
import ListScreen from './ListScreen'

class MyZhiHuDaily extends Component {
    constructor(){
        super();
        this.state={
            splashed:false
        }
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
          <ListScreen/>
      )
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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
});

AppRegistry.registerComponent('MyZhiHuDaily', () => MyZhiHuDaily);
