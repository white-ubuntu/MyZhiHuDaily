/**
 * Created by ijoy on 16-6-20.
 */

import {
 requireNativeComponent,
  PropTypes
} from 'react-native'

const iface={
    name:'WebView',
    propTypes:{
        url:PropTypes.string,
        html:PropTypes.string,
        css:PropTypes.string,
    }
};

module.exports=requireNativeComponent('RCTWebView',iface);