import { rightSidebar } from "./sidebarPlayVideo.js";
import { fnIframe } from "./sidebarPlayVideo.js";
import {fnContIframe} from "./sidebarPlayVideo.js";
import { searchAll } from "./search.js";

/* API */
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '20babb73c9msh9bac6302e8ca867p1ae942jsn2ba9b40eab52',
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
	}
};


//searchAll(options);
let storageId = localStorage.getItem("ID");
rightSidebar(options);
fnIframe(storageId);
fnContIframe(storageId, options)

document.querySelector("#chartSearch").addEventListener("change", (e) =>{
    searchAll(e.target.value,options);
})
