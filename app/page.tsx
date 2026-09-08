'use client';
/* oxlint-disable next/no-img-element -- local WebP assets are already resized and compressed */

import { ArrowDown, ArrowRight, Camera, Check, ChevronLeft, ChevronRight, Clock3, Film, Menu, MessageCircle, Quote, Sparkles, X } from 'lucide-react';
import { type SyntheticEvent, useEffect, useMemo, useState } from 'react';

const PHOTOS = '/recursos_imagenes/fotos';
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '50760000000';
const INSTAGRAM = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? 'https://instagram.com/';
const nav = [['Portafolio','#portafolio'],['Proyectos','#proyectos'],['Nosotros','#nosotros'],['Servicios','#servicios'],['Proceso','#proceso'],['Contacto','#contacto']];
const slides = [
  {image:`${PHOTOS}/hero-pareja-panama.webp`, eyebrow:'Historias honestas · Panamá', title:'Lo irrepetible,|bien contado.', copy:'Fotografía y producción audiovisual con intención, sensibilidad y una mirada que se siente propia.'},
  {image:`${PHOTOS}/evento-nocturno.webp`, eyebrow:'Celebraciones · Eventos', title:'Momentos vivos.|Recuerdos eternos.', copy:'Documentamos la energía real de cada encuentro sin interrumpir lo que está sucediendo.'},
  {image:`${PHOTOS}/retrato-editorial.webp`, eyebrow:'Retratos · Negocios', title:'Tu esencia,|en primer plano.', copy:'Retratos y contenido de marca con una dirección clara, natural y profundamente humana.'},
];
const work = [
  ['Nosotros dos','Parejas',slides[0].image,'center'],
  ['Una noche para recordar','Cumpleaños',slides[1].image,'center'],
  ['Carácter propio','Retratos',slides[2].image,'center 25%'],
  ['La espera','Maternidad',slides[0].image,'82% center'],
  ['Entre todos','Eventos',slides[1].image,'42% center'],
  ['Presencia de marca','Negocios',slides[2].image,'center 18%'],
];
const packages = [
  {icon:Camera,n:'01',title:'Sesiones fotográficas',copy:'Parejas, retratos, maternidad, cumpleaños y marca personal.',items:['Desde 60 minutos','20+ fotografías editadas','Galería privada digital'],price:'Cotizar'},
  {icon:Film,n:'02',title:'Reels con intención',copy:'Piezas verticales pensadas para comunicar, conectar y detener el scroll.',items:['Preproducción y guion','Grabación en locación','Edición, color y audio'],price:'Desde cotización'},
  {icon:Sparkles,n:'03',title:'Producción mensual',copy:'Contenido consistente para negocios que buscan una presencia visual sólida.',items:['Plan de contenido','Jornada mensual','Fotos + videos optimizados'],price:'Plan personalizado'},
];
const steps = [
  ['01','Brief','Conversamos sobre tu idea, objetivo, estilo y lo que necesitas comunicar.'],
  ['02','Planificación','Creamos una ruta clara: concepto, locación, referencias y logística.'],
  ['03','Producción','Dirigimos la sesión para que todo se sienta natural, cuidado y auténtico.'],
  ['04','Edición','Seleccionamos, retocamos y damos color con una estética coherente.'],
  ['05','Entrega','Recibes tu material optimizado en una galería privada y fácil de compartir.'],
];

function Wa({children,className='',label}:{children:React.ReactNode;className?:string;label?:string}) {
  const href=`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hola Clik Creisi, quiero cotizar una producción.')}`;
  return <a className={className} aria-label={label} href={href} target="_blank" rel="noreferrer">{children}</a>;
}

export default function Home() {
  const [compact,setCompact]=useState(false);
  const [open,setOpen]=useState(false);
  const [slide,setSlide]=useState(0);
  const [filter,setFilter]=useState('Todos');

  useEffect(()=>{const fn=()=>setCompact(scrollY>72);fn();addEventListener('scroll',fn,{passive:true});return()=>removeEventListener('scroll',fn)},[]);
  useEffect(()=>{const id=setInterval(()=>setSlide(v=>(v+1)%slides.length),6500);return()=>clearInterval(id)},[]);
  useEffect(()=>{const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('shown')),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));return()=>io.disconnect()},[filter]);
  useEffect(()=>{document.body.style.overflow=open?'hidden':'';return()=>{document.body.style.overflow=''}},[open]);
  const visible=useMemo(()=>filter==='Todos'?work:work.filter(x=>x[1]===filter),[filter]);

  function send(e:SyntheticEvent<HTMLFormElement>){
    e.preventDefault();const d=new FormData(e.currentTarget);
    const field=(key:string)=>{const value=d.get(key);return typeof value==='string'?value:''};
    const name=field('name'), service=field('service'), message=field('message');
    const text=`Hola Clik Creisi. Soy ${name}. Me interesa: ${service}. ${message}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`,'_blank','noopener,noreferrer');
  }

  return <main>
    <header className={`header ${compact?'compact':''}`}>
      <a className="brand" href="#inicio" aria-label="Clik Creisi, inicio"><img src={`${PHOTOS}/logo-creisi.svg`} alt="Clik Creisi" width="150" height="54"/></a>
      <nav className="nav" aria-label="Navegación principal">{nav.map(([x,h])=><a key={h} href={h}>{x}</a>)}</nav>
      <button className="menu-btn" onClick={()=>setOpen(true)} aria-label="Abrir menú" aria-expanded={open}><Menu size={20}/><span>Menú</span></button>
    </header>

    <aside className={`menu ${open?'open':''}`} aria-hidden={!open}>
      <button className="menu-close" onClick={()=>setOpen(false)} aria-label="Cerrar menú"><X/></button>
      <p className="eyebrow">Clik Creisi®</p>
      <nav>{nav.map(([x,h],i)=><a key={h} href={h} onClick={()=>setOpen(false)}><span>0{i+1}</span>{x}</a>)}</nav>
      <Wa className="menu-wa">Hablemos <ArrowRight/></Wa>
    </aside>

    <section id="inicio" className="hero">
      {slides.map((s,i)=><div key={s.title} className={`slide ${slide===i?'active':''}`} aria-hidden={slide!==i}><img src={s.image} alt={i===0?'Pareja caminando en una playa tropical al atardecer':i===1?'Celebración nocturna entre amigos':'Retrato editorial de una profesional'} loading={i===0?'eager':'lazy'} fetchPriority={i===0?'high':'auto'}/></div>)}
      <div className="shade"/>
      <div className="hero-copy" key={slide}><p className="eyebrow">{slides[slide].eyebrow}</p><h1>{slides[slide].title.split('|').map(x=><span key={x}>{x}</span>)}</h1><p>{slides[slide].copy}</p><Wa className="cta"><MessageCircle size={18}/> Cotiza tu historia</Wa></div>
      <div className="slider"><button onClick={()=>setSlide((slide+2)%3)} aria-label="Anterior"><ChevronLeft/></button><span>0{slide+1} <i/> 03</span><button onClick={()=>setSlide((slide+1)%3)} aria-label="Siguiente"><ChevronRight/></button></div>
      <a className="discover" href="#portafolio">Descubrir <ArrowDown size={17}/></a>
    </section>

    <section id="portafolio" className="section portfolio">
      <Heading eyebrow="Trabajo seleccionado · 2026" title={<>Una mirada para<br/><em>cada historia.</em></>} copy="Personas reales, emociones honestas y una estética cuidada de principio a fin."/>
      <fieldset className="filters reveal" aria-label="Filtrar portafolio">{['Todos','Parejas','Cumpleaños','Retratos','Maternidad','Eventos','Negocios'].map(x=><button type="button" key={x} className={filter===x?'active':''} onClick={()=>setFilter(x)}>{x}</button>)}</fieldset>
      <div className="gallery">{visible.map(([title,category,image,pos])=><article className="tile reveal" key={category}><img src={image} alt={`${category}: ${title}`} loading="lazy" style={{objectPosition:pos}}/><div><small>{category}</small><h3>{title}</h3><ArrowRight/></div></article>)}</div>
    </section>

    <section id="proyectos" className="dark case">
      <div className="case-copy reveal"><p className="eyebrow">Caso de éxito · Marca personal</p><h2>Una presencia<br/>que se siente.</h2><p>Construimos una biblioteca visual versátil para una profesional que necesitaba verse cercana, segura y contemporánea en todos sus canales.</p><div className="stats"><p><strong>01</strong><span>Jornada</span></p><p><strong>03</strong><span>Escenarios</span></p><p><strong>42</strong><span>Entregables</span></p></div><Wa className="link">Quiero algo así <ArrowRight size={17}/></Wa></div>
      <div className="case-visual reveal"><img src={`${PHOTOS}/retrato-editorial.webp`} alt="Retrato editorial para marca personal" loading="lazy"/><img src={`${PHOTOS}/retrato-editorial.webp`} alt="Detalle de sesión de marca personal" loading="lazy"/></div>
    </section>

    <section id="nosotros" className="section about">
      <div className="about-mark reveal"><img src={`${PHOTOS}/logo-creisi.svg`} alt="Identidad visual de Clik Creisi" loading="lazy"/></div>
      <div className="reveal"><p className="eyebrow">Xavier + Emily · Clik Creisi</p><h2>Dos miradas.<br/><em>Una intención.</em></h2><p className="lead">Creamos imágenes que no solo se ven bien: dicen algo verdadero sobre ti.</p><div className="cols"><p>Somos Xavier y Emily, un equipo creativo radicado en Panamá. Unimos sensibilidad, dirección y técnica para transformar ideas y momentos en piezas visuales con carácter.</p><p>Nuestro enfoque es cercano y organizado. Cuidamos la experiencia desde la primera conversación hasta la entrega, para que disfrutes el proceso tanto como el resultado.</p></div><p className="signature">Xavier & Emily <span>Fundadores · Clik Creisi</span></p></div>
    </section>

    <section id="servicios" className="section services">
      <Heading eyebrow="Servicios y paquetes" title={<>Producción a tu<br/><em>medida.</em></>} copy="Cada historia pide algo distinto. Estas son las formas más comunes de trabajar con nosotros."/>
      <div className="package-list">{packages.map(p=>{const Icon=p.icon;return <article className="package reveal" key={p.title}><span>{p.n}</span><Icon/><div><h3>{p.title}</h3><p>{p.copy}</p></div><ul>{p.items.map(x=><li key={x}><Check size={15}/>{x}</li>)}</ul><Wa>{p.price}<ArrowRight size={17}/></Wa></article>})}</div>
      <p className="note reveal">Los precios dependen de la locación, duración y alcance. Cuéntanos tu idea y recibirás una propuesta clara.</p>
    </section>

    <section id="proceso" className="dark process">
      <div className="reveal"><p className="eyebrow">Cómo trabajamos</p><h2>Un proceso claro.<br/><em>Cero complicaciones.</em></h2></div>
      <div className="timeline">{steps.map(([n,t,c])=><article className="reveal" key={n}><span>{n}</span><i/><h3>{t}</h3><p>{c}</p></article>)}</div>
    </section>

    <section className="section testimonials">
      <div className="reveal"><p className="eyebrow">Lo que dicen</p><h2>Experiencias que<br/><em>hablan por sí solas.</em></h2></div>
      <article className="quote reveal"><Quote/><blockquote>“Desde el primer momento nos hicieron sentir cómodos. El resultado se siente natural, elegante y completamente nuestro.”</blockquote><footer><b>MC</b><p><strong>Cliente Clik Creisi</strong><small>Sesión de pareja · Panamá</small></p></footer></article>
    </section>

    <section id="contacto" className="dark contact">
      <div className="reveal"><p className="eyebrow">Hagámoslo realidad</p><h2>Tu historia empieza<br/>con un <em>hola.</em></h2><p>Cuéntanos qué tienes en mente. Te responderemos con ideas, disponibilidad y una cotización pensada para ti.</p><div className="meta"><p><Clock3/><span><strong>Horario habitual</strong>Lun–Sáb · 9:00 a.m.–6:00 p.m.</span></p><p><MessageCircle/><span><strong>Tiempo de respuesta</strong>Usualmente en menos de 24 horas</span></p><a href={INSTAGRAM} target="_blank" rel="noreferrer"><Camera/><span><strong>Instagram</strong>@clikcreisi</span></a></div></div>
      <form className="form reveal" onSubmit={send}><label>Tu nombre<input name="name" required autoComplete="name" placeholder="¿Cómo te llamas?"/></label><label>¿Qué necesitas?<select name="service" required defaultValue=""><option value="" disabled>Selecciona un servicio</option><option>Sesión fotográfica</option><option>Reel / video</option><option>Producción mensual</option><option>Evento</option><option>Otro proyecto</option></select></label><label>Cuéntanos un poco<textarea name="message" rows={4} placeholder="Fecha aproximada, tipo de proyecto y tu idea…"/></label><button>Enviar por WhatsApp <MessageCircle size={18}/></button><small>Al enviar, se abrirá WhatsApp. No almacenamos tus datos.</small></form>
    </section>

    <section className="section faq"><div className="reveal"><p className="eyebrow">Preguntas frecuentes</p><h2>Antes de<br/><em>empezar.</em></h2></div><div className="faq-list reveal">
      <Faq q="¿Con cuánta anticipación debo reservar?">Recomendamos reservar con 2 a 4 semanas de anticipación. Para eventos o producciones de marca, cuanto antes podamos planificar, mejor.</Faq>
      <Faq q="¿Trabajan fuera de Ciudad de Panamá?">Sí. Podemos trasladarnos a otras provincias; los viáticos se detallan por separado en la propuesta.</Faq>
      <Faq q="¿Cuándo recibo el material final?">Las sesiones suelen entregarse entre 7 y 14 días hábiles; las producciones mayores incluyen su propio cronograma.</Faq>
      <Faq q="¿Entregan fotografías sin editar?">No. La selección y el tratamiento de color son parte esencial de nuestro trabajo y de la calidad final.</Faq>
    </div></section>

    <footer><div><img src={`${PHOTOS}/logo-creisi.svg`} alt="Clik Creisi" loading="lazy"/><p>Fotografía y producción audiovisual<br/>hecha en Panamá.</p><Wa>Hablemos <ArrowRight/></Wa></div><p><span>© {new Date().getFullYear()} Clik Creisi</span><span>Panamá, Panamá</span><a href={INSTAGRAM}>Instagram</a></p></footer>
    <Wa className="float" label="Contactar por WhatsApp"><MessageCircle/></Wa>
  </main>
}

function Heading({eyebrow,title,copy}:{eyebrow:string;title:React.ReactNode;copy:string}){return <div className="heading reveal"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>{copy}</p></div>}
function Faq({q,children}:{q:string;children:React.ReactNode}){return <details><summary>{q}<span>+</span></summary><p>{children}</p></details>}
