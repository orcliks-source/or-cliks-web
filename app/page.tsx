'use client';
/* oxlint-disable next/no-img-element -- local WebP assets are already resized and compressed */

import { ArrowDown, ArrowRight, Camera, Check, ChevronLeft, ChevronRight, CreditCard, Film, Menu, MessageCircle, Quote, Send, Sparkles, X } from 'lucide-react';
import { type SyntheticEvent, useEffect, useState } from 'react';

const PHOTOS = '/recursos_imagenes/fotos';
const BRAND_LIGHT = '/recursos_imagenes/marca/logo-or-cliks-claro.png';
const BRAND_DARK = '/recursos_imagenes/marca/logo-or-cliks-oscuro.png';
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '50760077375';
const INSTAGRAM = 'https://www.instagram.com/or.cliks/';
const nav = [['Portafolio','#portafolio'],['Proyectos','#proyectos'],['Nosotros','#nosotros'],['Servicios','#servicios'],['Cotizador','#cotizador']];
const slides = [
  {image:`${PHOTOS}/retratos/retrato-026.webp`, alt:'Retrato al atardecer junto al mar', eyebrow:'Historias honestas · Panamá', title:'Lo irrepetible,|bien contado.', copy:'Fotografía y producción audiovisual con intención, sensibilidad y una mirada que se siente propia.'},
  {image:`${PHOTOS}/eventos/evento-002.webp`, alt:'Presentación artística en un evento', eyebrow:'Celebraciones · Eventos', title:'Momentos vivos.|Recuerdos eternos.', copy:'Documentamos la energía real de cada encuentro sin interrumpir lo que está sucediendo.'},
  {image:`${PHOTOS}/estudio/estudio-018.webp`, alt:'Retrato femenino realizado en estudio', eyebrow:'Retratos · Estudio', title:'Tu esencia,|en primer plano.', copy:'Retratos y contenido de marca con una dirección clara, natural y profundamente humana.'},
];
const portfolioGroups = [
  {category:'Eventos', singular:'Evento', folder:'eventos', prefix:'evento', start:1, end:7},
  {category:'Estudio', singular:'Estudio', folder:'estudio', prefix:'estudio', start:8, end:18},
  {category:'Retratos', singular:'Retrato', folder:'retratos', prefix:'retrato', start:19, end:32},
  {category:'Graduaciones', singular:'Graduación', folder:'graduaciones', prefix:'graduacion', start:33, end:34},
];
const recentEventPhotos = ['evento-actual-01.jpg','evento-actual-02.jpg','evento-actual-03.jpg'];
const focalY = [
  32,35,30,25,30,22,24,
  30,28,28,28,26,34,26,25,30,24,24,
  28,28,30,25,25,30,28,35,35,30,28,24,28,24,
  25,24,
];
const work = portfolioGroups.flatMap(group =>
  Array.from({length:group.end-group.start+1},(_,offset)=>{
    const sequence=group.start+offset;
    return {
      title:`${group.singular} ${String(offset+1).padStart(2,'0')}`,
      category:group.category,
      image:group.category==='Eventos'&&recentEventPhotos[offset] ? `${PHOTOS}/eventos/${recentEventPhotos[offset]}` : `${PHOTOS}/${group.folder}/${group.prefix}-${String(sequence).padStart(3,'0')}.webp`,
      pos:`center ${focalY[sequence-1]}%`,
    };
  })
);
const packages = [
  {icon:Camera,n:'01',title:'Sesiones fotográficas',copy:'Parejas, retratos, maternidad, cumpleaños y marca personal.',items:['Desde 60 minutos','20+ fotografías editadas','Galería privada digital'],price:'Cotizar'},
  {icon:Film,n:'02',title:'Reels con intención',copy:'Piezas verticales pensadas para comunicar, conectar y detener el scroll.',items:['Preproducción y guion','Grabación en locación','Edición, color y audio'],price:'Desde cotización'},
  {icon:Sparkles,n:'03',title:'Producción mensual',copy:'Contenido consistente para negocios que buscan una presencia visual sólida.',items:['Plan de contenido','Jornada mensual','Fotos + videos optimizados'],price:'Plan personalizado'},
];
type QuotePlan = {id:string; name:string; copy:string; price:number; studio?:number; includes:string[]};
const quoteSessions:{id:string;name:string;plans:QuotePlan[]}[] = [
  {id:'estudio',name:'Sesión en estudio',plans:[
    {id:'studio-1h',name:'1 hora',copy:'Sesión en estudio para retratos con una selección cuidada.',price:35,studio:25,includes:['15 fotos editadas','Sin cambio de vestuario','Total B/. 60.00']},
    {id:'studio-2h',name:'2 horas',copy:'Más tiempo para crear y variar tus fotografías.',price:60,studio:35,includes:['25 fotos editadas','Cambio de vestuario','Total B/. 95.00']},
    {id:'studio-3h',name:'3 horas',copy:'Una experiencia amplia, con dirección durante la sesión.',price:85,studio:60,includes:['35 fotos editadas','Cambio de vestuario','Total B/. 145.00']},
    {id:'studio-4h',name:'4 horas',copy:'La opción más completa para una producción en estudio.',price:110,studio:70,includes:['45 fotos editadas','Cambio de vestuario','Total B/. 180.00']},
  ]},
  {id:'exterior',name:'Sesión en exterior',plans:[
    {id:'out-economico',name:'Económico',copy:'Una sesión breve para conservar un momento especial.',price:55,includes:['30 minutos','5 fotos editadas','Guía básica']},
    {id:'out-esencial',name:'Esencial',copy:'Una experiencia ágil, con guía de poses.',price:75,includes:['45 minutos','8 fotos editadas','Guía de poses']},
    {id:'out-clasico',name:'Clásico',copy:'El equilibrio perfecto para contar tu historia.',price:110,includes:['1 hora','15 fotos editadas','Asesoría']},
    {id:'out-premium',name:'Premium',copy:'Más tiempo, fotos y una asesoría guiada.',price:155,includes:['1.5 horas','25 fotos editadas','Asesoría guiada']},
  ]},
];
const money=(amount:number)=>`B/. ${amount.toFixed(2)}`;
const steps = [
  ['01','Brief','Conversamos sobre tu idea, objetivo, estilo y lo que necesitas comunicar.'],
  ['02','Planificación','Creamos una ruta clara: concepto, locación, referencias y logística.'],
  ['03','Producción','Dirigimos la sesión para que todo se sienta natural, cuidado y auténtico.'],
  ['04','Edición','Seleccionamos, retocamos y damos color con una estética coherente.'],
  ['05','Entrega','Recibes tu material optimizado en una galería privada y fácil de compartir.'],
];

function Wa({children,className='',label}:{children:React.ReactNode;className?:string;label?:string}) {
  const href=`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hola Or Cliks, quiero cotizar una producción.')}`;
  return <a className={className} aria-label={label} href={href} target="_blank" rel="noreferrer">{children}</a>;
}

export default function Home() {
  const [compact,setCompact]=useState(false);
  const [open,setOpen]=useState(false);
  const [slide,setSlide]=useState(0);
  const [quoteName,setQuoteName]=useState('');
  const [quoteDate,setQuoteDate]=useState('');
  const [quoteSession,setQuoteSession]=useState('');
  const [quotePlan,setQuotePlan]=useState('');
  const [payment,setPayment]=useState('');
  const [quoteSent,setQuoteSent]=useState(false);
  const activeSession=quoteSessions.find(session=>session.id===quoteSession);
  const activePlan=activeSession?.plans.find(plan=>plan.id===quotePlan);
  const total=activePlan ? activePlan.price+(activePlan.studio ?? 0) : 0;

  useEffect(()=>{const fn=()=>setCompact(scrollY>72);fn();addEventListener('scroll',fn,{passive:true});return()=>removeEventListener('scroll',fn)},[]);
  useEffect(()=>{const id=setInterval(()=>setSlide(v=>(v+1)%slides.length),6500);return()=>clearInterval(id)},[]);
  useEffect(()=>{const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('shown')),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));return()=>io.disconnect()},[]);
  useEffect(()=>{document.body.style.overflow=open?'hidden':'';return()=>{document.body.style.overflow=''}},[open]);

  function sendQuote(e:SyntheticEvent<HTMLFormElement>){
    e.preventDefault();
    if(!activeSession || !activePlan || !quoteName || !quoteDate || !payment) return;
    const lines=[
      'Hola Or Cliks, me gustaría solicitar esta cotización:',
      '',
      `Cliente / empresa: ${quoteName}`,
      `Fecha deseada: ${new Intl.DateTimeFormat('es-PA',{dateStyle:'long'}).format(new Date(`${quoteDate}T12:00:00`))}`,
      `Tipo de sesión: ${activeSession.name}`,
      `Plan: ${activePlan.name} — ${money(activePlan.price)}`,
      ...(activePlan.studio ? [`Uso de estudio: ${money(activePlan.studio)}`] : []),
      `Método de pago: ${payment}`,
      `TOTAL: ${money(total)}`,
    ];
    setQuoteSent(true);
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`,'_blank','noopener,noreferrer');
  }

  return <main>
    <header className={`header ${compact?'compact':''}`}>
      <a className="brand" href="#inicio" aria-label="Or Cliks, inicio"><img src={BRAND_LIGHT} alt="Or Cliks" width="180" height="56"/></a>
      <nav className="nav" aria-label="Navegación principal">{nav.map(([x,h])=><a key={h} href={h}>{x}</a>)}</nav>
      <button className="menu-btn" onClick={()=>setOpen(true)} aria-label="Abrir menú" aria-expanded={open}><Menu size={20}/><span>Menú</span></button>
    </header>

    <aside className={`menu ${open?'open':''}`} aria-hidden={!open}>
      <button className="menu-close" onClick={()=>setOpen(false)} aria-label="Cerrar menú"><X/></button>
      <p className="eyebrow">Or Cliks®</p>
      <nav>{nav.map(([x,h],i)=><a key={h} href={h} onClick={()=>setOpen(false)}><span>0{i+1}</span>{x}</a>)}</nav>
      <Wa className="menu-wa">Hablemos <ArrowRight/></Wa>
    </aside>

    <section id="inicio" className="hero">
      {slides.map((s,i)=><div key={s.title} className={`slide ${slide===i?'active':''}`} aria-hidden={slide!==i}><img src={s.image} alt={s.alt} loading={i===0?'eager':'lazy'} fetchPriority={i===0?'high':'auto'}/></div>)}
      <div className="shade"/>
      <div className="hero-copy" key={slide}><p className="eyebrow">{slides[slide].eyebrow}</p><h1>{slides[slide].title.split('|').map(x=><span key={x}>{x}</span>)}</h1><p>{slides[slide].copy}</p><Wa className="cta"><MessageCircle size={18}/> Cotiza tu historia</Wa></div>
      <div className="slider"><button onClick={()=>setSlide((slide+2)%3)} aria-label="Anterior"><ChevronLeft/></button><span>0{slide+1} <i/> 03</span><button onClick={()=>setSlide((slide+1)%3)} aria-label="Siguiente"><ChevronRight/></button></div>
      <a className="discover" href="#portafolio">Descubrir <ArrowDown size={17}/></a>
    </section>

    <section id="portafolio" className="section portfolio">
      <Heading eyebrow="Trabajo seleccionado · 2026" title={<>Una mirada para<br/><em>cada historia.</em></>} copy="Personas reales, emociones honestas y una estética cuidada de principio a fin."/>
      <div className="gallery">{work.map(({title,category,image,pos})=><article className="tile" key={image}><img src={image} alt={`${category}: ${title}`} loading="lazy" style={{objectPosition:pos}}/><div aria-hidden="true"><small>{category}</small></div></article>)}</div>
    </section>

    <section id="proyectos" className="dark case">
      <div className="case-copy reveal"><p className="eyebrow">Caso de éxito · Marca personal</p><h2>Una presencia<br/>que se siente.</h2><p>Construimos una biblioteca visual versátil para una profesional que necesitaba verse cercana, segura y contemporánea en todos sus canales.</p><div className="stats"><p><strong>01</strong><span>Jornada</span></p><p><strong>03</strong><span>Escenarios</span></p><p><strong>42</strong><span>Entregables</span></p></div><Wa className="link">Quiero algo así <ArrowRight size={17}/></Wa></div>
      <div className="case-visual reveal"><img src={`${PHOTOS}/estudio/estudio-009.webp`} alt="Retrato editorial de madre e hijo" loading="lazy"/><img src={`${PHOTOS}/estudio/estudio-018.webp`} alt="Detalle de una sesión de retrato en estudio" loading="lazy"/></div>
    </section>

    <section id="nosotros" className="section about">
      <div className="about-mark reveal"><img src={BRAND_DARK} alt="Identidad visual de Or Cliks" loading="lazy"/></div>
      <div className="reveal"><p className="eyebrow">Xavier + Emily · Or Cliks</p><h2>Dos miradas.<br/><em>Una intención.</em></h2><p className="lead">Creamos imágenes que no solo se ven bien: dicen algo verdadero sobre ti.</p><div className="cols"><p>Somos Xavier y Emily, un equipo creativo radicado en Panamá. Unimos sensibilidad, dirección y técnica para transformar ideas y momentos en piezas visuales con carácter.</p><p>Nuestro enfoque es cercano y organizado. Cuidamos la experiencia desde la primera conversación hasta la entrega, para que disfrutes el proceso tanto como el resultado.</p></div><p className="signature">Xavier & Emily <span>Fundadores · Or Cliks</span></p></div>
    </section>

    <section id="servicios" className="section services">
      <Heading eyebrow="Servicios y paquetes" title={<>Producción a tu<br/><em>medida.</em></>} copy="Cada historia pide algo distinto. Estas son las formas más comunes de trabajar con nosotros."/>
      <div className="package-list">{packages.map(p=>{const Icon=p.icon;return <article className="package reveal" key={p.title}><span>{p.n}</span><Icon/><div><h3>{p.title}</h3><p>{p.copy}</p></div><ul>{p.items.map(x=><li key={x}><Check size={15}/>{x}</li>)}</ul><Wa>{p.price}<ArrowRight size={17}/></Wa></article>})}</div>
      <p className="note reveal">Elige una sesión en nuestro cotizador para ver una propuesta clara, con desglose y total estimado.</p>
    </section>

    <section id="cotizador" className="section quote-section">
      <Heading eyebrow="Cotiza tu sesión" title={<>Tu idea, con un<br/><em>precio claro.</em></>} copy="Completa los datos, elige tu plan y recibe el desglose listo para enviarnos por WhatsApp."/>
      <form className="quote-builder reveal" onSubmit={sendQuote}>
        <div className="quote-form-side">
          <div className="quote-step"><span>01</span><label>Nombre o empresa<input value={quoteName} onChange={e=>{setQuoteName(e.target.value);setQuoteSent(false)}} required placeholder="¿Cómo te llamas?" className={quoteName?'filled':''}/></label></div>
          <div className="quote-step"><span>02</span><label>Fecha deseada<input type="date" value={quoteDate} onChange={e=>{setQuoteDate(e.target.value);setQuoteSent(false)}} required className={quoteDate?'filled':''}/></label></div>
          <div className="quote-step"><span>03</span><label>Tipo de sesión<select value={quoteSession} onChange={e=>{setQuoteSession(e.target.value);setQuotePlan('');setQuoteSent(false)}} required className={quoteSession?'filled':''}><option value="" disabled>Selecciona una opción</option>{quoteSessions.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></label></div>
          <div className={`quote-plans ${activeSession?'is-visible':''}`} aria-live="polite">
            <p>04 · Elige el plan que mejor cuenta tu historia</p>
            {activeSession?.plans.map(plan=><button type="button" key={plan.id} onClick={()=>{setQuotePlan(plan.id);setQuoteSent(false)}} className={`plan-card ${quotePlan===plan.id?'selected':''}`} aria-pressed={quotePlan===plan.id}><span>{plan.name}</span><small>{plan.copy}</small><b>{money(plan.price)}</b><i>{plan.includes.join(' · ')}</i></button>)}
          </div>
        </div>
        <aside className="quote-receipt" aria-live="polite">
          <p className="eyebrow">Tu cotización</p><h3>Desglose<br/>de tu sesión.</h3>
          <div className="receipt-client"><span>Cliente</span><b>{quoteName || 'Tu nombre o empresa'}</b><span>Fecha</span><b>{quoteDate ? new Intl.DateTimeFormat('es-PA',{dateStyle:'medium'}).format(new Date(`${quoteDate}T12:00:00`)) : 'Por seleccionar'}</b></div>
          <div className="receipt-lines">
            {activePlan ? <><p><span>{activeSession?.name} · {activePlan.name}</span><b>{money(activePlan.price)}</b></p>{activePlan.studio&&<p><span>Alquiler del estudio</span><b>{money(activePlan.studio)}</b></p>}<p className="extra-note">Fotos adicionales: B/. 4.00 c/u</p></> : <p className="receipt-empty">Elige un tipo de sesión y un plan para ver tu total.</p>}
          </div>
          <div className="payment"><span><CreditCard size={16}/> Método de pago</span><div>{['Yappy','Transferencia bancaria','Efectivo'].map(method=><button type="button" key={method} onClick={()=>{setPayment(method);setQuoteSent(false)}} className={payment===method?'selected':''}>{method}</button>)}</div></div>
          <div className="receipt-total"><span>Total estimado</span><strong>{activePlan?money(total):'—'}</strong></div>
          <button className={`quote-submit ${quoteSent?'sent':''}`} disabled={!activePlan || !quoteName || !quoteDate || !payment} type="submit">{quoteSent?<><Check size={18}/> Enviado correctamente</>:<><Send size={17}/> Enviar cotización</>}</button>
          <small>Al enviar se abrirá WhatsApp con el resumen de tu cotización.</small>
        </aside>
      </form>
    </section>

    <section id="proceso" className="dark process">
      <div className="reveal"><p className="eyebrow">Cómo trabajamos</p><h2>Un proceso claro.<br/><em>Cero complicaciones.</em></h2></div>
      <div className="timeline">{steps.map(([n,t,c])=><article className="reveal" key={n}><span>{n}</span><i/><h3>{t}</h3><p>{c}</p></article>)}</div>
    </section>

    <section className="section testimonials">
      <div className="reveal"><p className="eyebrow">Lo que dicen</p><h2>Experiencias que<br/><em>hablan por sí solas.</em></h2></div>
      <article className="quote reveal"><Quote/><blockquote>“Desde el primer momento nos hicieron sentir cómodos. El resultado se siente natural, elegante y completamente nuestro.”</blockquote><footer><b>MC</b><p><strong>Cliente Or Cliks</strong><small>Sesión de retrato · Panamá</small></p></footer></article>
    </section>

    <section className="section faq"><div className="reveal"><p className="eyebrow">Preguntas frecuentes</p><h2>Antes de<br/><em>empezar.</em></h2></div><div className="faq-list reveal">
      <Faq q="¿Con cuánta anticipación debo reservar?">Recomendamos reservar con 2 a 4 semanas de anticipación. Para eventos o producciones de marca, cuanto antes podamos planificar, mejor.</Faq>
      <Faq q="¿Trabajan fuera de Ciudad de Panamá?">Sí. Podemos trasladarnos a otras provincias; los viáticos se detallan por separado en la propuesta.</Faq>
      <Faq q="¿Cuándo recibo el material final?">Las sesiones suelen entregarse entre 7 y 14 días hábiles; las producciones mayores incluyen su propio cronograma.</Faq>
      <Faq q="¿Entregan fotografías sin editar?">No. La selección y el tratamiento de color son parte esencial de nuestro trabajo y de la calidad final.</Faq>
    </div></section>

    <footer><div><img src={BRAND_LIGHT} alt="Or Cliks" loading="lazy"/><p>Fotografía y producción audiovisual<br/>hecha en Panamá.</p><Wa>Hablemos <ArrowRight/></Wa></div><p><span>© {new Date().getFullYear()} Or Cliks</span><span>Panamá, Panamá</span><a href={INSTAGRAM} target="_blank" rel="noreferrer">@or.cliks</a></p></footer>
    <Wa className="float" label="Contactar por WhatsApp"><MessageCircle/></Wa>
  </main>
}

function Heading({eyebrow,title,copy}:{eyebrow:string;title:React.ReactNode;copy:string}){return <div className="heading reveal"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>{copy}</p></div>}
function Faq({q,children}:{q:string;children:React.ReactNode}){return <details><summary>{q}<span>+</span></summary><p>{children}</p></details>}
