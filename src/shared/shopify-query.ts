export const query = {
  collectionsWithProduct: {
    query: `
      query MyQuery {
        collections(first: 100) {
          nodes {
            id
            title
            products(first: 50) {
              nodes {
                id
                handle
                featuredImage {
                  id
                  src
                }
                variants(first: 50) {
                  nodes {
                    price {
                      amount
                    }
                    id
                    sku
                    title
                    image {
                      id
                      src
                    }
                    availableForSale
                    quantityAvailable
                  }
                }
                title
              }
            }
          }
        }
      }
    `
  },
  productByHandle: {
    query: `
      query getProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
          id
          handle
          title
          descriptionHtml
          description 
          featuredImage {
            id
            src
          }
          images(first: 50) {
            nodes {
              id
              src
            }
          }
          options(first: 50) {
            name
            id
            values
          }
          metafield(key: "servings", namespace: "custom") {
            id
            type
            value
            key
          }
          variants(first: 50) {
            nodes {
              id
              title
              price {
                amount
              }
              sku
              weight
              weightUnit
              selectedOptions {
                name
                value
              }
              availableForSale
              quantityAvailable
            }
          }
        }
      }
    `,
    variables: {
      handle: null
    }
  },
  customerCreate: {
    query: `
      mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customerUserErrors {
            code
            field
            message
          }
          customer {
            id
          }
        }
      }
    `,
    variables: {
      input: {}
    }
  },
  customerLogin: {
    query: `
      mutation AuthenticateCustomer($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `,
    variables: {
      input: {
        email: "",
        password: ""
      }
    }
  },
  customerRecover: {
    query: `
      mutation customerRecover($email: String!) {
        customerRecover(email: $email) {
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `,
    variables: {}
  },
  customerReset: {
    query: `
      mutation resetPasswordByUrl($resetUrl: URL!, $password: String!) {
        customerResetByUrl(resetUrl: $resetUrl, password: $password) {
          customer {
            id
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `,
    variables: {
      resetUrl: "",
      password: ""
    }
  },
  customerDetails: {
    query: `
      query ($accessToken: String!) {
        customer(customerAccessToken: $accessToken) {
          id
          email
          firstName
          lastName
          phone
          displayName
        }
      }
    `,
    variables: {
      accessToken: ""
    }
  },
  customerUpdate: {
    query: `
      mutation($accessToken: String!, $input: CustomerUpdateInput!) {
        customerUpdate(customerAccessToken: $accessToken, customer: $input) {
          customer {
            id
            email
            firstName
            lastName
            phone
          }
          customerUserErrors {
            field
            message
          }
        }
      }
    `,
    variables: {
      accessToken: "",
      input: {}
    }
  },
  customerPasswordUpdate: {
    query: `
      mutation ($accessToken: String!, $newPassword: String!) {
        customerUpdate(customerAccessToken: $accessToken, customer: { password: $newPassword }) {
          customer {
            id
            email
            firstName
            lastName
            phone
          }
          customerUserErrors {
            field
            message
          }
        }
      }
    `,
    variables: {
      accessToken: "",
      newPassword: ""
    }
  },
  createCart: {
    query: `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
          }
        }
      }
    `,
    variables: {
      input: {
        lines: [
          {
            quantity: 0,
            merchandiseId: "Variant id here"
          }
        ]
      }
    }
  },
  updateCart: {
    query: `
      mutation updateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            id
          }
        }
      }
    `,
    variables: {
      cartId: "",
      lines: [
        {
          id: "",
          quantity: 0
        }
      ]
    }
  },
  customerAssociateCart: {
    query: `
      mutation customerAssociateCart($cartId: ID!, $token: String!) {
        cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: { customerAccessToken: $token }) {
          cart {
            id
          }
        }
      }
    `,
    variables: {
      cartId: "your-cart-id-here",
      token: "customer-access-token-here"
    }
  },
  checkoutURL: {
    query: `
      query checkoutURL($cartId: ID!) {
        cart(id: $cartId) {
          checkoutUrl
        }
      }
    `,
    variables: {
      cartId: "your-cart-id-here"
    }
  },
  getCartData: {
    query: `
      query getCartData($cartId: ID!) {
        cart(id: $cartId) {
          id
          createdAt
          updatedAt
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                  }
                }
                attributes {
                  key
                  value
                }
              }
            }
          }
          attributes {
            key
            value
          }
          estimatedCost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
            totalTaxAmount {
              amount
              currencyCode
            }
            totalDutyAmount {
              amount
              currencyCode
            }
          }
          buyerIdentity {
            email
            phone
            customer {
              id
            }
            countryCode
          }
        }
      }
    `,
    variables: {
      cartId: "your-cart-id-here"
    }
  },
  getVariantData: {
    query: `
      query GetVariantData($variantIds: [ID!]!) {
        nodes(ids: $variantIds) {
          ... on ProductVariant {
            id
            title
            sku
            price {
              amount
              currencyCode
            }
            availableForSale
            quantityAvailable
            product {
              id
              title
            }
            image {
              src
              altText
            }
          }
        }
      }
    `,
    variables: {
      variantIds: [
        "",
        ""
      ]
    }
  },
  getOrdersDetails: {
    query: `
      query getOrdersDetails($customerAccessToken: String!, $after: String, $before: String, $first: Int, $last: Int, $query: String) {
        customer(customerAccessToken: $customerAccessToken) {
          orders(after: $after, before: $before, first: $first, last: $last, query: $query, reverse: true) {
            edges {
              node {
                id
                name
                canceledAt
                cancelReason
                financialStatus
                fulfillmentStatus
                customerUrl
                statusUrl
                processedAt
                totalTax {
                  amount
                  currencyCode
                }
                subtotalPrice {
                  amount
                  currencyCode
                }
                totalPrice {
                  amount
                  currencyCode
                }
                totalShippingPrice {
                  amount
                  currencyCode
                }
                shippingAddress {
                  address1
                  address2
                  city
                  firstName
                  lastName
                  province
                  zip
                  country
                  name
                }
                lineItems(first: 45) {
                  edges {
                    node {
                      quantity
                      title
                      variant {
                        title
                        id
                        price {
                          amount
                          currencyCode
                        }
                        image {
                          id
                          src
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
            pageInfo {
              startCursor
              hasNextPage
              hasPreviousPage
              endCursor
            }
            totalCount
          }
        }
      }
    `,
    variables: {
      customerAccessToken: "",
      after: null,
      before: null,
      first: 0,
      last: 0,
      query: null
    }
  }
};
