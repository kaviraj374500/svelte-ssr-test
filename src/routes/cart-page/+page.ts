import { createClient } from "../../lib/prismicio";
import commonMtd from "../../shared/common.service";
export async function load() {
  try {
    let client = createClient();
    let cartSlice = await client.getSingle("cart_page");
    commonMtd.prismicKeyFields(cartSlice);
    return {
        cartSlice
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      homeSlice: null
    };
  }
}
