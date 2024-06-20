<script lang="ts">
  import type { Content } from "@prismicio/client";
  import common from "../../../shared/common.service";
  common.animationAOS();
  export let slice: Content.ShopFeatureSectionSlice;
</script>

<section class="core pt-3">
  <section class="visa">
      <div class="container text-center">
          <div class="hero h-auto" data-aos="fade-up">
              <h2 class="mt-3">{slice?.primary?.title}</h2>
              <p class="lead">
                  {slice?.primary?.description}
              </p>
              <div class="mt-5">
                  <figure>
                      <img src={slice?.primary?.image?.url} alt={slice?.primary?.image?.alt || ''}>
                  </figure>
              </div>
          </div>
      </div>
  </section>
</section>
