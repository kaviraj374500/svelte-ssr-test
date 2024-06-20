<script lang="ts">
  import type { Content } from "@prismicio/client";

  export let slice: Content.CommonBannerSectionSlice;
</script>

<div class="shop-inner-page">
  <div
    class="about-hero-banner"
    style="background-image: url({slice.primary.background_image.url})"
  >
    <h1 class="text-center">{slice.primary.title}</h1>
    <div class="bread-crumb text-white text-center my-3">
      {#each slice.primary.common_banner_section_list as item, index}
        <a class="text-center about-p">
          {item.breadcrumb_name}
        </a>
        {#if index !== slice.primary.common_banner_section_list.length - 1}
          <span>/</span>
        {/if}
      {/each}
    </div>
    <div class="custom-shape-divider-bottom-1708075887">
      {@html slice.primary.svg_animation_text}
    </div>
  </div>
</div>
