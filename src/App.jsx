import React, { useMemo, useState } from 'react';
import { catalogueProducts } from './catalogue';
import { ArrowRight, ArrowUpRight, BadgeCheck, Check, ChevronDown, Clock3, Leaf, Menu, MessageCircle, PackageCheck, Search, ShoppingBag, ShieldCheck, Truck, X } from 'lucide-react';

const waNumber = '923204855261';
const categories = [
  { name: 'All Products', count: 'Explore all', icon: '✳' },
  { name: 'Shopping Bags', count: 'Carry with confidence', icon: '🛍' },
  { name: 'Food Bags', count: 'Freshness made easy', icon: '🥡' },
  { name: 'Pizza Boxes', count: 'Made for every slice', icon: '🍕' },
  { name: 'Disposable Items', count: 'Everyday essentials', icon: '🥤' },
  { name: 'Food Packaging', count: 'Pack it right', icon: '📦' },
  { name: 'Paper Products', count: 'Smart serving solutions', icon: '📄' },
  { name: 'Cake Boxes', count: 'Bakery packaging', icon: '🎂' },
  { name: 'Bottles & Cups', count: 'Cups and drinkware', icon: '🥤' },
  { name: 'Pouches', count: 'Flexible packaging', icon: '🛍' },
  { name: 'Custom Boxes', count: 'Gift and retail boxes', icon: '🎁' },
  { name: 'Umrah Tabarruk Boxes', count: 'Thoughtful Umrah return gifts', icon: '🕋' },
  { name: 'Shawarma Boxes', count: 'Takeaway shawarma packaging', icon: '🌯' },
  { name: 'Other Supplies', count: 'Additional essentials', icon: '📦' }
];
const defaultProducts = [
  { id: 1, name: 'Printed Shopping Bags', category: 'Shopping Bags', detail: 'Customisable • Multiple sizes', image: 'photo-1607082349566-187342175e2f', tag: 'Popular' },
  { id: 2, name: 'Plain Plastic Shopping Bags', category: 'Shopping Bags', detail: 'Strong everyday carry bags', image: 'photo-1602143407151-7111542de6e8', tag: 'Wholesale' },
  { id: 3, name: 'Food Packing Bags', category: 'Food Bags', detail: 'For bakeries, stores & takeaway', image: 'photo-1606787366850-de6330128bfc', tag: 'Best seller' },
  { id: 4, name: 'Pizza Boxes', category: 'Pizza Boxes', detail: 'Sturdy food-grade packaging', image: 'photo-1579751626657-72bc17010498', tag: 'Popular' },
  { id: 5, name: 'Disposable Cups', category: 'Disposable Items', detail: 'Convenient serving essentials', image: 'photo-1544787219-7f47ccb76574', tag: '' },
  { id: 6, name: 'Disposable Plates & Bowls', category: 'Disposable Items', detail: 'For events, catering & daily use', image: 'photo-1603199506016-b9a594b593c0', tag: '' },
  { id: 7, name: 'Takeaway Food Containers', category: 'Food Packaging', detail: 'Practical takeaway packaging', image: 'photo-1601050690597-df0568f70950', tag: 'Trending' },
  { id: 8, name: 'Paper Bags', category: 'Paper Products', detail: 'A neat option for retail & food', image: 'photo-1607082348824-0a96f2a4b9da', tag: '' },
  { id: 9, name: 'Garbage & Waste Bags', category: 'Food Bags', detail: 'Available in multiple sizes', image: 'photo-1581578731548-c64695cc6952', tag: '' },
  { id: 10, name: 'Bakery & Sweet Boxes', category: 'Food Packaging', detail: 'Packaging for bakery products', image: 'photo-1608198093002-ad4e005484b4', tag: '' },
  { id: 11, name: 'Disposable Cutlery', category: 'Disposable Items', detail: 'Forks, spoons & serving items', image: 'photo-1603199506016-b9a594b593c0', tag: '' },
  { id: 12, name: 'Custom Printed Packaging', category: 'Food Packaging', detail: 'Ask us about bulk custom orders', image: 'photo-1607082349566-187342175e2f', tag: 'Custom' }
];
const slugify = value => String(value || '').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const imageUrl = (id) => String(id || '').startsWith('http://') || String(id || '').startsWith('https://') ? id : `https://images.unsplash.com/${id || 'photo-1607082349566-187342175e2f'}?auto=format&fit=crop&w=900&q=85`;

function StoreLogo(){return <svg className="store-logo-art" viewBox="0 0 64 64" role="img" aria-label="Shakir Plastic Store logo"><defs><linearGradient id="spsLogo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#285f47"/><stop offset="1" stopColor="#102f24"/></linearGradient></defs><circle cx="32" cy="32" r="30" fill="url(#spsLogo)"/><path d="M19 25h26l-2.5 25h-21z" fill="#e3f0c4" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/><path d="M25 26v-4a7 7 0 0 1 14 0v4" fill="none" stroke="#e3f0c4" strokeWidth="3" strokeLinecap="round"/><path d="M26 37c4-7 11-7 15-1-6 0-9 3-11 8" fill="none" stroke="#285f47" strokeWidth="2.5" strokeLinecap="round"/><path d="M30 43c1-5 4-8 9-10" fill="none" stroke="#285f47" strokeWidth="2" strokeLinecap="round"/><circle cx="47" cy="16" r="5" fill="#d9ef8b" stroke="#fff" strokeWidth="1.5"/></svg>}
function App() {
  const [products, setProducts] = useState(() => {
    try { const saved = localStorage.getItem('sps-products-v1'); const extras = saved ? JSON.parse(saved) : defaultProducts; const known = new Set(catalogueProducts.map(p => p.name.toLowerCase())); return [...catalogueProducts, ...extras.filter(p => !known.has(String(p.name || '').toLowerCase())).map(p => ({ ...p, slug: p.slug || slugify(p.name) }))]; }
    catch { return [...catalogueProducts, ...defaultProducts.map(p => ({ ...p, slug: slugify(p.name) }))]; }
  });
  const [active, setActive] = useState('All Products');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const visible = useMemo(() => products.filter(p => (active === 'All Products' || p.category === active) && (p.name + p.category + p.detail).toLowerCase().includes(query.toLowerCase())), [products, active, query]);
  const add = (p) => { setCart(old => old.some(x => x.id === p.id) ? old : [...old, p]); setNotice(p.name + ' added to your enquiry list'); setTimeout(() => setNotice(''), 2600); };
  const remove = id => setCart(old => old.filter(x => x.id !== id));
  const message = encodeURIComponent(`Assalam-o-Alaikum Shakir Plastic Store! I would like to enquire about these products:\n${cart.map(p => '• ' + p.name).join('\n')}\nPlease share wholesale prices and availability.`);
  const whatsapp = cart.length ? `https://wa.me/${waNumber}?text=${message}` : `https://wa.me/${waNumber}?text=${encodeURIComponent('Assalam-o-Alaikum! I would like to enquire about your wholesale products.')}`;
  const selectCategory = name => { setActive(name); setMobileOpen(false); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); };

  return <div className="site-shell">
    <div className="topline"><span>WHOLESALE PACKAGING & DISPOSABLE SUPPLIES</span><span className="topline-right"><span><Truck size={14}/> Bulk orders welcome</span><span className="topline-divider">|</span><span>Band Road, Lahore</span></span></div>
    <header className="header">
      <a className="brand" href="#" aria-label="Shakir Plastic Store home"><span className="brand-mark">{<StoreLogo/>}</span><span className="brand-name">SHAKIR<span>PLASTIC STORE</span></span></a>
      <nav className={mobileOpen ? 'nav nav-open' : 'nav'}>
        <a href="#home" onClick={() => setMobileOpen(false)}>Home</a><div className="nav-dropdown"><button className="nav-dropdown-trigger" type="button" aria-expanded={productMenuOpen} onClick={() => setProductMenuOpen(open => !open)}>Products <ChevronDown size={14}/></button><div className={productMenuOpen ? "nav-dropdown-menu menu-open" : "nav-dropdown-menu"}><a href="/products" onClick={() => setMobileOpen(false)}>All Products</a><a href="/food-bags" onClick={() => setMobileOpen(false)}>Food Bags</a><a href="/shopping-bags" onClick={() => setMobileOpen(false)}>Shopping Bags</a><a href="/pizza-boxes" onClick={() => setMobileOpen(false)}>Pizza Boxes</a><a href="/disposable-items" onClick={() => setMobileOpen(false)}>Disposable Items</a><a href="/food-packaging" onClick={() => setMobileOpen(false)}>Food Packaging</a><a href="/paper-products" onClick={() => setMobileOpen(false)}>Paper Products</a><a href="/umrah-tabarruk-boxes" onClick={() => setMobileOpen(false)}>Umrah Tabarruk Boxes</a><a href="/shawarma-boxes" onClick={() => setMobileOpen(false)}>Shawarma Boxes</a></div></div><a href="/about" onClick={() => setMobileOpen(false)}>About Us</a><a href="/contact" onClick={() => setMobileOpen(false)}>Contact</a>
      </nav>
      <div className="header-actions"><a className="header-whatsapp" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Get a Quote</a><button className="cart-button" onClick={() => setCartOpen(true)} aria-label="Open enquiry list"><ShoppingBag size={19}/><span>Enquiry</span><b>{cart.length}</b></button><button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X/> : <Menu/>}</button></div>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot"></span> YOUR WHOLESALE PACKAGING PARTNER</div><h1>Packaging that<br/><em>works for</em> your<br/>business.</h1><p>From everyday shopping bags to pizza boxes and food packaging — find the essentials your business needs, all in one place.</p><div className="hero-buttons"><a className="btn btn-primary" href="#products">Explore Products <ArrowUpRight size={18}/></a><a className="btn btn-quiet" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18}/> Talk to our team</a></div><div className="hero-proof"><div className="proof-avatars"><span>S</span><span>P</span><span>✓</span></div><div><strong>Wholesale-friendly service</strong><small>For shops, restaurants & businesses</small></div></div></div>
        <div className="hero-visual"><div className="hero-image-main"><img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1200&q=90" alt="Retail packaging and shopping bags"/></div><div className="hero-image-small"><img src="https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=600&q=85" alt="Freshly packed pizza in a box"/></div><div className="hero-sticker"><span>ONE STOP</span><strong>PACKAGING<br/>SHOP</strong><ArrowUpRight size={20}/></div><div className="hero-caption"><span className="caption-line"></span><span>EVERYDAY ESSENTIALS. WHOLESALE VALUE.</span></div></div>
        <div className="hero-side-note">LAHORE · PAKISTAN</div>
      </section>

      <section className="trust-strip"><div><ShieldCheck/><span><b>Quality essentials</b><small>Practical products for daily use</small></span></div><div><PackageCheck/><span><b>Wholesale supply</b><small>Enquire for bulk quantities</small></span></div><div><Truck/><span><b>Business friendly</b><small>Retail, food & trade customers</small></span></div><div><BadgeCheck/><span><b>Personal service</b><small>Talk directly with our team</small></span></div></section>

      <section className="category-section section-pad"><div className="section-heading"><div><div className="eyebrow">FIND WHAT YOU NEED</div><h2>Shop by <em>category.</em></h2></div><p>Explore our everyday packaging and disposable product range.</p></div><div className="category-grid">{categories.slice(1).map((c,i)=><a className="category-card" key={c.name} href={"/"+({'Bottles & Cups':'bottles-cups'}[c.name] || c.name.toLowerCase().replaceAll(" ","-"))}><span className="category-icon">{c.icon}</span><span className="category-info"><b>{c.name}</b><small>{c.count}</small></span><span className="category-arrow"><ArrowUpRight size={18}/></span></a>)}</div></section>

      <section className="products-section section-pad" id="products"><div className="section-heading product-heading"><div><div className="eyebrow">THE EVERYDAY LINEUP</div><h2>Products for <em>every business.</em></h2></div><p>Need a size, style or quantity not listed? Send us an enquiry.</p></div><div className="product-toolbar"><div className="filter-tabs">{categories.map(c=><button key={c.name} className={active===c.name?'filter-tab active':'filter-tab'} onClick={() => setActive(c.name)}>{c.name}</button>)}</div><label className="search-box"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products..."/>{query && <button onClick={()=>setQuery('')} aria-label="Clear search"><X size={15}/></button>}</label></div><div className="product-grid">{visible.map(p=><article className="product-card" key={p.id}><div className="product-image"><a href={p.slug ? '/product/'+p.slug : '/products'} aria-label={'View '+p.name}><img src={imageUrl(p.image)} alt={p.name} loading="lazy"/></a><span className="product-brand-stamp"><StoreLogo/><b>SHAKIR<br/>PLASTIC STORE</b></span>{p.tag && <span className="product-tag">{p.tag}</span>}</div><div className="product-info"><span className="product-category">{p.category}</span><h3>{p.slug ? <a href={'/product/'+p.slug}>{p.name}</a> : p.name}</h3><p>{p.detail}</p>{(p.price || p.stock !== undefined) && <div className="product-admin-meta">{p.price ? <b>{p.price}</b> : <b>Ask for price</b>}{p.stock !== undefined && <small>{Number(p.stock) > 0 ? `In stock: ${p.stock}` : 'Check availability'}</small>}</div>}<a className="enquire-link" href={'/product/'+p.slug}>See Details <ArrowRight size={15}/></a></div></article>)}</div>{visible.length===0 && <div className="empty-state"><Search size={28}/><h3>No products found</h3><p>Try another search or choose a different category.</p><button className="btn btn-primary" onClick={()=>{setQuery('');setActive('All Products')}}>View all products</button></div>}<div className="catalog-cta"><div><span className="eyebrow">LOOKING FOR SOMETHING ELSE?</span><h3>We may have just what you need.</h3><p>Ask about product sizes, custom printing and bulk availability.</p></div><a className="btn btn-light" href={`https://wa.me/${waNumber}?text=${encodeURIComponent('Assalam-o-Alaikum! Please share your complete product catalogue and wholesale rates.')}`} target="_blank" rel="noreferrer">Request full catalogue <ArrowUpRight size={18}/></a></div></section>

      <section className="about-section section-pad" id="about"><div className="about-visual"><img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1100&q=85" alt="Neatly arranged retail packaging supplies"/><div className="about-badge"><strong>ONE</strong><span>RELIABLE<br/>SOURCE</span></div></div><div className="about-copy"><div className="eyebrow">ABOUT SHAKIR PLASTIC STORE</div><h2>Good supplies.<br/><em>Good business.</em></h2><p>We help retailers, restaurants, food businesses and event suppliers find the packaging essentials they use every day. From carry bags and food bags to pizza boxes and disposable serving items, our goal is to make wholesale buying straightforward.</p><div className="about-points"><div><Check/><span><b>A broad everyday range</b><small>Packaging and disposable essentials</small></span></div><div><Check/><span><b>Wholesale enquiries</b><small>Ask about bulk quantities and rates</small></span></div><div><Check/><span><b>Local Lahore presence</b><small>Visit or contact our Band Road store</small></span></div></div><a href="#contact" className="text-link">Get in touch <ArrowUpRight size={17}/></a></div></section>

      <section className="contact-section section-pad" id="contact"><div className="contact-card"><div className="contact-copy"><div className="eyebrow eyebrow-light">LET'S GET YOUR BUSINESS PACKED</div><h2>Need wholesale<br/><em>rates or a quote?</em></h2><p>Tell us what products you need and the quantity. Our team will help you with availability and pricing.</p><a className="btn btn-light" href={`https://wa.me/${waNumber}?text=${encodeURIComponent('Assalam-o-Alaikum Shakir Plastic Store! I need wholesale rates for your products.')}`} target="_blank" rel="noreferrer"><MessageCircle size={18}/> Chat on WhatsApp <ArrowUpRight size={17}/></a></div><div className="contact-details"><div><span>CALL / WHATSAPP</span><a href="tel:+923204855261">0320 4855261</a></div><div><span>VISIT OUR STORE</span><strong>Band Road, Lahore, Pakistan</strong></div><div><span>PRODUCT ENQUIRIES</span><strong>Wholesale & bulk orders welcome</strong></div></div><div className="contact-decoration">SPS</div></div></section>
    </main>
    <footer className="footer"><a className="brand brand-footer" href="#"><span className="brand-mark">{<StoreLogo/>}</span><span className="brand-name">SHAKIR<span>PLASTIC STORE</span></span></a><p>Everyday packaging essentials for businesses.</p><span className="copyright">© {new Date().getFullYear()} Shakir Plastic Store. All rights reserved.</span><a className="footer-top" href="#home">Back to top ↑</a></footer>

    {notice && <div className="toast"><Check size={17}/>{notice}</div>}
    {cartOpen && <div className="drawer-backdrop" onClick={()=>setCartOpen(false)}><aside className="cart-drawer" onClick={e=>e.stopPropagation()}><div className="drawer-head"><div><span className="eyebrow">YOUR SHORTLIST</span><h3>Product enquiry <span>({cart.length})</span></h3></div><button className="icon-button" onClick={()=>setCartOpen(false)} aria-label="Close enquiry"><X/></button></div>{cart.length===0 ? <div className="drawer-empty"><ShoppingBag size={36}/><h4>Your list is empty</h4><p>Add products to send one enquiry to our team.</p><button className="btn btn-primary" onClick={()=>{setCartOpen(false);document.getElementById('products').scrollIntoView({behavior:'smooth'})}}>Browse products</button></div> : <><div className="drawer-items">{cart.map(p=><div className="drawer-item" key={p.id}><img src={imageUrl(p.image)} alt=""/><div><b>{p.name}</b><small>{p.category}</small></div><button onClick={()=>remove(p.id)} aria-label={'Remove '+p.name}><X size={17}/></button></div>)}</div><div className="drawer-foot"><p>Send your shortlist on WhatsApp and ask for current wholesale prices and availability.</p><a className="btn btn-primary btn-full" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18}/> Send enquiry on WhatsApp</a></div></>}</aside></div>}
  </div>;
}


export default App;