export enum ProductActionsTypes{
  GET_ALL_PRODUCTS="[Product] Get All products",
  GET_SELECTED_PRODUCTS="[Product] Get Selected products",
  GET_AVAILABLE_PRODUCTS="[Product] Get Available products",
  SEARCH_PRODUCTS="[Product] search products",
  NEW_PRODUCTS="[Product] new products",
  SELECT_PRODUCTS="[Product] select products",
  EDIT_PRODUCTS="[Product] edit products",
  DELETE_PRODUCTS="[Product] delete products",
}
export interface ActionEvent{
  type:ProductActionsTypes,
  payload:any
}

export enum DataStateEnum{
  LOADING,
  LOADED,
  ERROR
}
export interface AppDataState<T>{
  dataState?:DataStateEnum,
  data?:T,
  errorMessage?:string
}
