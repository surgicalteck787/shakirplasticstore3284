import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, MessageCircle, PackageCheck } from 'lucide-react';
import { findCatalogueProduct, catalogueProducts } from './catalogue';
import './pages.css';
const wa=t=>'https://wa.me/923204855261?text='+encodeURIComponent(t);
const image=id=>'https://images.unsplash.com/'+id+'?auto=format&fit=crop&w=1200&q=88';
export default function ProductDetail({slug}) {
  const product=findCatalogueProduct(slug);
  if(!product) return <main className="product-detail-not-found"><h1>Product not found</h1><a href="/products">Browse all products</a></main>;
  const related=catalogueProducts.filter(p=>p.category===product.category&&p.slug!==product.slug).slice(0,4);
  const message='Assalam-o-Alaikum Shakir Plastic Store! I am interested in '+product.name+'. Please confirm current price, available sizes/specifications, pack quantity and stock.';
  document.title=product.name+' | Shakir Plastic Store Lahore';
  const meta=document.querySelector('meta[name="description"]');
  if(meta) meta.content='Enquire about '+product.name+' at Shakir Plastic Store, Band Road Lahore. Confirm current wholesale price, sizes, pack quantity and availability on WhatsApp.';
  return <div className="inner-page">
    <header className="page-header"><a className="page-brand" href="/"><b>SHAKIR<small>PLASTIC STORE</small></b></a><nav><a href="/">Home</a><a href="/products">All Products</a><a href="/contact">Contact</a></nav><a className="page-quote" href={wa(message)} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Get a Quote</a></header>
    <main className="inner-main product-detail-main">
      <a className="back-link" href="/products"><ArrowLeft size={15}/> Back to all products</a>
      <div className="product-detail-layout">
        <div className="product-detail-image"><img src={image(product.image)} alt={product.name}/></div>
        <div className="product-detail-copy">
          <span className="product-detail-category">{product.category} · SHAKIR PLASTIC STORE</span>
          <h1>{product.name}</h1>
          <div className="product-detail-price">{product.price}</div>
          <p className="price-disclaimer">Reference listing price only. Please confirm Shakir Plastic Store's current selling price, pack quantity and availability before ordering.</p>
          <p>{product.description}</p>
          <div className="product-detail-points">{product.features.map((feature,i)=><div key={i}><PackageCheck size={17}/>{feature}</div>)}</div>
          <a className="page-quote product-detail-cta" href={wa(message)} target="_blank" rel="noreferrer"><MessageCircle size={18}/> Enquire on WhatsApp <ArrowUpRight size={16}/></a>
          <small className="product-detail-contact">Band Road, Lahore · 0320 4855261</small>
        </div>
      </div>
      <section className="product-detail-description"><span>PRODUCT INFORMATION</span><h2>About {product.name}</h2><p>{product.description}</p><p>Product specifications, material, dimensions, colour options and pack sizes can vary by supplier and order quantity. Please message our team with your required use and quantity so we can confirm the most suitable option and provide an up-to-date quotation.</p></section>
      {related.length>0&&<section className="related-products"><div className="inner-section-head"><div><span>YOU MAY ALSO NEED</span><h2>Related products</h2></div><a href="/products">View full catalogue <ArrowRight size={15}/></a></div><div className="inner-product-grid">{related.map(p=><article className="inner-product" key={p.slug}><a href={'/product/'+p.slug}><img src={image(p.image)} alt={p.name}/></a><div><small>{p.category}</small><h3><a href={'/product/'+p.slug}>{p.name}</a></h3><p>{p.detail}</p><b>{p.price}</b><a href={wa('Please share current wholesale rates for '+p.name+'.')} target="_blank" rel="noreferrer">Enquire on WhatsApp <ArrowUpRight size={15}/></a></div></article>)}</div></section>}
    </main>
    <footer className="page-footer"><b>SHAKIR PLASTIC STORE</b><span>Wholesale packaging and disposable supplies · Band Road, Lahore</span><a href="tel:+923204855261">0320 4855261</a></footer>
  </div>;
}