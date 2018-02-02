import React from 'react';
import Progress from '../components/progress';
import './player.less';
import {Link} from 'react-router';
import  Pubsub from 'pubsub-js';//事件订阅管理器

let duration = null;
let Player = React.createClass({
    getInitialState (){
        //作用于组件的实例，在实例创建时调用一次，用于初始化每个实例的state，此时可以访问this.props。
        return {
            progrees:0,
            volume:0,
            isPlayer:true,
            leftTime:''
        }
    },
    formatTime(time){
        time= Math.floor(time);
        let miniutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        seconds=seconds<10?`0${seconds}`:seconds;
        return `${miniutes}:${seconds}`;
    },
    componentDidMount(){
        //绑定  打开即自动播放
        $('#player').bind($.jPlayer.event.timeupdate,(e)=>{
            duration = e.jPlayer.status.duration;
            this.setState({
                volume:e.jPlayer.options.volume*100,
                progress:e.jPlayer.status.currentPercentAbsolute,
                leftTime:this.formatTime(duration*(1-e.jPlayer.status.currentPercentAbsolute/100))
            });
        })
       
    },
    componentWillUnMount(){
        //解绑
        $('#player').unbind($.jPlayer.event.timeupdate);
    },
    progressChangeHandle(progress){
        //控制播放进度
        $('#player').jPlayer('play',duration*progress);
        this.setState({
            //点击播放进度  状态切换到播放
            isPlayer:true
        })
    },
    changeVolumeHandle(progress){
        //控制音量
        $('#player').jPlayer('volume',progress);
        this.setState({
            volume: progress * 100,
        });
    },
    play(){
        //播放和暂停
        if(this.state.isPlayer){
            //暂停
            $('#player').jPlayer('pause');
        }else{  
            //播放
            $('#player').jPlayer('play');
        }
        this.setState({
            //状态取反
            isPlayer:!this.state.isPlayer
        })
    },
    playPrev(){
        PubSub.publish('PLAY_PREV');
        this.setState({
            //状态取反
            isPlayer:true
        })
    },
    playNext(){
        PubSub.publish('PLAY_NEXT');
        this.setState({
            //状态取反
            isPlayer:true
        })
    },
    render(){
        return (
            <div className='player-page'>
            <h1 className="caption"><Link to='/list'>我的私人音乐坊 </Link></h1>
            <div className="mt20 row">
                <div className="controll-wrapper">
                    <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                    <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
                    <div className="row mt20">
                        <div className="left-time -col-auto">{this.state.leftTime}</div>
                        <div className="volume-container">
                            <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                            <div className="volume-wrapper">
                            <Progress
                                progress={this.state.volume}
                                onProgressChange={this.changeVolumeHandle}
                                barColor='#aaa'
                            ></Progress>
                            </div>
                        </div>
                    </div>
                    <div style={{height: 10, lineHeight: '10px',marginTop:'30px'}}>
                       <Progress
                            progress={this.state.progress}
                            onProgressChange={this.progressChangeHandle}
                            barColor='#608cf7'
                       ></Progress>
                    </div>
                    <div className="mt35 row">
                        <div>
                            <i className="icon prev" onClick={this.playPrev}></i>
                            <i className={`icon ml20 ${this.state.isPlayer?'pause':'play'}`} onClick={this.play}></i>
                            <i className="icon next ml20" onClick={this.playNext}></i>
                        </div>
                        <div className="-col-auto">
                            <i className='icon repeat-cycle'></i>
                        </div>
                    </div>
                </div>
                <div className="-col-auto cover">
                    <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
                </div>
            </div>
        </div>
        )
    }
    
});

export default Player;