const API = 'http://localhost:500';

export const ApiServices = {
  get(endpoint){
    return fetch(`${API}/${endpoint}`)
    .then(response => response.json())
    .catch(err => console.log(err));
  }
}
