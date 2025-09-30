// usamos el backend con CommonJS ya que es mas estable 
const express = require("express");
const cors = require("cors");
const { getPool, sql } = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// para ver si sirve el servidor con express correctametne 
app.get("/", (req, res) => res.send("API funcionando correctamente "));

// aqui es para get empleados que se usa sp_Empleado_Mostrar
app.get("/api/empleados", async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().execute("dbo.sp_Empleado_Mostrar");
    res.json({ ok: true, data: result.recordset });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// aquui insertamos los empleados con el formato { Nombre, Salario } con el sp =  sp_Empleado_Insertar
app.post("/api/empleados", async (req, res) => {
  const { Nombre, Salario } = req.body || {};
  if (!Nombre || !Nombre.trim()) return res.status(400).json({ ok: false, error: "Nombre requerido" });
  if (!(Number(Salario) > 0))     return res.status(400).json({ ok: false, error: "Salario inválido" });

  try {
    const pool = await getPool();
    await pool.request()
      .input("Nombre", sql.VarChar(128), Nombre.trim())
      .input("Salario", sql.Money, Number(Salario))
      .execute("dbo.sp_Empleado_Insertar");
    res.json({ ok: true, message: "Inserción exitosa" });
  } catch (err) {
    console.error(err);
    const msg = err.original?.message || err.message || 'Error insertando empleado';
    res.status(400).json({ ok: false, error: err.message });
  }
});

app.listen(3000, () => console.log("API en http://localhost:3000/api"));
