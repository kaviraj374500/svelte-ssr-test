<script lang="ts">
  import type { Content } from "@prismicio/client";
  import commonMtd from "../../../shared/common.service";
  let selectedCollectionIndex:number = 0;
  commonMtd.animationAOS();
  export let slice: Content.ShopProductSectionSlice;
  export let productData: any;
</script>

{#if productData?.collections?.length}
<section class="behind news-cards" style="background-image: url({slice.primary.image.url})">
  <div class="container mt-5" id="product_list">
      <h1 class="text-center text-white">
          {@html slice.primary.title}
      </h1>
      <div class="tab-section mx-auto">
          <ul class="nav nav-pills justify-content-center my-4" id="pills-tab" role="tablist">
              {#each productData.collections as item, index}
              <li class="nav-item" role="presentation" >
                  <button class="{index == selectedCollectionIndex ? 'active': ''} nav-link" id="pills-all-tab" data-bs-toggle="pill" data-bs-target="#pills-all" type="button" role="tab" aria-controls="pills-all" aria-selected="true" on:click={() => selectedCollectionIndex = index}>
                      {item?.title=='Home page'?'All':item.title}
                  </button>
              </li>
              {/each}
          </ul>
          <div class="tab-content" id="pills-tabContent">
              <div class="tab-pane fade show active" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab">
                  {#if productData?.collections?.[selectedCollectionIndex]?.products?.length}
                  <div class="row d-flex gap-md-0 gap-sm-5 gap-4 products">
                      {#each productData?.collections[selectedCollectionIndex].products as item}
                          <div class="col-md-6 col-xl-4 d-flex" data-aos="flip-right">
                              <div class="card news-card-back">
                                  <div class="position-relative" style="background-image: url({slice.primary.image_background.url})">
                                      <a>
                                          <img src={item?.featuredImage?.src} alt="product">
                                      </a>
                                      <label class="pack-label">{item?.variants?.[0]?.title}</label>
                                  </div>
                                  <div class="card-body d-flex justify-content-between align-items-end">
                                      <div>
                                          <a class="justify-content-start">
                                              <h3>{item?.title}</h3>
                                          </a>
                                      </div>
                                      <div>
                                          <h3>${item?.variants?.[0]?.price?.amount}</h3>
                                      </div>
                                  </div>
                                  <div class="card-viewer d-flex flex-row justify-content-between ">
                                      <div class="col-6 ps-0 pe-1">
                                          <a class="btn-hover2 cursor-pointer">Buy Now</a>
                                      </div>
                                      <div class="news-link col-6 ps-1 pe-0">
                                          <a  class="btn-hover1 cursor-pointer" on:click={() => commonMtd.onClickCart(item)}>Add To Cart</a>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      {/each}
                  </div>
                  {/if}
              </div>
          </div>
      </div>
  </div>
</section>
{/if}