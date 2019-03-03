/**
 * Funcion para iniciar session
 * comprueba si son correctos los datos del usuario con la cookie
 */
function iniciarSesion() {
    var usuario = document.getElementById("usuario").value; //Obtiene el valor del campo usuario
    var password = document.getElementById("clave").value; //Obtiene el valor del campo password
    
    if(!getCookie(usuario)){alert('No existe ese usuario')} //Compruba si existe una cookie para el usuaario
    var nombre = document.cookie.match("(^|;) ?" + usuario + "=([^;]*)(;|$)") //Obtiene el valor de la cookie del usuario
    var user = nombre[2]; //Se obtiene el nombre del usuario
        
    var pass = document.cookie.match("(^|;) ?" + usuario + "p=([^;]*)(;|$)") //Obtiene el valor de la password de la cookie del usuario
    var pw = pass[2]; //Se obtiene la password del usuario
    if(usuario==user && password==pw){
        localStorage.setItem("usuario", usuario); //Se almacena el usuario para mantener la sesion abierta
        window.location='formulario.html'; //Se redirige a la pagina formulario
    }else {
        alert('Usuario/Contraseña Incorrecto');
    }
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