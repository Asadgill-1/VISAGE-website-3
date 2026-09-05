import { useEffect, useRef, useState } from 'react';
import type { Project } from '@/portfolio';

export function ProjectViewer({ project, onClose }: { project:Project|null; onClose:()=>void }) {
 const dialog = useRef<HTMLDialogElement>(null);
 const [failed,setFailed]=useState(false);
 const [ready,setReady]=useState(false);
 useEffect(()=>{
  const node=dialog.current;if(!node||!project)return;
  setFailed(false);setReady(false);
  const previous=document.activeElement as HTMLElement|null;
  const previousOverflow=document.body.style.overflow;
  node.showModal();document.body.style.overflow='hidden';
  return()=>{node.querySelector('video')?.pause();node.close();document.body.style.overflow=previousOverflow;previous?.focus();};
 },[project]);
 return <dialog ref={dialog} className="project-dialog" aria-labelledby="viewer-title" data-lenis-prevent onCancel={onClose} onClick={e=>{if(e.target===dialog.current)onClose();}}>
  {project&&<div className="viewer-panel">
   <header className="viewer-header"><div><h2 id="viewer-title">{project.title}</h2><p>{project.category}</p></div><button autoFocus className="close-viewer" onClick={onClose} aria-label="Close project">Close <span aria-hidden="true">×</span></button></header>
   <div className="viewer-stage" aria-busy={!ready&&!failed}>
    {project.kind==='video'?<video key={project.id} controls playsInline preload="metadata" poster={project.poster} src={project.src} onLoadedData={()=>setReady(true)} onError={()=>setFailed(true)} aria-label={`${project.title}: ${project.category}`} />:<img src={project.src} alt={project.alt} onLoad={()=>setReady(true)} onError={()=>setFailed(true)} />}
   </div>
   {failed&&<p role="alert" className="media-error">This file could not load. <a href={project.src} target="_blank" rel="noreferrer">Open the media</a> or try again.</p>}
   <div className="viewer-foot"><p>{project.alt}</p><a href={project.src} target="_blank" rel="noreferrer">Open media <span aria-hidden="true">↗</span></a></div>
   {project.gallery&&<div className="viewer-gallery">{project.gallery.map((src,i)=><a href={src} key={src} target="_blank" rel="noreferrer"><img src={src} alt={`${project.title}, supplied image ${i+1}`} loading="lazy" /></a>)}</div>}
  </div>}
 </dialog>;
}
