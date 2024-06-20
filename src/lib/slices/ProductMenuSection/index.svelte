<script lang="ts">
  import type { Content } from "@prismicio/client";

  export let slice: Content.ProductMenuSectionSlice;
</script>

<div class="d-flex justify-content-between">
  <div>
      <ul class="footer-links">
          {#each slice.primary.product_menu_section_list as item, index}
              {#if index < 4}
              <li>
                  <a href="/">
                      {item.menu_name}
                  </a>
              </li>
              {/if}
          {/each}
      </ul> 
  </div>
  <div >
      <ul class="footer-links">
          {#each slice.primary.product_menu_section_list as item, index}
              {#if index >= 4}
              <li>
                  <a href="/">
                      {item.menu_name}
                  </a>
              </li>
              {/if}
          {/each}
      </ul> 
  </div>
</div>