import fire from '../config/firebase';
import { MenuOrder } from '../interfaces/Menu.interfcae';
import * as fb from 'firebase/app';

const MY_SERVICE = {
	login: (email: string, password: string) => {
		return fire.auth().signInWithEmailAndPassword(email, password);
	},
	logOut: async () => {
		return fire.auth().signOut();
	},
	takeOrder: async (table:number, orderList: MenuOrder[], total: number, menuType: string) => {
		const now = new Date();
		const created_at = fb.firestore.Timestamp.fromDate(now);
		const ref = fire.firestore().collection('orders-dashboard').doc();
		const Id = ref.id;
		await fire.firestore().collection('orders-dashboard').doc(Id).set({ table,  orders: orderList, created_at, active: true, total, menuType });
		await fire.firestore().collection('orders').doc(Id).set({ table,  orders: orderList, created_at });
	},
	appendToOrder: async (currentId: string, orderList: MenuOrder[]) => {
		const orderRef = fire.firestore().collection("orders").doc(currentId);
		return await orderRef.set({ orders: orderList }, { merge: true });
	},
	getOrders: (cb: any) => {
		return fire.firestore().collection('orders').onSnapshot(cb);
	}
};

export default MY_SERVICE;
