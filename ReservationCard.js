import { isAdmin, getSession } from "@/utils";

export default function ReservationCard(reservation) {
  const { id, userId, workspace, date, startHour, endHour, reason, status } = reservation;
  const user = getSession();
  const admin = isAdmin();

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    cancelled: "bg-slate-100 text-slate-600",
  };

  const statusLabels = {
    pending: "Pendiente",
    approved: "Aprobada",
    rejected: "Rechazada",
    cancelled: "Cancelada",
  };

  const canEdit = admin || (userId === user.id && status === "pending");
  const canDelete = admin;
  const canCancel = !admin && userId === user.id && (status === "pending" || status === "approved");
  const canApproveReject = admin && status === "pending";

  return `
    <article class="bg-white border border-slate-200 rounded-lg p-4 shadow-sm flex flex-col gap-2">
      <div class="flex justify-between items-start">
        <h3 class="font-bold text-lg text-slate-800">${workspace}</h3>
        <span class="text-xs font-semibold px-2 py-1 rounded-full ${statusColors[status] || "bg-slate-100 text-slate-600"}">
          ${statusLabels[status] || status}
        </span>
      </div>

      <div class="text-sm text-slate-600 flex flex-col gap-1">
        <p><span class="font-medium">Fecha:</span> ${date}</p>
        <p><span class="font-medium">Horario:</span> ${startHour} - ${endHour}</p>
        <p><span class="font-medium">Motivo:</span> ${reason}</p>
        ${admin ? `<p><span class="font-medium">Usuario ID:</span> ${userId}</p>` : ""}
      </div>

      <div class="flex flex-wrap gap-2 mt-2">
        ${canApproveReject ? `
          <button data-action="approve" data-id="${id}" class="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Aprobar</button>
          <button data-action="reject" data-id="${id}" class="text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Rechazar</button>
        ` : ""}
        ${canEdit ? `
          <button data-action="edit" data-id="${id}" class="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Editar</button>
        ` : ""}
        ${canCancel ? `
          <button data-action="cancel" data-id="${id}" class="text-xs bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600">Cancelar</button>
        ` : ""}
        ${canDelete ? `
          <button data-action="delete" data-id="${id}" class="text-xs bg-slate-700 text-white px-3 py-1 rounded hover:bg-slate-900">Eliminar</button>
        ` : ""}
      </div>
    </article>
  `;
}