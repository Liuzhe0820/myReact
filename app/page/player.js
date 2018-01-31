import React from 'react';
import Progress from '../components/progress';
import './player.less';

let duration = null;
let Player = React.createClass({
    getInitialState (){
        //作用于组件的实例，在实例创建时调用一次，用于初始化每个实例的state，此时可以访问this.props。
        return {
            progrees:'-'
        }
    },
    componentDidMount(){
        $('#player').bind($.jPlayer.event.timeupdate,(e)=>{
            duration = e.jPlayer.status.duration;
            this.setState({
                progrees:e.jPlayer.status.currentPercentAbsolute
            });
        })
    },
    componentWillUnMount(){
        $('#player').unbind($.jPlayer.event.timeupdate);
    },
    progressChangeHandle(progrees){
        $('#player').jPlayer('play',duration*progrees)
    },
    render(){
        return (
            <div className='player-page'>
            <h1 className="caption">我的私人音乐坊 </h1>
            <div className="mt20 row">
                <div className="controll-wrapper">
                    <h2 className="music-title">歌曲名称</h2>
                    <h3 className="music-artist mt10">歌手</h3>
                    <div className="row mt20">
                        <div className="left-time -col-auto">-2:00</div>
                        <div className="volume-container">
                            <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                            <div className="volume-wrapper">
                               音量控制部分
                            </div>
                        </div>
                    </div>
                    <div style={{height: 10, lineHeight: '10px'}}>
                       播放进度部分
                    </div>
                    <div className="mt35 row">
                        <div>
                            <i className="icon prev"></i>
                            <i className='icon ml20 play'></i>
                            <i className="icon next ml20"></i>
                        </div>
                        <div className="-col-auto">
                            <i className='icon repeat-cycle'></i>
                        </div>
                    </div>
                </div>
                <div className="-col-auto cover">
                    <img src='' alt='歌曲名称'/>
                </div>
            </div>
        </div>
        )
    }
    
});

export default Player;