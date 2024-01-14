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
    GLTFAnimationPlugin,
    GroundPlugin,
    BloomPlugin,
    GammaCorrectionPlugin,
    mobileAndTabletCheck
} from "webgi";
import './WebGiViewer.css'
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollAnimation } from "../lib/scrollAnimation";

gsap.registerPlugin(ScrollTrigger)




function WebGiViewer() {
    const canvasRef = useRef(null)



    const memoizedScrollAnimation = useCallback(
        (position, target, onUpdate) => {
            if (position && target && onUpdate) {
                scrollAnimation(position, target, onUpdate)
            }
        }, [])



    const setupViewer = useCallback(async () => {
        const viewer = new ViewerApp({
            canvas: canvasRef.current,
        })

        const camera = viewer.scene.activeCamera;
        const position = camera.position;
        const target = camera.target;

        await viewer.addPlugin(GBufferPlugin)
        await viewer.addPlugin(new ProgressivePlugin(32))
        await viewer.addPlugin(new TonemapPlugin(true))
        await viewer.addPlugin(GammaCorrectionPlugin)
        await viewer.addPlugin(SSRPlugin)
        await viewer.addPlugin(SSAOPlugin)
        await viewer.addPlugin(BloomPlugin)
        await viewer.addPlugin(GLTFAnimationPlugin)
        
        const anim = await viewer.getPlugin(GLTFAnimationPlugin)
        viewer.renderer.refreshPipeline();
        
        await viewer.load("/assets/robots.glb")
        viewer.getPlugin(TonemapPlugin).config.clipBackground = true;
        
        window.scrollTo(0, 0);
        
        let needsUpdate = true;
        viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false });

        const onUpdate = () => {
            needsUpdate = true;
            viewer.setDirty();
        }

        viewer.addEventListener("preFrame", () => {
            if (needsUpdate) {
                camera.positionUpdated(true)
                camera.targetUpdated(true)
                needsUpdate = false
            }
        })
        memoizedScrollAnimation(position, target, onUpdate)

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

export default WebGiViewer;