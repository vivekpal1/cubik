if(!self.define){let e,s={};const i=(i,t)=>(i=new URL(i+".js",t).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(t,a)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let c={};const r=e=>i(e,n),o={module:{uri:n},exports:c,require:r};s[n]=Promise.all(t.map((e=>o[e]||r(e)))).then((e=>(a(...e),c)))}}define(["./workbox-14389475"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/Eixt7N2p_CMiCVXHeDWGq/_buildManifest.js",revision:"c122899aa8b175780925048d834010dc"},{url:"/_next/static/Eixt7N2p_CMiCVXHeDWGq/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/08d26a16-65ad6fa9d508a7f6.js",revision:"Eixt7N2p_CMiCVXHeDWGq"},{url:"/_next/static/chunks/197-8dc9eb76373de246.js",revision:"Eixt7N2p_CMiCVXHeDWGq"},{url:"/_next/static/chunks/559-b02f7dc74f8fd261.js",revision:"Eixt7N2p_CMiCVXHeDWGq"},{url:"/_next/static/chunks/716-252808a2ce58d8a3.js",revision:"Eixt7N2p_CMiCVXHeDWGq"},{url:"/_next/static/chunks/877-f506d939b6b230d9.js",revision:"Eixt7N2p_CMiCVXHeDWGq"},{url:"/_next/static/chunks/a42f6a1c-94b1cc4c535d0edc.js",revision:"Eixt7N2p_CMiCVXHeDWGq"},{url:"/_next/static/chunks/app/_not-found-45653cc2423db072.js",revision:"Eixt7N2p_CMiCVXHeDWGq"},{url:"/_next/static/chunks/app/grants/layout-3ef5247386f760d4.js",revision:"Eixt7N2p_CMiCVXHeDWGq"},{url:"/_next/static/chunks/app/grants/page-fe77cc65389835da.js",revision:"Eixt7N2p_CMiCVXHeDWGq"},{url:"/_next/static/chunks/app/layout-da27d4bef870e5d4.js",revision:"Eixt7N2p_CMiCVXHeDWGq"},{url:"/_next/static/chunks/app/maintenance/page-97975dc18242ca83.js",revision:"Eixt7N2p_CMiCVXHeDWGq"},{url:"/_next/static/chunks/app/page-4d33741faf8a7ffb.js",revision:"Eixt7N2p_CMiCVXHeDWGq"},{url:"/_next/static/chunks/e9854445-fdba445d4ffda968.js",revision:"Eixt7N2p_CMiCVXHeDWGq"},{url:"/_next/static/chunks/fe3fafec-90eb7f336915df87.js",revision:"Eixt7N2p_CMiCVXHeDWGq"},{url:"/_next/static/chunks/framework-eb124dc7acb3bb04.js",revision:"Eixt7N2p_CMiCVXHeDWGq"},{url:"/_next/static/chunks/main-2768a76983dd92aa.js",revision:"Eixt7N2p_CMiCVXHeDWGq"},{url:"/_next/static/chunks/main-app-f62edcb00e52a241.js",revision:"Eixt7N2p_CMiCVXHeDWGq"},{url:"/_next/static/chunks/pages/_app-1203daf5c3a641f1.js",revision:"Eixt7N2p_CMiCVXHeDWGq"},{url:"/_next/static/chunks/pages/_error-9d03a6701905fabb.js",revision:"Eixt7N2p_CMiCVXHeDWGq"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-65e0c86e2d066bb0.js",revision:"Eixt7N2p_CMiCVXHeDWGq"},{url:"/_next/static/css/c3e08b0b5d7fc797.css",revision:"c3e08b0b5d7fc797"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:i})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&i&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:i})=>"1"===e.headers.get("RSC")&&i&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));