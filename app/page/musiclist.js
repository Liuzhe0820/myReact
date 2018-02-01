import React from 'react';
import MusicListItem from '../components/musiclistitem';

let MusicList = React.createClass({
    render(){
        let listItem = null;
        listItem = this.props.musicList.map((item,index)=>{
            return (<MusicListItem
                focus={item===this.props.currentMusicItem}
                 key={item.id}
                 musicItem={item}
                 >
                 </MusicListItem>)
        });
        return (
            <ul>{listItem}</ul>
        )
    }
});

export default MusicList;