import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, MessageCircle, PackageCheck, Star } from 'lucide-react';
import { findCatalogueProduct, catalogueProducts } from './catalogue';
import './pages.css';
const wa=t=>'https://wa.me/923204855261?text='+encodeURIComponent(t);
const image=id=>'https://images.unsplash.com/'+id+'?auto=format&fit=crop&w=1200&q=88';
const categoryUses = {
  'Shopping Bags':'retail shops, supermarkets, boutiques and takeaway counters',
  'Food Bags':'bakeries, grocery stores, food counters and takeaway businesses',
  'Pizza Boxes':'pizzerias, restaurants, food delivery services and takeaway outlets',
  'Disposable Items':'restaurants, caterers, offices, events and everyday serving',
  'Food Packaging':'restaurants, cafés, bakeries, food delivery and takeaway businesses',
  'Paper Products':'retail stores, bakeries, cafés and businesses seeking paper-based packaging',
  'Cake Boxes':'bakeries, home bakers, cake shops and dessert businesses',
  'Bottles & Cups':'cafés, beverage counters, events and takeaway drink services',
  'Pouches':'coffee, snack, bakery and retail product packaging',
  'Custom Boxes':'gift shops, bakeries, retail brands and product presentation',
  'Other Supplies':'shops, service businesses and customers with specialised supply needs'
};
export default function ProductDetail({slug}) {
  const product=findCatalogueProduct(slug);
  const [reviewName,setReviewName]=useState('');
  const [reviewRating,setReviewRating]=useState('5');
  const [reviewText,setReviewText]=useState('');
  if(!product) return <main className="product-detail-not-found"><h1>Product not found</h1><a href="/products">Browse all products</a></main>;
  const related=catalogueProducts.filter(p=>p.category===product.category&&p.slug!==product.slug).slice(0,4);
  const message='Assalam-o-Alaikum Shakir Plastic Store! I am interested in '+product.name+'. Please confirm current price, available sizes/specifications, pack quantity and stock.';
  const uses=categoryUses[product.category]||'retailers, food businesses and wholesale buyers';
  const reviewMessage=()=> 'Assalam-o-Alaikum Shakir Plastic Store! I would like to submit a customer review.\nProduct: '+product.name+'\nCustomer name: '+reviewName+'\nRating: '+reviewRating+'/5\nReview: '+reviewText+'\nPlease contact me if you need to verify this feedback.';
  const submitReview=e=>{e.preventDefault();window.open(wa(reviewMessage()),'_blank','noopener,noreferrer');};
  document.title=product.name+' | Shakir Plastic Store Lahore';
  const meta=document.querySelector('meta[name="description"]');
  if(meta) meta.content='View '+product.name+' details, product information and wholesale price enquiry at Shakir Plastic Store, Band Road Lahore.';
  return <div className="inner-page">
    <header className="page-header"><a className="page-brand" href="/"><b>SHAKIR<small>PLASTIC STORE</small></b></a><nav><a href="/">Home</a><a href="/products">All Products</a><a href="/contact">Contact</a></nav><a className="page-quote" href="/contact">Contact Store</a></header>
    <main className="inner-main product-detail-main">
      <a className="back-link" href="/products"><ArrowLeft size={15}/> Back to all products</a>
      <div className="product-detail-layout">
        <div className="product-detail-image"><img src={image(product.image)} alt={product.name}/></div>
        <div className="product-detail-copy">
          <span className="product-detail-category">{product.category} · SHAKIR PLASTIC STORE</span>
          <h1>{product.name}</h1>
          <div className="product-detail-price">{product.price}</div>
          <p className="price-disclaimer">Reference listing price only. Please confirm Shakir Plastic Store's current selling price, pack quantity and availability before ordering.</p>
          <a className="page-quote product-detail-cta" href={wa(message)} target="_blank" rel="noreferrer"><MessageCircle size={18}/> WhatsApp Enquiry <ArrowUpRight size={16}/></a>
          <p>{product.description}</p>
          <div className="product-detail-points">{product.features.map((feature,i)=><div key={i}><PackageCheck size={17}/>{feature}</div>)}</div>
          <small className="product-detail-contact">Band Road, Lahore · 0320 4855261</small>
        </div>
      </div>
      <section className="product-detail-description">
        <span>PRODUCT INFORMATION</span><h2>About {product.name}</h2>
        <p>{product.description}</p>
        <h3>Common uses</h3><p>{product.name} may be suitable for {uses}. The right option depends on the product's material, dimensions, capacity and intended use.</p>
        <h3>What to confirm before ordering</h3><p>Ask our team to confirm available sizes, material, colour options, pack quantity, minimum order quantity and current stock. Specifications can vary between product variants and suppliers, so please confirm the details for your required option before placing a bulk order.</p>
        <h3>Wholesale ordering from Shakir Plastic Store</h3><p>Share the product name, required quantity and intended use with our Band Road, Lahore team. We will help confirm availability and provide the latest quotation. Listed prices are reference prices and are not a guaranteed store quote.</p>
      </section>
      <section className="product-reviews" id="customer-reviews">
        <div className="product-reviews-heading"><span>CUSTOMER FEEDBACK</span><h2>Customer Reviews</h2><p>We welcome genuine feedback from customers who have purchased this product.</p></div>
        <div className="review-empty"><div className="review-stars" aria-label="Five star rating"><Star/><Star/><Star/><Star/><Star/></div><h3>Be the first to review {product.name}</h3><p>No customer reviews have been published for this product yet. Share your experience below; reviews are checked with the store before being published.</p></div>
        <form className="product-review-form" onSubmit={submitReview}>
          <h3>Write a customer review</h3>
          <label>Your name<input value={reviewName} onChange={e=>setReviewName(e.target.value)} required placeholder="Enter your name"/></label>
          <label>Your rating<select value={reviewRating} onChange={e=>setReviewRating(e.target.value)}><option value="5">★★★★★ - Excellent</option><option value="4">★★★★☆ - Good</option><option value="3">★★★☆☆ - Average</option><option value="2">★★☆☆☆ - Below average</option><option value="1">★☆☆☆☆ - Poor</option></select></label>
          <label>Your review<textarea value={reviewText} onChange={e=>setReviewText(e.target.value)} required minLength={10} rows={4} placeholder="Tell other customers about product quality and your experience"/></label>
          <button className="page-quote" type="submit"><MessageCircle size={17}/> Submit review on WhatsApp</button>
          <small>Your review is sent to the store for verification. It will not appear publicly until approved.</small>
        </form>
      </section>
      {related.length>0&&<section className="related-products"><div className="inner-section-head"><div><span>YOU MAY ALSO NEED</span><h2>Related products</h2></div><a href="/products">View full catalogue <ArrowRight size={15}/></a></div><div className="inner-product-grid">{related.map(p=><article className="inner-product" key={p.slug}><a href={'/product/'+p.slug}><img src={image(p.image)} alt={p.name}/></a><div><small>{p.category}</small><h3><a href={'/product/'+p.slug}>{p.name}</a></h3><p>{p.detail}</p><b>{p.price}</b><a href={'/product/'+p.slug}>See Details <ArrowUpRight size={15}/></a></div></article>)}</div></section>}
    </main>
    <footer className="page-footer"><b>SHAKIR PLASTIC STORE</b><span>Wholesale packaging and disposable supplies · Band Road, Lahore</span><a href="tel:+923204855261">0320 4855261</a></footer>
  </div>;
}
