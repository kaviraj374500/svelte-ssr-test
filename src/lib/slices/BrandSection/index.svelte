<script lang="ts">
  import type { Content } from "@prismicio/client";
  import common from "../../../shared/common.service"
  common.animationAOS();
  export let slice: Content.BrandSectionSlice | any;
</script>

<div class="core remove-tag" style="background-image: url({slice.primary.preview_background_image.url})">
  <div class="container about-banner" data-aos="zoom-in" style="background-image: url({slice.primary.background_image.url})">
    <div class="d-flex justify-content-lg-end justify-content-md-end justify-content-ms-center justify-content-center flex-column flex-sm-row">
      <div class="d-flex">
        <div class="col-md-6 d-flex justify-content-center align-items-center">
          <img
            class="mw-350"
            src={slice.primary.logo1.url}
            alt={slice.primary.logo1.alt || ""}
          />
        </div>
        <div class="col-md-6 d-flex justify-content-center align-items-center">
          <img
            class="mw-350"
            src={slice.primary.logo2.url}
            alt={slice.primary.logo2.alt || ""}
          />
        </div>
      </div>
      <div class="col-md-6 banner-text d-flex align-content-start align-content-sm-center flex-column flex-wrap align-items-start">
        <h3 class="text-md-start text-start pre-line">
          {slice.primary.title}
        </h3>
        <div class="visa-btn text-sm-center text-md-start text-center">
          <a class="btn-hover3" href="/">
            {slice.primary.btn_text}
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
