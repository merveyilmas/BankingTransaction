import React, { useEffect } from 'react'
import { Galleria } from 'primereact/galleria';

import image1 from '../images/1.jpg';
import image2 from '../images/2.jpg';
import image3 from '../images/3.jpg';
import image4 from '../images/4.jpg';
import image5 from '../images/5.jpg';
import image6 from '../images/6.jpg';
import image7 from '../images/7.jpg';
import image8 from '../images/8.jpg';
import image9 from '../images/9.jpg';
import image10 from '../images/10.jpg';

export default function Homepage() {

  const images = [
    { itemImageSrc: image1, thumbnailImageSrc: image1, alt: 'Image 1' },
    { itemImageSrc: image2, thumbnailImageSrc: image2, alt: 'Image 2' },
    { itemImageSrc: image3, thumbnailImageSrc: image3, alt: 'Image 3' },
    { itemImageSrc: image4, thumbnailImageSrc: image4, alt: 'Image 4' },
    { itemImageSrc: image5, thumbnailImageSrc: image5, alt: 'Image 5' },
    { itemImageSrc: image6, thumbnailImageSrc: image6, alt: 'Image 6' },
    { itemImageSrc: image7, thumbnailImageSrc: image7, alt: 'Image 7' },
    { itemImageSrc: image8, thumbnailImageSrc: image8, alt: 'Image 8' },
    { itemImageSrc: image9, thumbnailImageSrc: image9, alt: 'Image 9' },
    { itemImageSrc: image10, thumbnailImageSrc: image10, alt: 'Image 10' },
    // Diğer resimler...
  ];

  const responsiveOptions = [
    {
      breakpoint: '991px',
      numVisible: 4
    },
    {
      breakpoint: '767px',
      numVisible: 3
    },
    {
      breakpoint: '575px',
      numVisible: 1
    }
  ];

  const itemTemplate = (item) => {
    return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
  };

  const thumbnailTemplate = (item) => {
    return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />;
  };

  return (
    <div className="card" style={{ width: "100%", height: "100%" }}>

      <div className="card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Galleria
          value={images}
          responsiveOptions={responsiveOptions}
          numVisible={5}
          style={{ maxWidth: '95%' }}
          item={itemTemplate}
          thumbnail={thumbnailTemplate}
          circular
          autoPlay
          transitionInterval={2000}
          className="custom-galleria" />
      </div>

      
      <style jsx>
        {`
        /* Homepage.module.css */

          .custom-galleria .p-galleria-item-wrapper {
            width: 100%;
            height: 350px; /* Sabit yükseklik belirleyin */
            position: relative;
          }

          .custom-galleria .p-galleria-item-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: cover; /* Resmi kapsayacak şekilde sığdır */
          }

          .custom-galleria .p-galleria-thumbnail-wrapper {
            width: 100%; /* Küçük önizleme fotoğrafının genişliği */
            height: 25%; /* Küçük önizleme fotoğrafının yüksekliği */
            overflow: hidden; /* Thumbnail kutusundan taşan içeriği gizle */
          }

          .custom-galleria .p-galleria-thumbnail img {
            width: 100%;
            height: 100%;
            object-fit: cover; /* Resmi kapsayacak şekilde sığdır */
          }

      `}
      </style>

    </div>
  )
}
