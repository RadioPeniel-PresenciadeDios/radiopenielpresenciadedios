function publicar(){
  const titulo = document.getElementById("titulo").value;
  const seccion = document.getElementById("seccion").value;
  const imagenInput = document.getElementById("imagen");

  if(imagenInput.files.length === 0) return;

  const reader = new FileReader();

  reader.onload = function(e){
    const imagenBase64 = e.target.result;

    const publicacion = {
      titulo,
      seccion,
      imagen: imagenBase64
    };

    let publicaciones = JSON.parse(localStorage.getItem("radioPeniel")) || [];
    publicaciones.push(publicacion);

    localStorage.setItem("radioPeniel", JSON.stringify(publicaciones));

    cargarPublicaciones();
  };

  reader.readAsDataURL(imagenInput.files[0]);
}

function cargarPublicaciones(){
  const publicaciones = JSON.parse(localStorage.getItem("radioPeniel")) || [];

  document.getElementById("contenedor-versiculos").innerHTML="";
  document.getElementById("contenedor-informacion").innerHTML="";
  document.getElementById("contenedor-fotos").innerHTML="";

  publicaciones.forEach(pub=>{
    const card = `
      <div class="card">
        <img src="${pub.imagen}">
        <p>${pub.titulo}</p>
      </div>
    `;

    document.getElementById("contenedor-"+pub.seccion).innerHTML += card;
  });
}

window.onload = cargarPublicaciones;