import{a as E,S as P,i as l}from"./assets/vendor-DcHCnVjq.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const S="56089833-df6fa8cd94c036835afda3ed5",$=15;async function m(r,t){return(await E.get("https://pixabay.com/api/",{params:{key:S,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:$,page:t}})).data}const g=document.querySelector(".gallery"),y=document.getElementById("loader"),h=document.getElementById("load-more"),F=new P(".gallery a",{captionsData:"alt",captionDelay:250});function b(r){const t=r.map(({webformatURL:s,largeImageURL:a,tags:e,likes:o,views:i,comments:B,downloads:w})=>`<li class="gallery-item">
            <a href="${a}">
                <img
                class="gallery-img"
                src="${s}"
                alt="${e}"
                loading="lazy"
                />
            </a>
            <div class="gallery-info">
                <p class="gallery-info-item">
                    <span class="info-label">Likes</span>
                    <span class="info-value">${o}</span>
                </p>
                <p class="gallery-info-item">
                    <span class="info-label">Views</span>
                    <span class="info-value">${i}</span>
                </p>
                <p class="gallery-info-item">
                    <span class="info-label">Comments</span>
                    <span class="info-value">${B}</span>
                </p>
                <p class="gallery-info-item">
                    <span class="info-label">Downloads</span>
                    <span class="info-value">${w}</span>
                </p>
            </div>
        </li>`).join("");g.insertAdjacentHTML("beforeend",t),F.refresh()}function A(){g.innerHTML=""}function v(){y.classList.add("is-visible")}function c(){y.classList.remove("is-visible")}function L(){h.classList.add("is-visible")}function d(){h.classList.remove("is-visible")}const q=document.querySelector(".form"),M=document.getElementById("load-more");let u="",n=1,p=0;const f=15;q.addEventListener("submit",async r=>{r.preventDefault();const t=r.target["search-text"].value.trim();if(t){u=t,n=1,A(),d(),v();try{const s=await m(u,n);if(p=s.totalHits,c(),s.hits.length===0){l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#EF4040",messageColor:"#FAFAFB",iconColor:"#FAFAFB",progressBarColor:"#B51B1B",close:!0,theme:"dark"});return}b(s.hits),s.hits.length<f||n*f>=p?d():L()}catch(s){c(),l.error({message:`Something went wrong: ${s.message}`,position:"topRight"})}}});M.addEventListener("click",async()=>{n+=1,v(),d();try{const r=await m(u,n);c(),b(r.hits);const t=document.querySelector(".gallery-item");if(t){const a=t.getBoundingClientRect().height;window.scrollBy({top:a*2,behavior:"smooth"})}n*f>=p?(d(),l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):L()}catch(r){c(),l.error({message:`Something went wrong: ${r.message}`,position:"topRight"})}});
//# sourceMappingURL=index.js.map
