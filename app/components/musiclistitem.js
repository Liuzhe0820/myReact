import React from 'react';
import './musiclistitem.less' ;
import  Pubsub from 'pubsub-js';//事件订阅管理器

let MusicListItem = React.createClass({
    playMusic(musicItem){
        //把要播放的歌曲发送给事件订阅
        PubSub.publish('PLAY_MUSIC',musicItem);
    },
    deleteMusic(musicItem,event){
        event.stopPropagation();
        //把要删除的歌曲发送给事件订阅
        PubSub.publish('DELETE_MUSIC',musicItem);
    },
    render(){
        let musicItem = this.props.musicItem;
        return (
            <li className
                ={`components-musiclistitem row ${this.props.focus?'focus':''}`}
                onClick={this.playMusic.bind(this,musicItem)}>
                <p><strong>{musicItem.title}</strong>-{musicItem.artist}</p>
                <p className='-col-auto delete'
                 onClick={this.deleteMusic.bind(this,musicItem)}></p>
            </li>
        )
    }
});

export default MusicListItem;