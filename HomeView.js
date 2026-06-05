import Sidebar from "@/components/Sidebar";
import { getSession, isAdmin } from "@/utils";
import { homeController } from "@/controllers/home.controller";

export default function homeView() {
  const user = getSession();
  const admin = isAdmin();

  setTimeout(() => {
    homeController();
  });

  return `
    <div class="flex">

      ${Sidebar()}

      <main class="flex-1 bg-slate-100 min-h-screen p-6">

        <div class="mb-6">
          <h1 class="text-2xl font-bold text-slate-800">Bienvenido, ${user?.name}</h1>
          <p class="text-slate-500 text-sm">
            Rol: <span class="font-semibold ${admin ? "text-blue-600" : "text-green-600"}">${admin ? "Administrador" : "Usuario"}</span>
          </p>
        </div>

        <section class="bg-white p-5 rounded-lg shadow mb-6" id="formSection">
          <h2 class="font-bold text-xl mb-4 text-slate-800">${admin ? "Crear Reserva" : "Nueva Reserva"}</h2>
          <form id="reservationForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="hidden" id="editId" value="">

            <div>
              <label class="text-sm font-medium text-slate-600 block mb-1">Espacio</label>
              <select id="workspace" class="border w-full p-2 rounded text-sm" required>
                <option value="">Selecciona un espacio</option>
                <option value="Sala de Reuniones A">Sala de Reuniones A</option>
                <option value="Sala de Reuniones B">Sala de Reuniones B</option>
                <option value="Oficina Privada 1">Oficina Privada 1</option>
                <option value="Oficina Privada 2">Oficina Privada 2</option>
                <option value="Espacio Coworking">Espacio Coworking</option>
                <option value="Auditorio">Auditorio</option>
              </select>
            </div>

            <div>
              <label class="text-sm font-medium text-slate-600 block mb-1">Fecha</label>
              <input type="date" id="date" class="border w-full p-2 rounded text-sm" required>
            </div>

            <div>
              <label class="text-sm font-medium text-slate-600 block mb-1">Hora inicio</label>
              <input type="time" id="startHour" class="border w-full p-2 rounded text-sm" required>
            </div>

            <div>
              <label class="text-sm font-medium text-slate-600 block mb-1">Hora fin</label>
              <input type="time" id="endHour" class="border w-full p-2 rounded text-sm" required>
            </div>

            <div class="md:col-span-2">
              <label class="text-sm font-medium text-slate-600 block mb-1">Motivo</label>
              <input type="text" id="reason" placeholder="Motivo de la reserva" class="border w-full p-2 rounded text-sm" required>
            </div>

            <div id="formError" class="md:col-span-2 hidden">
              <p class="text-red-600 text-sm"></p>
            </div>

            <div class="md:col-span-2 flex gap-2">
              <button type="submit" id="submitBtn" class="bg-blue-600 text-white px-5 py-2 rounded text-sm hover:bg-blue-700">
                Crear Reserva
              </button>
              <button type="button" id="cancelEditBtn" class="hidden bg-slate-400 text-white px-5 py-2 rounded text-sm hover:bg-slate-500">
                Cancelar edición
              </button>
            </div>
          </form>
        </section>

        <section class="bg-white p-5 rounded-lg shadow">
          <div class="flex justify-between items-center mb-4">
            <h2 class="font-bold text-xl text-slate-800">Reservas</h2>
            <span class="text-sm text-slate-500">
              ${admin ? "Mostrando todas las reservas" : "Mostrando únicamente tus reservas"}
            </span>
          </div>
          <div id="reservationsContainer" class="grid gap-4 md:grid-cols-2">
            <div class="w-full text-center py-8 col-span-2">
              <p class="text-emerald-800">Cargando reservas ...</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  `;
}