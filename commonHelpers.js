import{a as M,i as l,s as w}from"./assets/vendor-03031a3c.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();async function u(r,o){const s="https://pixabay.com/api/",n={params:{key:"43999869-2222e4e6c4d0611e5b13cb64c",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:m}};return document.querySelector(".loader"),h(),M.get(s,n).then(e=>{const{data:t}=e;return t.hits.length||l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),t}).catch(e=>{l.error({message:`${e}`,position:"topRight"})}).finally(()=>{y()})}function p(r){let o="";return r.map(s=>{const{webformatURL:n,largeImageURL:e,tags:t,views:a,downloads:v,likes:L,comments:b}=s;o+=`<div class="item-gallery">
                <a href="${e}">
                    <img src="${n}" alt="${t}">
                </a>
                <div class="item-info">
                    <div class="item-info-content">
                        <p>Likes</p>
                        <p>${L}</p>
                    </div>
                    <div class="item-info-content">
                        <p>Views</p>
                        <p>${a}</p>
                    </div>
                    <div class="item-info-content">
                        <p>Comments</p>
                        <p>${b}</p>
                    </div>
                    <div class="item-info-content">
                        <p>Downloads</p>
                        <p>${v}</p>
                    </div>
                </div>
            </div>`}),o}const i={formSearch:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more-btn")},S={captionsData:"alt",captionDelay:250,className:"js-backdrop"},f=new w(".gallery a",S);let d=null,c=1;const m=15;i.formSearch.addEventListener("submit",R);i.loadMoreBtn.addEventListener("click",$);async function R(r){if(r.preventDefault(),c=1,d=r.target.elements.search.value.trim(),!!d){i.gallery.innerHTML="";try{const o=await u(d,c),{hits:s,totalHits:n}=o;n>m?B():g(),q(s),f.refresh()}catch(o){l.error({message:`${o}`,position:"topRight"})}finally{r.target.reset()}}}async function $(){c++,h();const o=document.querySelector(".item-gallery").getBoundingClientRect().height;try{const s=await u(d,c),{hits:n,totalHits:e}=s;Math.ceil(e/m)===c&&(g(),l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),i.gallery.insertAdjacentHTML("beforeend",p(n)),f.refresh()}catch(s){l.error({message:`${s}`,position:"topRight"})}finally{setTimeout(()=>{window.scrollBy(0,o*2+48)},400),y()}}function q(r){const o=p(r);i.gallery.insertAdjacentHTML("afterbegin",o)}function B(){i.loadMoreBtn.classList.remove("is-hidden")}function g(){i.loadMoreBtn.classList.add("is-hidden")}function h(){i.loader.style.display="block"}function y(){i.loader.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
