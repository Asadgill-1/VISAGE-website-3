import { createElement as h } from 'react';
import type { ScrollScrubScene, ScrollScrubTheme } from '@/components/scroll-scrub/scroll-scrub';
export const scrollScrubTheme: ScrollScrubTheme = { accent:'#CDD0C1',background:'#151615',ink:'#F0F0E9',muted:'#ADAEA6' };
export const scrollScrubScenes: ScrollScrubScene[] = [{
 id:'opening',label:'Opening',title:'VESAGE',
 body:"An artist’s eye. Commercial-level execution.",
 clip:'/assets/world/scene-01.mp4',mobileClip:'/assets/world/scene-01-mobile.mp4',poster:'/assets/world/scene-01-poster.png',mobilePoster:'/assets/world/scene-01-mobile-poster.png',
 scroll:2.1,linger:0.1,objectPosition:'50% 48%',mobileObjectPosition:'50% 50%',
 actions:h('div',{className:'hero-bottom'},h('span',null,'Independent creative practice'),h('a',{href:'#work',className:'explore-link'},'SCROLL TO EXPLORE',h('span',{'aria-hidden':true},' ↘'))),
}];
