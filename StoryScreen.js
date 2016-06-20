/**
 * Created by ijoy on 16-6-20.
 */
import React from 'react'
import {
   StyleSheet,
    View,
    Text,
    Image,
    WebView,
} from 'react-native'
const BASE_URL="http://news.at.zhihu.com/api/4/news/"
export default class StoryScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:false,
            detail:null,
        }
    }
    render(){
        if(this.state.isLoading){
            return(
                <View style={[styles.container,styles.center]}>
                    <Text>
                        正在加载
                    </Text>
                </View>
                );
        }else{
            if(this.state.detail){
                return(
                    <View style={styles.container}>
                        <WebView html={this.state.detail.body}
                                 automaticallyAdjustContentInsets={true}
                                 scrollEnabled={false}/>
                    </View>
                    )
            }else {
                return(
                  <View style={[styles.container,styles.center]}>
                      <Text>
                          加载失败
                      </Text>
                  </View>
                );
            }
        }

    }
    componentDidMount(){
        this.fetchStoryDetail();
    }
    fetchStoryDetail(){
        var reqUrl=BASE_URL+this.props.story.id;
        this.setState({
            isLoading:true,
            detail:null,
        });
        fetch(reqUrl)
        .then((response)=>response.json())
        .then((responseData)=>{
           this.setState({
               isLoading:false,
               detail:responseData,
           });
        })
        .done();
    }
}

const styles = StyleSheet.create({
    headerImage: {
        height: 200,
        flexDirection: 'row',
        backgroundColor: '#DDDDDD',
    },
    titleContainer: {
        flex: 1,
        alignSelf: 'flex-end',
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    title: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top:0,
    },
});