'use strict';

import images from './gallery-items.js';

const refs = {
    gallery: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    overlayLightbox: document.querySelector('.lightbox__overlay'), 
    imageLightbox: document.querySelector('.lightbox__image'),
    closeModal: document.querySelector('button[data-action="close-lightbox"]'),
};

let values = {
    createTags: '' ,
    urlOriginal: '',
    altImage: '',
};


images.forEach(image => {
    values.createTags += `<li class="gallery__item"> <a class="gallery__link" href="${image.original}"> <img class="gallery__image" src="${image.preview}" data-source="${image.original}" alt="${image.description}" /> </a> </li>`;
});
refs.gallery.insertAdjacentHTML('afterbegin', values.createTags);


refs.gallery.addEventListener('click', onImgClick);
refs.closeModal.addEventListener('click', modalClose);
refs.overlayLightbox.addEventListener('click', modalClose);
window.addEventListener('keydown', event => { if (event.code === 'Escape') { modalClose();};});


function onImgClick(event) { 
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') { return;};
    values.urlOriginal = event.target.dataset.source;
    values.altImage = event.target.alt;
    modalOpen(event);
};

function modalOpen () { 
    refs.lightbox.classList.add('is-open');
    refs.imageLightbox.src = values.urlOriginal;
    refs.imageLightbox.alt = values.altImage;
};

function modalClose() { 
    refs.lightbox.classList.remove('is-open');
    refs.imageLightbox.src = ' ';
    refs.imageLightbox.alt = ' ';
};