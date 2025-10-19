const sql = require('mssql');

const dbConfig = {
  user: "sa",
  password: "PASSWORD",
  server: '127.0.0.1',        
  port: 1433,
  database: "EMPLEADOS",
  options: {
    trustServerCertificate: true,   
  },
  pool: {max:10, min:1, idleTimeoutMillis:3000}
};

let pool;  // pool es una conexion a la base de datos que se recicla en vez de estar creando nuevas, aqui si no hay una ya creada, la crea
          // vamos a probar a ver si nos sirve y sino la cambiamos y buscamos otra 
          // no puedo comentar en el package.json pero ahi se ve bien y  se usa commonjs en vez de module porque es mas estable y no da tantos problemas 
async function getPool() {
  if (pool) return pool;
  try {
    pool = await sql.connect(dbConfig);
    return pool;
  } catch (err) {
    console.error("Hubo un error al conectarse a la base de datos", err);
    throw err;
  }
}

module.exports = { sql, getPool };