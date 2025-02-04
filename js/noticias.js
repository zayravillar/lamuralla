async function cargarNoticias() {
    try{
        const response = await fetch("../data/noticias.json");
        const data = await response.json();
        const noticiasContainer = document.getElementById('noticias-contenedor');
        data.noticias.forEach(noticia => {
            const noticiaHTML = `
            <div class="noticia">
                            <img src="${noticia.imagen}" alt="${noticia.titulo}">
                            <h2><a href="/noticias/${noticia.slug}">${noticia.titulo}</a></h2>
                            <p>${noticia.subtitulo}</p>
                            <p><small>${noticia.fecha}</small></p>
                            <a href="/noticias/${noticia.slug}" class="boton-leer-mas">Leer más</a>
                        </div>
            `;
            noticiasContainer.innerHTML += noticiaHTML;
        });
    }catch (error){
        console.error("Error cargando noticias:", error);
    };
}
cargarNoticias();