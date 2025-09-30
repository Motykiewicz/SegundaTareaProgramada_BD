USE EMPLEADOS;
GO   

CREATE TABLE dbo.Empleado
(
    id INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(128) NOT NULL,
    Salario MONEY NOT NULL,
);

INSERT INTO dbo.Empleado (Nombre, Salario) VALUES ('Juan Perez', 200000.00); -- 1

INSERT INTO dbo.Empleado (Nombre, Salario) VALUES 
('Ana Gomez', 250000.00), -- 2
('Luis Martinez', 180000.00), -- 3
('Maria Rodriguez', 220000.00), -- 4
('Pedro Hernandez', 300000.00), -- 5
('Maria Fernandez', 270000.00), -- 6
('Jose Luis', 150000.00), -- 7
('Lucia Garcia', 320000.00), -- 8
('Alvaro Ruiz', 280000.00), -- 9
('Elisa Lobo', 260000.00), -- 10
('Diego Suarez', 240000.00), -- 11
('Cecilia Venegas', 230000.00), -- 12
('Francisco Torres', 210000.00), -- 13
('Paula Jimenez', 290000.00), -- 14
('Andres Molina', 310000.00), -- 15
('Ester Castro', 330000.00), -- 16
('Javier Lopez', 350000.00), -- 17
('Natalia Ortiz', 370000.00), -- 18
('Ricardo Ramirez', 400000.00), -- 19
('Isabel Flores', 420000.00), -- 20
('Fernando Silva', 450000.00), -- 21
('Gabriela Mendoza', 480000.00), -- 22
('Victor Rojas', 500000.00), -- 23
('Lorena Pacheco', 520000.00), -- 24
('Sergio Campos', 550000.00), -- 25
('Adriana Fuentes', 600000.00), -- 26
('Carmen Delgado', 650000.00), -- 27
('Rafael Marquez', 700000.00), -- 28
('Claudia Salazar', 750000.00), -- 29
('Hector Brenes', 800000.00), -- 30
('Veronica Leon', 850000.00), -- 31
('Mario Pena', 900000.00), -- 32
('Mauricio Campos', 950000.00), -- 33
('Alfredo Rivas', 1000000.00), -- 34
('Monica Serrano', 1100000.00), -- 35
('Jorge Cardenas', 1200000.00), -- 36
('Silvia Viquez', 1300000.00), -- 37
('Diego Valdez', 1400000.00), -- 38
('Lorena Benavidez', 1500000.00), -- 39
('Esteban Sanchez', 1600000.00); -- 40
GO

select * from dbo.Empleado;
GO


