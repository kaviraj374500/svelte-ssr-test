<script lang="ts">
  import type { Content } from "@prismicio/client";

  export let slice: Content.SocialSectionSlice;
</script>

<div class="">
  <div class="menu">
      <ul>
          <li class="mb-2 text-center text-sm-start">{slice.primary.title}</li>
      </ul>
  </div>
  <div class="social-icon d-flex gap-2 justify-content-md-start justify-content-sm-center justify-content-center">
    {#each slice.primary.social_section_list as item}
        <!-- {#if item.social_media_url.url} -->
            <a href="/" target="_blank">
                {@html item.social_svg_icon_text}
            </a>
        <!-- {/if} -->
    {/each}
  </div>
</div>