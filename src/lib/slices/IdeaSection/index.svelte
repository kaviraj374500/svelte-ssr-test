<script lang="ts">
  import type { Content } from "@prismicio/client";

  export let slice: Content.IdeaSectionSlice | any;
</script>

<div class="behind remove-tag" style="background-image: url({slice?.primary?.preview_background_image?.url})">
  <div class="container">
    <h1 class="text-center">
      {@html slice?.primary?.title?.[0]?.text}
    </h1>
    <h2 class="b-para pt-0">{slice?.primary?.paragraph}</h2>
    <div class="row gap-md-0 gap-sm-4 gap-4 mt-3">
      {#each slice.primary.idea_section_list as item, index}
        <div class="col-lg-6 col-md-6 d-flex">
          {#if index === 0}
            <div>
              <img src={item?.image?.url} alt={item?.image?.alt || ''} />
            </div>
          {/if}
          
          <div class={`ps-4 text-start ${slice.primary.idea_section_list.length - 1 === index ? 'pe-4 text-sm-end' : ''}`}>
            <h3 class={`text-lime ${slice.primary.idea_section_list.length - 1 === index ? 'text-end' : ''}`}>{item?.name}</h3>
            <h3 class={`text-lime ${slice.primary.idea_section_list.length - 1 === index ? 'text-end' : ''}`}>{item?.last_name}</h3>
            <h4 class={`text-light-dark ${slice.primary.idea_section_list.length - 1 === index ? 'text-sm-end' : ''}`}>{item?.description}</h4>
          </div>
  
          {#if slice.primary.idea_section_list.length - 1 === index}
            <figure>
              <img src={item?.image?.url} alt={item?.image?.alt || ''} />
            </figure>
          {/if}
        </div>
      {/each}
    </div>
    <div class="mt-5 mid-logo">
      <figure>
        <img
          src={slice?.primary?.logo?.url}
          alt={slice?.primary?.logo?.alt || ''}
        />
      </figure>
    </div>
  </div>
</div>
