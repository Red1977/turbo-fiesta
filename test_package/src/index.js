import { initializeBabylonApp } from "app_package";

document.body.style.width = "80%";
document.body.style.height = "80%";
document.body.style.margin = "0";
document.body.style.padding = "0";

const title = document.createElement("p");
title.style.fontSize = "32pt";
title.style.textAlign = "center";
document.body.appendChild(title);

const div = document.createElement("div");
div.style.width = "60%";
div.style.margin = "0 auto";
div.style.aspectRatio = "16 / 9";
document.body.appendChild(div);

const canvas = document.createElement("canvas");
canvas.id = "renderCanvas";
canvas.style.width = "80%";
canvas.style.height = "80%";
canvas.style.display = "block";
div.appendChild(canvas);

let assetsHostUrl;
if (DEV_BUILD) {
    title.innerText = "Dev Build";
    assetsHostUrl = "http://127.0.0.1:8181/";
} else {
    title.innerText = "Deploy POC";
    assetsHostUrl = "https://nonlocal-assets-host-url/";
}
initializeBabylonApp({ canvas: canvas, assetsHostUrl: assetsHostUrl });
