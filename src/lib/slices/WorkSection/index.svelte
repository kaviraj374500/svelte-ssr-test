<script lang="ts">
  import type { Content } from "@prismicio/client";

  export let slice: Content.WorkSectionSlice | any;
</script>

<div class="behind remove-tag" style="background-image: url({slice?.primary?.preview_background_image?.url})">
  <section class="party">
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center">
          <h1>{slice?.primary?.title}</h1>
          <h4 class="b-para">{slice?.primary?.description}</h4>
        </div>
      </div>
      <div class="row justify-content-center">
        {#each slice.primary.work_section_list as item, index}
        <div class="col-lg-4 col-md-5 col-sm-7 me-lg-5">
          <div
            class="text-center {index === 0 ? 'outline-card-og' : ''} {slice.primary.work_section_list.length - 1 === index ? 'outline-card-gr' : ''}">
            <div class="card-img-1 cursor-pointer">
              <img src={item?.image?.url} alt={item?.image?.alt || ''} />
            </div>
            <div class="title-card">
              <h3 class="purple cursor-pointer">{item?.title}</h3>
              <h4>{item?.content}</h4>
            </div>
          </div>
        </div>
        {/each}
      </div>
    </div>
  </section>
</div>