import React from 'react';
import Header from './components/header';
import Player from './page/player';
import MusicList from './page/musiclist';
import { MUSIC_LIST } from './config/musiclist';
import { Router,IndexRoute,Link,Route,hashHistory } from 'react-router';

let App = React.createClass({
    getInitialState (){
        //作用于组件的实例，在实例创建时调用一次，用于初始化每个实例的state，此时可以访问this.props。
        return {
            musicList:MUSIC_LIST,
            currentMusicItem:MUSIC_LIST[0]
        }
    },
    componentDidMount(){
        //真实的DOM被渲染出来后调用，在该方法中可通过this.getDOMNode()访问到真实的DOM元素。此时已可以使用其他类库来操作这个DOM。
        $('#player').jPlayer({
            ready:function(){
                $(this).jPlayer('setMedia',{
                    mp3:'../music/于文文-体面.mp3'
                });//.jPlayer('play');
            },
            supplied:'mp3',//支持的格式
            wmode:'window',
        });
       
    },
    componentWillUnMount(){
    },
    render(){
        return (
            <div>
                <Header></Header>
                {React.cloneElement(this.props.children,this.state)}
                
            </div>
        )
    }
});
let Root = React.createClass({
    render(){
        return (
            <Router history={hashHistory}>
                 <Route path='/' component={App}>
                     <IndexRoute component={Player}></IndexRoute>
                     <Route path='/list' component={MusicList}></Route>
                 </Route>
            </Router>
        )
    }
});
export default Root;