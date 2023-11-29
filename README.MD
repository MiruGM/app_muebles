a. Enlace a GitHub: https://github.com/MiruGM/app_muebles

b. Datos para la conexión a la base de datos (nombre de la base de datos, usuario y password): 
    basedatos => app_mevak
	usuario => root
	password => test
	servidor => db
	puerto => 3366
c. Otra información: 
    Como se ve arriba, el puerto está configurado para 3366 habría que cambiarlo en el docker-compose.yml para que funcionase. 
    Para que el enlace de la landpage funcione y lleve a esta página los dos proyectos tienen que estar debajo de www. 
        www
         |_ app_muebles_land
         |_ app_muebles 
