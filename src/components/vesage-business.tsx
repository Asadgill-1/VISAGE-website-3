import { BrandValue, MarketingKit } from './vesage-marketing-kit';

export function BusinessIntro() {
 return <section className="business-intro" aria-labelledby="business-intro-title">
  <h2 id="business-intro-title">A good product deserves<br/>to be seen.</h2>
  <div className="business-intro-copy"><p>Today, your next customer meets your brand long before they decide to buy. In a feed. In an ad. On a product page.</p><p>VESAGE helps you make those moments count, with distinctive campaigns that make your product easier to notice, understand and remember.</p></div>
 </section>;
}

const differences = [
 {title:'The overhead',traditional:'Studio hire, crew, casting, locations and equipment can add cost before the first image is made.',vesage:'Start with your product pictures. Build the campaign around the idea, without organising a full physical shoot.'},
 {title:'The waiting',traditional:'Booking people, locations and shoot days can mean weeks of coordination before editing even begins.',vesage:'A focused, digitally led workflow reduces those dependencies, making shorter turnarounds possible.'},
 {title:'The next idea',traditional:'A new setting or creative direction may require another production day and another round of logistics.',vesage:'Develop fresh scenes, formats and campaign variations without rebuilding a physical set.'},
];

export function BusinessStory() {
 return <div className="business-story">
  <BrandValue/>
  <section className="production-story" aria-labelledby="production-title">
   <h2 id="production-title">Less production overhead.<br/>More room for the idea.</h2>
   <p className="production-intro">Traditional shoots can create beautiful work. But not every product campaign needs the cost, coordination and calendar of a full production.</p>
   <div className="production-comparison" role="table" aria-label="Traditional shoots and the VESAGE approach">
    <div className="comparison-head" role="row"><span role="columnheader" className="comparison-spacer">What changes</span><h3 role="columnheader">The traditional shoot</h3><h3 role="columnheader">The VESAGE approach</h3></div>
    {differences.map(item=><div className="comparison-row" role="row" key={item.title}><h4 role="rowheader">{item.title}</h4><div role="cell"><span className="comparison-mobile-label">The traditional shoot</span><p>{item.traditional}</p></div><div role="cell"><span className="comparison-mobile-label">The VESAGE approach</span><p>{item.vesage}</p></div></div>)}
   </div>
   <p className="production-note">For brands that need an ongoing flow of product-led content, this means a more flexible way to market, not just another one-off shoot.</p>
  </section>
  <MarketingKit/>
  <section className="working-story" aria-labelledby="working-title"><h2 id="working-title">From your product<br/>to your next campaign.</h2><div className="working-copy"><p>Share your product pictures, your audience and what you want the campaign to do. We shape the concept, direct the visuals and refine the work with you.</p><p>You receive campaign-ready films and imagery for your agreed channels. A considered visual direction, with a simpler path from brief to launch.</p><a className="story-contact" href="#contact">Start a project <span aria-hidden="true">↗</span></a></div></section>
 </div>;
}
