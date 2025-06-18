import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

const api = axios.create({
  baseURL: 'https://api.fake-anime.com',
});

api.interceptors.request.use((config) => {
  const apiKey = localStorage.getItem('apiKey');
  if (apiKey) {
    config.headers['x-api-key'] = apiKey;
  }
  return config;
});

const mock = new AxiosMockAdapter(api, { delayResponse: 500 });

let characters = [
  { id: 1, name: 'Goku', anime: 'Dragon Ball', power: 9000, ability: 'Kamehameha', comment: '' },
  { id: 2, name: 'Naruto', anime: 'Naruto', power: 8500, ability: 'Rasengan', comment: '' },
];

mock.onGet('/characters').reply((config) => {
  if (!config.headers || !config.headers['x-api-key']) {
    return [401, { message: 'No API Key' }];
  }
  return [200, characters];
});

mock.onPost('/characters').reply((config) => {
  const data = JSON.parse(config.data);
  if (characters.find((c) => c.name === data.name)) {
    return [400, { message: 'Nombre duplicado' }];
  }
  const nuevo = { ...data, id: Date.now() };
  characters.push(nuevo);
  return [201, nuevo];
});

mock.onGet(/\/characters\/\d+/).reply((config) => {
  const id = Number(config.url!.split('/').pop());
  const char = characters.find(c => c.id === id);
  return char ? [200, char] : [404, { message: 'No encontrado' }];
});

export default api;
