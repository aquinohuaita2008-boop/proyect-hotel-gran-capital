import { reports } from '@/services/hotel.services';

const render = (element: Element, data: Record<string, unknown>[]) => {
  element.innerHTML = data.length
    ? data.map((row) => `<div class="flex items-center justify-between rounded-lg bg-mist p-3 text-sm"><span class="font-semibold text-slate-600">${String(row.estado || 'Registro')}</span><b class="text-ocean">${String(row.total ?? row.recaudado ?? '—')}</b></div>`).join('')
    : '<p class="text-sm text-slate-500">Sin datos disponibles.</p>';
};

try {
  const [reservations, occupancy, payments] = await Promise.all([
    reports.reservations(),
    reports.occupancy(),
    reports.payments(),
  ]);
  render(document.querySelector('#reservation-report')!, reservations);
  render(document.querySelector('#occupancy-report')!, occupancy);
  render(document.querySelector('#payment-report')!, payments);
} catch (error) {
  document.querySelector('#report-error')!.innerHTML = `<p class="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">${(error as Error).message}</p>`;
}
