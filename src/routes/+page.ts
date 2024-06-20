import { createClient } from "../lib/prismicio";
import ShopifyService from "../shared/shopify.service";
import commonMtd from "../shared/common.service";
export async function load() {
  try {
    let client = createClient();
    let homeSlice = await client.getSingle("home_page");
    commonMtd.prismicKeyFields(homeSlice);
    let res = await ShopifyService.getCollectionsWithProducts();
    let productData = commonMtd.transformObject(res);

    return {
      homeSlice,
      productData
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      homeSlice: null,
      productData: null
    };
  }
}
