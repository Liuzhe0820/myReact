import React from 'react';
import './header.less';
let Header = React.createClass({
    render(){
        return (
            <div className='components-header row'>
                <img width='40' src='static/images/logo.png' className='-col-auto' />
                <h1 className='caption'>React Music Player</h1>
            </div>
        );
    }
});
export default Header;