import React, { useRef, useState, useCallback, forwardRef, useImperativeHandle, useEffect } from "react";
import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    timeout,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    DiamondPlugin,
    FrameFadePlugin,
    GLTFAnimationPlugin,
    GroundPlugin,
    BloomPlugin,
    GammaCorrectionPlugin,
    CanvasSnipperPlugin,

    addBasePlugins,
    mobileAndTabletCheck
} from "webgi";
import './WebGiViewer.css'



import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

function WebGiViewer() {
    const canvasRef = useRef(null)



    const setupViewer = useCallback(async () => {

        const viewer = new ViewerApp({
            canvas: canvasRef.current,
        })


        await addBasePlugins(viewer) // check the source: https://codepen.io/repalash/pen/JjLxGmy for the list of plugins added.


        // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
        await viewer.addPlugin(CanvasSnipperPlugin)

        await viewer.load("/assets/robots.glb")
        viewer.getPlugin(TonemapPlugin).config.clipBackground=true;
    },
        []);

    useEffect(()=>{
        setupViewer();
    },[]);

    return (<div id="webgi-canvas-container">
        <canvas id='webgi-canvas' ref={canvasRef} />
    </div>);
}

export default WebGiViewer;