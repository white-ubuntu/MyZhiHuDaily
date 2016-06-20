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
    ListView,
    RefreshControl
} from 'react-native'
import StoryItem from './StoryItem'
const API_LATEST_URL="http://news.at.zhihu.com/api/4/news/latest";
var latestDate = null;
var dataBlob = {};
function parseDateFromYYYYMMdd(str) {
     if (!str) return new Date();
      return new Date(str.slice(0, 4),str.slice(4, 6) - 1,str.slice(6, 8));
   }
Date.prototype.yyyymmdd = function() {
     var yyyy = this.getFullYear().toString();
     var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
     var dd  = this.getDate().toString();
     return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
   };


export default class ListScreen extends  React.Component{
    constructor(props){
        super(props);
        var ds=new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !==row2});
        this.state={
            dataSource:ds,
            refreshing:false
        }
    }
    selectStory(story:Object){
        this.props.navigator.push({
            title:story.title,
            name:'story',
            story:story,
        })
    }
    renderRow(story) {
        console.log(story);
        return (
          <View>
                  <StoryItem
                      key={story.id}
                    onSelect={()=>this.selectStory(story)}
                    story={story}
                  />
          </View>
        );
    }

    render(){
        return(
          <View style={styles.container}>
              <View style={styles.separator}/>
              <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow.bind(this)}
                  renderSeparator={this._renderSeperator}
                  refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                  }
              />
          </View>
        );
    }
    _onRefresh(){
        this.setState({refreshing:true});
        this.fetchStories(latestDate);
    }
    _renderSeperator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
        return (
            <View
                key={sectionID-rowID}
                style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
            />
        );
    }
    componentDidMount(){
        this.fetchStories(latestDate);
    }
    fetchStories(dataBefore){
        let reqUrl=API_LATEST_URL;
        fetch(reqUrl)
        .then((response)=>response.json())
        .then((responseData)=>{
             latestDate=parseDateFromYYYYMMdd(responseData.date);
            var date=new Date(latestDate);
            var sectionIDs=[];
            sectionIDs.push(date.yyyymmdd());
            dataBlob[latestDate.yyyymmdd()]=responseData.stories;
            console.log(dataBlob);
            this.setState({
                dataSource:this.state.dataSource.cloneWithRows(responseData.stories),
                refreshing:false
            })


        })

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    rator: {
        height: 1,
        backgroundColor: '#eeeeee',
    },
    scrollSpinner: {
        marginVertical: 20,
    },
    sectionHeader: {
        fontSize: 14,
        color: '#888888',
        margin: 10,
        marginLeft: 16,
    }
});

