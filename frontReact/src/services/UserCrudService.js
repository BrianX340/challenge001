import axios from "axios";
const API_URL = "http://localhost:3001/";
class UserCrudService {
	createOperation(concept, amount, type) {
		return axios({
			method: 'post',
			url: `http://localhost:3001/user/createOperation`,
			crossdomain: true,
			data: {
				concept,
				amount,
				type,
				token: JSON.parse(localStorage.getItem('user')).token
			}
		})
			.then((res) => {
				const { status, user } = res.data;
				if (status === 'ok') {
					localStorage.setItem("user", user);
					return true
				}
				return false
			})
			.catch((error) => {
				console.log(error);
			})
	}
	deleteOperation(operationId) {
		return axios({
			method: 'post',
			url: `http://localhost:3001/user/deleteOperation`,
			crossdomain: true,
			data: {
				operationId,
				token: JSON.parse(localStorage.getItem('user')).token
			}
		})
			.then((res) => {
				const { status, user } = res.data;
				if (status === 'ok') {
					localStorage.setItem("user", user);
					return true
				}
				return false
			})
			.catch((error) => {
				console.log(error);
			})
	}
}
export default new UserCrudService();