import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts } from '@tanstack/react-router';
import { useEffect, type ReactNode } from 'react';
import appCss from '../styles.css?url';
import appMeta from '../app-meta.json';
import { scrollScrubTheme } from '../scroll-scrub-scenes';
import { siteOrigin } from '../site';
const absolute=(path:string)=>path.startsWith('https://')?path:siteOrigin+path;
function NotFoundComponent(){return <main className="error-page"><img src="/icon-192.png" alt="VESAGE"/><h1>Outside the frame.</h1><p>This page could not be found.</p><Link to="/">Back to VESAGE ↗</Link></main>;}
function ErrorComponent({error,reset}:{error:Error;reset:()=>void}){
 const router=useRouter();useEffect(()=>{console.error(error);},[error]);
 return <main className="error-page"><h1>A brief intermission.</h1><p>This page didn’t load. Please try again.</p><button onClick={()=>{router.invalidate();reset();}}>Try again ↗</button><a href="/">Back to VESAGE</a></main>;
}
export const Route=createRootRouteWithContext<{queryClient:QueryClient}>()({
 head:()=>({
  meta:[{charSet:'utf-8'},{name:'viewport',content:'width=device-width, initial-scale=1'},{title:appMeta.og_title},{name:'description',content:appMeta.og_description},{name:'author',content:'VESAGE'},{name:'theme-color',content:scrollScrubTheme.background},{property:'og:title',content:appMeta.og_title},{property:'og:description',content:appMeta.og_description},{property:'og:type',content:'website'},{property:'og:url',content:siteOrigin},{property:'og:image',content:absolute(appMeta.og_image_url)},{name:'twitter:card',content:'summary_large_image'},{name:'twitter:title',content:appMeta.og_title},{name:'twitter:description',content:appMeta.og_description},{name:'twitter:image',content:absolute(appMeta.og_image_url)}],
  links:[{rel:'stylesheet',href:appCss},{rel:'canonical',href:siteOrigin},{rel:'icon',href:'/favicon.ico',sizes:'32x32'},{rel:'icon',href:'/favicon-32.png',type:'image/png',sizes:'32x32'},{rel:'icon',href:'/favicon-16.png',type:'image/png',sizes:'16x16'},{rel:'apple-touch-icon',href:'/apple-touch-icon.png'},{rel:'manifest',href:'/site.webmanifest'},{rel:'preload',as:'font',type:'font/woff2',href:'/assets/fonts/satoshi-variable.woff2',crossOrigin:'anonymous'}],
 }),
 shellComponent:RootShell,component:RootComponent,notFoundComponent:NotFoundComponent,errorComponent:ErrorComponent,
});
function RootShell({children}:{children:ReactNode}){return <html lang="en" style={{colorScheme:'dark'}}><head><HeadContent/></head><body>{children}<Scripts/></body></html>;}
function RootComponent(){const {queryClient}=Route.useRouteContext();return <QueryClientProvider client={queryClient}><Outlet/></QueryClientProvider>;}
