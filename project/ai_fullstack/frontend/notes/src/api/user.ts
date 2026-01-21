import axios from './config';
import type { Credentail } from '@/types';
import type { User } from '@/types';

export const doLogin = (data: Credentail):Promise<{token:string,user:User}> => {
  return axios.post('/auth/login', data);
}