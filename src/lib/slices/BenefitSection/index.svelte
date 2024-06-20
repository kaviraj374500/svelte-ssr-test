<script lang="ts">
  import type { Content } from "@prismicio/client";
  import common from "../../../shared/common.service";
  common.animationAOS();
  export let slice: Content.BenefitSectionSlice | any;
</script>

<div class="behind remove-tag" style="background-image: url({slice?.primary?.preview_background_image?.url})">
  <section class="finance">
    <div class="container text-center">
      <h1>{slice?.primary?.title}</h1>
      <h3 class="mt-0 sub-paragraph">{slice?.primary?.description}</h3>
      <div class="finance-card row gap-md-0 gap-sm-4 gap-4">
        {#each slice.primary.benefit_section_list as item}
          <div class="col-lg-4 col-md-4 d-flex justify-content-center pe-lg-3 pe-md-0 pe-sm-3 pe-3">
            <div class="fin-card" data-aos="flip-up">
              <img src={item?.image?.url} alt={item?.image?.alt || ''} />
              <h2 class="h1 fw-bold">{item?.title}</h2>
              <h4 class="pt-2">{item?.content}</h4>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>
</div>