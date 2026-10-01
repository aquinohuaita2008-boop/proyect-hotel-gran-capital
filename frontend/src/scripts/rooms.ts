import { rooms } from '@/services/hotel.services';
import { roomSchema } from '@/schemas/schemas';

const list = document.querySelector('#room-list');
const feedback = document.querySelector('#feedback');

const render = async (query = '') => {
  try {
    const data = await rooms.list(query);
    list!.innerHTML = data.length
      ? data.map((room) => `<article class="surface overflow-hidden"><div class="h-36 bg-[linear-gradient(120deg,#10283f,#176b87)] p-5 text-white"><span class="status bg-white/20 text-white">${room.estado}</span><p class="mt-5 font-display text-2xl">Habitación ${room.numero}</p></div><div class="p-5"><h3 class="font-bold text-ink">${room.tipo}</h3><p class="mt-1 text-sm text-slate-500">Capacidad: ${room.capacidad} huéspedes</p><div class="mt-4 flex items-center justify-between"><strong class="text-xl text-ocean">$${room.precio}<small class="text-xs text-slate-400"> / noche</small></strong><a href="/reservas" class="rounded-lg bg-mist px-3 py-2 text-xs font-bold text-ocean">Reservar</a></div></div></article>`).join('')
      : '<div class="surface col-span-full p-12 text-center text-slate-500">No hay habitaciones para este filtro.</div>';
  } catch (error) {
    feedback!.textContent = (error as Error).message;
    feedback!.className = 'mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700';
  }
};

render();
document.querySelector('#apply-filter')?.addEventListener('click', () => {
  const type = (document.querySelector('#filter-type') as HTMLInputElement).value;
  const status = (document.querySelector('#filter-status') as HTMLSelectElement).value;
  const params = new URLSearchParams();
  if (type) params.set('tipo', type);
  if (status) params.set('estado', status);
  render(params.toString() ? `?${params}` : '');
});

const modal = document.querySelector('#room-modal');
document.querySelector('#new-room')?.addEventListener('click', () => modal?.classList.replace('hidden', 'flex'));
document.querySelector('#close-room')?.addEventListener('click', () => modal?.classList.replace('flex', 'hidden'));
document.querySelector('#room-form')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const parsed = roomSchema.safeParse(Object.fromEntries(new FormData(event.currentTarget as HTMLFormElement)));
  if (!parsed.success) {
    feedback!.textContent = parsed.error.issues[0]?.message;
    feedback!.className = 'mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700';
    return;
  }
  try {
    await rooms.create(parsed.data);
    modal?.classList.replace('flex', 'hidden');
    await render();
  } catch (error) {
    feedback!.textContent = (error as Error).message;
    feedback!.className = 'mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700';
  }
});
