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
    TemporalAAPlugin,
    AnisotropyPlugin,
    GammaCorrectionPlugin,

    addBasePlugins,
   TweakpaneUiPlugin, AssetManagerBasicPopupPlugin, CanvasSnipperPlugin,

    FileTransferPlugin,
} from "webgi";
import './WebGiViewer.css'
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)




function Webgi() {
    const canvasRef = useRef(null)


    const setupViewer = useCallback(async () => {
        const viewer = new ViewerApp({
            canvas: canvasRef.current,
        })

        const camera = viewer.scene.activeCamera;

        await viewer.addPlugin(GBufferPlugin)
        await viewer.addPlugin(new ProgressivePlugin(32))
        await viewer.addPlugin(new TonemapPlugin(true))
        await viewer.addPlugin(GammaCorrectionPlugin)
        await viewer.addPlugin(SSRPlugin)
        await viewer.addPlugin(SSAOPlugin)
        await viewer.addPlugin(BloomPlugin)
        await viewer.addPlugin(GLTFAnimationPlugin)
        
        // Add a popup(in HTML) with download progress when any asset is downloading.
        await viewer.addPlugin(AssetManagerBasicPopupPlugin)

        // Required for downloading files from the UI
        await viewer.addPlugin(FileTransferPlugin)

        // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
        await viewer.addPlugin(CanvasSnipperPlugin)

        const anim = viewer.getPlugin(GLTFAnimationPlugin)
        viewer.renderer.refreshPipeline();

        await viewer.load("/assets/robots.glb")
        viewer.getPlugin(TonemapPlugin).config.clipBackground = true;

        viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false });


        anim.playAnimation()






    },
        []);

    useEffect(() => {
        setupViewer();
    }, []);

    return (<div id="webgi-canvas-container">
        <canvas id='webgi-canvas' ref={canvasRef} />
    </div>);
}

export default Webgi;