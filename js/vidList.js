export const fnVidList = async(options) =>{
    let peticion;
    try {
        peticion = await fetch("https://youtube138.p.rapidapi.com/channel/videos/?id=UC8fkwsjcI_MhralEX1g4OBw&hl=en&gl=US", options)
    } catch (error) {
        peticion = await fetch("/mQYoutubePrueba/json/channelVideos.json");
    }
    const json = await peticion.json();

    //const p = await fetch("https://youtube138.p.rapidapi.com/channel/details/?id=UC8fkwsjcI_MhralEX1g4OBw&hl=en&gl=US", options)
    const p = await fetch("/mQYoutubePrueba/json/channelDetails.json");
    const res = await p.json();
    json.contents.sort(()=> Math.random()-0.5); // funcion para desorganizar la informacion
    let listContainer = document.querySelector("#list-container")
    listContainer.insertAdjacentHTML("beforeend", /* html */`
    ${json.contents.map((value)=> {
            return(/* html */`
            <div date=${value.video.publishedTimeText} class="vid-list" videoId=${value.video.videoId}>
                <a href="/mQYoutubePrueba/video/video.html"><img class="thumbnail" src="${value.video.thumbnails[3].url}" alt=""></a>
                <div class="d-flex">
                <img src="${res.avatar[0].url}" alt="">
                    <div class="vid-info">
                        <a href="/mQYoutubePrueba/video/video.html">${value.video.title}</a>
                        <p>${res.title}</p>
                        <p>${value.video.stats.views} Views &bull;  ${value.video.publishedTimeText}</p>
                    </div>
                </div>
            </div>
        `)
        }).join("")
    }
    `)

    const vidList = document.querySelectorAll(".vid-list")
    vidList.forEach(vid => {
        vid.addEventListener("click", () => {
            let vidList = vid.getAttribute("videoId")
            localStorage.setItem("ID",vidList)
        })
    })
}