import { query } from "../shared/shopify-query";
const storeFrontApi = "https://d752af-7a.myshopify.com/api/2024-04/graphql";

export class ShopifyService {
  async fetchGraphQL(query: any): Promise<any> {
    try {
      const response = await fetch(storeFrontApi, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": "ecaa8e19670c631cecdd19d9ceab1f07"
        },
        body: JSON.stringify(query)
      });
      const result = await response.json();
      if (response.ok) {
        return result.data;
      } else {
        throw new Error(result.errors ? result.errors.map((error: any) => error.message).join(', ') : 'Unknown error');
      }
    } catch (error) {
      console.error('GraphQL request failed', error);
      throw error;
    }
  }

  async getCollectionsWithProducts(): Promise<any> {
    return await this.fetchGraphQL(query.collectionsWithProduct);
  }

  async getProductDetailsById(id: any): Promise<any> {
    query.productByHandle.variables.handle = id;
    return await this.fetchGraphQL(query.productByHandle);
  }

  async customerCreate(inputs: any = {}): Promise<any> {
    query.customerCreate.variables.input = inputs;
    return await this.fetchGraphQL(query.customerCreate);
  }

  async customerLogin(inputs: any = {}): Promise<any> {
    query.customerLogin.variables.input = inputs;
    return await this.fetchGraphQL(query.customerLogin);
  }

  async customerRecover(inputs: any = {}): Promise<any> {
    query.customerRecover.variables = inputs;
    return await this.fetchGraphQL(query.customerRecover);
  }

  async customerReset(inputs: any = {}): Promise<any> {
    query.customerReset.variables = inputs;
    return await this.fetchGraphQL(query.customerReset);
  }

  async customerDetails(token: any = {}): Promise<any> {
    query.customerDetails.variables.accessToken = token;
    return await this.fetchGraphQL(query.customerDetails);
  }

  async customerUpdate(inputs: any = {}): Promise<any> {
    query.customerUpdate.variables = inputs;
    return await this.fetchGraphQL(query.customerUpdate);
  }

  async customerPasswordUpdate(inputs: any = {}): Promise<any> {
    query.customerPasswordUpdate.variables = inputs;
    return await this.fetchGraphQL(query.customerPasswordUpdate);
  }

  async createCart(litems: any[] = []): Promise<any> {
    query.createCart.variables.input.lines = litems;
    return await this.fetchGraphQL(query.createCart);
  }

  async updateCart(inputs: any = {}): Promise<any> {
    query.updateCart.variables = inputs;
    return await this.fetchGraphQL(query.updateCart);
  }

  async customerAssociateCart(inputs: any = {}): Promise<any> {
    query.customerAssociateCart.variables = inputs;
    return await this.fetchGraphQL(query.customerAssociateCart);
  }

  async checkoutURL(inputs: any = {}): Promise<any> {
    query.checkoutURL.variables = inputs;
    return await this.fetchGraphQL(query.checkoutURL);
  }

  async getCartData(inputs: any = {}): Promise<any> {
    query.getCartData.variables = inputs;
    return await this.fetchGraphQL(query.getCartData);
  }

  async getVariantData(inputs: any = {}): Promise<any> {
    query.getVariantData.variables.variantIds = inputs;
    return await this.fetchGraphQL(query.getVariantData);
  }

  async getOrdersDetails(inputs: any = {}): Promise<any> {
    query.getOrdersDetails.variables = inputs;
    return await this.fetchGraphQL(query.getOrdersDetails);
  }

  async getInstaPost(data: any): Promise<any> {
    const response = await fetch(`YOUR_API_ENDPOINT_HERE`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  async getProductReview(data: any): Promise<any> {
    const response = await fetch(`YOUR_API_ENDPOINT_HERE`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  async addProductReview(data: any): Promise<any> {
    const response = await fetch(`YOUR_API_ENDPOINT_HERE`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }
}
export default new ShopifyService();