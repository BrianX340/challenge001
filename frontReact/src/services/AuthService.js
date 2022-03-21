import axios from "axios";
const API_URL = "http://localhost:3001/";
class AuthService {
	async login(email, password) {
		try{
			const res = await axios({
				method: 'post',
				url: `http://localhost:3001/login`,
				crossdomain: true,
				data: {
					email,
					password
				}
			})
			const { status } = res.data;
				if (status === 'ok') {
					localStorage.setItem("user", res.data.user);
					return true
				}
				return false
		}
		catch (err){
			console.error(err)
		}

	}
	logout() {
		localStorage.removeItem("user");
	}
	async register(email, password) {
		try{
			var res = await axios({
				method: 'post',
				url: API_URL + `register`,
				data: {
					email,
					password
				}
			})
			console.log(res)
			const { status } = res.data;
			return status === 'ok'
		}
		catch (err){
			console.error(err)
		}
	}
	getCurrentUser() {
		return localStorage.getItem('user');
	}
}
export default new AuthService();