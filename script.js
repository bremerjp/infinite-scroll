const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = "9BASqXi9m5KKedWoLf0q6UcIe3pAtXTMoIYNe5XLqv0";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all image loaded

function imageLoaded() {
  imagesLoaded++;
  console.log("imageLoaded -> imagesLoaded", imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log("ready =", ready);
  }
}

//Helper function to set attributes on DOM elements

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for links and photos, add to DOM

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // run function for esch object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // create <img> for photo
    const img = document.createElement("img");

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    //event listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    //Put <img> inside <a>, then both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get Photos from Unsplash API

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch {
    // Catch error here
  }
}

// Check for scrolling and load more photos

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    getPhotos();
  }
});

//on load

getPhotos();
