import type { Session } from '@/types/api.types';
const TOKEN='hotel_gran_capital_token'; const SESSION='hotel_gran_capital_session';
export const storage={ getToken:()=>localStorage.getItem(TOKEN), setSession:(token:string,session?:Session)=>{localStorage.setItem(TOKEN,token);if(session)localStorage.setItem(SESSION,JSON.stringify(session))}, getSession:():Session|null=>{const raw=localStorage.getItem(SESSION);try{return raw?JSON.parse(raw):null}catch{return null}}, clear:()=>{localStorage.removeItem(TOKEN);localStorage.removeItem(SESSION)}, isAuthenticated:()=>Boolean(localStorage.getItem(TOKEN)) };

