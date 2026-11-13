import React, { useMemo, useState } from 'react';
import { catalogueProducts } from './catalogue';
import { ArrowRight, ArrowUpRight, BadgeCheck, Check, ChevronDown, ChevronLeft, ChevronRight, Menu, MessageCircle, PackageCheck, Search, ShoppingBag, ShieldCheck, Truck, X } from 'lucide-react';

const WA='923204855261';
const categories=[
 {name:'All Products',slug:'products',icon:'▦'},
 {name:'Food Packaging',slug:'food-packaging',icon:'▣'},
 {name:'Disposable Items',slug:'disposable-items',icon:'◈'},
 {name:'Shopping Bags',slug:'shopping-bags',icon:'▤'},
 {name:'Food Bags',slug:'food-bags',icon:'▧'},
 {name:'Pizza Boxes',slug:'pizza-boxes',icon:'▣'},
 {name:'Paper Products',slug:'paper-products',icon:'▤'},
 {name:'Cake Boxes',slug:'cake-boxes',icon:'▣'},
 {name:'Bottles & Cups',slug:'bottles-cups',icon:'◉'},
 {name:'Pouches',slug:'pouches',icon:'▱'},
 {name:'Custom Boxes',slug:'custom-boxes',icon:'▣'},
 {name:'Shawarma Boxes',slug:'shawarma-boxes',icon:'▣'},
 {name:'Umrah Tabarruk Boxes',slug:'umrah-tabarruk-boxes',icon:'◇'},
 {name:'Other Supplies',slug:'other-supplies',icon:'＋'}
];
const slides=[
 {eyebrow:'WHOLESALE PACKAGING • LAHORE',title:'Packaging made simple for your business.',copy:'Shop everyday food packaging, disposable supplies and carry bags from one convenient store.',image:'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1500&q=90',cta:'Explore food packaging',url:'/food-packaging',tone:'green'},
 {eyebrow:'FOR CAFÉS, RESTAURANTS & TAKEAWAYS',title:'Serve better. Pack smarter.',copy:'Find practical takeaway boxes, cups, bowls and serving essentials for your food business.',image:'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1500&q=90',cta:'Shop disposable items',url:'/disposable-items',tone:'sand'},
 {eyebrow:'RETAIL & WHOLESALE SUPPLIES',title:'Everyday bags. Reliable supply.',copy:'Explore shopping bags, paper products and packaging options for shops and retailers.',image:'https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1500&q=90',cta:'Browse shopping bags',url:'/shopping-bags',tone:'olive'}
];
const slugify=s=>String(s||'').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const imageUrl=id=>String(id||'').startsWith('http')?id:'https://images.unsplash.com/'+(id||'photo-1601050690597-df0568f70950')+'?auto=format&fit=crop&w=900&q=85';
const wa=t=>'https://wa.me/'+WA+'?text='+encodeURIComponent(t);
function Logo(){return <span className="sps-logo"><svg viewBox="0 0 48 48" aria-hidden="true"><rect x="2" y="2" width="44" height="44" rx="13" fill="#174c39"/><path d="M13 19h22l-2 18H15z" fill="#f3f7e9"/><path d="M18 19v-3a6 6 0 0 1 12 0v3" fill="none" stroke="#f3f7e9" strokeWidth="2.5" strokeLinecap="round"/><path d="M19 28c3-4 7-4 10-1-4 1-6 3-7 6" fill="none" stroke="#4b7854" strokeWidth="2" strokeLinecap="round"/></svg></span>}
function Header({query,setQuery,onSearch,cartCount,onCart}){const [menu,setMenu]=useState(false);return <><div className="store-topbar"><div><span>WHOLESALE PACKAGING & DISPOSABLE SUPPLIES</span><span className="store-topbar-note"><Truck size={14}/> Band Road, Lahore · Pakistan</span></div></div><header className="store-header"><a href="/" className="store-brand"><Logo/><span>SHAKIR<strong>PLASTIC STORE</strong></span></a><form className="store-search" onSubmit={e=>{e.preventDefault();onSearch()}}><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products, categories..."/><button type="submit">Search</button></form><div className="store-head-actions"><a href={wa('Assalam-o-Alaikum! Please share your wholesale catalogue and rates.')} target="_blank" rel="noreferrer" className="store-head-contact"><MessageCircle size={17}/><span>Get a Quote</span></a><button className="store-cart" onClick={onCart} aria-label="Open enquiry list"><ShoppingBag size={20}/><span>Enquiry</span><b>{cartCount}</b></button><button className="store-mobile-toggle" onClick={()=>setMenu(!menu)} aria-label="Toggle navigation">{menu?<X/>:<Menu/>}</button></div></header><nav className={menu?'store-nav is-open':'store-nav'}><a href="/">Home</a><a href="/products">All Products</a><div className="store-nav-drop"><a href="/food-packaging">Food Packaging <ChevronDown size={13}/></a><div className="store-nav-menu">{categories.filter(c=>['Food Packaging','Disposable Items','Food Bags','Pizza Boxes','Cake Boxes','Shawarma Boxes'].includes(c.name)).map(c=><a href={'/'+c.slug} key={c.slug}>{c.name}</a>)}</div></div><div className="store-nav-drop"><a href="/products">Shop Categories <ChevronDown size={13}/></a><div className="store-nav-menu">{categories.slice(1).map(c=><a href={'/'+c.slug} key={c.slug}>{c.name}</a>)}</div></div><a href="/about">About Us</a><a href="/contact">Contact</a><a className="store-nav-wholesale" href={wa('Assalam-o-Alaikum! I need wholesale product rates.')} target="_blank" rel="noreferrer">Wholesale Enquiry <ArrowUpRight size={14}/></a></nav></>}
function ProductCard({p,onAdd}){return <article className="bazaar-product"><a className="bazaar-product-image" href={'/product/'+p.slug} aria-label={'View '+p.name}><img src={imageUrl(p.image)} alt={p.name} loading="lazy"/>{p.tag&&<span>{p.tag}</span>}</a><div className="bazaar-product-body"><small>{p.category}</small><h3><a href={'/product/'+p.slug}>{p.name}</a></h3><p>{p.detail||'Wholesale packaging supply'}</p><div className="bazaar-product-bottom"><strong>{p.price||'Ask for price'}</strong><button onClick={()=>onAdd(p)} aria-label={'Add '+p.name+' to enquiry'}><ShoppingBag size={16}/> Add</button></div></div></article>}
function App(){
 const [query,setQuery]=useState('');
 const [active,setActive]=useState('All Products');
 const [slide,setSlide]=useState(0);
 const [cart,setCart]=useState([]);
 const [cartOpen,setCartOpen]=useState(false);
 const [notice,setNotice]=useState('');
 const [searchRun,setSearchRun]=useState(false);
 const products=useMemo(()=>{try{const saved=JSON.parse(localStorage.getItem('sps-products-v1')||'[]');const known=new Set(catalogueProducts.map(p=>String(p.name||'').toLowerCase()));return [...catalogueProducts,...saved.filter(p=>!known.has(String(p.name||'').toLowerCase())).map(p=>({...p,slug:p.slug||slugify(p.name)}))]}catch{return catalogueProducts}},[]);
 const visible=useMemo(()=>products.filter(p=>(active==='All Products'||p.category===active)&&(p.name+' '+p.category+' '+(p.detail||'')).toLowerCase().includes(query.toLowerCase())),[products,active,query]);
 const add=p=>{setCart(old=>old.some(x=>x.slug===p.slug)?old:[...old,p]);setNotice(p.name+' added to your enquiry list');window.setTimeout(()=>setNotice(''),2200)};
 const remove=slug=>setCart(old=>old.filter(p=>p.slug!==slug));
 const send=wa('Assalam-o-Alaikum Shakir Plastic Store! I need wholesale prices for:\n'+cart.map(p=>'• '+p.name).join('\n')+'\nPlease confirm current rates and availability.');
 const current=slides[slide];
 const changeCategory=name=>{setActive(name);document.getElementById('catalogue')?.scrollIntoView({behavior:'smooth'})};
 const featured=products.slice(0,8);
 return <div className="bazaar-shell">
  <Header query={query} setQuery={setQuery} onSearch={()=>{setSearchRun(true);document.getElementById('catalogue')?.scrollIntoView({behavior:'smooth'})}} cartCount={cart.length} onCart={()=>setCartOpen(true)}/>
  <main>
   <section className="bazaar-hero-wrap">
    <aside className="bazaar-category-sidebar"><div className="bazaar-sidebar-title">SHOP BY CATEGORY <ChevronDown size={15}/></div>{categories.slice(1).map(c=><a key={c.slug} href={'/'+c.slug}><span>{c.icon}</span>{c.name}<ChevronRight size={14}/></a>)}<a className="bazaar-all-cats" href="/products">View all categories <ArrowRight size={15}/></a></aside>
    <div className={'bazaar-hero-slide '+current.tone} style={{backgroundImage:'linear-gradient(90deg,rgba(15,47,34,.88) 0%,rgba(15,47,34,.56) 48%,rgba(15,47,34,.08) 100%),url('+current.image+')'}}>
      <div className="bazaar-hero-content"><span className="bazaar-eyebrow">{current.eyebrow}</span><h1>{current.title}</h1><p>{current.copy}</p><a href={current.url} className="bazaar-primary-btn">{current.cta} <ArrowRight size={17}/></a><div className="bazaar-slide-dots">{slides.map((s,i)=><button key={s.title} onClick={()=>setSlide(i)} className={slide===i?'active':''} aria-label={'Show slide '+(i+1)}/>)}</div></div>
      <button className="bazaar-slide-arrow prev" onClick={()=>setSlide((slide+slides.length-1)%slides.length)} aria-label="Previous banner"><ChevronLeft/></button><button className="bazaar-slide-arrow next" onClick={()=>setSlide((slide+1)%slides.length)} aria-label="Next banner"><ChevronRight/></button>
      <div className="bazaar-hero-brand">SHAKIR <b>PLASTIC STORE</b></div>
    </div>
   </section>
   <section className="bazaar-benefits"><div><Truck/><span><b>Wholesale Enquiries</b><small>Bulk quantity support</small></span></div><div><PackageCheck/><span><b>Wide Product Range</b><small>Packaging for every business</small></span></div><div><ShieldCheck/><span><b>Helpful Service</b><small>Talk directly with our team</small></span></div><div><BadgeCheck/><span><b>Store in Lahore</b><small>Band Road location</small></span></div></section>
   <section className="bazaar-categories-section"><div className="bazaar-section-title"><div><span>EXPLORE THE STORE</span><h2>Shop by category</h2></div><a href="/products">View all categories <ArrowRight size={16}/></a></div><div className="bazaar-category-tiles">{categories.slice(1,9).map(c=><a href={'/'+c.slug} key={c.slug}><span>{c.icon}</span><b>{c.name}</b><small>Explore collection <ArrowUpRight size={13}/></small></a>)}</div></section>
   <section className="bazaar-products-section" id="catalogue"><div className="bazaar-section-title"><div><span>POPULAR PICKS</span><h2>{active==='All Products'?'Products for your business':active}</h2></div><a href="/products">View full catalogue <ArrowRight size={16}/></a></div>
    <div className="bazaar-filters">{categories.map(c=><button key={c.name} onClick={()=>setActive(c.name)} className={active===c.name?'active':''}>{c.name}</button>)}</div>
    <div className="bazaar-product-grid">{(searchRun?visible:visible.slice(0,12)).map(p=><ProductCard key={p.slug||p.id} p={p} onAdd={add}/>)}</div>
    {visible.length===0&&<div className="bazaar-no-results">No products match your search. Try another keyword or <button onClick={()=>{setQuery('');setActive('All Products')}}>view all products</button>.</div>}
    {visible.length>12&&!searchRun&&<div className="bazaar-view-more"><button onClick={()=>setSearchRun(true)}>View more products <ArrowRight size={16}/></button></div>}
   </section>
   <section className="bazaar-promo-row"><a href="/disposable-items" className="bazaar-promo-card"><img src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=85" alt="Disposable cups"/><span><small>CAFÉS & FOOD BUSINESSES</small><b>Disposable essentials<br/>for daily service</b><strong>Explore now <ArrowRight size={14}/></strong></span></a><a href="/shopping-bags" className="bazaar-promo-card"><img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=900&q=85" alt="Shopping bags"/><span><small>RETAIL & SHOPS</small><b>Shopping bags for<br/>everyday business</b><strong>Explore now <ArrowRight size={14}/></strong></span></a></section>
   <section className="bazaar-about-strip"><div><span>SHAKIR PLASTIC STORE · LAHORE</span><h2>Your everyday packaging partner.</h2><p>From food containers and takeaway boxes to shopping bags and disposable supplies, we help businesses find the everyday essentials they need.</p><a href="/about">Learn about our store <ArrowRight size={16}/></a></div><img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1000&q=85" alt="Retail packaging supplies"/></section>
   <section className="bazaar-contact-strip"><div><span>NEED WHOLESALE RATES?</span><h2>Tell us what your business needs.</h2><p>Share your product, size and quantity. Our team can help confirm availability and current pricing.</p></div><a href={wa('Assalam-o-Alaikum! I need wholesale rates and product availability.')} target="_blank" rel="noreferrer"><MessageCircle size={18}/> WhatsApp Shakir Store</a></section>
  </main>
  <footer className="bazaar-footer"><div className="bazaar-footer-main"><a href="/" className="store-brand"><Logo/><span>SHAKIR<strong>PLASTIC STORE</strong></span></a><p>Wholesale packaging and disposable supplies for shops, cafés, restaurants and businesses.</p><div><b>Quick Links</b><a href="/products">All Products</a><a href="/about">About Us</a><a href="/contact">Contact</a></div><div><b>Contact</b><a href="tel:+923204855261">0320 4855261</a><span>Band Road, Lahore, Pakistan</span></div></div><div className="bazaar-footer-bottom"><span>© {new Date().getFullYear()} Shakir Plastic Store. All rights reserved.</span><a href="/contact">Contact & store details</a></div></footer>
  {notice&&<div className="bazaar-toast"><Check size={16}/>{notice}</div>}
  {cartOpen&&<div className="bazaar-cart-backdrop" onClick={()=>setCartOpen(false)}><aside className="bazaar-cart" onClick={e=>e.stopPropagation()}><div className="bazaar-cart-head"><div><small>YOUR SHORTLIST</small><h2>Product Enquiry ({cart.length})</h2></div><button onClick={()=>setCartOpen(false)} aria-label="Close enquiry"><X/></button></div>{cart.length===0?<div className="bazaar-cart-empty"><ShoppingBag size={38}/><h3>Your enquiry list is empty</h3><p>Add products to send a single wholesale enquiry.</p><button onClick={()=>setCartOpen(false)}>Continue shopping</button></div>:<><div className="bazaar-cart-items">{cart.map(p=><div key={p.slug}><img src={imageUrl(p.image)} alt=""/><span><b>{p.name}</b><small>{p.category}</small></span><button onClick={()=>remove(p.slug)} aria-label={'Remove '+p.name}><X size={16}/></button></div>)}</div><a className="bazaar-send-enquiry" href={send} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Send enquiry on WhatsApp</a></>}</aside></div>}
 </div>;
}
export default App;
