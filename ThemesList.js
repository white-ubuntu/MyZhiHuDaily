/**
 * Created by ijoy on 16-6-21.
 */

import React from 'react'

import {
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableNativeFeedback,
    Image,
    ToastAndroid,
} from 'react-native'
const API_THEMES="http://news-at.zhihu.com/api/4/themes";
export default class ThemesList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:false,
            dataSource:new ListView.DataSource({rowHasChanged:(row1,row2) =>row1!==row2})
        }
    }
    _onPressHomeButton(){
        ToastAndroid.show("点击了首页",ToastAndroid.SHORT);
    }
    renderHeader(){
        var thize=this;
        return(
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <TouchableNativeFeedback>
                        <View style={{flexDirection:'row',alignItems:'center',padding:16}}>
                            <Image source={require('./img/account_avatar.png')} style={{width:40,height:40,marginLeft:8,marginRight:8}}/>
                            <Text>请登录</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <View style={styles.row}>
                        <TouchableNativeFeedback>
                            <View style={styles.menuContainer}>
                                <Image source={require('./img/ic_favorites_white.png')}
                                style={{width:30,height:30}}/>
                                <Text style={styles.menuText}>
                                    我的收藏
                                </Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback>
                            <View style={styles.menuContainer}>
                                <Image
                                    source={require('./img/ic_download_white.png')}
                                    style={{width: 30, height: 30}} />
                                <Text style={styles.menuText}>
                                    离线下载
                                </Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
                <TouchableNativeFeedback onPress={this._onPressHomeButton}>
                    <View style={styles.themeItem}>
                        <Image source={require('./img/home.png')} style={{width:30,height:30,marginLeft:10}}/>
                        <Text style={styles.homeTheme}>
                            首页
                        </Text>
                    </View>
                    </TouchableNativeFeedback>
            </View>
        );
    }
    onSelectTheme(theme:Object){
        if(theme){
            ToastAndroid.show('选中'+theme.name,ToastAndroid.LONG);
        }else {
            ToastAndroid.show('选中首页');
        }

    }
    renderRow(theme:Object){
        return(
                <View >
                    <TouchableNativeFeedback
                        onPress={()=>this.onSelectTheme(theme)}
                    >
                        <View style={styles.Item}>
                           <Text style={styles.themeName}> {theme.name}</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            );
    }
    render(){
        return(
          <View style={styles.container}>
              <ListView
                  ref="themeslistview"
                renderRow={this.renderRow.bind(this)}
                dataSource={this.state.dataSource}
                renderHeader={this.renderHeader}
              />
          </View>
        );
    }
    componentDidMount(){
        this.fetchThemes();
    }
    fetchThemes(){
        this.setState({isLoading:true});
        fetch(API_THEMES)
        .then(response=>response.json())
        .then((responseData)=>{
            var themes=[];
            if(responseData.others){
                themes=themes.concat(responseData.others);
            }
            this.setState({
                dataSource:this.state.dataSource.cloneWithRows(themes),
                isLoading:false
            });
        }).done();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    header: {
        flex: 1,
        flexDirection: 'column',
    },
    userInfo: {
        flex: 1,
        backgroundColor: '#00a2ed',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuContainer: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    menuText: {
        fontSize: 14,
        color: 'white',
    },
    homeTheme: {
        fontSize: 16,
        marginLeft: 16,
        color: '#00a2ed'
    },
    themeItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    themeName: {
        flex: 1,
        fontSize: 16,
        marginLeft: 16,
    },
    themeIndicate: {
        marginRight: 16,
        width: 16,
        height: 16,
    },
    separator: {
        height: 1,
        backgroundColor: '#eeeeee',
    },
    scrollSpinner: {
        marginVertical: 20,
    },
    rowSeparator: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: 1,
        marginLeft: 4,
    },
    rowSeparatorHide: {
        opacity: 0.0,
    },
});
