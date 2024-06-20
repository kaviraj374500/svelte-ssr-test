<script lang="ts">
    import { createClient } from "../lib/prismicio";
    import CopyrightSection from "../lib/slices/CopyrightSection/index.svelte";
    import SocialSection from "../lib/slices/SocialSection/index.svelte";
    import ProductMenuSection from "../lib/slices/ProductMenuSection/index.svelte";
    import { onMount } from "svelte";
    import commonMtd from "../shared/common.service";
    let footerSlice : any;
    onMount(async () => {
      try {
        let client = createClient();
        footerSlice = await client.getSingle("fooer");
        commonMtd.prismicKeyFields(footerSlice);
      } catch (error) {
        console.error("Error fetching data from Prismic:", error);
      }
    });
  </script>

{#if footerSlice?.data}
<footer class="position-relative">
    <div class="container">
        <div class="row mb-5 footer-menu">
            <div class="col-sm-5 col-md-3">
                <div class="menu mb-3">
                    <h3 class="text-white">{footerSlice.data.info_title}</h3>
                    <div class="d-flex justify-content-between">
                        <div>
                            <ul class="footer-links">
                                {#each footerSlice.infoSection.primary.info_section_list as item}
                                    <li>
                                        <a href="/">{item.menu_name}</a>
                                    </li>
                                {/each}
                            </ul> 
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-7 col-md-5">
                <div class="menu mb-3">
                    <h3 class="text-white">{footerSlice.data.shop_title}</h3>
                    <ProductMenuSection slice={footerSlice.productMenuSection}></ProductMenuSection>
                </div>
            </div>
            <div class="col-md-4 d-flex align-items-center flex-wrap flex-column">
                <div class="footer_logo">
                    <a href="/"><img src={footerSlice.data.logo.url} alt={footerSlice.data.logo.alt ||''} width="300px"></a>
                </div>
                <SocialSection slice={footerSlice.socialSection}></SocialSection>
            </div>
        </div>
        <hr>
        <CopyrightSection slice={footerSlice.copyrightSection}></CopyrightSection>
    </div>
</footer>
{/if}