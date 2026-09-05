import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ScrollScrub } from '@/components/scroll-scrub/scroll-scrub';
import { scrollScrubScenes, scrollScrubTheme } from '@/scroll-scrub-scenes';
import { projects, extraProjects, identityProject, type Project } from '@/portfolio';
import { ProjectViewer } from '@/components/vesage-viewer';
import { ContactForm } from '@/components/vesage-contact';
import { VesageMotion } from '@/components/vesage-motion';
import { BusinessIntro, BusinessStory } from '@/components/vesage-business';

export const Route = createFileRoute('/')({ component:Index,head:()=>({links:[{rel:'preload',as:'image',href:'/assets/world/scene-01-poster.png'}]}) });

function Work({project,className='',onOpen}:{project:Project;className?:string;onOpen:(p:Project)=>void}) {
 return <article className={`project ${className}`} id={`project-${project.id}`}>
  <button className="project-visual" onClick={()=>onOpen(project)} style={{aspectRatio:project.aspect}} aria-label={`${project.kind==='video'?'Watch':'View'} ${project.title}, ${project.category}`}>
   <img src={project.poster} alt={project.alt} loading="lazy" decoding="async"/>
   <span className="play-aperture" aria-hidden="true">{project.kind==='video'?'↗':'+'}</span>
  </button>
  <div className="project-caption"><div><h3>{project.title}</h3><p>{project.category}</p></div><span className="project-number">{project.id}</span></div>
 </article>;
}

function Index(){
 const [selected,setSelected]=useState<Project|null>(null);
 const [menu,setMenu]=useState(false);
 const open=(p:Project)=>setSelected(p);
 const by=(id:string)=>projects.find(p=>p.id===id)!;
 const closeMenu=()=>setMenu(false);
 const statement='You send pictures of the product. We send back the campaign.';
 return <div className="vesage-site">
  <a className="skip-link" href="#work">Skip to work</a>
  <header className="site-header">
   <a className="nav-wordmark" href="#opening" aria-label="VESAGE home" onClick={closeMenu}>VESAGE</a>
   <button className="menu-toggle" type="button" aria-expanded={menu} aria-controls="main-nav" onClick={()=>setMenu(!menu)}>{menu?'Close':'Menu'}<span aria-hidden="true">{menu?'×':'+'}</span></button>
   <nav id="main-nav" aria-label="Main navigation" className={menu?'main-nav is-open':'main-nav'}>
    <a href="#work" onClick={closeMenu}>Work</a><a href="#practice" onClick={closeMenu}>Why VESAGE</a><a href="#lab" onClick={closeMenu}>Lab</a><a className="nav-contact" href="#contact" onClick={closeMenu}>Start a project <span aria-hidden="true">↗</span></a>
   </nav>
  </header>
  <main>
   <ScrollScrub scenes={scrollScrubScenes} theme={scrollScrubTheme} className="vesage-opening"/>
   <BusinessIntro/>
   <section id="work" className="work-exhibition">
    <div className="work-heading"><h2>Selected work<span className="heading-period">.</span></h2><p>Films, campaigns and images.<br/>A selection from the VESAGE practice.</p></div>
    <div className="fashion-pair"><Work project={by('01')} onOpen={open} className="fashion-indoor"/><Work project={by('02')} onOpen={open} className="fashion-outdoor"/></div>
    <section className="cinema-anchor" aria-labelledby="brunello-title">
     <div className="cinema-title"><h2 id="brunello-title">BRUNELLO<br/>CUCINELLI</h2><p>A cinematic commercial film.</p></div>
     <Work project={by('03')} onOpen={open} className="brunello-wide"/>
    </section>
    <div className="beauty-material"><Work project={by('05')} onOpen={open} className="beauty-portrait"/><div className="material-column"><p className="material-note">From a lived-in moment<br/>to the smallest detail.</p><Work project={by('06')} onOpen={open} className="material-film"/></div></div>
    <section className="tiffany-chapter" aria-labelledby="tiffany-title">
     <div className="jewelry-intro"><h2 id="tiffany-title">An object.<br/>A story.</h2><Work project={by('07')} onOpen={open} className="tiffany-story"/></div>
     <Work project={by('08')} onOpen={open} className="tiffany-cinema"/>
    </section>
    <section className="aura-chapter" aria-labelledby="aura-title">
     <h2 id="aura-title">AURA<br/><span>ROYALE</span></h2>
     <div className="aura-composition"><Work project={by('09')} onOpen={open} className="aura-motion"/><Work project={by('10')} onOpen={open} className="aura-photo"/></div>
    </section>
    <details className="more-work"><summary>More from the practice <span aria-hidden="true">+</span></summary><div className="more-work-list">{extraProjects.map(p=><button key={p.id} className="archive-row" onClick={()=>open(p)}><img src={p.poster} alt="" loading="lazy"/><span><strong>{p.title}</strong><small>{p.category}</small></span><span aria-hidden="true">↗</span></button>)}</div></details>
   </section>
   <section id="practice" className="practice-section">
    <p className="section-kicker">WHY VESAGE</p>
    <h2 className="practice-statement" aria-label={statement}>{statement.split(' ').map((word,i)=><span aria-hidden="true" className={`statement-word ${i>=6?'statement-response':''}`} key={i}>{word}{' '}</span>)}</h2>
    <div className="practice-bottom"><p className="practice-position">VESAGE was built around a simple belief: ambitious brands should not have to choose between beautiful work and staying visible.</p><div className="practice-copy"><h3>An artist’s eye. A commercial purpose.</h3><p>We are an independent creative practice combining creative direction, digital craft and a lean production process.</p><p>More focus on your campaign. Less dependence on crews, sets and locations. So your budget can go further into the work your customers see.</p></div></div>
    <div className="disciplines" aria-label="Disciplines"><span>Creative direction</span><span>Film & motion</span><span>Brand imagery</span><span>Digital experiences</span></div>
    <BusinessStory/>
   </section>
   <section id="lab" className="lab-section">
    <div className="lab-heading"><h2>VESAGE LAB</h2><p>A space for experiments.<br/>No client. Just an idea, directed.</p></div>
    <button className="lab-film" onClick={()=>open(identityProject)} aria-label="Watch the VESAGE identity experiment"><img src="/assets/world/lab-detail.webp" alt="A close study of light moving across black sculptural silk." loading="lazy"/><span>Watch study <span aria-hidden="true">↗</span></span></button>
    <div className="lab-chapters"><article><h3>Form.</h3><p>The silhouette.</p></article><article><h3>Light.</h3><p>The reveal.</p></article><article><h3>Image.</h3><p>The final frame.</p></article></div>
   </section>
   <section id="contact" className="contact-section">
    <a className="contact-heading" href="#project-brief"><span>Start a<br/>project.</span><span aria-hidden="true">↗</span></a>
    <div className="contact-body" id="project-brief"><div><h2>What should your brand do next?</h2><p>A launch. A fresh direction.<br/>A stronger presence.<br/>Tell us what you have in mind.</p></div><ContactForm/></div>
   </section>
  </main>
  <footer className="site-footer"><a href="#opening" className="footer-wordmark">VESAGE</a><p>Independent by design.</p><span>© {new Date().getFullYear()} VESAGE</span><a href="#opening">Back to top ↑</a></footer>
  <ProjectViewer project={selected} onClose={()=>setSelected(null)}/><VesageMotion/>
 </div>;
}
