import { ref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useAuthUser } from './AuthStore';
import type { Product, ProductUpdate } from '@/interfaces/product';

export const useProductStore = defineStore('productStore', () => {
  
  const auth = useAuthUser();
  const products = ref<Product[]>([]);
  const productsUser = ref<Product[]>([]);
  const product = ref<Product>();
  const numberOfProducts = ref<number>(0);

  const { jwtToken, userId } = storeToRefs(auth);

  const getProducts = async () => {
    const res = await fetch('http://localhost:7216/Product')
    const data = await res.json()
    products.value = data;
    numberOfProducts.value = data.length;
  }

  const getProductsUser = async () => {
    const res = await fetch('http://localhost:7216/Product')
    const data = await res.json()
    if (data) {
      productsUser.value = data.filter((product: Product) => product.userId.toString() === userId.value);
    }
  }

  const getProduct = async (idProduct: string) => {
    const res = await fetch(`http://localhost:7216/Product/${idProduct}`)
    const data = await res.json();
    product.value = data;
  }

  const modifyProduct = async (idProduct: string, product: ProductUpdate) => {
    const indexProduct = products.value.findIndex((prod: Product) => prod.productId.toString() === idProduct);
    const indexProductUser = productsUser.value.findIndex((prod: Product) => prod.productId.toString() === idProduct);
    await fetch(`http://localhost:7216/Product/${idProduct}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken.value}`
      },
      body: JSON.stringify(product)
    })
    if (indexProduct !== -1) {
      products.value[indexProduct] = convertProductUpdateToProduct(product, products.value[indexProduct]);
    }
    if (indexProductUser !== -1) {
      productsUser.value[indexProductUser] = convertProductUpdateToProduct(product, productsUser.value[indexProductUser]);
    }
  }

  const deleteProduct = async (idProduct: string) => {
    await fetch(`http://localhost:7216/Product/${idProduct}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken.value}`
      }
    })
    await deleteLocalProduct(idProduct);
  }

  const deleteLocalProduct = (idProduct: string) => {
    productsUser.value = productsUser.value.filter((product: Product) => product.productId.toString() !== idProduct);
  }

  const convertProductUpdateToProduct = (productUpdate: ProductUpdate, product: Product): Product => {
    return {
      productId: product.productId,
      userId: product.userId,
      productType: productUpdate.productType,
      productName: productUpdate.productName,
      productDescription: productUpdate.productDescription,
      productPrice: productUpdate.productPrice,
      productAvailability: product.productAvailability,
      productOnline: productUpdate.productOnline,
      productStock: productUpdate.productStock,
      productRating: product.productRating,
      userEmail: product.userEmail
    }
  }


  return {
    products,
    product,
    productsUser,
    numberOfProducts,
    getProducts,
    getProduct,
    getProductsUser,
    modifyProduct,
    deleteProduct
  }
})
