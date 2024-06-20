<script lang="ts">
  import type { Content } from "@prismicio/client";

  export let slice: Content.ShopBannerSectionSlice;
</script>

<div class="about-hero-banner" style="background-image: url({slice.primary.image.url})">
  <h1 class="text-center">{slice.primary.title}</h1>
    <div class="bread-crumb text-white text-center my-3">
      {#each slice.primary.shop_banner_section_list as item, index}
        <a href="/" class="text-center about-p"> {item.breadcrumb_name} </a>
        {#if slice.primary.shop_banner_section_list.length - 1 !== index}
          <span>/</span>
        {/if}
      {/each}
    </div>
    <div class="custom-shape-divider-bottom-1708075887">
      {@html slice.primary?.svg_animaton_text}
    </div>
</div>