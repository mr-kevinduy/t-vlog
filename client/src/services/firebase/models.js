import firebase from './index';

export const UserModel = async () => await firebase.firestore().collection('users');
export const CartModel = async () => await firebase.firestore().collection('carts');
export const OrdersModel = async () => await firebase.firestore().collection('orders');
