import { ApiServices } from './ApiServices';

const endpoint = 'videos';

export const VideoService = {
  list(){
    return ApiServices.get(endpoint);
  }
}