const brandProblems = [
 { pain:'Struggling to stay visible?',solution:'A coordinated supply of campaign-ready assets helps you show up consistently without starting a new production every time.' },
 { pain:'Looking different across every channel?',solution:'One considered visual direction makes your brand more recognisable across ads, social posts and product pages.' },
 { pain:'Getting attention without communicating value?',solution:'Product-led content helps customers understand what you offer and why it deserves their consideration.' },
 { pain:'Spending your budget on one campaign?',solution:'Multiple formats and creative variations give you more ways to use, test and adapt your content.' },
];
const kitFormats=['Ads','UGC','Catalogue videos','Carousels','Product banners','Cinematic commercials'];

export function BrandValue(){
 return <section className="growth-story brand-value" id="brand-value" aria-labelledby="brand-value-title">
  <div className="growth-image"><img src="/assets/work/noor-poster.webp" alt="Noor & Bean campaign imagery showing cold brew coffee and the message Make Time for the Pour." loading="lazy"/><p>Campaign imagery / Noor & Bean</p></div>
  <div className="growth-copy"><h2 id="brand-value-title">Your marketing budget<br/>should build your brand.</h2>
   <p>Paying for beautiful content means little if you still have an empty content calendar, inconsistent visuals and no clear message about why customers should choose you.</p>
   <p className="value-lead">VESAGE builds marketing kits to solve those problems.</p>
   <div className="value-questions">{brandProblems.map((item,i)=><details name="brand-problems" key={item.pain} open={i===0}><summary>{item.pain}<span className="question-plus" aria-hidden="true">+</span></summary><p>{item.solution}</p></details>)}</div>
   <p className="growth-conclusion">You’re not simply paying for files. You’re investing in clearer communication, stronger brand recognition and a more sustainable way to keep marketing.</p>
   <p className="value-closing">Not just more content.<br/>More useful work from your marketing budget.</p>
  </div>
 </section>;
}

export function MarketingKit(){
 return <section className="marketing-kit" id="marketing-kits" aria-labelledby="marketing-kit-title">
  <h2 id="marketing-kit-title">Look like a brand.<br/>Every day.</h2>
  <p className="kit-opening">A great product needs more than one good campaign. It needs a consistent presence wherever your customers spend their time.</p>
  <div className="kit-body"><div className="kit-problem"><p>But keeping that presence alive is demanding. There is always another post, another launch, another ad to make.</p><p>Traditional shoots can turn every new idea into another production bill and another wait.</p><p className="kit-answer">VESAGE makes consistent, premium marketing more achievable.</p></div><div className="kit-delivery"><p>We turn your product pictures into coordinated marketing kits, ready for your channels and content calendar.</p><ul aria-label="Available marketing-kit formats">{kitFormats.map(format=><li key={format}>{format}</li>)}</ul><p>Not disconnected posts. A recognisable brand presence, with considered visuals and a clear message across every format.</p></div></div>
  <div className="kit-value"><h3>Premium in presentation.<br/>Practical in price.</h3><div><p>Our leaner production approach keeps costs manageable, so you can keep marketing, not spend your entire budget on a single shoot.</p><p>Use your kit to show up regularly, test different messages, explain your product and give people more reasons to choose you.</p><p className="kit-purchase">Content designed to support the journey from first impression to purchase.</p></div></div>
 </section>;
}
