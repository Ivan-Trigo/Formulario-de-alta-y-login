Formulario

En esta práctica he creado un formulario y un login.

Proceso de creación del formulario:
Creamos un formulario con todos los campos obligatorios de Nombre, Apellidos, Correo, Contraseña y Confirmación de Contraseña. 
Y los opcionales Sexo, Fecha de nacimiento, dirección, pais, suscripcion a la revista digital y Condiciones de uso Aviso de privacidad y Condiciones de Cookies y publicidad en Internet.


**1.Requisitos funcionales**

Uno de los requisitos de la práctica era que se validaran los datos introducidos por el usuario.

Para ello utilizamos las restricciones que nos proporciona las funciones de JavaScript.

Con JavaScript también le dotamos al formulario de interactividad, al cambiar los mensajes de error predeterminados de HTML5.

El formulario de alta debe contar con los siguientes campos:

Nombre (Obligatorio).

Apellido (Obligatorio).

Correo electronico (Obligatorio). Para ser valido debe tener varios caracteres entre medias una @ y un punto.

Contraseña (Obligatorio). Para que sea válida debe tener al menos ocho caracteres y contener al menos una letra minúscula, una mayúscula, un número y un símbolo

Confirmación de contraseña (Obligatorio). Debe confirmar que es la misma que la contraseña.

Sexo (Opcional).

Fecha de nacimiento (Opcional)

Dirección (Opcional)

País (Opcional, implementado como un selector)

Subcripción a la revista digital (Opcional casilla de verificación)

Check en el que se informe al usuario que acepta las Condiciones de uso, Aviso de privacidad y Condiciones de Cookies y publicidad en Internet.

Para validar los diferentes campos obligatorios primero deben pasar los filtros para que el usuario no deje ningún campo vacío. 

La validación con JS consiste en seleccionar el input del formulario que queramos validar a través de su id, al darle a  enviar lanzara la función comprobando si se cumple la expresión regular o si está vacío el input del elemento, 
si el campo se completa de forma incorrecta se lanza un mensaje de error personalizado para informar al usuario.

Ejemplo de validación:

if (formulario.elements[i].id=="nombre"){
            if(formulario.elements[i].id=="nombre" && formulario.elements[i].value==""){
                document.getElementById("labelnombre").innerHTML=" *Esta vacio";
                document.getElementById("labelnombre").style.color="RED";
                formulario.elements[i].focus();
                return false;
            }else {
                document.getElementById("labelnombre").innerHTML=" *Correcto";
                document.getElementById("labelnombre").style.color="GREEN";
            }
}
	

Para la confirmación de la contraseña lo que hicimos fue comparar el valor del input de password con el de paassword2.

var contrasenia = document.getElementById("contrasenia");

var contrasenia2 = document.getElementById("contrasenia2");

contrasenia.addEventListener("keyup", function(){

passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.,])[A-Za-z\d$@$!%*?&.,]{8,15}/;
if(formulario.elements[i].id=="password"){
            if(formulario.elements[i].id=="password" && formulario.elements[i].value==""){
                document.getElementById("labelpassword").innerHTML=" *Esta vacio";
                document.getElementById("labelpassword").style.color="RED";
                formulario.elements[i].focus();
                return false;
            }else if(passRegex.test(document.getElementById("password").value)){
                document.getElementById("labelpassword").innerHTML=" *Correcto";
                document.getElementById("labelpassword").style.color="GREEN";
            }else if(passRegex.test(document.getElementById("password").value)==false){
                document.getElementById("labelpassword").innerHTML=" *No es segura debe tener al menos un caracter especial, un digito, una minuscula y una mayuscula";
                document.getElementById("labelpassword").style.color="RED";
                formulario.elements[i].focus();
                return false;
            }else if(passRegex.test(document.getElementById("password").value)){
                document.getElementById("labelpassword").innerHTML=" *Correcto";
                document.getElementById("labelpassword").style.color="GREEN";
            }
}

if(formulario.elements[i].id=="password2"){
            if(formulario.elements[i].id=="password2" && formulario.elements[i].value==""){
                document.getElementById("labelpassword2").innerHTML=" *Esta vacio";
                document.getElementById("labelpassword2").style.color="RED";
                formulario.elements[i].focus();
                return false;
            }else if(document.getElementById("password2").value != document.getElementById("password").value){
                document.getElementById("labelpassword2").innerHTML=" *Las contraseñas son diferentes";
                document.getElementById("labelpassword2").style.color="RED";
                formulario.elements[i].focus();
                return false;
            }else {
                document.getElementById("labelpassword2").innerHTML=" *Correcto";
                document.getElementById("labelpassword2").style.color="GREEN";
                formulario.elements[i].focus();
            }
}
		
Correo:
emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
if(formulario.elements[i].id=="correo"){
            if(formulario.elements[i].id=="correo" && formulario.elements[i].value==""){
                document.getElementById("labelcorreo").innerHTML=" *Esta vacio";
                document.getElementById("labelcorreo").style.color="RED";
                formulario.elements[i].focus();
                return false;
            }else if(emailRegex.test(document.getElementById("correo").value)) {
                document.getElementById("labelcorreo").innerHTML=" *Correo valido";
                document.getElementById("labelcorreo").style.color="GREEN";
            }else if(emailRegex.test(document.getElementById("correo").value)==false){
                document.getElementById("labelcorreo").innerHTML=" *Correo no valido";
                document.getElementById("labelcorreo").style.color="RED";
                formulario.elements[i].focus();
                return false;
            }
}

**2.Requisitos técnicos:**

Para indicar de forma visible los campos que son obligatorios añadimos en sus correspodientes un (Obligatorio).

Si los datos son correctos, el formulario redirigirá al login y mostrará un mensaje que indique que usuario se registró correctamente y creará una cookie con el nombre del usuario y su contraseña.

Si no son correctos se colocará el foco en el input mal completado y saldrá un mensaje explicando los requisitos del formato del input.

Al hacer login se comprobará en las cookies si existe para ese usuario y la contraseña es correcta.

También se añadirá la opción de cerrar sesión que borrará la cookie de sesión creada anteriormente.


**3.Funciones para las cookies**

Cookie de usuario que se crea cuando completa el formulario de registro:
Para crear las cookies hemos hecho la función setCookie que recibe el nombre y la contraseña. 
La función crea un par clave-valor con el nombre y la contraseña que el usuario ha introducido al rellenar el formulario de registro. 
Esta función la llamamos en el momento que se pulsa el botón de "Enviar" y se ha validado correctamente el formulario.

La función getCookie lo que hace es coger los datos del nombre y la contraseña y comprueba si esas credenciales coinciden con la cookie de algún usuario registrado.

También se nos pedía que cuando se hiciese login apareciese un botón de logout, esto lo he hecho con document.write y creando el boton, un mensaje de bienvenida y el nombre del usuario.

Borrar cookie de sesión:
En la práctica nos piden que cuando se haga logout se borre la cookie de sesión, lo hemos poniendole al botón Cerrar Sesion que llama a la función cerrarSesion(), que cambia la fecha de expiración a la cookie.
document.cookie = sesion + "=0; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
document.cookie = sesion + "p=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

**4.Pruebas automatizadas**

He realizado 4 pruebas automatizadas para validar el formulario utilizando el plugin de Kantu para Mozilla, subiendo el proyecto a GitHub pages.

Formulario
Prueba 1: Prueba de inicio de sesion de Usuario que no existe.

Muestra mensaje de error.

Prueba 2: Prueba de Solicitud de Datos Obligatorios.

Se da al boton de enviar y muestra un mensaje al lado de los campos con el texto de error.

Prueba 3: Pruebas de Correo y Password.

Se realizan pruebas de intentar meter datos incorrectos y nos muestra un mensaje de error, al introducir el dato correctamente muestra que esta correcto.

Prueba 4: Prueba de Inicio y de Borrado de Cookie.

Se intenta iniciar sesion con un usuario correcto y la contraseña erronea y da un mensaje de erro.
Se vuelve a introducir la contraseña correcta y inicia sesion, pulsamos sobre el boton de cerrar sesion y nos muestra un mensaje de que se ha borraro la cookie del usuario.
