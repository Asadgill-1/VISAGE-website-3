import { useState, type FormEvent } from 'react';
import { submitInquiry } from '@/lib/inquiry.functions';

export function ContactForm() {
 const [pending,setPending]=useState(false);
 const [error,setError]=useState('');
 const [receipt,setReceipt]=useState('');
 const submit=async(event:FormEvent<HTMLFormElement>)=>{
  event.preventDefault();if(pending)return;
  const form=event.currentTarget;const data=new FormData(form);
  setPending(true);setError('');
  try{const result=await submitInquiry({data:{name:String(data.get('name')??''),email:String(data.get('email')??''),phone:String(data.get('phone')??''),brand:String(data.get('brand')??''),brief:String(data.get('brief')??''),website:String(data.get('website')??'')}});setReceipt(result.receipt);form.reset();}
  catch(e){setError(e instanceof Error&&e.message.length<160&&!e.message.includes('{')?e.message:'Your brief could not be saved. Please check the fields and try again.');}
  finally{setPending(false);}
 };
 if(receipt)return <div className="inquiry-receipt" role="status"><span className="receipt-glyph" aria-hidden="true">✓</span><h3>Your brief is saved.</h3><p>Thank you for sharing your project with VESAGE.</p><p className="receipt-code">Reference {receipt.slice(0,8).toUpperCase()}</p><button onClick={()=>setReceipt('')}>Send another brief <span aria-hidden="true">↗</span></button></div>;
 return <form onSubmit={submit} className="inquiry-form" aria-label="Start a project" aria-busy={pending}>
  <div className="form-row"><label>Your name<input name="name" autoComplete="name" required minLength={2} maxLength={100}/></label><label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254}/></label></div>
  <div className="form-row"><label>WhatsApp or phone <span>(optional)</span><input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="+971 50 000 0000"/></label><label>Brand or company <span>(optional)</span><input name="brand" autoComplete="organization" maxLength={200}/></label></div>
  <label>What do you have in mind?<textarea name="brief" required minLength={15} maxLength={5000} rows={3} placeholder="Your product, an idea, a timeline. Links welcome."/></label>
  <div className="honeypot" aria-hidden="true"><label>Leave empty<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
  {error&&<p className="form-error" role="alert">{error}</p>}
  <div className="form-bottom"><p>Your details are stored with your inquiry and used to respond to your project.</p><button type="submit" className="send-brief" disabled={pending}>{pending?'Saving brief…':'Send brief'}<span aria-hidden="true">↗</span></button></div>
 </form>;
}
