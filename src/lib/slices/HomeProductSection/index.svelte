<script lang="ts">
  import type { Content } from "@prismicio/client";
  import common from "../../../shared/common.service";
  common.productRefresh();
  common.animationAOS();
  export let slice: Content.HomeProductSectionSlice;
  export let productData: any;
</script>

<div class="behind remove-tag" style="background-image: url({slice?.primary?.preview_background_image?.url})">
    <section class="news-cards bot">
        <div class="container">
            <h1 class="text-center text-white mb-4">{slice.primary.title}</h1>
            {#if productData?.collections?.[0]?.products?.length}
                <div class="row d-flex gap-md-0 gap-sm-5 gap-4 product-slider-footer">
                  {#each productData.collections[0].products as item}
                      <div class="col-lg-4 col-md-4 d-flex" data-aos="flip-right"> 
                        <div class="card news-card-back">
                            <div class="position-relative d-flex justify-content-center cursor-pointer">
                                <img class="w-50" src={item?.featuredImage?.src} alt="product">
                                <!-- svelte-ignore a11y-label-has-associated-control -->
                                <label class="pack-label">{item?.variants[0]?.title}</label>
                            </div>
                            <div class="card-body d-flex justify-content-between align-items-end">
                                <div>
                                    <a href="/" class="justify-content-start">
                                        <h3>{item?.title}</h3>
                                    </a>
                                </div>
                                <div>
                                    <h3>${item?.variants?.[0]?.price?.amount}</h3>
                                </div>
                            </div>
      
                            <div class="card-viewer d-flex flex-row justify-content-between ">
                                <div class="col-6 ps-0 pe-1">
                                    <a href="/"class="btn-hover2 cursor-pointer">BUT NOW</a>
                                </div>
                                <div class="news-link col-6 ps-1 pe-0">
                                    <a href="/" class="btn-hover1 cursor-pointer">ADD TO CART</a>
                                </div>
                            </div>
                        </div>
                    </div>
                  {/each}
              </div>
            {/if}
        </div>
        <div class="custom-shape-divider-bottom-1707459939">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                preserveAspectRatio="none">
                <path
                    d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                    class="shape-fill"></path>
            </svg>
        </div>
      </section>
</div>