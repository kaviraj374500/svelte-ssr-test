<script lang="ts">
  import { createClient } from "../lib/prismicio";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import commonMtd from "../shared/common.service";
  let headerSlice : any = {};

  onMount(async () => {
    try {
      let client = createClient();
      headerSlice = await client.getSingle("header");
      commonMtd.prismicKeyFields(headerSlice);
    } catch (error) {
      console.error("Error fetching data from Prismic:", error);
    }
  });

  const handleNavigation = (event: Event, menuUid: string) => {
    event.preventDefault();
    goto(menuUid);
  }

</script>

<header>
  {#if headerSlice?.data}
    <nav class="container navbar navbar-expand-lg">
      <div class="container-fluid">
        <a class="nav-logo p-0" href="/">
          <img src={headerSlice.data.logo.url} alt="Logo" />
        </a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul
            class="icon-right-list navbar-nav d-flex justify-content-center align-items-center gap-lg-2 gap-md-2 gap-sm-2 gap-2 mb-2 mb-lg-0"
          >
          {#each headerSlice.menusSection.primary.menus_section_list as section}
            <li class="nav-item">
              <a href="#" class="nav-link" on:click={(event) => handleNavigation(event, section.menu_uid)}>{section.menu_name}</a>
            </li>
          {/each}
          </ul>
        </div>
      </div>
    </nav>
  {/if}
</header>
