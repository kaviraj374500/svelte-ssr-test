<script lang="ts">
  import { onMount } from "svelte";
  import commonMtd from "../../shared/common.service";
  import { createClient } from "../../lib/prismicio";
  import CommonBannerSection from "../../lib/slices/CommonBannerSection/index.svelte";
  let cartCount:any = {};
  let cartDetails:any = [];
  let prevCount:any;
  let cartList:any = [];
  let cartDetailIndex = -1;
  let productData: any = {};
  export let data;
  let { cartSlice } :any = data;
  let cDetails:any = JSON.parse(commonMtd.getLocalStorageItem("embraceCartDetails")) || [];
  let { email } = commonMtd.getUserData();
  if (email) {
    cartDetailIndex = cDetails.findIndex((item: any) => item?.email == email);
    cartDetails = cDetails;
    let cartDetail = cDetails[cartDetailIndex];
    cartCount = cartDetail?.countDetails ? cartDetail.countDetails : { qCount: 0, pCount: 0, subTotal: 0, note: ""};
    prevCount = cartCount;
    cartList = cartDetail?.list ? cartDetail?.list : [];
  } else {
    cartDetailIndex = cDetails.findIndex(
      (item:any) => item == null || item?.email == null || item?.email == ""
    );
    cartDetails = cDetails;
    let cartDetail = cDetails[cartDetailIndex];
    cartCount = cartDetail?.countDetails
      ? cartDetail.countDetails
      : {
          qCount: 0,
          pCount: 0,
          subTotal: 0,
          note: "",
        };
    prevCount = cartCount;
    cartList = cartDetail?.list ? cartDetail?.list : [];
  }
  cartList = cartList;
  commonMtd.animationAOS();

  const plus = (data:any, i:number) => {
    if (data.quantity < data.totalQuantity) {
      data.quantity += 1;
      prevCount.qCount += 1;
      let subTotal = parseFloat(prevCount.subTotal) + (parseFloat(data.price.amount) * 1);
      prevCount.subTotal = (subTotal).toFixed(2);
      let total = parseFloat(data.total) + (parseFloat(data.price.amount) * 1);
      data.total = (total).toFixed(2);
    } else {
        commonMtd.errorToast("Stock Limit Exceeds for " + data.title);
    }
    onClickUpdateCart();
  }

  const minus = (data:any, i:number) => {
    if (data.quantity > 1) {
      data.quantity -= 1;
      prevCount.qCount -= 1;
      if (prevCount.qCount < 0) {
        prevCount.qCount = 0;
      }
      let subTotal = parseFloat(prevCount.subTotal) - (parseFloat(data.price.amount) * 1);
      prevCount.subTotal = (subTotal).toFixed(2);
      if (prevCount.subTotal < 0) {
        prevCount.subTotal = 0;
      }
      let total = parseFloat(data.total) - (parseFloat(data.price.amount) * 1);
      data.total = (total).toFixed(2);
      if (data.total < 0) {
        data.total = 0;
      }
    }
    onClickUpdateCart();
  }

  const onClickUpdateCart = () => {
    // commonMtd.apiLoading.next(true);
    cartDetails[cartDetailIndex].list = cartList;
    cartDetails[cartDetailIndex].countDetails = prevCount;
    localStorage.setItem('embraceCartDetails', JSON.stringify(cartDetails));
    cartCount = Object.assign({}, prevCount);
    // commonMtd.cartCount.next(cartCount.qCount);
    // commonMtd.apiLoading.next(false);
  }

  const onClickInfo = () => {
    if (cartCount?.pCount > 0) {
      let lineItems:any = [];
      cartList.forEach((item:any) => {
        lineItems.push({
          quantity: item.quantity,
          merchandiseId: item.id
        })
      });
      commonMtd.createCart(lineItems, cartDetails, cartDetailIndex);
    } else {
        commonMtd.errorToast("Can't checkout for empty cart. Please add minimum one product to checkout");
      return;
    }
  }
</script>

{#if cartSlice?.data}
<CommonBannerSection slice={cartSlice.commonBannerSection}></CommonBannerSection>
<div class="cart-page cart-area pt-5 pb-5">
    <div class="container">
        {#if (!cartList || cartList?.length == 0)}
            <p style="min-height: 154px;" class="d-flex justify-content-center p-2 text-white"><b>Your cart is currently empty.</b></p>
        {/if}
        {#if cartList?.length}
        <div class="row">
            <div class="col-12">
                <div class="cart-wrapper">
                    <div class="table-responsive">
                        <table class="table mb-0">
                            <thead>
                                <tr class="text-white">
                                    <th class="product-thumbnail"></th>
                                    <th class="product-name">Product Details</th>
                                    <th class="product-price">Price</th>
                                    <th class="product-quantity">Quantity</th>
                                    <th class="product-subtotal">Total</th>
                                    <th class="product-delete"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each cartList as data, index}
                                    <tr class="text-white">
                                        <td class="product-thumbnail">
                                            <div class="cart-img">
                                                <a><img src={data?.image?.src} alt={data.image.alt ||''}></a>
                                            </div>
                                        </td>
                                        <td class="product-name">
                                            <h4><a>{data?.title}</a></h4>
                                            <span class="xsmall-title-oswald font-weight-normal text-capitalize">{data?.variantTitle}</span>
                                        </td>
                                        <td class="product-price">${data?.price.amount}</td>
                                        <td class="product-quantity">
                                            <div class="cart-plus-minus">
                                                <form class="num-block">
                                                    <input type="text" class="in-num text-white" bind:value={data.quantity} name="quantity" readonly />
                                                    <div class="qtybutton-box">
                                                        <span on:click={() => plus(data, index)} class="plus text-black {!data?.availableForSale && data?.quantityAvailable == 0 ? 'disabled': '' }"><i
                                                                class="fa fa-plus mt-1"></i></span>
                                                        <span on:click={() => minus(data, index)} class="minus text-black {data.quantity == 1 ? 'disabled': ''}"><i
                                                                class="fa fa-minus mt-2"></i></span>
                                                    </div>
                                                </form>
                                            </div>
                                        </td>
                                        <td class="product-subtotal"><span>${data?.total}</span></td>
                                        <td class="product-delete"><a class="cursor-pointer"><i class="fa fa-trash"></i></a>
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="cart-total pt-50 mt-5">
                    <h3 class="title text-white">CART TOTALS</h3>
                    <div class="shop-cart-widget">
                        <form action="#">
                            <ul class="text-black">
                                <li class="sub-total"><span>SUB TOTAL</span> $ {prevCount?.subTotal}</li>
                                <li >Shipping, taxes, and discounts will be calculated at checkout.</li>
                            </ul>
                            <a on:click={() => onClickInfo()} class="btn-hover1 cursor-pointer {!cartList?.length ? 'disabled' : ''}">CHECK OUT</a>
                        </form>
                    </div>
                </div>
                <a href="/shop" class="btn-hover1 d-inline-block mt-2">Continue Shopping</a>
            </div>
        </div>
        {/if}
    </div>
</div>
{/if}