//include("clipboard.js");


//begin main

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

// end main



//begin move TODO move to clipboard.js
function image_data_transfer(e)
{
			const p = e.items;
			return URL
			.createObjectURL
			(	Array
				.apply(null,Array(p.length))
				.map((_,i)=>p[i])
				.find(e=>e.kind=="file"&&/image/.test(e.type))
				.getAsFile()
			);
}
function element_paste(element,type)
{
	switch(type)
	{
	case "image":
		return function (e){
			element.src = image_data_transfer(e.clipboardData||window.clipboardData);
		}
	case "canvas":
		return function (e){
			const im = new Image();
			im.src = image_data_transfer(e.clipboardData||window.clipboardData);
			im.onload = ()=>{
				element.width = im.width;
				element.height = im.height;
				element.getContext("2d").drawImage(im,0,0);
				URL.revokeObjectURL(im.src);
				delete im;
			};
		}
	default:
		return function (e){
			var p = (e.clipboardData||window.clipboardData).getData("text");
			var t = document.createTextNode(p);
			element.appendChild(t);
		}
	}
}
//end move TODO



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
