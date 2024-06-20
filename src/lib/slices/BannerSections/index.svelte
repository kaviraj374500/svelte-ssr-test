<script lang="ts">
  import type { Content } from "@prismicio/client";

  export let slice: Content.BannerSectionsSlice;
</script>

<section>
  <h1>{slice.primary.title}</h1>
</section>
