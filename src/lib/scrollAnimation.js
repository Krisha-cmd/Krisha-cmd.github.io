import gsap from 'gsap'

export const scrollAnimation=(position, target, onUpdate)=>{
    const t1=gsap.timeline();
    

    t1.to(position,{
        x:-8.0,
        y:2.0,
        z:7.0,
        scrollTrigger:{
            trigger:'.skills',
            start:'top bottom',
            end:"top top",
            scrub:2,
            immediateRender:false
        },
        onUpdate
    })
    .to(target,{
        x:1.0,
        y:1.0,
        z:2.0,
        scrollTrigger:{
            trigger:'.skills',
            start:'top bottom',
            end:"top top",
            scrub:2,
            immediateRender:false
        },
    })
    .to('.home',{
        opacity:0,
        scrollTrigger:{
            trigger:'.skills',
            start:'top bottom',
            end:"top top",
            scrub:2,
            immediateRender:false
        },
    })
    .to('.skills',{
        opacity:1,
        scrollTrigger:{
            trigger:'.skills',
            start:'top bottom',
            end:"top top",
            scrub:2,
            immediateRender:false
        },
    })
    .to(position,{
        x:-0.5,
        y:1.4,
        z:-10.50,
        scrollTrigger:{
            trigger:'.projects',
            start:'top bottom',
            end:"top top",
            scrub:2,
            immediateRender:false
        },
        onUpdate
    })
    .to(target,{
        x:-0.1,
        y:1.8,
        z:-0.2,
        scrollTrigger:{
            trigger:'.projects',
            start:'top bottom',
            end:"top top",
            scrub:2,
            immediateRender:false
        },
    })
    
}