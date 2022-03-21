import axios from "axios";
class UserCrudService {
	async createOperation(concept, amount, date, type) {
		try{
			const res =  await axios({
				method: 'post',
				url: `http://localhost:3001/user/createOperation`,
				crossdomain: true,
				data: {
					concept,
				amount,
				date,
				type,
				token: JSON.parse(localStorage.getItem('user')).token
				}
			})
			const { status, user } = res.data;
			if (status === 'ok') {
				localStorage.setItem("user", user);
				return true
			}
			return false
		}
		catch (err){
			console.error(err)
		}
	}
	async deleteOperation(operationId) {
		try{
			const res = await axios({
				method: 'post',
				url: `http://localhost:3001/user/deleteOperation`,
				crossdomain: true,
				data: {
					operationId,
					token: JSON.parse(localStorage.getItem('user')).token
				}
			})
			const { status, user } = res.data;
			if (status === 'ok') {
				localStorage.setItem("user", user);
				return true
			}
			return false
		}
		catch (err){
			console.error(err)
		}
	}
	async updateOperation(operationId, modifyConcept, modifyAmount, modifyDate) {
		try{
			const res = await axios({
				method: 'post',
				url: `http://localhost:3001/user/updateOperation`,
				crossdomain: true,
				data: {
					operationId,
					modifyConcept,
					modifyAmount,
					modifyDate,
					token: JSON.parse(localStorage.getItem('user')).token
				}
			})
			const { status, user } = res.data;
			if (status === 'ok') {
				localStorage.setItem("user", user);
				return true
			}
			return false
		}
		catch (err){
			console.error(err)
		}
	}
}
export default new UserCrudService();