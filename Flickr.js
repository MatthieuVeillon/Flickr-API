// Weather App // Clé :
// 5b8dac7a2f3f6cb347904503bcb21c58
// Secret :
// d8691b2298e53239

const FLICKR_API_URL =
  'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1';
const FLICKR_API_KEY = '5b8dac7a2f3f6cb347904503bcb21c58';

// https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=5b8dac7a2f3f6cb347904503bcb21c58&text=THE_SEARCH_TEXT

const app = document.querySelector('.app');
const search = app.querySelector('.search');
const formSearch = app.querySelector('.formSearch');
const pictureGallery = app.querySelector('.picture-gallery');
const pictureLinks = app.querySelectorAll('.picture');

function getPhotosForSearch(searchTerm) {
  const url = `${FLICKR_API_URL}&api_key=${FLICKR_API_KEY}&text=${searchTerm}`;

  return fetch(url)
    .then(response => response.json())
    .then((data) => {
      const photos = data.photos.photo;
      const newPhotos = photos.map((photo) => {
        const thumb = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_t.jpg`;
        const large = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
        const title = photo.title;

        return {
          thumb,
          large,
          title,
        };
      });
      console.log(newPhotos);
      return newPhotos;
    })
    .then((newPhotos) => {
      console.log(newPhotos);
      pictureGallery.innerHTML = '';
      newPhotos.forEach((photo) => {
        const photoImage = document.createElement('a');
        photoImage.innerHTML = `<a class="picture" href=${photo.large} target="_blank">
              <img class="image" src=${photo.thumb} alt=${photo.title}>
            </a>`;
        pictureGallery.appendChild(photoImage);
      });
    });
}

formSearch.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchTerm = search.value;
  getPhotosForSearch(searchTerm);
});

// thumb, large and title properties.

// Get the modal
const modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
const img = document.querySelector('.image');
const modalImg = document.getElementById('img01');
const captionText = document.getElementById('caption');

pictureGallery.addEventListener('click', (e) => {
  console.log(e);
  e.preventDefault();
  modal.style.display = 'block';
  modalImg.src = e.srcElement.parentNode.href;
  console.log(e.srcElement.src);
  captionText.innerHTML = e.srcElement.alt;
});

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none';
};
