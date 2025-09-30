
-- sp de mostrar empleados 
CREATE OR ALTER PROCEDURE dbo.sp_Empleado_Mostrar
AS
BEGIN
  SET NOCOUNT ON; -- para saber cuantas filas fueron aafectadas
  SELECT id, Nombre, Salario
  FROM dbo.Empleado
  ORDER BY Nombre ASC; -- nos devuelve toda la informacion en orden alfabetico
END;
GO

-- sp insertar empleados
CREATE OR ALTER PROCEDURE dbo.sp_Empleado_Insertar
  @Nombre  VARCHAR(128),
  @Salario MONEY
AS
BEGIN
  SET NOCOUNT ON;
  -- consideree meter un error que no se pudieran agregar dos empleados con el mismo nombre pero en la vida real hay muchos empleados o personas con nombre 
  -- repetido asi que decidi quitarlo al final 
  IF (@Salario <= 0)
  BEGIN
    RAISERROR('El salario tiene que ser un numero mayor que 0',16,1);
    RETURN;
  END

  INSERT INTO dbo.Empleado (Nombre, Salario)
  VALUES (@Nombre, @Salario);
END;
GO

-- descomentar para ver todos los empleado s
-- EXEC dbo.sp_Empleado_Mostrar; -- (si aparecen los 40), mas los nuevos