export function createTemplate(query) {
  let imagesArr = '';

  query.map(elem => {
    const {
      webformatURL,
      largeImageURL,
      tags,
      views,
      downloads,
      likes,
      comments,
    } = elem;

    imagesArr += `<div class="item-gallery">
                <a href="${largeImageURL}">
                    <img src="${webformatURL}" alt="${tags}">
                </a>
                <div class="item-info">
                    <div class="item-info-content">
                        <p>Likes</p>
                        <p>${likes}</p>
                    </div>
                    <div class="item-info-content">
                        <p>Views</p>
                        <p>${views}</p>
                    </div>
                    <div class="item-info-content">
                        <p>Comments</p>
                        <p>${comments}</p>
                    </div>
                    <div class="item-info-content">
                        <p>Downloads</p>
                        <p>${downloads}</p>
                    </div>
                </div>
            </div>`;
  });

  return imagesArr;
}
