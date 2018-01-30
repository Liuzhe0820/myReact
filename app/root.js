import React from 'react';
import Header from './components/header';
import Progress from './components/progress';
let Root = React.createClass({
    getInitialState (){
        //作用于组件的实例，在实例创建时调用一次，用于初始化每个实例的state，此时可以访问this.props。
        return {
            progrees:'-'
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
        $('#player').bind($.jPlayer.event.timeupdate,(e)=>{
            this.setState({
                progrees:Math.round(e.jPlayer.status.currentTime)
            });
        })
    },
    render(){
        return (
            <div>
                <Header></Header>
                <Progress 
                    progress={this.state.progrees}
                >
                </Progress>
            </div>
        )
    }
});
export default Root;