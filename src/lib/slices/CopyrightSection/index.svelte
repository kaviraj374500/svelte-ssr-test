<script lang="ts">
  import type { Content } from "@prismicio/client";

  export let slice: Content.CopyrightSectionSlice;
</script>

<div class="Copyright d-flex justify-content-between flex-wrap dir px-0">
  <div class="col-12 col-sm-6 order-1 order-sm-0 text-center text-sm-start pt-3 pt-sm-0">
      <p>{slice.primary.site_name}  © 2024, {slice.primary.copyright_text}</p>
  </div>
</div>