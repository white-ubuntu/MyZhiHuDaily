/**
 * Created by ijoy on 16-6-19.
 */
import React from 'react'
import {
  AsyncStorage,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const REQUEST_URL="http://news-at.zhihu.com/api/4/start-image/1080*1776";

const COVER_KEY='@WelcomeScreen:cover';

export default class WelcomeScreen extends  React.Component{
    constructor(){
        super();
        this.state={
            cover:null,
        }
    }


    renderEmpty(){
        return(
          <View style={styles.container}>
              <Text style={styles.title}>
                  知乎日报
              </Text>
          </View>
        );
    }
    render(){
        if(!this.state.cover){
            return this.renderEmpty();
        }
        return (
            <Image source={{uri:"https://pic1.zhimg.com/4dfa596eb7f3fe8a3c02f1d9a879271e.jpg"}}
                   style={styles.cover}>
                    <Text style={styles.text}>
                        {this.state.cover.text}
                    </Text>
            </Image>

        );
    }
    componentDidMount(){
        this.fetchData();
    }
    fetchData(){
        fetch(REQUEST_URL)
        .then((response)=> response.json())
        .then((responseData)=>{
            this.setState({cover:responseData});
        }).done();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    cover: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 32,
        fontWeight: '500',
    },
    text: {
        flex: 1,
        fontSize: 16,
        alignSelf: 'flex-end',
        textAlign: 'center',
        marginBottom: 10,
    }
});



