import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export function VesageMotion() {
 useEffect(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let cleanup = () => {};
  const setup = () => {
   cleanup();
   if (preference.matches) return;
   gsap.registerPlugin(ScrollTrigger);
   const lenis = new Lenis({ autoRaf:false, duration:1.05, anchors:true, prevent:node=>node.tagName==='DIALOG'||node.hasAttribute('data-lenis-prevent') });
   const tick = (time:number) => lenis.raf(time*1000);
   lenis.on('scroll',ScrollTrigger.update);
   gsap.ticker.add(tick);
   const ctx = gsap.context(() => {
    gsap.from('.site-header a',{y:14,duration:.8,stagger:.055,ease:'power3.out'});
    gsap.from('.vesage-opening .scroll-scrub__title',{y:36,duration:1.35,ease:'power3.out'});
    gsap.utils.toArray<HTMLElement>('.project-visual img').forEach(image=>{
     gsap.fromTo(image,{scale:1.06},{scale:1,ease:'none',scrollTrigger:{trigger:image,start:'top bottom',end:'bottom top',scrub:.7}});
    });
    // Text cadence adapted from Magic UI Text Reveal (MIT): keep words visible,
    // use a transform-only reading progression instead of opacity-based hiding.
    gsap.utils.toArray<HTMLElement>('.statement-word').forEach((word,i)=>{
     gsap.fromTo(word,{y:12},{y:0,ease:'power2.out',scrollTrigger:{trigger:'.practice-statement',start:`top ${85-i*.55}%`,end:'center center',scrub:.5}});
    });
   });
   cleanup=()=>{ctx.revert();gsap.ticker.remove(tick);lenis.destroy();};
  };
  setup();preference.addEventListener('change',setup);
  return()=>{cleanup();preference.removeEventListener('change',setup);};
 },[]);
 return null;
}
