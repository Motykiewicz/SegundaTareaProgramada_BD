
const API_BASE = "http://localhost:3000/api";  // backend Node/Express

const tablaBody   = document.querySelector("#employeeTable tbody");
const btnInsertar = document.getElementById("Insertar");
const modal       = document.getElementById("modal");
const form        = document.getElementById("formInsertar");
const inputNombre = document.getElementById("nombre");
const inputSalario= document.getElementById("salario");
const pError      = document.getElementById("errorForm");
const btnCancelar = document.getElementById("btnCancelar");
const btnEnviar   = document.getElementById("btnEnviar");

/*formatos (nombre salario)*/
function money(n) {
  const num = Number(n);
  return `₡ ${isFinite(num) ? num.toFixed(2) : "0.00"}`; // Formato ₡ 123456.78
}


function nombreValido(s) {
  return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\- ]+$/.test((s || "").trim());
}

function salarioValido(s) {
  const n = Number(s);
  return Number.isFinite(n) && n > 0;
}

function showFormError(msg) {
  pError.textContent = msg;
  pError.hidden = !msg;
}

/*cargar empleados*/
async function cargarEmpleados() {
  
  tablaBody.innerHTML = `<tr><td colspan="3">Cargando...</td></tr>`;// llimpia el contenido actual y muestra "Cargando..."

  try {
    const res = await fetch(`${API_BASE}/empleados`);
    const data = await res.json();

    if (!res.ok || !data.ok) {
      throw new Error(data.error || "Error al cargar empleados");
    }

    // Renderizamos las filass
    if (!data.data || data.data.length === 0) {
      tablaBody.innerHTML = `<tr><td colspan="3">Sin registros</td></tr>`;
      return;
    }

    const filas = data.data.map(emp => `
      <tr>
        <td>${emp.id}</td>
        <td>${emp.Nombre}</td>
        <td>${money(emp.Salario)}</td>
      </tr>
    `).join("");

    tablaBody.innerHTML = filas;
  } catch (err) {
    tablaBody.innerHTML = `<tr><td colspan="3" style="color:red;">${err.message}</td></tr>`;
    console.error(err);
  }
}

/* abrir y cerrar el modall*/
btnInsertar.addEventListener("click", () => {
  // Resetea el formulario y abre el modal
  showFormError("");
  inputNombre.value = "";
  inputSalario.value = "";
  modal.showModal();
});

// Cierra el modal 
btnCancelar.addEventListener("click", () => {
  modal.close();
});

/* aqui es para insertar un usuario*/
btnEnviar.addEventListener("click", async (e) => {
  e.preventDefault(); // no cierres el dialog automáticamente

  const Nombre  = inputNombre.value;
  const Salario = inputSalario.value;

  // Validaciones en frontend (requeridas por la tarea)
  if (!nombreValido(Nombre)) {
    showFormError("Nombre invalido: utilice por favor solo letras, espacios o guion (-).");
    return;
  }
  if (!salarioValido(Salario)) {
    showFormError("Salario inválido: ingrese un número positivo");
    return;
  }
  showFormError("");

  // Deshabilita el botón mientras envía
  btnEnviar.disabled = true;

  try {
    const res = await fetch(`${API_BASE}/empleados`, {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ Nombre, Salario: Number(Salario) })
    });
    const out = await res.json();

    if (!res.ok || !out.ok) {
      throw new Error(out.error || "No se pudo insertar");
    }

    // si todo sale bien se cierra el modal y la tabla de refresca ensenando los nuevos empleados creados
    modal.close();
    await cargarEmpleados();
    alert("Inserción exitosa");
  } catch (err) {
    showFormError(err.message);
    console.error(err);
  } finally {
    btnEnviar.disabled = false;
  } 
});


cargarEmpleados();
