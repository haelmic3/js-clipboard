
function image_data_transfer(e)
{
			const p = e.items;
			try{
			return URL
			.createObjectURL
			(	Array
				.apply(null,Array(p.length))
				.map((_,i)=>p[i])
				.find(e=>e.kind=="file"&&/image/.test(e.type))
				.getAsFile()
			);
			}catch(e)
			{
				// user didn't provide an image.
				//console.log(e);
				return "";
			}
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
