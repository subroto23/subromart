import { bi, products } from './data/content.mjs';
import { profile, tr, href, icon, button, sectionHead, devices, productCard, faqBlock, ctaBlock } from './ui.mjs';
import { trustStrip } from './trust.mjs';

export function home(lang) {
 const t=value=>tr(value,lang);
 const offerings=[
  ['solutions','grid',bi('Business software','বিজনেস সফটওয়্যার')],
  ['services/web-development','globe',bi('Websites & platforms','ওয়েবসাইট ও প্ল্যাটফর্ম')],
  ['services/mobile-apps','phone',bi('Mobile apps','মোবাইল অ্যাপ')],
  ['services/maintenance','shield',bi('Maintenance','মেইনটেন্যান্স')]
 ];
 const benefits=[
  [bi('Fits your workflow','আপনার কাজের উপযোগী'),bi('Choose your modules. Customise what matters.','প্রয়োজনীয় মডিউল নিন। নিজের মতো সাজান।')],
  [bi('One accountable team','দায়িত্বে একই টিম'),bi('Design, development and support, together.','ডিজাইন, ডেভেলপমেন্ট ও সাপোর্ট একসঙ্গে।')],
  [bi('Clear scope. Clear cost.','পরিষ্কার কাজ, পরিষ্কার খরচ'),bi('Agree deliverables and pricing before we start.','শুরুর আগেই কাজ ও মূল্য নির্ধারণ।')]
 ];
 return `
 <section class="home-hero container compact-hero">
  <div class="home-intro"><p class="eyebrow">${t(bi('SOFTWARE. WEB. MOBILE.','সফটওয়্যার। ওয়েব। মোবাইল।'))}</p>
   <h1>${t(bi('<span class="hero-line">Your software.</span> <span class="hero-line hero-line-accent">Our responsibility.</span>','<span class="hero-line">সফটওয়্যার আপনার।</span> <span class="hero-line hero-line-accent">দায়িত্ব আমাদের।</span>'))}</h1>
   <p class="home-lead">${t(bi('Business software, websites and apps. Built for you. Managed by us.','বিজনেস সফটওয়্যার, ওয়েবসাইট ও অ্যাপ—তৈরি থেকে মেইনটেন্যান্স, এক জায়গায়।'))}</p>
   <div class="button-row">${button(t(bi('Start a project','প্রজেক্ট শুরু করুন')),href('contact',lang),'dark')}${button(t(bi('Explore software','সফটওয়্যার দেখুন')),'#solutions','text')}</div>
  </div>
  <div class="hero-visual hero-product-stage">${devices(lang)}
   <div class="hero-preview-controls js-only"><span class="preview-label">${t(bi('PRODUCT PREVIEW','প্রোডাক্ট প্রিভিউ'))}</span><div class="preview-dots">${['school','health','commerce'].map((d,i)=>`<button type="button" data-hero-demo="${d}" aria-label="${d} preview" aria-pressed="${i===0}" class="${i===0?'active':''}"></button>`).join('')}</div><span class="preview-current" id="hero-preview-label">CampusOS</span><button type="button" class="icon-btn preview-pause" id="hero-pause" aria-label="${t(bi('Pause preview rotation','প্রিভিউ পাল্টানো বন্ধ করুন'))}" aria-pressed="false">${icon('pause')}</button></div>
   <p class="preview-caption">${t(bi('Sample data · Laptop, tablet & mobile','নমুনা তথ্য · ল্যাপটপ, ট্যাব ও মোবাইল'))}</p>
  </div>
 </section>
 <nav class="service-rail container" aria-label="${t(bi('Our services','আমাদের সেবা'))}">${offerings.map(([slug,ico,name])=>`<a href="${href(slug,lang)}">${icon(ico)}<span>${t(name)}</span>${icon('up')}</a>`).join('')}</nav>

 <section class="section container home-solutions" id="solutions">${sectionHead(t(bi('BUILT FOR YOUR INDUSTRY','আপনার খাতের জন্য')),t(bi('Find your starting point.','আপনার সলিউশন বেছে নিন।')),'',button(t(bi('All 8 solutions','৮টি সলিউশন দেখুন')),href('solutions',lang),'text'))}<div class="product-grid">${products.slice(0,3).map(p=>productCard(p,lang,true)).join('')}</div><p class="section-note">${t(bi('Configured to your scope. Request a demo before you decide.','আপনার প্রয়োজন অনুযায়ী কনফিগার করা হবে। সিদ্ধান্তের আগে ডেমো দেখুন।'))}</p></section>

 <section class="section container compact-value"><div><p class="eyebrow">${t(bi('WHY SUBROMART','কেন SUBROMART'))}</p><h2>${t(bi('Less to manage.<br>More to get done.','পরিচালনার ঝামেলা কম।<br>কাজ এগোবে বেশি।'))}</h2><div class="value-points">${benefits.map(([title,description])=>`<article>${icon('check')}<div><h3>${t(title)}</h3><p>${t(description)}</p></div></article>`).join('')}</div><a class="text-link" href="${href('how-we-work',lang)}">${t(bi('How we work','যেভাবে কাজ করি'))}${icon('arrow')}</a></div><aside class="care-card"><p class="eyebrow">${t(bi('AFTER LAUNCH, TOO','লঞ্চের পরও পাশে'))}</p><h2>${t(bi('Your extended<br>tech team.','আপনার প্রযুক্তির<br>দায়িত্বে আমরা।'))}</h2><ul>${[bi('Updates & bug fixes','আপডেট ও বাগ ফিক্স'),bi('Monitoring & backups','মনিটরিং ও ব্যাকআপ'),bi('Planned improvements','পরিকল্পিত নতুন ফিচার')].map(s=>`<li>${icon('check')}${t(s)}</li>`).join('')}</ul>${button(t(bi('Explore maintenance','মেইনটেন্যান্স দেখুন')),href('services/maintenance',lang))}<small>${t(bi('Support coverage agreed in your plan.','আপনার প্ল্যান অনুযায়ী সাপোর্ট।'))}</small></aside></section>

 <section class="section container compact-founder"><div class="founder-strip"><div class="founder-image"><img src="/assets/subroto-das.webp" alt="${t(bi('Subroto Das, founder of Subromart','সুব্রত দাস, Subromart-এর প্রতিষ্ঠাতা'))}" width="400" height="440" loading="lazy"></div><div><p class="eyebrow">${t(bi('MEET YOUR TECHNOLOGY PARTNER','আপনার প্রযুক্তি সহযোগী'))}</p><h2>${t(bi('Talk to the person<br>behind the work.','সরাসরি কথা বলুন।<br>একসঙ্গে শুরু করি।'))}</h2><p>${t(bi('I’m Subroto Das. Tell me what needs to work better. We’ll plan the software around it.','আমি সুব্রত দাস। কোন কাজটি সহজ করতে চান, বলুন। সেটি নিয়েই পরিকল্পনা শুরু করি।'))}</p><div class="founder-sign"><span><strong>${t(bi('Subroto Das','সুব্রত দাস'))}</strong><small>Founder & CEO</small></span><a class="text-link" href="${href('subroto-das',lang)}">${t(bi('Meet Subroto Das','সুব্রত দাসকে জানুন'))}${icon('up')}</a></div><a href="${href('work',lang)}" class="text-link founder-work-link">${t(bi('Explore my work','আমার কাজ দেখুন'))}${icon('arrow')}</a></div></div></section>
 ${trustStrip(lang)}
 <section class="section container faq-section compact-faq"><div>${sectionHead(t(bi('QUICK ANSWERS','সংক্ষিপ্ত উত্তর')),t(bi('Before we start.','শুরুর আগে।')))}<a href="${href('faq',lang)}" class="text-link">${t(bi('All questions','সব প্রশ্ন'))}${icon('arrow')}</a></div>${faqBlock(lang,3)}</section>
 ${ctaBlock(lang)}`;
}
