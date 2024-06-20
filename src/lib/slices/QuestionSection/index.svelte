<script lang="ts">
  import type { Content } from "@prismicio/client";
  import common from "../../../shared/common.service";
  common.animationAOS();
  export let slice: Content.QuestionSectionSlice | any;
</script>

<div class="behind remove-tag" style="background-image: url({slice?.primary?.preview_background_image?.url})">
  <div class="container">
    <div class="ques-top-text mb-5 mt-3 text-center">
      <h2 class="text-light-dark">{slice?.primary?.title}</h2>
      <h5 class="purple fw-bold">{slice?.primary?.subtitle}</h5>
    </div>
    <div class="question-page">
      <div class="question-collapes" data-aos="zoom-in">
        <div class="accordion" id="accordionExample">
          {#each slice.primary.question_section_list as item, index}
          <div class="accordion-item">
            <h5 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapseOne${index}`}
                aria-expanded="false"
              >
                {item?.question}
              </button>
            </h5>
            <div
              id={`collapseOne${index}`}
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <p>{item?.answer}</p>
              </div>
            </div>
          </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>