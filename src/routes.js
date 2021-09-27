import { Category, Product, ProductList } from "./Screens";

const routes = [
  {
    path: "/product",
    component: Product
  },
  {
    path: "/category",
    component: Category
  },
  {
    path: "/list",
    component: ProductList
  }
];
export default routes;
