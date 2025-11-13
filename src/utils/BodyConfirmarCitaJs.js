  import { ruta } from "../utils/ruta.js";

    async function actualizarCita(id, accion) {
        try {
            // Deshabilitar botones
            const btnConfirmar = document.getElementById("btnConfirmar");
            const btnCancelar = document.getElementById("btnCancelar");
            btnConfirmar.disabled = true;
            btnCancelar.disabled = true;

            // Agregar atributo al <body>
            document.body.setAttribute(
                "data-estado",
                accion === "confirmar" ? "confirmada" : "cancelada",
            );

            const endpoint =
                accion === "confirmar"
                    ? `${ruta}/confirmar-cita`
                    : `${ruta}/cancelar-cita`;

            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id,
                    estado: document.body.dataset.estado,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                document.getElementById("mensaje").textContent =
                    accion === "confirmar"
                        ? "✅ Tu cita ha sido confirmada con éxito"
                        : "❌ Tu cita ha sido cancelada";
            } else {
                document.getElementById("mensaje").textContent =
                    "⚠️ Hubo un problema: " + data.message;
            }
        } catch (error) {
            document.getElementById("mensaje").textContent =
                "⚠️ Error al conectar con el servidor";
        }
    }

    window.onload = () => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");

        if (id) {
            document
                .getElementById("btnConfirmar")
                .addEventListener("click", () =>
                    actualizarCita(id, "confirmar"),
                );
            document
                .getElementById("btnCancelar")
                .addEventListener("click", () =>
                    actualizarCita(id, "cancelar"),
                );
        } else {
            document.getElementById("mensaje").textContent =
                "⚠️ No se encontró el ID de la cita";
            document.getElementById("btnConfirmar").disabled = true;
            document.getElementById("btnCancelar").disabled = true;
        }
    };