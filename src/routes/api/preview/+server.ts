import { redirectToPreviewURL } from "@prismicio/svelte/kit";
import { createClient } from "$lib/prismicio";

export async function GET({ fetch, request, cookies }:any) {
  const client = createClient({ fetch });

  return await redirectToPreviewURL({ client, request, cookies });
}
