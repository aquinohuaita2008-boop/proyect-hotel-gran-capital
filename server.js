const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.join(__dirname, 'public');
const now = () => new Date().toISOString();
const id = () => crypto.randomUUID();
const rooms = [
  { id:'H101', number:'101', type:'Habitación estándar', description:'Espacio acogedor con luz natural y escritorio de trabajo.', capacity:2, price:95, status:'DISPONIBLE', features:['WiFi','TV','Aire acondicionado'], image:'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80' },
  { id:'H202', number:'202', type:'Habitación deluxe', description:'Confort superior, cama king y una vista privilegiada.', capacity:2, price:145, status:'RESERVADA', features:['WiFi','Desayuno','Minibar'], image:'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80' },
  { id:'H305', number:'305', type:'Suite ejecutiva', description:'Suite amplia para viajes de negocios o escapadas especiales.', capacity:4, price:220, status:'OCUPADA', features:['WiFi','Sala','Minibar','Bañera'], image:'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80' },
  { id:'H410', number:'410', type:'Suite familiar', description:'Amplia y funcional, perfecta para compartir en familia.', capacity:5, price:260, status:'LIMPIEZA', features:['WiFi','2 habitaciones','Desayuno'], image:'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80' },
  { id:'H501', number:'501', type:'Presidencial', description:'La experiencia más exclusiva del Hotel Gran Capital.', capacity:3, price:390, status:'MANTENIMIENTO', features:['WiFi','Terraza','Jacuzzi','Room service'], image:'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=900&q=80' }
];
const services = [
  {id:'S1', name:'DESAYUNO', description:'Desayuno buffet servido en el restaurante.', price:18, available:true},
  {id:'S2', name:'SERVICIO A LA HABITACIÓN', description:'Atención gastronómica directamente en su habitación.', price:12, available:true},
  {id:'S3', name:'LAVANDERÍA', description:'Lavado y planchado de prendas.', price:20, available:true},
  {id:'S4', name:'TRANSPORTE', description:'Traslado privado desde o hacia el aeropuerto.', price:35, available:true},
  {id:'S5', name:'LIMPIEZA ADICIONAL', description:'Limpieza especial bajo solicitud.', price:15, available:true},
  {id:'S6', name:'CAMA EXTRA', description:'Cama adicional preparada en la habitación.', price:30, available:true}
];
const clients = [{id:'C1', name:'Ana Martínez', email:'ana@hotel.com', password:'123456', document:'45871236', phone:'+51 900 111 222'}];
const staff = [{id:'A1', name:'Moros Dev', username:'morosdev', password:'morosdev', role:'ADMINISTRADOR'}, {id:'R1', name:'Laura Recepción', username:'recepcion', password:'123456', role:'RECEPCIONISTA'}];
const reservations = [
  {id:'R-1001', clientId:'C1', clientName:'Ana Martínez', roomId:'H202', room:'202', checkIn:'2026-10-12', checkOut:'2026-10-15', guests:2, total:435, status:'CONFIRMADA', paymentStatus:'PARCIAL', createdAt:'2026-09-20'},
  {id:'R-1002', clientId:'C1', clientName:'Ana Martínez', roomId:'H101', room:'101', checkIn:'2026-08-02', checkOut:'2026-08-04', guests:1, total:190, status:'COMPLETADA', paymentStatus:'PAGADO', createdAt:'2026-07-15'}
];
const payments = [{id:'P1', reservationId:'R-1001', amount:200, total:435, method:'TARJETA', status:'PARCIAL'}, {id:'P2', reservationId:'R-1002', amount:190, total:190, method:'EFECTIVO', status:'PAGADO'}];
const requests = [{id:'SR1', reservationId:'R-1001', clientId:'C1', serviceId:'S1', service:'DESAYUNO', quantity:2, status:'PENDIENTE'}];

function send(res, code, data){ res.writeHead(code, {'Content-Type':'application/json; charset=utf-8','Access-Control-Allow-Origin':'*'}); res.end(JSON.stringify(data)); }
function body(req){ return new Promise(resolve=>{let s=''; req.on('data',c=>s+=c); req.on('end',()=>{try{resolve(s?JSON.parse(s):{})}catch{resolve({})}})}); }
function auth(req){ const h=req.headers.authorization||''; return h.replace('Bearer ',''); }
function userFrom(req){ const token=auth(req); return [...clients,...staff].find(x=>x.id===token); }
function isStaff(u){ return u && ['ADMINISTRADOR','RECEPCIONISTA'].includes(u.role); }
function route(req){ return new URL(req.url, 'http://localhost').pathname; }
async function api(req,res){
  const p=route(req), method=req.method, data=await body(req), user=userFrom(req);
  if(method==='OPTIONS') return send(res,204,{});
  if(p==='/api/login'&&method==='POST') { const u=[...clients,...staff].find(x=>(x.email===data.login||x.username===data.login)&&x.password===data.password); return u?send(res,200,{token:u.id,user:{id:u.id,name:u.name,email:u.email,role:u.role||'CLIENTE'}}):send(res,401,{error:'Credenciales incorrectas'}); }
  if(p==='/api/register'&&method==='POST') { if(clients.some(x=>x.email===data.email)) return send(res,409,{error:'El correo ya está registrado'}); const u={id:id(),name:data.name,email:data.email,password:data.password,document:data.document||'',phone:data.phone||''}; clients.push(u); return send(res,201,{token:u.id,user:{id:u.id,name:u.name,email:u.email,role:'CLIENTE'}}); }
  if(p==='/api/rooms'&&method==='GET') return send(res,200,rooms);
  if(p==='/api/services'&&method==='GET') return send(res,200,services);
  if(!user) return send(res,401,{error:'Sesión requerida'});
  if(p==='/api/me'&&method==='GET') return send(res,200,{...user,password:undefined});
  if(p==='/api/profile'&&method==='PUT'&&user.role===undefined){ Object.assign(user,{name:data.name||user.name,phone:data.phone||user.phone,document:data.document||user.document}); return send(res,200,{ok:true}); }
  if(p==='/api/reservations'&&method==='GET'){ const list=isStaff(user)?reservations:reservations.filter(r=>r.clientId===user.id); return send(res,200,list); }
  if(p.startsWith('/api/reservations/')&&p.endsWith('/cancel')&&method==='PATCH'&&!isStaff(user)){ const reservationId=p.split('/')[3]; const r=reservations.find(x=>x.id===reservationId&&x.clientId===user.id); if(!r)return send(res,404,{error:'Reserva no encontrada'}); if(['COMPLETADA','CANCELADA'].includes(r.status))return send(res,400,{error:'Esta reserva no se puede cancelar'}); r.status='CANCELADA'; const room=rooms.find(x=>x.id===r.roomId); if(room&&room.status==='RESERVADA')room.status='DISPONIBLE'; return send(res,200,r); }
  if(p==='/api/reservations'&&method==='POST'&&!isStaff(user)){ const room=rooms.find(x=>x.id===data.roomId); if(!room||room.status==='MANTENIMIENTO')return send(res,400,{error:'Habitación no disponible'}); const overlap=reservations.some(r=>r.roomId===data.roomId&&r.status!=='CANCELADA'&&data.checkIn<r.checkOut&&data.checkOut>r.checkIn); if(overlap)return send(res,409,{error:'La habitación no está disponible para esas fechas'}); const nights=Math.max(1,Math.ceil((new Date(data.checkOut)-new Date(data.checkIn))/86400000)); const r={id:'R-'+Math.floor(1000+Math.random()*8999),clientId:user.id,clientName:user.name,roomId:room.id,room:room.number,checkIn:data.checkIn,checkOut:data.checkOut,guests:Number(data.guests),total:nights*room.price,status:'PENDIENTE',paymentStatus:'PENDIENTE',createdAt:now().slice(0,10)}; reservations.push(r); payments.push({id:id(),reservationId:r.id,amount:0,total:r.total,method:'EFECTIVO',status:'PENDIENTE'}); return send(res,201,r); }
  if(p==='/api/payments'&&method==='GET'){const rs=isStaff(user)?reservations:reservations.filter(r=>r.clientId===user.id); return send(res,200,payments.filter(p=>rs.some(r=>r.id===p.reservationId)));}
  if(p==='/api/requests'&&method==='GET'){const rs=isStaff(user)?reservations:reservations.filter(r=>r.clientId===user.id); return send(res,200,requests.filter(x=>rs.some(r=>r.id===x.reservationId)));}
  if(p==='/api/requests'&&method==='POST'&&!isStaff(user)){ const r=reservations.find(x=>x.id===data.reservationId&&x.clientId===user.id), s=services.find(x=>x.id===data.serviceId); if(!r||!s||!s.available)return send(res,400,{error:'Solicitud no válida'}); const q={id:id(),reservationId:r.id,clientId:user.id,serviceId:s.id,service:s.name,quantity:Number(data.quantity||1),status:'PENDIENTE'}; requests.push(q); return send(res,201,q); }
  if(isStaff(user)&&p==='/api/admin/stats') return send(res,200,{rooms:{available:rooms.filter(x=>x.status==='DISPONIBLE').length,occupied:rooms.filter(x=>x.status==='OCUPADA').length,reserved:rooms.filter(x=>x.status==='RESERVADA').length,cleaning:rooms.filter(x=>x.status==='LIMPIEZA').length,maintenance:rooms.filter(x=>x.status==='MANTENIMIENTO').length},arrivals:reservations.filter(x=>x.checkIn===new Date().toISOString().slice(0,10)).length,departures:reservations.filter(x=>x.checkOut===new Date().toISOString().slice(0,10)).length,pending:reservations.filter(x=>x.status==='PENDIENTE').length,confirmed:reservations.filter(x=>x.status==='CONFIRMADA').length,payments:payments.filter(x=>x.status!=='PAGADO').length});
  if(isStaff(user)&&p==='/api/admin/reservations'&&method==='GET') return send(res,200,reservations);
  if(isStaff(user)&&p==='/api/admin/clients'&&method==='GET') return send(res,200,clients.map(x=>({...x,password:undefined, reservations:reservations.filter(r=>r.clientId===x.id).length})));
  if(isStaff(user)&&p==='/api/admin/requests'&&method==='GET') return send(res,200,requests);
  if(isStaff(user)&&p.startsWith('/api/admin/reservations/')&&method==='PUT'){const r=reservations.find(x=>x.id===p.split('/').pop()); if(!r)return send(res,404,{error:'Reserva no encontrada'}); Object.assign(r,data); return send(res,200,r);}
  if(isStaff(user)&&p.startsWith('/api/admin/requests/')&&method==='PUT'){const q=requests.find(x=>x.id===p.split('/').pop()); if(!q)return send(res,404,{error:'Solicitud no encontrada'}); q.status=data.status; return send(res,200,q);}
  return send(res,404,{error:'Ruta no encontrada'});
}
const server=http.createServer((req,res)=>{ if(req.url.startsWith('/api/')) return api(req,res); let file=path.join(root,req.url==='/'?'index.html':req.url); if(!file.startsWith(root))return send(res,403,{}); fs.readFile(file,(e,d)=>{if(e)return fs.readFile(path.join(root,'index.html'),(x,b)=>{res.writeHead(200,{'Content-Type':'text/html'});res.end(b)}); const ext=path.extname(file), types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml'};res.writeHead(200,{'Content-Type':types[ext]||'application/octet-stream'});res.end(d)}); });
server.listen(3000,()=>console.log('Hotel Gran Capital en http://localhost:3000'));
