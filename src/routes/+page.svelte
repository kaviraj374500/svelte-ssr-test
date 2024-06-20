<script lang="ts">
  import { onMount } from "svelte";
  import BannerSection from "../lib/slices/BannerSection/index.svelte";
  import VariantsSection from "../lib/slices/VariantsSection/index.svelte";
  import BrandSection from "../lib/slices/BrandSection/index.svelte";
  import TrandSection from "../lib/slices/TrendSection/index.svelte";
  import IdeaSection from "../lib/slices/IdeaSection/index.svelte";
  import BenefitSection from "../lib/slices/BenefitSection/index.svelte";
  import LogoSection from "../lib/slices/LogoSection/index.svelte";
  import WorkSection from "../lib/slices/WorkSection/index.svelte";
  import QuestionSection from "../lib/slices/QuestionSection/index.svelte";
  import HomeProductSection from "../lib/slices/HomeProductSection/index.svelte";
  import commonMtd from "../shared/common.service";
  export let data;
  let { homeSlice, productData } :any = data;
  onMount(() => {
    setTimeout(() => {
      let coreElements = document.querySelectorAll('.remove-tag');
      coreElements.forEach((element: any) => {
        element.style.backgroundImage = null;
        element.classList.remove('core');
        element.classList.remove('behind');
      });
    }, 1500);
  });
  commonMtd.allProductAnimation();
  commonMtd.animationAOS();
</script>

{#if homeSlice?.data}
<BannerSection slice={homeSlice.bannerSection}></BannerSection>
<section class="core" style="background-image: url({homeSlice.variantsSection.primary.background_image.url})">
  <VariantsSection slice={homeSlice.variantsSection}></VariantsSection>
  <section class="news-cards">
    <div class="container">
      {#if productData?.collections?.[0]?.products?.length}
        <div class="row d-flex gap-md-0 gap-sm-5 gap-4 product-slider">
          {#each productData.collections[0].products as item}
            <div class="col-lg-4 col-md-4 d-flex" data-aos="flip-right"> 
              <div class="card news-card-back">
                  <div class="position-relative d-flex justify-content-center cursor-pointer">
                      <img class="w-50" src={item?.featuredImage?.src} alt="product">
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

                  <div class="card-viewer flex-row d-flex justify-content-between ">
                      <div class="col-6 ps-0 pe-1">
                          <a href="/" class="btn-hover2 cursor-pointer">BUY NOW</a>
                      </div>
                      <div class="news-link col-6 pe-0 ps-1">
                          <a href="/" class="btn-hover1 cursor-pointer">ADD TO CART</a>
                      </div>
                  </div>
              </div>
          </div>
        {/each}
      </div>  
      {/if}
  </div>
  </section>
  <BrandSection slice={homeSlice.brandSection}></BrandSection>
  <TrandSection slice={homeSlice.trendSection}></TrandSection>
</section>
<section class="behind b-back" style="background-image: url({homeSlice.ideaSection?.primary?.background_image?.url})">
  <IdeaSection slice={homeSlice.ideaSection}></IdeaSection>
  <BenefitSection slice={homeSlice.benefitSection}></BenefitSection>
  <LogoSection slice={homeSlice.logoSection}></LogoSection>
  <WorkSection slice={homeSlice.workSection}></WorkSection>
  <QuestionSection slice={homeSlice.questionSection}></QuestionSection>
  <HomeProductSection slice={homeSlice.homeProductSection} productData={productData}></HomeProductSection>
</section>
{/if}
