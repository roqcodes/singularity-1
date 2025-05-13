import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { Flip } from 'gsap/Flip';
import '../styles/gallery.css';

// Import gallery images directly
import image1 from '../assets/images/gallery/image-1.png';
import image2 from '../assets/images/gallery/image-2.png';
import image3 from '../assets/images/gallery/image-3.png';
import image4 from '../assets/images/gallery/image-4.png';
import image5 from '../assets/images/gallery/image-5.png';
import image6 from '../assets/images/gallery/image.png';
import image7 from '../assets/images/gallery/IMG20250427170219.jpg';
import image8 from '../assets/images/gallery/IMG20250427170311.jpg';
import image9 from '../assets/images/gallery/IMG20250427185512.jpg';
import image10 from '../assets/images/gallery/IMG20250427185934.jpg';
import image11 from '../assets/images/gallery/image-1.avif';

// Register GSAP plugins
gsap.registerPlugin(CustomEase, Flip);

const GalleryPage = () => {
  // State for gallery images
  const [galleryImages] = useState([
    { src: image1, name: 'image-1' },
    { src: image2, name: 'image-2' },
    { src: image3, name: 'image-3' },
    { src: image4, name: 'image-4' },
    { src: image5, name: 'image-5' },
    { src: image6, name: 'image' },
    { src: image7, name: 'IMG20250427170219' },
    { src: image8, name: 'IMG20250427170311' },
    { src: image9, name: 'IMG20250427185512' },
    { src: image10, name: 'IMG20250427185934' },
    { src: image11, name: 'image-1-avif' }
  ]);

  const preloaderRef = useRef(null);
  const preloaderCounterRef = useRef(null);
  const contentRef = useRef(null);
  const contentTitleRef = useRef(null);
  const contentParagraphRef = useRef(null);
  const sliderImageRef = useRef(null);
  const sliderImageNextRef = useRef(null);
  const sliderImageBgRef = useRef(null);
  const transitionOverlayRef = useRef(null);
  const gridRef = useRef(null);
  const gridContainerRef = useRef(null);
  const switchRef = useRef(null);
  
  useEffect(() => {
    // Create preloader animation
    const preloader = preloaderRef.current;
    const preloaderCounter = preloaderCounterRef.current;

    let count = 0;
    const duration = 2048;
    const increment = 5;
    const interval = 128;

    const counterInterval = setInterval(() => {
      count += increment;

      if (count <= 100) {
        preloaderCounter.textContent = count;
      } else {
        preloaderCounter.textContent = "100";
        clearInterval(counterInterval);

        setTimeout(() => {
          preloader.classList.add("preloader-hidden");

          setTimeout(() => {
            initApp();
          }, 256);
        }, 256);
      }
    }, interval);

    return () => {
      clearInterval(counterInterval);
    };
  }, []);

  // Initialize the main application
  const initApp = () => {
    // Create custom eases
    CustomEase.create("mainEase", "M0,0 C0.65,0.05 0.36,1 1,1");
    CustomEase.create("sideEase", "M0,0 C0.86,0 0.07,1 1,1");
    CustomEase.create("natural", "M0,0 C0.34,0.01 0.2,1 1,1");
    CustomEase.create("naturalOut", "M0,0 C0.43,0.13 0.23,0.96 1,1");
    CustomEase.create("cinematic", "M0,0 C0.645,0.045 0.355,1 1,1");

    // Timing constants (in seconds)
    const TIMING = {
      BASE: 0.512,
      SHORTEST: 0.256,
      SHORT: 0.384,
      LONG: 0.768,
      LONGEST: 1.024,
      STAGGER_TINY: 0.032,
      STAGGER_SMALL: 0.064,
      STAGGER_MED: 0.128,
      PAUSE: 1.536
    };

    // Elements
    const grid = gridRef.current;
    const gridContainer = gridContainerRef.current;
    const gridItems = document.querySelectorAll(".grid-item");
    const sliderImage = sliderImageRef.current;
    const sliderImageNext = sliderImageNextRef.current;
    const sliderImageBg = sliderImageBgRef.current;
    const transitionOverlay = transitionOverlayRef.current;
    const content = contentRef.current;
    const contentTitle = contentTitleRef.current;
    const contentTitleSpan = contentTitle.querySelector("span");
    const contentParagraph = contentParagraphRef.current;
    const thumbnailItems = document.querySelectorAll(".thumbnail");
    const switchContainer = switchRef.current;

    // Switch buttons
    const switchGrid = document.querySelector(".switch-button-grid");
    const switchSlider = document.querySelector(".switch-button-slider");

    // State
    let currentMode = "grid";
    let isAnimating = false;
    let activeIndex = Math.min(4, galleryImages.length - 1); // Default to 5th image (index 4) or last image if fewer
    let previousIndex = activeIndex; // Track previous index for transitions
    let slideDirection = "right"; // Default slide direction

    // Store all image URLs for easy access
    const imageUrls = Array.from(gridItems).map(
      (item) => item.querySelector(".grid-item-img").style.backgroundImage
    );

    // Content for each slide - use a default set if not enough images
    const defaultSlideContent = [
      {
        title: "URBAN GEOMETRY",
        paragraph:
          "The city speaks in angles and lines. What appears chaotic is actually ordered. When we slow down enough to truly see, patterns emerge from noise. Photography is meditation—a practice of presence that reveals the hidden structure beneath the surface of our daily experience."
      },
      {
        title: "NATURAL ABSTRACTIONS",
        paragraph:
          "Nature doesn't try to be beautiful. It simply is. These patterns exist whether we observe them or not. The creative act is not about making something new, but about seeing what's already there. True art emerges when we remove ourselves from the equation."
      },
      {
        title: "SHADOW PLAY",
        paragraph:
          "Light creates shadow. Shadow defines light. Neither exists without the other. This duality mirrors our own inner landscape. The photograph captures not just the external world, but the photographer's state of mind. What we choose to frame reveals what we value."
      },
      {
        title: "MINIMALIST FORMS",
        paragraph:
          "When we strip away the unnecessary, what remains? The essence. The truth. These images aren't about what's there, but what isn't. Silence between notes creates the music. The space between thoughts is where creativity lives. Simplicity is the ultimate sophistication."
      },
      {
        title: "MONOCHROME SERIES",
        paragraph:
          "Without color, we see differently. Form and texture speak louder. The world simplified to light and dark reveals truths that color often conceals. In this space between extremes, we find clarity. The photograph becomes a mirror reflecting not just what we see, but how we see."
      },
      {
        title: "TEXTURAL STUDIES",
        paragraph:
          "Touch with your eyes. Feel the rough and smooth. These surfaces tell stories of time and transformation. Our minds crave texture—it grounds us in the physical world. In an increasingly digital existence, these tactile reminders connect us to our primal nature and the healing power of sensory experience."
      }
    ];
    
    // Use image names for titles if available, or default content
    const slideContent = galleryImages.map((img, index) => {
      if (index < defaultSlideContent.length) {
        return {
          title: img.name.toUpperCase().replace(/-/g, ' '),
          paragraph: defaultSlideContent[index].paragraph
        };
      } else {
        return {
          title: img.name.toUpperCase().replace(/-/g, ' '),
          paragraph: "Explore the unique visual narrative captured in this image."
        };
      }
    });

    // Get grid item by index
    const getGridItemByIndex = (index) => {
      return document.querySelector(`.grid-item[data-index="${index}"]`);
    };

    // Update content based on active index
    const updateContent = (index) => {
      // Get the content for this index, use first one if index out of bounds
      const content = slideContent[index] || slideContent[0];

      // Update the title
      contentTitleSpan.textContent = content.title;

      // Update the paragraph
      contentParagraph.textContent = content.paragraph;
    };

    // Toggle view function
    const toggleView = (mode) => {
      if (isAnimating || currentMode === mode) return;
      isAnimating = true;

      // Update buttons
      document
        .querySelector(".switch-button-current")
        .classList.remove("switch-button-current");
      document
        .querySelector(`.switch-button-${mode}`)
        .classList.add("switch-button-current");

      // Set new mode
      currentMode = mode;

      // Run animation
      if (mode === "slider") {
        showSliderView().then(() => (isAnimating = false));
      } else {
        showGridView().then(() => (isAnimating = false));
      }
    };

    // Show slider view
    const showSliderView = () => {
      return new Promise((resolve) => {
        // Get the active item
        const activeItem = getGridItemByIndex(activeIndex);
        const activeItemRect = activeItem.getBoundingClientRect();

        // Get the active image URL and set it on the slider image
        const activeImageUrl = imageUrls[activeIndex];
        sliderImage.style.backgroundImage = activeImageUrl;
        sliderImageBg.style.backgroundImage = activeImageUrl;

        // Apply consistent styling
        sliderImage.style.backgroundSize = "cover";
        sliderImage.style.backgroundPosition = "center";
        sliderImageBg.style.backgroundSize = "cover";
        sliderImageBg.style.backgroundPosition = "center";
        sliderImageNext.style.backgroundSize = "cover";
        sliderImageNext.style.backgroundPosition = "center";

        // Update content for the active slide
        updateContent(activeIndex);

        // Position the slider image exactly over the active item
        gsap.set(sliderImage, {
          width: activeItemRect.width,
          height: activeItemRect.height,
          x: activeItemRect.left,
          y: activeItemRect.top,
          opacity: 1,
          visibility: "visible"
        });

        // STEP 1: First expand the height to 100vh using FLIP
        const heightState = Flip.getState(sliderImage);

        // Set the intermediate position (full height, original width)
        gsap.set(sliderImage, {
          height: "100vh",
          y: 0,
          width: activeItemRect.width,
          x: activeItemRect.left
        });

        // Animate the height expansion
        Flip.from(heightState, {
          duration: TIMING.BASE,
          ease: "mainEase",
          onComplete: () => {
            // STEP 2: Then expand the width to 100vw using FLIP
            const widthState = Flip.getState(sliderImage);

            // Set the final position (full width and height)
            gsap.set(sliderImage, {
              width: "100vw",
              x: 0
            });

            // Animate the width expansion
            Flip.from(widthState, {
              duration: TIMING.BASE,
              ease: "mainEase",
              onComplete: () => {
                // Hide the grid once the slider image is in place
                gsap.to(grid, {
                  opacity: 0,
                  duration: TIMING.SHORTEST,
                  ease: "power2.inOut"
                });

                // Show content with animation
                const contentTl = gsap.timeline({
                  onComplete: resolve
                });

                contentTl.to(
                  content,
                  {
                    opacity: 1,
                    duration: TIMING.SHORT,
                    ease: "mainEase"
                  },
                  0
                );

                contentTl.to(
                  contentTitleSpan,
                  {
                    y: 0,
                    duration: TIMING.BASE,
                    ease: "sideEase"
                  },
                  TIMING.STAGGER_TINY
                );

                contentTl.to(
                  contentParagraph,
                  {
                    opacity: 1,
                    duration: TIMING.BASE,
                    ease: "mainEase"
                  },
                  TIMING.STAGGER_SMALL
                );

                contentTl.to(
                  thumbnailItems,
                  {
                    opacity: 1,
                    y: 0,
                    duration: TIMING.SHORT,
                    stagger: TIMING.STAGGER_TINY,
                    ease: "sideEase"
                  },
                  TIMING.STAGGER_MED
                );
              }
            });
          }
        });
      });
    };

    // Show grid view
    const showGridView = () => {
      return new Promise((resolve) => {
        // Get the current active item
        const activeItem = getGridItemByIndex(activeIndex);
        const activeItemRect = activeItem.getBoundingClientRect();

        // Hide content first
        const contentTl = gsap.timeline({
          onComplete: () => {
            // Show the grid
            gsap.to(grid, {
              opacity: 1,
              duration: TIMING.SHORTEST,
              ease: "power2.inOut"
            });

            // Hide all transition elements
            gsap.set([sliderImageNext, sliderImageBg, transitionOverlay], {
              opacity: 0,
              visibility: "hidden"
            });

            // STEP 1: First shrink the width back to the active item's width using FLIP
            const widthState = Flip.getState(sliderImage);

            // Set the intermediate position (original width, full height)
            gsap.set(sliderImage, {
              width: activeItemRect.width,
              x: activeItemRect.left,
              height: "100vh",
              y: 0
            });

            // Animate the width reduction
            Flip.from(widthState, {
              duration: TIMING.BASE,
              ease: "mainEase",
              onComplete: () => {
                // STEP 2: Then shrink the height back to the active item's height using FLIP
                const heightState = Flip.getState(sliderImage);

                // Set the final position (original width and height)
                gsap.set(sliderImage, {
                  height: activeItemRect.height,
                  y: activeItemRect.top
                });

                // Animate the height reduction
                Flip.from(heightState, {
                  duration: TIMING.BASE,
                  ease: "mainEase",
                  onComplete: () => {
                    // Hide the slider image at the very end
                    gsap.to(sliderImage, {
                      opacity: 0,
                      duration: TIMING.SHORTEST,
                      ease: "power2.inOut",
                      onComplete: () => {
                        sliderImage.style.visibility = "hidden";
                        resolve();
                      }
                    });
                  }
                });
              }
            });
          }
        });

        // Hide thumbnails
        contentTl.to(
          thumbnailItems,
          {
            opacity: 0,
            y: 20,
            duration: TIMING.SHORT,
            stagger: -TIMING.STAGGER_TINY,
            ease: "sideEase"
          },
          0
        );

        // Hide paragraph
        contentTl.to(
          contentParagraph,
          {
            opacity: 0,
            duration: TIMING.SHORT,
            ease: "mainEase"
          },
          TIMING.STAGGER_TINY
        );

        // Hide title text
        contentTl.to(
          contentTitleSpan,
          {
            y: "100%",
            duration: TIMING.SHORT,
            ease: "sideEase"
          },
          TIMING.STAGGER_SMALL
        );

        // Hide content container
        contentTl.to(
          content,
          {
            opacity: 0,
            duration: TIMING.SHORT,
            ease: "mainEase"
          },
          TIMING.STAGGER_MED
        );
      });
    };

    // Enhanced slide transition
    const transitionToSlide = (index) => {
      if (isAnimating || index === activeIndex) return;
      isAnimating = true;

      // Determine slide direction
      slideDirection = index > activeIndex ? "right" : "left";
      previousIndex = activeIndex;

      // Update active thumbnail
      document.querySelector(".thumbnail.active").classList.remove("active");
      document
        .querySelector(`.thumbnail[data-index="${index}"]`)
        .classList.add("active");

      // Get the new image URL
      const newImageUrl = imageUrls[index];
      const currentImageUrl = imageUrls[activeIndex];

      // Set up the transition elements
      sliderImageNext.style.backgroundImage = newImageUrl;
      sliderImageBg.style.backgroundImage = newImageUrl;

      // Apply consistent styling
      sliderImage.style.backgroundSize = "cover";
      sliderImage.style.backgroundPosition = "center";
      sliderImageBg.style.backgroundSize = "cover";
      sliderImageBg.style.backgroundPosition = "center";
      sliderImageNext.style.backgroundSize = "cover";
      sliderImageNext.style.backgroundPosition = "center";

      // Make elements visible with proper z-index ordering
      gsap.set([sliderImageNext, sliderImageBg], {
        visibility: "visible"
      });

      // Set initial positions based on slide direction
      const xOffset = slideDirection === "right" ? "100%" : "-100%";

      // Position the next image
      gsap.set(sliderImageNext, {
        x: xOffset,
        y: 0,
        opacity: 1,
        width: "100vw",
        height: "100vh"
      });

      // Position the background image
      gsap.set(sliderImageBg, {
        x: xOffset,
        y: 0,
        opacity: 0.9,
        width: "100vw",
        height: "100vh",
        scale: 1
      });

      // Create a master timeline for the transition
      const masterTl = gsap.timeline({
        onComplete: () => {
          // Update the main slider image
          sliderImage.style.backgroundImage = newImageUrl;

          // Reset all transition elements
          gsap.set([sliderImageNext, sliderImageBg, transitionOverlay], {
            opacity: 0,
            x: 0,
            y: 0,
            visibility: "hidden"
          });

          // Reset the main slider
          gsap.set(sliderImage, {
            x: 0,
            opacity: 1
          });

          // Update content
          updateContent(index);
          activeIndex = index;

          // Show the content again
          const showTl = gsap.timeline({
            onComplete: () => {
              isAnimating = false;
            }
          });

          showTl.to(
            contentTitleSpan,
            {
              y: 0,
              duration: TIMING.BASE,
              ease: "sideEase"
            },
            0
          );

          showTl.to(
            contentParagraph,
            {
              opacity: 1,
              duration: TIMING.BASE,
              ease: "mainEase"
            },
            TIMING.STAGGER_SMALL
          );
        }
      });

      // Hide current content
      masterTl.to(
        contentParagraph,
        {
          opacity: 0,
          duration: TIMING.SHORT,
          ease: "mainEase"
        },
        0
      );

      masterTl.to(
        contentTitleSpan,
        {
          y: "100%",
          duration: TIMING.SHORT,
          ease: "sideEase"
        },
        TIMING.STAGGER_TINY
      );

      // Create a subtle flash effect with the overlay
      masterTl.to(
        transitionOverlay,
        {
          opacity: 0.15,
          duration: TIMING.SHORTEST,
          ease: "power1.in"
        },
        TIMING.STAGGER_SMALL
      );

      masterTl.to(
        transitionOverlay,
        {
          opacity: 0,
          duration: TIMING.SHORT,
          ease: "power1.out"
        },
        TIMING.STAGGER_MED
      );

      // Push the current slide away
      masterTl.to(
        sliderImage,
        {
          x: slideDirection === "right" ? "-35%" : "35%",
          opacity: 1,
          duration: TIMING.LONG,
          ease: "mainEase"
        },
        0
      );

      // Bring in the background layer first
      masterTl.to(
        sliderImageBg,
        {
          x: slideDirection === "right" ? "-10%" : "10%",
          y: 0,
          opacity: 0.95,
          scale: 1,
          duration: TIMING.LONG,
          ease: "sideEase"
        },
        TIMING.STAGGER_TINY
      );

      // Bring in the main next image
      masterTl.to(
        sliderImageNext,
        {
          x: 0,
          opacity: 1,
          duration: TIMING.LONG,
          ease: "sideEase"
        },
        TIMING.STAGGER_SMALL
      );
    };

    // Handle thumbnail clicks
    thumbnailItems.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        if (currentMode !== "slider") return;

        // Get the index from the thumbnail
        const index = parseInt(thumb.getAttribute("data-index"));

        // Transition to the new slide
        transitionToSlide(index);
      });
    });

    // Handle window resize
    window.addEventListener("resize", () => {
      if (currentMode === "slider") {
        // If in slider mode, make sure the slider image is full width/height
        gsap.set(sliderImage, {
          width: "100vw",
          height: "100vh",
          x: 0,
          y: 0
        });

        // Apply consistent styling
        sliderImage.style.backgroundSize = "cover";
        sliderImage.style.backgroundPosition = "center";
      }
    });

    // Add hover effects for the switch buttons
    const switchButtons = document.querySelectorAll(".switch-button");

    switchButtons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        // Add more padding to the switch container to accommodate the dot
        if (button.classList.contains("switch-button-grid")) {
          switchContainer.style.paddingLeft = "30px";
        } else {
          switchContainer.style.paddingRight = "30px";
        }
      });

      button.addEventListener("mouseleave", () => {
        // Reset padding
        switchContainer.style.paddingLeft = "20px";
        switchContainer.style.paddingRight = "20px";
      });
    });

    // Event listeners
    if (switchGrid && switchSlider) {
      switchGrid.addEventListener("click", () => toggleView("grid"));
      switchSlider.addEventListener("click", () => toggleView("slider"));
    }

    // Add keyboard navigation for slider mode
    document.addEventListener("keydown", (e) => {
      if (currentMode !== "slider" || isAnimating) return;

      // Right arrow or down arrow
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        const nextIndex = (activeIndex + 1) % imageUrls.length;
        transitionToSlide(nextIndex);
      }
      // Left arrow or up arrow
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        const prevIndex = (activeIndex - 1 + imageUrls.length) % imageUrls.length;
        transitionToSlide(prevIndex);
      }
    });

    // Add touch/swipe support for slider mode
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener("touchstart", (e) => {
      if (currentMode !== "slider" || isAnimating) return;
      touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener("touchend", (e) => {
      if (currentMode !== "slider" || isAnimating) return;
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    const handleSwipe = () => {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swiped left - go to next slide
        const nextIndex = (activeIndex + 1) % imageUrls.length;
        transitionToSlide(nextIndex);
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swiped right - go to previous slide
        const prevIndex = (activeIndex - 1 + imageUrls.length) % imageUrls.length;
        transitionToSlide(prevIndex);
      }
    };
  };

  return (
    <div className="gallery-page">
      {/* Preloader */}
      <div className="preloader" ref={preloaderRef}>
        <div className="preloader-counter" ref={preloaderCounterRef}>0</div>
      </div>

      <div className="container">
        <div className="grid-container" ref={gridContainerRef}>
          <div className="grid" id="grid" ref={gridRef}>
            {galleryImages.map((image, index) => (
              <div key={index} className="grid-item" data-index={index}>
                <div className="grid-item-img" style={{ backgroundImage: `url(${image.src})` }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide layers */}
      <div className="slider-image" id="slider-image" ref={sliderImageRef}></div>
      <div className="slider-image-bg" id="slider-image-bg" ref={sliderImageBgRef}></div>
      <div className="slider-image-next" id="slider-image-next" ref={sliderImageNextRef}></div>
      <div className="transition-overlay" id="transition-overlay" ref={transitionOverlayRef}></div>

      <div className="content" id="content" ref={contentRef}>
        <h1 className="content-title" ref={contentTitleRef}>
          <span>MONOCHROME SERIES</span>
        </h1>
        <div className="content-paragraph" id="content-paragraph" ref={contentParagraphRef}>
          Without color, we see differently. Form and texture speak louder. The world simplified to light and dark reveals truths that color often conceals. In this space between extremes, we find clarity. The photograph becomes a mirror reflecting not just what we see, but how we see.
        </div>
      </div>

      <div className="thumbnails">
        {galleryImages.map((image, index) => (
          <div key={index} className={`thumbnail ${index === 0 ? "thumbnail-active" : ""}`} data-index={index}>
            <div className="thumbnail-img" style={{ backgroundImage: `url(${image.src})` }}></div>
          </div>
        ))}
      </div>

      <div className="switch" id="switch" ref={switchRef}>
        <button className="switch-button switch-button-grid switch-button-current">
          <span className="indicator-dot"></span>
          GRID
        </button>
        <button className="switch-button switch-button-slider">
          <span className="indicator-dot"></span>
          SLIDER
        </button>
      </div>
    </div>
  );
};

export default GalleryPage; 