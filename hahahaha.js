//home.controller

import ReservationCard from "@/components/ReservationCard";
import {
  getReservation,
  createReservation,
  updateReservation,
  patchReservation,
  deleteReservation,
} from "@/services/reservation.service";
import { getSession, isAdmin } from "@/utils";

const renderReservations = async () => {
  const container = document.querySelector("#reservationsContainer");
  const user = getSession();
  const admin = isAdmin();

  try {
    const reservations = await getReservation();
    const filtered = admin
      ? reservations
      : reservations.filter((r) => r.userId === user.id);

    container.innerHTML = filtered.length
      ? filtered.map((r) => ReservationCard(r)).join("")
      : `<div class="w-full text-center py-8 col-span-2">
           <p class="text-slate-500">No hay reservas disponibles</p>
         </div>`;

    attachCardEvents();
  } catch {
    container.innerHTML = `<p class="text-red-500 col-span-2">Error cargando reservas.</p>`;
  }
};

const showError = (msg) => {
  const box = document.querySelector("#formError");
  const p = box.querySelector("p");
  if (msg) {
    p.textContent = msg;
    box.classList.remove("hidden");
  } else {
    box.classList.add("hidden");
  }
};

const hasDuplicate = async (workspace, date, startHour, endHour, excludeId = null) => {
  const all = await getReservation();
  return all.some((r) => {
    if (excludeId && r.id === Number(excludeId)) return false;
    if (r.workspace !== workspace || r.date !== date) return false;
    if (r.status === "cancelled" || r.status === "rejected") return false;
    return startHour < r.endHour && endHour > r.startHour;
  });
};

const resetForm = () => {
  document.querySelector("#reservationForm").reset();
  document.querySelector("#editId").value = "";
  document.querySelector("#submitBtn").textContent = "Crear Reserva";
  document.querySelector("#cancelEditBtn").classList.add("hidden");
  showError(null);
};

const loadEditForm = (reservation) => {
  document.querySelector("#editId").value = reservation.id;
  document.querySelector("#workspace").value = reservation.workspace;
  document.querySelector("#date").value = reservation.date;
  document.querySelector("#startHour").value = reservation.startHour;
  document.querySelector("#endHour").value = reservation.endHour;
  document.querySelector("#reason").value = reservation.reason;
  document.querySelector("#submitBtn").textContent = "Guardar cambios";
  document.querySelector("#cancelEditBtn").classList.remove("hidden");
  document.querySelector("#formSection").scrollIntoView({ behavior: "smooth" });
  showError(null);
};

const attachCardEvents = () => {
  const user = getSession();
  const admin = isAdmin();

  document.querySelectorAll("[data-action]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const action = btn.dataset.action;
      const id = Number(btn.dataset.id);

      if (action === "delete") {
        if (!confirm("¿Eliminar esta reserva?")) return;
        await deleteReservation(id);
        await renderReservations();
      }

      if (action === "approve") {
        await patchReservation(id, { status: "approved" });
        await renderReservations();
      }

      if (action === "reject") {
        await patchReservation(id, { status: "rejected" });
        await renderReservations();
      }

      if (action === "cancel") {
        if (!confirm("¿Cancelar esta reserva?")) return;
        await patchReservation(id, { status: "cancelled" });
        await renderReservations();
      }

      if (action === "edit") {
        const all = await getReservation();
        const reservation = all.find((r) => r.id === id);
        if (reservation) loadEditForm(reservation);
      }
    });
  });
};

export const homeController = async () => {
  await renderReservations();

  const form = document.querySelector("#reservationForm");
  const cancelEditBtn = document.querySelector("#cancelEditBtn");
  const user = getSession();
  const admin = isAdmin();

  cancelEditBtn.addEventListener("click", resetForm);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    showError(null);

    const editId = document.querySelector("#editId").value;
    const workspace = document.querySelector("#workspace").value;
    const date = document.querySelector("#date").value;
    const startHour = document.querySelector("#startHour").value;
    const endHour = document.querySelector("#endHour").value;
    const reason = document.querySelector("#reason").value.trim();

    if (startHour >= endHour) {
      showError("La hora de fin debe ser posterior a la hora de inicio.");
      return;
    }

    const duplicate = await hasDuplicate(workspace, date, startHour, endHour, editId || null);
    if (duplicate) {
      showError("Ya existe una reserva para ese espacio en ese horario.");
      return;
    }

    if (editId) {
      const all = await getReservation();
      const original = all.find((r) => r.id === Number(editId));

      if (!admin && (original.userId !== user.id || original.status !== "pending")) {
        showError("No tienes permisos para editar esta reserva.");
        return;
      }

      await updateReservation(Number(editId), {
        ...original,
        workspace,
        date,
        startHour,
        endHour,
        reason,
      });
    } else {
      await createReservation({
        userId: user.id,
        workspace,
        date,
        startHour,
        endHour,
        reason,
        status: "pending",
      });
    }

    resetForm();
    await renderReservations();
  });
};