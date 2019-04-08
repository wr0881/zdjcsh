import React, { Component } from 'react';

class Video extends Component {
    constructor() {
        super();
        this.state = {
            randomId: Math.random()
        }
    }
    render() {
        const {src} = this.props;
        return (
            <video id={src} style={{width:'100%',height:'100%'}} controls autoPlay >
            <source src={src} type="" />
                <source src="rtmp://rtmp.open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b" type="" />
                <source src="http://hls.open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.m3u8"
                    type="application/x-mpegURL" />
            </video>
        );
    }
    componentDidMount() {
        new window.EZUIPlayer(`${this.props.src}`);
    }

}

export default Video;
