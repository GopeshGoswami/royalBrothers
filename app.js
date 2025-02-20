document.addEventListener("DOMContentLoaded", function () {
  const testimonials = [
    {
      text: "Vehicle was in very good condition and all the staff was very humble. Our vehicle got punctured but we got full assistance and after contacting their staff. We also get the full refund. Absolutely reliable in Bangalore.",
      author: "Akshay Kumar",
      source: "Google play store",
    },
    {
      text: "I have just made a booking, because of connecting flights being late, I needed to shift the whole booking by a day.",
      author: "Gaurav Kumar",
      source: "Apple app store",
    },
    {
      text: "Hello all, I had booked a bike for 14th Oct. Just then I noticed I booked for the wrong date and my ride will start in an 1 hrs time. It was indeed one of those day you know you have messed up. ",
      author: "Yathi Premlal",
      source: "Google play store",
    },
    {
      text: "Vehicle was in very good condition and all the staff was very humble. Our vehicle got punctured but we got full assistance and after contacting their staff. We also get the full refund. Absolutely reliable in Bangalore.",
      author: "Akshay Kumar",
      source: "Google play store",
    },
    {
      text: "I have just made a booking, because of connecting flights being late, I needed to shift the whole booking by a day.",
      author: "Gaurav Kumar",
      source: "Apple app store",
    },
    {
      text: "Hello all, I had booked a bike for 14th Oct. Just then I noticed I booked for the wrong date and my ride will start in an 1 hrs time. It was indeed one of those day you know you have messed up. ",
      author: "Yathi Premlal",
      source: "Google play store",
    },
  ];

  const swiperWrapper = document.querySelector(".swiper-wrapper");

  testimonials.forEach((testimonial) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");

    slide.innerHTML = `
      <div class="testimonial-card">
        <div></div>
        <div class="quote-mark quote-mark-left"><img src="/public/quote.svg" alt="quote" /></div>
        <p>${testimonial.text}</p>
        <div id="testimonialCardContainer">
            <h4>${testimonial.author}</h4>
            <p>${testimonial.source}</p>
        </div>
      </div>
    `;

    swiperWrapper.appendChild(slide);
  });

  const swiper = new Swiper(".testimonialSwiper", {
    slidesPerView: 3,
    spaceBetween: 90,
    loop: true,
    speed: 800,
    initialSlide: 0,
    centeredSlides: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      init: function () {
        updateSlidesPosition(this);
      },
      slideChange: function () {
        updateSlidesPosition(this);
      },
    },
    breakpoints: {
      320: {
        slidesPerView: 1.2,
      },
      640: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3.3,
      },
    },
  });

  function updateSlidesPosition(swiper) {
    const slides = swiper.slides;
    const activeIndex = swiper.activeIndex;

    const isOddActiveIndex = swiper.realIndex % 2 !== 0;

    slides.forEach((slide, index) => {
      let position;

      if (swiper.params.loop) {
        const realIndex = parseInt(
          slide.getAttribute("data-swiper-slide-index")
        );
        const activeRealIndex = swiper.realIndex;
        const total = swiper.params.loop
          ? swiper.slides.length - 2 * swiper.loopedSlides
          : swiper.slides.length;

        position =
          ((realIndex - activeRealIndex + total) % total) -
          Math.floor(total / 2);
        if (position > 1) position = position - total;
        if (position < -1) position = position + total;
      } else {
        position = index - activeIndex;
      }

      slide.style.transition = "transform 0.8s ease, z-index 0.4s ease";

      const realIndex = swiper.params.loop
        ? parseInt(slide.getAttribute("data-swiper-slide-index"))
        : index;

      const isEvenSlide = realIndex % 2 === 0;
      const shouldBeUp = isOddActiveIndex ? !isEvenSlide : isEvenSlide;

      const zIndex = 10 - Math.abs(position);

      if (shouldBeUp) {
        slide.style.transform = "translateY(-10rem)";
      } else {
        slide.style.transform = "translateY(0)";
      }

      slide.style.zIndex =
        position === 0 ? "10" : Math.max(1, zIndex).toString();
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const items = [
    { src: "/public/agra.png", text: "Agra" },
    { src: "/public/ahmedabad.png", text: "Ahmedabad" },
    { src: "/public/bangalore.png", text: "Bangalore" },
    { src: "/public/bhubaneswar.png", text: "Bhubaneswar" },
    { src: "/public/calicut.png", text: "Calicut" },
    { src: "/public/chandigarh.png", text: "Chandigarh" },
    { src: "/public/chikmangluru.png", text: "Chikmangluru" },
    { src: "/public/kochi.png", text: "Cochi" },
    { src: "/public/coorg.png", text: "Coorg" },
  ];

  const searchResults = document.getElementById("searchResults");
  const locationModal = document.getElementById("locationModal");
  const cityName = document.getElementById("cityName");
  const searchInput = document.getElementById("searchInput");
  const clearSearch = document.getElementById("clearSearch");

  function renderItems(items) {
    searchResults.innerHTML = "";
    items.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("search-item");
      itemDiv.innerHTML = `
        <img src="${item.src}" alt="${item.text}"/>
        <p>${item.text}</p>
      `;

      itemDiv.addEventListener("click", function () {
        cityName.textContent = item.text;
        locationModal.classList.add("hidden");
        locationModal.classList.remove("flex");
      });

      searchResults.appendChild(itemDiv);
    });
  }

  renderItems(items);

  document
    .getElementById("modal-parent")
    .addEventListener("click", function () {
      locationModal.classList.remove("hidden");
      locationModal.classList.add("flex");
    });

  document.getElementById("closeModal").addEventListener("click", function () {
    locationModal.classList.add("hidden");
    locationModal.classList.remove("flex");
  });

  searchInput.addEventListener("input", function () {
    const filter = searchInput.value.toLowerCase();
    const filteredItems = items.filter((item) =>
      item.text.toLowerCase().includes(filter)
    );
    renderItems(filteredItems);
  });

  clearSearch.addEventListener("click", function () {
    searchInput.value = "";
    renderItems(items);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");
  const closeSidebar = document.getElementById("closeSidebar");
  const overlay = document.getElementById("overlay");

  hamburger.addEventListener("click", function () {
    sidebar.style.left = "0";
    overlay.style.display = "block";
  });

  closeSidebar.addEventListener("click", function () {
    sidebar.style.left = "-100%";
    overlay.style.display = "none";
  });

  overlay.addEventListener("click", function () {
    sidebar.style.left = "-100%";
    overlay.style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const imageSwiper = new Swiper(".imageSwiper", {
    slidesPerView: 4,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 4 },
    },
  });
});
