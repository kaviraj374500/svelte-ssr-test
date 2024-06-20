<script lang="ts">
  import type { Content } from "@prismicio/client";
  import { onMount } from "svelte";
  onMount(async () => {
    try {
      let AOS = await import("aos");
      await import("@lottiefiles/lottie-player");
      setTimeout(() => {
        try {
          AOS.init({
            once: true,
            duration: 1500,
          });
        } catch (error) {
          console.log(error);
        }
      }, 1000);
    } catch (error) {
      console.error("Error fetching data from Prismic:", error);
    }
  });
  export let slice: Content.TrendSectionSlice | any;
</script>

<div class="core remove-tag" style="background-image: url({slice.primary.preview_background_mage.url})">
  <div class="visa">
    <div class="container">
      <div class="visa-hole">
          <div class="visa-bg" data-aos="zoom-in" id="relativeContainer">
            {#if slice?.primary?.trend_lottie_json?.url}
              <figure>
                  <lottie-player id="character-lottie" src={slice?.primary?.trend_lottie_json?.url} background="transparent" mode="normal"/>
              </figure>
            {/if}
          </div>
          <div class="visa-contant" data-aos="fade-up">
              <div class="row">
                  <div class="col-lg-6 col-md-6">
                      <h3 class="text-md-start text-sm-start">{slice?.primary?.first_title}</h3>
                      <h1 class="text-md-start text-sm-start">
                        {@html slice?.primary.title[0].text}
                      </h1>
                      <p class="text-md-start text-sm-start text-start p-f-s pre-line">{slice?.primary?.paragraph}</p>
                      <div class="visa-btn text-sm-start text-md-start text-start mb-2">
                          <a class="btn-hover1" href="/">{slice?.primary?.btn_text}</a>
                      </div>
                  </div>
                  <div class="col-lg-6 col-md-6">
                      <div class="visa-card position-relative mt-3 text-center text-sm-start">
                          <img src={slice?.primary?.banner_image?.url} alt={slice?.primary?.banner_image?.alt ||''}/>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </div>
</div>