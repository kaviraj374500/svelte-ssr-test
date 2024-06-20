import ShopifyService from "../../shared/shopify.service";
import { createClient } from "../../lib/prismicio";
import commonMtd from "../../shared/common.service";
export async function load() {
  try {
    let client = createClient();
    let shopSlice = await client.getSingle("shop");
    commonMtd.prismicKeyFields(shopSlice);
    let res = await ShopifyService.getCollectionsWithProducts();
    let productData = commonMtd.transformObject(res);
    return {
        shopSlice,
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
