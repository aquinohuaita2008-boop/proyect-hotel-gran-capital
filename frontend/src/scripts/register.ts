import { register } from '@/services/auth.service';
import { registerSchema } from '@/schemas/schemas';

const form=document.querySelector<HTMLFormElement>('#register-form');
const error=document.querySelector('#form-error');
form?.addEventListener('submit',async event=>{event.preventDefault();if(!form)return;const values=Object.fromEntries(new FormData(form));const parsed=registerSchema.safeParse(values);if(!parsed.success){error!.innerHTML=`<p class="rounded-lg bg-red-50 p-3 text-sm text-red-700">${parsed.error.issues[0]?.message}</p>`;return}try{const result=await register(parsed.data);location.href=result.user.rol==='CLIENTE'?'/reservas':'/dashboard'}catch(e){error!.innerHTML=`<p class="rounded-lg bg-red-50 p-3 text-sm text-red-700">${(e as Error).message}</p>`}});
