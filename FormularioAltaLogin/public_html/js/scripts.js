var sesion = localStorage.getItem("usuario"); //Se obtiene los datos de la sesion si esta iniciada
window.addEventListener('load', iniciar(), false); //En caso de estar iniciada se carga la sesion

/**
 * Funcion para cargar la pantalla del usuario
 */
function iniciar(){
    if(getCookie(sesion)){
        acceso(sesion);
    }
}

/**
 * Funcion para Crear el usuario si son correctos los datos introducidos
 */
function validar(evento){
    if (validarCampos(this)){
      	crearUsuario();
    }else {
	evento.preventDefault(); // Cancelamos el evento de envío por defecto asignado al boton de enviar.
    }
}

/**
 * Funcion para validar los campos del formulario
 */
function validarCampos(objeto){
    var formulario = objeto.form;
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i; //Comprueba el formato del correo electronico
    passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.,])[A-Za-z\d$@$!%*?&.,]{8,15}/; //comprueba el formato de la password

    //comprueba cada campo y si no cumple los requisitos muestra un aviso
    for (var i=0; i<formulario.elements.length; i++){
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
	}else if(formulario.elements[i].id=="apellidos"){
            if(formulario.elements[i].id=="apellidos" && formulario.elements[i].value==""){
                document.getElementById("labelapellidos").innerHTML=" *Esta vacio";
                document.getElementById("labelapellidos").style.color="RED";
                formulario.elements[i].focus();
                return false;
            }else {
                document.getElementById("labelapellidos").innerHTML=" *Correcto";
                document.getElementById("labelapellidos").style.color="GREEN";
            }
        }else if(formulario.elements[i].id=="correo"){
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
        }else if(formulario.elements[i].id=="password"){
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
        }else if(formulario.elements[i].id=="password2"){
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
            
    }
    return true;	 // Si sale de la función es que todos los campos obligatorios son validos.
}

/**
 * Funcion para crear el usuario y mostrar un aviso al crearlo.
 */
function crearUsuario(){
    var nombre = document.getElementsByName("nombre")[0];
    document.cookie = nombre.value + "=" + nombre.value + ";path=/";
    document.cookie = nombre.value + "p=" + document.getElementById("password").value + ";path=/";
    alert("Se creado el usuario " + nombre.value);
    //Si ya hay una sesion iniciada permite seguir creando usuarios sino te redirige a la pantalla de login
    if(sesion==null){
        window.location='index.html';
    }else {
        window.location='formulario.html';
    }
}

/**
 * Funcion para cargar la pantalla del usuario
 */
function acceso(sesion){
    document.write('<h2>BIENVENIDO</h2><p id="login">' + sesion+ '</p>');
    document.write('<br/><br/>');
    document.write('<input type="submit" name="cerrar" id="cerrar" value="Cerrar Sesion" onclick="cerrarSesion()" />');
}

/**
 * Funcion para cerrar la sesion y borrar la cookie
 */
function cerrarSesion(){
    var fecha = new Date();
    document.cookie = sesion + "=0; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = sesion + "p=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    localStorage.setItem("usuario", null);
    alert("Se ha borrado la cookie del usuario " + sesion);
    window.location='index.html';
}

/**
 * Funcion para obtener los datos de la cookie
 */
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}