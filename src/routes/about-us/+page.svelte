<script lang="ts">
  import { createClient } from "../../lib/prismicio";
  import BannerSections from "../../lib/slices/BannerSections/index.svelte";
  import { onMount } from "svelte";
  let aboutSlice :any;
  onMount(async () => {
    try {
      let client = createClient();
      // @ts-ignore
      aboutSlice = await client.getSingle("about");
      if (aboutSlice?.data) {
        Object.keys(aboutSlice.data).forEach((key) => {
          let value = aboutSlice.data[key];
          if (Array.isArray(value)) {
            let obj = value[0];
            aboutSlice[capitalizeFirstLetter(obj.slice_type)] = obj;
          }
        });
      }
    } catch (error) {
      console.error("Error fetching data from Prismic:", error);
    }
  });

  const capitalizeFirstLetter = (str:any) => {
    return str
      .toLowerCase()
      .replace(/_./g, (match:any) => match.charAt(1).toUpperCase());
  };
</script>

{#if aboutSlice?.data}
  <BannerSections slice={aboutSlice.bannerSections} />
{/if}
