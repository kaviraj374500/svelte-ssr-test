<script lang="ts">
  import type { Content } from "@prismicio/client";
  import { onMount } from "svelte";

  onMount(async () => {
    try {
      // @ts-ignore
      await import('slick-carousel');
      let jQuery = await import('jquery');
      let $ = jQuery.default;
      setTimeout(() => {
        $('.logo_ispsum_slider').slick({
          arrows: false,
          dots: false,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 0,
          speed: 3000,
          slidesToShow: 4,
          cssEase: 'linear',
          responsive: [{
            breakpoint: 1000,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              dots: false,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 450,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }]
        });
      }, 1000);
    } catch (error) {
      console.error("Error loading slick-carousel or jQuery:", error);
    }
  });

  export let slice: Content.LogoSectionSlice | any;
</script>

<div class="behind remove-tag" style="background-image: url({slice?.primary?.preview_background_image?.url})">
  <div class="ispsum-logo">
    <div class="container">
      <hr />
      <div class="logo_ispsum_slider">
        {#each slice.primary.logo_section_list as item}
        <a href="/">
          <figure>
            <img src={item?.logo?.url} alt={item?.logo?.alt || ''} />
          </figure>
        </a>
        {/each}
      </div>
      <hr />
    </div>
  </div>
</div>