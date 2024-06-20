<script>
  import { PrismicPreview } from "@prismicio/svelte/kit";
  import { repositoryName } from "../lib/prismicio";
  import "bootstrap/dist/css/bootstrap.min.css";
  import "@fortawesome/fontawesome-free/css/all.min.css"
  import scriptSrc from "bootstrap/dist/js/bootstrap.bundle.js?url";
  import Header from "../components/header.svelte";
  import Footer from "../components/footer.svelte";
  import { FlatToast, ToastContainer } from "svelte-toasts";
</script>

<svelte:head>
  <style>
    @import "/assets/styles/globals.css";
  </style>
  <script src={scriptSrc}></script>
</svelte:head>

<div class="site-wrapper">
  <div class="app_header">
    <Header/>
  </div>
  <ToastContainer let:data={data}>
      <FlatToast {data}  />
  </ToastContainer>
  <slot />
  <Footer/>
</div>

<PrismicPreview {repositoryName} />