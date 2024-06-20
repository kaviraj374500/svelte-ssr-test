<script lang="ts">
  import { onMount } from "svelte";
  import type { Content } from "@prismicio/client";
  import common from "../../../shared/common.service";
  common.animationAOS();
  export let slice: Content.VariantsSectionSlice | any;
  let selectedImageIndex: number = 0;
  let lottieLoading: boolean = false;

  onMount(async () => {
    try {
      await import("@lottiefiles/lottie-player");
      setTimeout(() => {
        handleLottieClick(0);
        let relativeContainer = document.getElementById("relativeContainer");
        common.lottieInteractivityCursor("#character-lottie", { x: [0, 1], y: [-1, 2] }, [0, 45], { x: -1, y: -1 }, [0]);
        common.lottieInteractivityScroll( "#character-lottie", [0, 1], [0, 50], [], [], relativeContainer);
      }, 1000);
    } catch (error) {
      console.error("Error fetching data from Prismic:", error);
    }
  });

  const handleLottieClick = (index: number) => {
    selectedImageIndex = index;
    common.lottieInteractivityCursor(
      `.can-lottie${index}`,
      { x: [0, 1], y: [-1, 2] },
      [0, 35],
      { x: -1, y: -1 },
      [0]
    );
  };

</script>

<div class="remove-tag core" style="background-image: url({slice.primary.preview_background_image.url})">
  <div class="container">
    <h1 class="text-center core-t">{slice.primary.title}</h1>
    <p class="core-p mb-4">{slice.primary.paragraph}</p>
    <div
      class="row d-flex gap-md-5 gap-lg-0 gap-sm-5 gap-5 bground"
      style="background-image: url({slice.primary.image_background.url})"
    >
      <div
        class="col-lg-4 col-md-6 d-flex flex-column gap-3 justify-content-center align-items-center align-items-md-stretch"
        data-aos="fade-up"
      >
        {#each slice.primary.variants_section_list as item, index}
          {#if item.position === "left"}
            <div class="position-relative pro-ani">
              <div class="core-card">
                <div>
                  <h5>{item?.product_title}</h5>
                  <p>{item?.description}</p>
                </div>
              </div>
              <div
                role="button"
                tabindex={index}
                on:click={() => handleLottieClick(index)}
                on:keydown={() => handleLottieClick(index)}
              >
                <img
                  src={item?.image?.url}
                  alt={item?.image?.alt || ""}
                  class="left-core-img"
                />
              </div>
            </div>
          {/if}
        {/each}
      </div>
      <div
        class="col-lg-4 col-md-4 d-flex justify-content-center align-items-center"
        data-aos="zoom-in"
      >
        <div id="containerLottie"></div>
        {#if lottieLoading}
          <figure>
            <img
              src={slice.primary.lottie_loader.url}
              alt={slice.primary.lottie_loader.alt || ""}
            />
          </figure>
        {/if}
        <figure class={lottieLoading ? "d-none" : ""}>
          {#each slice.primary.variants_section_list as item, index}
            <lottie-player
              class="can-lottie{index} {selectedImageIndex === index
                ? ''
                : 'd-none'}"
              src={item.lottie_json.url}
            ></lottie-player>
          {/each}
        </figure>
      </div>
      <div
        class="col-lg-4 col-md-6 d-flex flex-column gap-3 justify-content-center align-items-center align-items-md-stretch"
        data-aos="fade-down"
      >
        {#each slice.primary.variants_section_list as item, index}
          {#if item.position === "right"}
            <div class="position-relative pro-ani">
              <div class="core-card1">
                <div>
                  <h5>{item?.product_title}</h5>
                  <p>{item?.description}</p>
                </div>
              </div>
              <div
                role="button"
                tabindex={index}
                on:click={() => handleLottieClick(index)}
                on:keydown={() => handleLottieClick(index)}
              >
                <img
                  src={item?.image?.url}
                  alt={item?.image?.alt || ""}
                  class="right-core-img"
                />
              </div>
            </div>
          {/if}
        {/each}
      </div>
    </div>
  </div>
</div>
