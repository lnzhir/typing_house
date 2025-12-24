import X2JS from "x2js";


const x2js = new X2JS();

export function request(method, controller, params) {
	let url = new URL(controller, `${import.meta.env.VITE_BACK_HOST}/api/`);
	url.search = new URLSearchParams(params);


	return fetch(url.href, {
	//fetch(`http://192.168.3.6/WebApi/api/${controller}`, {
		method: method // Specify the HTTP method
		// headers: {
		//   //'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' // Inform the server about the content type
		//   "Sec-Fetch-Dest": "document",
		//   "Sec-Fetch-Mode": "navigate",
		//   "Sec-Fetch-User": "?1",
		//   "Upgrade-Insecure-Requests": 1
		// },
	})
	.then(response => {
		// Check if the request was successful (status in the 200-299 range)
		if (!response.ok) {
		console.log(response)
		throw new Error('Network response was not ok: ' + response.statusText);
		}
		// Parse the response body as JSON
		console.log(response)
		return response.json();
	})
}

// export function request(method, controller, params={}, body={}) {
// 	let methodUp = method.toUpperCase();
// 	let url = new URL(controller, `${import.meta.env.VITE_BACK_HOST}/api/`);
// 	url.search = new URLSearchParams(params);

// 	const req = {
// 		mode: "cors",
// 		headers: {
// 			"Content-Type": "*/*"
// 		},
// 		method: method,
// 	}
// 	if (methodUp != "GET" && methodUp != "HEAD")
// 		req["body"] = body

// 	return fetch(url.href, req)
// 	.then(response => {
// 		if (!response.ok) {
// 			throw new Error('Network response was not ok: ' + response.statusText);
// 		}
// 		return response.json();
// 	})
// }

export function convertXml2JSon() {
   $("#jsonArea").val(JSON.stringify(x2js.xml_str2json($("#xmlArea").val())));
}

export function convertJSon2XML() {
   $("#xmlArea").val(x2js.json2xml_str($.parseJSON($("#jsonArea").val())));
}