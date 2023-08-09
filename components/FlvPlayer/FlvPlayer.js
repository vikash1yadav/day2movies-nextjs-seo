import React, { useRef, useEffect } from 'react';
import flvjs from 'flv.js';
import Head from 'next/head';
// import 'video.js/dist/video-js.css';

function FlvPlayer() {
    const videoRef = useRef(null);

    useEffect(() => {
        // const flvjs= require("flv.js")
        const video = videoRef.current;
        // Create FLV.js player and attach to video element
        const flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: props.url
        });
        flvPlayer.attachMediaElement(video);
        flvPlayer.load();
        flvPlayer.play();
        // Create Video.js player and attach to video element
        // const videojsPlayer = videojs(video);
        // // Clean up Video.js player on component unmount
        // return () => {
        //     if (videojsPlayer) {
        //         videojsPlayer.dispose();
        //     }
        // };
    }, []);

    return (
        <div>
            <Head>
                <script src="https://cdn.jsdelivr.net/npm/flv.js/dist/flv.min.js"></script>
            </Head>
            <video ref={videoRef} className="video-js vjs-default-skin"></video>
        </div>
    );
}

