const galleryItems = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const refs = {
  galleryContainer: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  lightboxImage: document.querySelector(".lightbox__image"),
  lightboxOverlay: document.querySelector(".lightbox__overlay"),
  closeButton: document.querySelector(".lightbox__button"),
  previousButton: document.querySelector('[data-action="prev-slide"]'),
  nextButton: document.querySelector('[data-action="next-slide"]'),
};

refs.galleryContainer.addEventListener("click", onGalleryItemClick);
refs.closeButton.addEventListener("click", onCloseModal);
refs.previousButton.addEventListener("click", showPreviousImage);
refs.nextButton.addEventListener("click", showNextImage);

const createGalleryItem = ({ preview, original, description }) => {
  return `
  <li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img class="gallery__image" 
        src="${preview}" 
        data-source="${original}" 
        alt="${description}"
        />
    </a>
</li>
`;
};

function renderGallery(items) {
  const galleryMarkup = items.map(createGalleryItem).join("");
  refs.galleryContainer.innerHTML = galleryMarkup;
}

function onGalleryItemClick(event) {
  event.preventDefault();

  if (event.target.classList.contains("gallery__image")) {
    const src = event.target.dataset.source;
    onOpenModal(src);
  }
}

function onOpenModal(original) {
  refs.lightbox.classList.add("is-open");
  refs.lightboxImage.src = original;
  window.addEventListener("keydown", onKeypressed);
}

function onCloseModal() {
  refs.lightbox.classList.remove("is-open");
  refs.lightboxImage.src = "";
  window.removeEventListener("keydown", onKeypressed);
}

renderGallery(galleryItems);

function onKeypressed(event) {
  if (event.code === "Escape") {
    onCloseModal();
  }

  if (event.code === "ArrowLeft") {
    showPreviousImage();
  }

  if (event.code === "ArrowRight") {
    showNextImage();
  }
}

function showPreviousImage() {
  const currentImageSrc = refs.lightboxImage.src;
  const currentIndex = galleryItems.findIndex(
    (item) => item.original === currentImageSrc
  );

  let previousIndex = currentIndex - 1;
  if (previousIndex < 0) {
    previousIndex = galleryItems.length - 1;
  }

  const previousImageSrc = galleryItems[previousIndex].original;
  const previousImageAlt = galleryItems[previousIndex].description;

  refs.lightboxImage.src = previousImageSrc;
  refs.lightboxImage.alt = previousImageAlt;
}

function showNextImage() {
  const currentImageSrc = refs.lightboxImage.src;
  const currentIndex = galleryItems.findIndex(
    (item) => item.original === currentImageSrc
  );

  let nextIndex = currentIndex + 1;
  if (nextIndex >= galleryItems.length) {
    nextIndex = 0;
  }

  const nextImageSrc = galleryItems[nextIndex].original;
  const nextImageAlt = galleryItems[nextIndex].description;

  refs.lightboxImage.src = nextImageSrc;
  refs.lightboxImage.alt = nextImageAlt;
}
