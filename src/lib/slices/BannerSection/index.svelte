<script lang="ts">
  import type { Content } from "@prismicio/client";
  import { onMount } from "svelte";
  onMount(async () => {
    try {
      setTimeout(() => {
        initSplitScreenAnimation();
        toggleMute([
          "bannerplayerdesktop",
          "bannerplayerdesktopleft",
          "bannerplayermobile",
        ]);
      }, 1000);
    } catch (error) {
      console.error("Error fetching data from Prismic:", error);
    }
  });
  export let slice: Content.BannerSectionSlice;

  let initSplitScreenAnimation = () => {
    let container = document.querySelector(".container-mask") as HTMLElement;
    let leftArea = document.querySelector(".split__layer--left") as HTMLElement;
    let bar = document.querySelector(".split__handle-bar") as HTMLElement;
    let skew = 0;
    let delta = 0;
    if (container.classList.contains("skew")) {
      skew = 1000;
    }
    let init = () => {
      container.classList.add("reset");
      bar.style.left = "50%";
      leftArea.style.width = `${window.innerWidth / 2 + skew}px`;
    };
    let slideHandleBar = (e: MouseEvent) => {
      container.classList.remove("reset");
      delta = (e.clientX - window.innerWidth / 2) * 0.5;
      bar.style.left = `${e.clientX + delta}px`;
      leftArea.style.width = `${e.clientX + skew + delta}px`;
    };
    container.addEventListener("mousemove", slideHandleBar);
    container.addEventListener("mouseleave", init);
    window.addEventListener("resize", init);
    init();
  };

  let toggleMute = (arrayString: string[]) => {
    arrayString.forEach((x) => {
      let ele = document.getElementById(x) as HTMLVideoElement;
      if (ele) {
        ele.muted = !ele.muted;
        if (!ele.paused) {
          ele.play();
        }
      }
    });
  };
</script>

<div class="container-mask split skew">
  <div class="split__layer split__layer--right">
    <div class="split__wrapper">
      <video
        id="bannerplayerdesktop"
        src={slice.primary.right_video_link?.url}
        loop
        autoPlay
        playsInline
        class="banner-video-desktop"
      >
        <track
          kind="captions"
          src="captions_en.vtt"
          srclang="en"
          label="English"
        />
      </video>
    </div>
  </div>

  <div class="split__layer split__layer--left">
    <div class="split__wrapper">
      <video
        id="bannerplayerdesktopleft"
        src={slice.primary.left_video_link?.url}
        loop
        autoPlay
        playsInline
        class="banner-video-desktop"
      >
        <track
          kind="captions"
          src="captions_en.vtt"
          srclang="en"
          label="English"
        />
      </video>
    </div>
  </div>

  <div class="split__handle-bar"></div>
</div>
<section class="hero">
  <div class="hero-video">
    <video
      id="bannerplayermobile"
      src={slice.primary.mobile_video_link?.url}
      loop
      autoPlay
      playsInline
      class="banner-video-desktop"
    >
      <track
        kind="captions"
        src="captions_en.vtt"
        srclang="en"
        label="English"
      />
    </video>
  </div>
</section>
