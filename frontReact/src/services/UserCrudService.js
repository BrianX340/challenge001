import axios from "axios";
const API_URL = "http://localhost:3001/";
class UserCrudService {
  createOperation(concept, amount, date, type) {
    return axios({
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
      .then((res) => {
          const { status, user } = res.data;
          if(status === 'ok'){
            console.log(res.data)
            localStorage.setItem("user", JSON.stringify(user));
            return true
          }
          return false
      })
      .catch( (error) =>{
          console.log(error);
      })
  }
}
export default new UserCrudService();