include("clipboard.js");
document.body.onload = function(){


const canvas = body_element("canvas");
const img = body_element("img");
canvas.setAttribute("contenteditable", "true");
img.src = "";
//img.alt = "Paste image";
img.setAttribute("contenteditable", "true");

const paste={
	canvas:element_paste(canvas,"canvas"),
	image:element_paste(img,"image"),
}
//canvas.addEventListener("paste",paste.canvas);
canvas.addEventListener("paste",paste.image);
}




function include(name){
	const t = document.createElement("script");
	t.setAttribute("src",name);
	document.body.appendChild(t);
}
function body_element(name)
{
	const e = document.createElement( name );
	document.body.appendChild(e);
	return e;
}
