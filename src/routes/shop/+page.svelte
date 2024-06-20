<script lang="ts">
    import ShopBannerSection from "../../lib/slices/ShopBannerSection/index.svelte";
    import ShopFeatureSection from "../../lib/slices/ShopFeatureSection/index.svelte";
    import ShopProductSection from "../../lib/slices/ShopProductSection/index.svelte";
    export let data;
    let { shopSlice, productData } :any = data;
</script>

{#if shopSlice?.data}
    <div class="shop-page">
        <ShopBannerSection slice={shopSlice.shopBannerSection}></ShopBannerSection>
        <ShopFeatureSection slice={shopSlice.shopFeatureSection}></ShopFeatureSection>
        <ShopProductSection slice={shopSlice.shopProductSection} productData={productData}></ShopProductSection>
    </div>
{/if}