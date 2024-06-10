const productPhotos = document.querySelectorAll('.fotorama__loaded--img');

productPhotos.forEach(productPhoto => {
      let imageElementScale = 1;
      let start = { x: 0, y: 0, distance: 0 };
      let initialScale = 1;

      const distance = (event) => {
         return Math.hypot(event.touches[0].pageX - event.touches[1].pageX, event.touches[0].pageY - event.touches[1].pageY);
      };

      productPhoto.addEventListener('touchstart', (event) => {
         if (event.touches.length === 2) {
            event.preventDefault();
            start.x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
            start.y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
            start.distance = distance(event);
            initialScale = imageElementScale; 
         }
      });

      productPhoto.addEventListener('touchmove', (event) => {
         if (event.touches.length === 2) {
            event.preventDefault();

            const deltaDistance = distance(event);
            let scale = deltaDistance / start.distance * initialScale;
            imageElementScale = Math.min(Math.max(1, scale), 4);

            const deltaX = (((event.touches[0].pageX + event.touches[1].pageX) / 2) - start.x) * 2;
            const deltaY = (((event.touches[0].pageY + event.touches[1].pageY) / 2) - start.y) * 2;

            const transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${imageElementScale})`;
            productPhoto.style.transform = transform;
            productPhoto.style.WebkitTransform = transform;
            productPhoto.style.zIndex = "9999";
         }
      });

      productPhoto.addEventListener('touchend', (event) => {
         const transform = `scale(${imageElementScale})`;
         productPhoto.style.transform = transform;
         productPhoto.style.WebkitTransform = transform;
         productPhoto.style.zIndex = "";
      });
});
