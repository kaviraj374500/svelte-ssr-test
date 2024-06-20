import { onMount } from "svelte";
import cookieService from './cookie.service';
import { toasts }  from "svelte-toasts";
import { writable } from 'svelte/store';
import shopifyService from "./shopify.service";

export const cartCount = writable(0);
export class CommonService {
  capitalizeFirstLetter (string: string) {
    return string.toLowerCase().replace(/_./g, match => match.charAt(1).toUpperCase());
  }
  
    prismicKeyFields (datas:any) {
      if (datas?.data) {
          Object.keys(datas.data).forEach(key => {
              let value = datas.data[key];
              if (Array.isArray(value)) {
                  let obj = value[0];
                  datas[this.capitalizeFirstLetter(obj.slice_type)] = obj;
              }
          });
      }
    }

    animationAOS = () => {
        onMount(async () => {
            try {
                let AOS = await import("aos");
                setTimeout(() => {
                    try {
                        AOS.init({
                            once: true,
                            duration: 1500,
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }, 1500);
            } catch (error) {
                console.error("Error fetching data from Prismic:", error);
            }
        });
    }

    async lottieInteractivityCursor (
        className: any,
        position1: any,
        frames1: any,
        position2?: any,
        frames2?: any
      ) {
        // @ts-ignore
        const { create } = await import("@lottiefiles/lottie-interactivity");
        let intervalId: any;
        intervalId = setInterval(() => {
          try {
            let actions = [{ position: position1, type: "seek", frames: frames1 }];
    
            if (position2?.length || frames2?.length) {
              actions.push({ position: position2, type: "stop", frames: frames2 });
            }
    
            create({
              player: className,
              mode: "cursor",
              actions,
            });
    
            clearInterval(intervalId);
          } catch (error) {}
        }, 1000);
      };
    
      async lottieInteractivityScroll (
        className: any,
        visibility1: any,
        frames1: any,
        visibility2?: any,
        frames2?: any,
        relativeContainer?: any
      ) {
        // @ts-ignore
        const { create } = await import("@lottiefiles/lottie-interactivity");
        let intervalId1: any;
        intervalId1 = setInterval(() => {
          try {
            let actions = [
              { visibility: visibility1, type: "seek", frames: frames1 },
            ];
    
            if (visibility2?.length || frames2?.length) {
              actions.push({
                visibility: visibility2,
                type: "seek",
                frames: frames2,
              });
            }
    
            let options = {
              player: className,
              mode: "scroll",
              actions,
              ...(relativeContainer && { container: relativeContainer }),
            };
            create(options);
    
            clearInterval(intervalId1);
          } catch (error) {}
        }, 1000);
      };

      transformObject(obj: any): any {
        if (!obj || ["string", "boolean", "number"].includes(typeof obj)) {
          return obj;
        }
        let transformObjectCallback = this.transformObject.bind(this);
        if (Array.isArray(obj)) {
          return obj.map(transformObjectCallback);
        } else if (obj.hasOwnProperty("edges")) {
          return obj.edges.map((edge: any) => this.transformObject(edge.node));
        }
        return Object.keys(obj).reduce((result: any, key: string) => {
          let r = this.transformObject(obj[key]);
          if (key === "node" || key === "nodes") {
            return r;
          }
          result[key] = r;
          return result;
        }, {});
      }

      allProductAnimation() {
        onMount(async () => {
          try {
            // @ts-ignore
            await import('slick-carousel');
            let jQuery = await import('jquery');
            let $ = jQuery.default;
            setTimeout(() => {
              let $slider = $('.product-slider');
              if ($slider.hasClass('slick-initialized')) {
                $slider.slick('unslick');
              }
              $slider.slick({
                dots: false,
                autoplay: true,
                autoplaySpeed: 6000,
                speed: 1000,
                slidesToShow: 3,
                arrows: true,
                nextArrow: '<span class="slick-arrow-next"><i class="fa fa-angle-right" aria-hidden="true"></i></span>',
                prevArrow: '<span class="slick-arrow-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></span>',
                responsive: [
                  {
                    breakpoint: 2500,
                    settings: {
                      slidesToShow: 3,
                    }
                  },
                  {
                    breakpoint: 1200,
                    settings: {
                      slidesToShow: 2,
                    }
                  },
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 1,
                    }
                  }
                ]
              });
            }, 100);
          } catch (error) {
            console.error("Error loading slick-carousel or jQuery:", error);
          }
        });
      }      

      productRefresh() {
        onMount(() => {
          setTimeout( async () => {
            try {
              // @ts-ignore
              await import('slick-carousel');
              let jQuery = await import('jquery');
              let $ = jQuery.default;
              let $sliderFooter = $('.product-slider-footer');
                if ($sliderFooter.hasClass('slick-initialized')) {
                  $sliderFooter.slick('unslick');
                }
                $sliderFooter.slick({
                  dots: false,
                  autoplay: true,
                  autoplaySpeed: 6000,
                  speed: 1000,
                  slidesToShow: 3,
                  arrows: true,
                  nextArrow: '<span class="slick-arrow-next"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></span>',
                  prevArrow: '<span class="slick-arrow-prev"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></span>',
                  responsive: [
                    {
                      breakpoint: 2500,
                      settings: {
                        slidesToShow: 3,
                      }
                    },
                    {
                      breakpoint: 1200,
                      settings: {
                        slidesToShow: 2,
                      }
                    },
                    {
                      breakpoint: 768,
                      settings: {
                        slidesToShow: 1,
                      }
                    }
                  ]
                });
            } catch (error) {
              console.error("Error loading jQuery:", error);
            }
          }, 2000);
        });
      }      

      getLocalStorageItem = (key: string): any => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(key) || '[]';
        }
        return null;
    };

    errorToast (message:string) {
      toasts.add({
        title: 'Error',
        description: message,
        duration: 100000,
        placement: 'top-right',
        type: 'error',
        theme: 'dark',
        showProgress: true
      });
    }
    
    successToast(message:string) {
      toasts.add({
        title: 'Success',
        description: message,
        duration: 3000,
        placement: 'top-right',
        type: 'success',
        theme: 'dark',
        showProgress: true
      });
    }

    onClickCart(product:any = {}) {
      let quantity = 1;
      let variants = product.variants[0];
      let {email, cartDet, currProduct} = this.currentProductDatas(product.title, variants.title);
      if (!variants.availableForSale) {
        this.errorToast(product.title + " - Out of Stock.");
        return;
      } else if ((quantity + (currProduct?.quantity || 0)) > variants.quantityAvailable) {
        this.errorToast("All " + product.title + " - " + variants.title + " are in your cart.");
        return;
      }
      if (!email) {
        let cartDetList = cartDet.find((item:any) => (item == null || item?.email == null || item?.email == ''));
  
        let res = this.getCartList(cartDetList, variants, quantity, product);
  
        if (res?.cartDetList && res?.prevCount) {
          let cartDetailIndex;
          cartDetailIndex = cartDet.findIndex((item:any) => (item == null || item?.email == null || item?.email == ''));
          if (cartDetailIndex != null && cartDetailIndex > -1) {
            cartDet[cartDetailIndex] = {
              email, list: res.cartDetList, countDetails: res.prevCount,
              cartId: (cartDet[cartDetailIndex]?.cartId) ? cartDet[cartDetailIndex].cartId : null, isNew: true
            };
          } else {
            cartDet.push({ email, list: res.cartDetList, countDetails: res.prevCount, isNew: true, cartId:"" });
          }
          localStorage.setItem('embraceCartDetails', JSON.stringify(cartDet));
          // this.cartCount.next(res?.prevCount?.qCount);
          // this.openModel(cartDet, this.modalService);
        }
      } else {
        let cartDetList = cartDet.find((item:any) => (item?.email == email));
        let res = this.getCartList(cartDetList, variants, quantity, product);
  
  
        if (res?.cartDetList && res?.prevCount) {
          let cartDetailIndex = cartDet.findIndex((item:any) => (item?.email == email));
          if (cartDetailIndex != null && cartDetailIndex > -1) {
            cartDet[cartDetailIndex] = {
              email, list: res.cartDetList, countDetails: res.prevCount,
              cartId: (cartDet[cartDetailIndex]?.cartId) ? cartDet[cartDetailIndex].cartId : null, isNew: true
            };
  
          } else {
            cartDet.push({ email, list: res.cartDetList, countDetails: res.prevCount, isNew: true, cartId:""});
          }
          localStorage.setItem('embraceCartDetails', JSON.stringify(cartDet));
          // this.cartCount.next(res?.prevCount?.qCount);
          // this.openModel(cartDet, this.modalService);
        }
      }
    }

    getCartList(cartDetail:any, variants:any, quantity:any, product:any, productImage?:any) {
      if (!productImage) {
        productImage = product.featuredImage;
      }
      let prevCount = (cartDetail?.countDetails) ? cartDetail.countDetails : { qCount: 0, pCount: 0, subTotal: 0, note: '' };
      let cartDetList = (cartDetail?.list) ? cartDetail.list : [];
      let index = cartDetList.findIndex((item:any) => item.id == variants.id);
      if (index != null && index > -1) {
        if (variants.availableForSale || (cartDetList[index].quantity + quantity) <= variants.quantityAvailable) {
          cartDetList[index].quantity = cartDetList[index].quantity + quantity;
          let total = parseFloat(cartDetList[index].total) + (parseFloat(variants.price.amount) * quantity);
          cartDetList[index].total = total.toFixed(2);
          cartDetList[index].totalQuantity = variants.quantityAvailable;
        } else {
          if (variants.quantityAvailable < 1) {
            this.errorToast(product.title + " - Out of Stock.");
          } else {
            this.errorToast("All " + product.title + " - " + variants.title + " are in your cart.");
          }
          return {}
        }
      } else {
        let total = (parseFloat(variants.price.amount) * quantity);
        prevCount.pCount += 1;
        cartDetList.push({
          quantity: quantity,
          title: product.title,
          price: { amount : parseFloat(variants.price.amount)},
          image: productImage,
          total: total.toFixed(2),
          totalQuantity: variants.quantityAvailable,
          variantTitle: variants?.title || '', 
          id: variants.id,
          availableForSale:variants.availableForSale
        })
      }
  
      let subTotal = 0;
      for (let data of cartDetList) {
        subTotal += (data.price.amount * data.quantity);
      }
      prevCount.qCount += quantity;
      prevCount.subTotal = subTotal.toFixed(2);
      return { cartDetList: cartDetList, prevCount: prevCount };
    }

    currentProductDatas(title:string, variantTitle:string){
      let { email } = this.getUserData();
      let cartDet = JSON.parse(this.getLocalStorageItem("embraceCartDetails")) || [];
      let currUser = cartDet?.find((val:any) => (val?.email || null) == email);
      let currProduct = currUser?.list?.find((val:any) => val?.title == title && val.variantTitle == variantTitle);
      return {email, cartDet, currUser, currProduct};
    }

    getUserData() {
      let currentUserDataString = cookieService.getCookie('currentUserData');
      if (currentUserDataString) {
        return JSON.parse(currentUserDataString || '{}');
      } else {
        return {
          customerAccessToken : {},
          email : null,
          showUserMenu : false,
          shortName : ""
        };
      }
    }

    async createCart(lineItemsToAdd:any, cartDetails: any = [], cartDetailIndex: number = 0, quantity: any = {}) {
      let { customerAccessToken } = this.getUserData();
      // this.isLoading.next(true);
      const handleCartUpdate = async (cartId: string, lineItemsToUpdate: any[]) => {
        await shopifyService.updateCart({ cartId, lines: lineItemsToUpdate });
        let obj = { cartId, token : customerAccessToken?.accessToken};
        this.redirectToCheckout(cartId, cartDetails, cartDetailIndex, obj, quantity);
      };
  
      const handleCartCreation = (res: any) => {
        let newCartId = res.data?.cartCreate?.cart?.id || "";
        if (newCartId) {
          let obj = { cartId: newCartId, token : customerAccessToken?.accessToken};
          this.redirectToCheckout(newCartId, cartDetails, cartDetailIndex, obj, quantity);
        }
      };
  
      const handleCartData = async (res: any) => {
        let lineItemsToUpdate:any = [];
        let lineItems = [];
        lineItemsToAdd.forEach((item:any) => {
          let data = res?.data?.cart?.lines?.edges.find((li:any) =>
            li?.node?.merchandise?.id == item["merchandiseId"]
          );
          if (data?.node?.id) {
            lineItemsToUpdate.push({
              id: data.node.id,
              quantity: item["quantity"],
            });
          } else {
            lineItems.push(item);
          }
        });
  
        if (lineItems.length < 1 && lineItemsToUpdate.length > 0) {
          res?.data?.cart?.lines?.edges.forEach((item:any) => {
            let data = lineItemsToAdd.find((li:any) =>
              li["merchandiseId"] == item?.node?.merchandise?.id
            );
            if (!data) {
              lineItemsToUpdate.push({
                id: item?.node.id,
                quantity: 0,
              });
            }
          });
  
          if (lineItemsToUpdate?.length > 0) {
            handleCartUpdate(cartDetails[cartDetailIndex]?.cartId, lineItemsToUpdate);
          }
        } else {
          let res = await shopifyService.createCart(lineItemsToAdd);
          handleCartCreation(res)
        }
      };
  
      if (cartDetails?.length && cartDetailIndex != null && cartDetailIndex > -1 && cartDetails[cartDetailIndex]?.cartId && cartDetails[cartDetailIndex]?.cartId != 'null' && cartDetails[cartDetailIndex]?.cartId != '') {
        let cartId = cartDetails[cartDetailIndex]?.cartId;
        let res = await shopifyService.getCartData({ cartId });
        handleCartData(res)
      } else {
        let res = await shopifyService.createCart(lineItemsToAdd);
        handleCartCreation(res)
      }
    }
  
    async redirectToCheckout(cartId: string, cartDetails: any = [], index: number = 0, isAssociateCart: any = {}, quantity:any = {}) {
      let res = await shopifyService.checkoutURL({ cartId })
      if (res?.data) {
        if (cartDetails?.length) {
          cartDetails[index].cartId = cartId;
          localStorage.setItem('embraceCartDetails', JSON.stringify(cartDetails));
        }
        if (isAssociateCart?.token) {
          await shopifyService.customerAssociateCart(isAssociateCart);
        }
        if(quantity?.value) {
          quantity.value = 1;
        }
        window.location.href = res.data.cart.checkoutUrl;
      }
    }
}

export default new CommonService();