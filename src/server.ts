import { applySecurityHeaders } from './lib/security-headers.server';
type Handler={fetch:(request:Request,env:unknown,ctx:unknown)=>Promise<Response>|Response};
export default {
 async fetch(request:Request,env:unknown,ctx:unknown){
  try {
   const url=new URL(request.url);
   if(url.pathname.length>1&&url.pathname.endsWith('/')){url.pathname=url.pathname.slice(0,-1);return applySecurityHeaders(Response.redirect(url,301));}
   const entry=await import('@tanstack/react-start/server-entry');
   const handler=(entry.default??entry) as Handler;
   return applySecurityHeaders(await handler.fetch(request,env,ctx));
  }catch(error){
   console.error(error);
   return applySecurityHeaders(new Response('This page could not load. Please try again.',{status:500,headers:{'content-type':'text/plain; charset=utf-8'}}));
  }
 }
};
