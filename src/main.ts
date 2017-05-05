import { BuildingRenderer } from './builder-renderer';
import * as BABYLON from 'babylonjs';
let btn = <HTMLButtonElement>document.getElementById('goButton');
let canvas = <HTMLCanvasElement>document.getElementById('cvs');
let building = document.getElementById('building');

btn.addEventListener('click', () => {
    btn.style.setProperty('display', 'none');
    building.style.setProperty('display', 'none');
    canvas.style.setProperty('display', 'block');
    doIt();
});

function doIt() {
    let extruder = new BuildingRenderer(canvas);
    extruder.addSvg(building);
}