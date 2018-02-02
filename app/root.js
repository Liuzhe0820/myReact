import React from 'react';
import Header from './components/header';
import Player from './page/player';
import MusicList from './page/musiclist';
import { MUSIC_LIST } from './config/musiclist';
import { Router,IndexRoute,Link,Route,hashHistory } from 'react-router';
import  Pubsub from 'pubsub-js';//事件订阅管理器

let App = React.createClass({
    getInitialState (){
        //作用于组件的实例，在实例创建时调用一次，用于初始化每个实例的state，此时可以访问this.props。
        return {
            musicList:MUSIC_LIST,
            currentMusicItem:MUSIC_LIST[0]
        }
    },
    playMusic(musicItem){
        $('#player').jPlayer('setMedia',{
            mp3:musicItem.file
        }).jPlayer('play');
        this.setState({
            currentMusicItem:musicItem
        })
    },
    playNext(type='next'){
        let index = this.findMusicIndex(this.state.currentMusicItem);
        let newIndex = null;
        let musicListLenhth = this.state.musicList.length;
        if(type==='next'){
            newIndex=(index+1) % musicListLenhth;
        }else{
            newIndex=(index-1+musicListLenhth) % musicListLenhth;
        }
        this.playMusic(this.state.musicList[newIndex]);
    },
    findMusicIndex(musicItem){
        return this.state.musicList.indexOf(musicItem)
    },
    componentDidMount(){
        //真实的DOM被渲染出来后调用，在该方法中可通过this.getDOMNode()访问到真实的DOM元素。此时已可以使用其他类库来操作这个DOM。
        $('#player').jPlayer({
            supplied:'mp3',//支持的格式
            wmode:'window',
        });
        this.playMusic(this.state.currentMusicItem);
        $('#player').bind($.jPlayer.event.ended,(e)=>{
            this.playNext();
        })
        //设置一个订阅器
        Pubsub.subscribe('DELETE_MUSIC', (msg,musicItem)=>{
            //msg为Pubsub传过来的消息
            this.setState({
                //数组过滤  返回不等于选中的其他项
                musicList:this.state.musicList.filter(item=>{
                    return item!==musicItem
                })
            })
        });
        Pubsub.subscribe('PLAY_MUSIC', (msg,musicItem)=>{
            this.playMusic(musicItem)
        });
        Pubsub.subscribe('PLAY_PREV', (msg)=>{
            this.playNext('prev')
        });
        Pubsub.subscribe('PLAY_NEXT', (msg)=>{
            this.playNext()
        });
       
    },
    componentWillUnMount(){
        //解绑
        Pubsub.unsubscribe('DELETE_MUSIC');
        Pubsub.unsubscribe('PLAY_MUSIC');
        Pubsub.unsubscribe('PLAY_PREV');
        Pubsub.unsubscribe('PLAY_NEXT');
        $('#player').unbind($.jPlayer.event.ended)
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