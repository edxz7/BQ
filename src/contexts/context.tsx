import React, { Component, createContext } from 'react';
import MY_SERVICE from '../services/index';
import { MenuOrder } from '../interfaces/Menu.interfcae';

interface IState {
  state: any;
	handleLogin: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
	submitOrder: (table: number, order: MenuOrder[], total: number, menuType: string) => void;
	appendToOrder: ( currentId: string, order: MenuOrder[]) => void;
	getOrders: (cb: any) => Promise<() => void>;
	logout: () => Promise<void>;
	setUser(state: boolean): void;
}

export const MyContext = createContext({ } as IState);

class MyProvider extends Component {
	state = {
		loginForm: {
			email: '',
			password: ''
		},
		loggedUser: {},
		isLoggedIn: false
	};

	logout = async () => {
		return await MY_SERVICE.logOut();
	}

	handleLogin = async (email: string, password: string) => {
		return await MY_SERVICE.login(email, password)
  };

	appendToOrder = (currentId: string, orderList: MenuOrder[]) => {
		MY_SERVICE.appendToOrder(currentId, orderList)
	}

	submitOrder = (table: number, orderList: MenuOrder[], total: number, menuType: string) => {
		MY_SERVICE.takeOrder(table, orderList, total, menuType)
	}

	getOrders = async (cb: any) => {
		return MY_SERVICE.getOrders(cb);
	}
	
	setUser = (state: boolean) => {
		this.setState({ isLoggedIn: state})
	}

	render() {
		return (
			<MyContext.Provider
				value={{
					state: this.state,
					handleLogin: this.handleLogin,
					appendToOrder: this.appendToOrder,
					submitOrder: this.submitOrder,
					getOrders: this.getOrders,
					logout: this.logout,
					setUser: this.setUser
				}}
			>
				{this.props.children}
			</MyContext.Provider>
		);
	}
}

export default MyProvider;
