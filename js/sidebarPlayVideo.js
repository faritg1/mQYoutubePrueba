export const rightSidebar = async(options) => {
    let peticion;
    try {
        // Intentar consumir del API
        peticion = await fetch("https://youtube138.p.rapidapi.com/channel/videos/?id=UC8fkwsjcI_MhralEX1g4OBw&hl=en&gl=US", options);
    } catch (error) {
        // Si hay un error (puede ser por agotar las peticiones), consumir del JSON local
        peticion = await fetch("/mQYoutubePrueba/json/channelVideos.json");
    } 
    const json = await peticion.json();

    /* Agregando contenido en la barra lateral */
    json.contents.sort(()=> Math.random()-0.5); // funcion para desorganizar la informacion
    let rightSidebar = document.querySelector("#rightSidebar");
    rightSidebar.insertAdjacentHTML("beforeend", /* html */`
    ${json.contents.map((value)=>{
        return(/* html */`
            <div class="side-video-list" idSd=${value.video.videoId}>
                <a class="small-thumbnail" href="/mQYoutubePrueba/video/video.html"><img src="${value.video.thumbnails[3].url}" alt="">
                </a>
                <div class="vid-info">
                    <a href="/mQYoutubePrueba/video/video.html">${value.video.title}</a>
                    <p>CreativeCode</p>
                    <p>${value.video.stats.views} Views &bull; ${value.video.publishedTimeText}</p>
                </div>
            </div>  
        `)
    }).join("")
    }
    `)

    const sideVideo = document.querySelectorAll(".side-video-list")
    sideVideo.forEach(vid => {
        vid.addEventListener("click", () => {
            let idVideo = vid.getAttribute("idSd")
            localStorage.setItem("ID",idVideo)
        })
    })
}

export const fnIframe = (id) => {
    /* Redireccionamiento video e informacion */
    let iframe = document.querySelector("#playVideo");
    iframe.insertAdjacentHTML("afterbegin", /* html */`
        <iframe height="700" src="https://www.youtube.com/embed/${id}?si=RCQzQ3pyGAY5LxN1&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    `)
}

export const fnContIframe = async(id,options) => {
    let videoPeticion;
    try {
        videoPeticion = await fetch(`https://youtube138.p.rapidapi.com/video/details/?id=${id}=en&gl=US`, options);
    } catch (error) {
        videoPeticion = await fetch("/mQYoutubePrueba/json/videoDetails.json");
    }
    const jsonVideo = await videoPeticion.json();
    console.log(videoPeticion);
    let contenidoIframe = document.querySelector("#contVideo");
    contenidoIframe.insertAdjacentHTML("afterbegin", /* html */`
        <h3>${jsonVideo.title}</h3>
        <div class="play-video-info">
            <p>${jsonVideo.stats.views} Veiws &bull; ${jsonVideo.publishedDate} ${jsonVideo.superTitle.items}</p>
            <div>
                <a href="#"><img src="../img/like.png" alt="">${jsonVideo.stats.likes}</a>
                <a href="#"><img src="../img/dislike.png" alt=""></a>
                <a href="#"><img src="../img/share.png" alt=""> Share</a>
                <a href="#"><img src="../img/save.png" alt="">Save</a>
            </div>
        </div>
        <hr>
        <div class="plublisher">
            <img src="${jsonVideo.author.avatar[1].url}" alt="">
            <div>
                <p>${jsonVideo.author.title}</p>
                <span>${jsonVideo.author.stats.subscribersText}</span>
            </div>
            <button type="button">Subscribe</button>
        </div>
        <div class="vid-description">
            <p>${jsonVideo.description}</p>
            <hr>
            <div class="notComments">
                <p>Los comentarios están desactivados.<a href="#"> Más información</a></p>
            </div>
        </div>
    `)
}