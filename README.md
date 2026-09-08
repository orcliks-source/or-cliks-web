# Clik Creisi

Portafolio web de fotografía y producción audiovisual para Clik Creisi, Panamá.

## Desarrollo

```bash
npm install
npm run dev
```

## Configuración pública

Copia `.env.example` como `.env.local` y cambia los datos públicos del negocio. El número de WhatsApp debe incluir el código de país, sin `+`, espacios ni guiones. El formulario no almacena datos: prepara el mensaje y abre WhatsApp.

## Fotografías

Los originales se organizan en `C:\clik_creisi\recursos_imagenes\fotos`. Las versiones web optimizadas se copian en `public/recursos_imagenes/fotos` conservando los nombres usados en el código. Los archivos RAW nunca deben publicarse.

## Producción

```bash
npm run lint
npm run build
```

El proyecto está preparado para GitHub y el flujo de despliegue Sites/Vinext.
