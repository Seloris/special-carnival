import * as BABYLON from 'babylonjs';

export class BuildingRenderer {
    engine: BABYLON.Engine;
    scene: BABYLON.Scene;
    camera: BABYLON.Camera;

    constructor(private canvas: HTMLCanvasElement) {
        this.engine = new BABYLON.Engine(canvas, true);
    }
    getVectorsFromSvg(svg: SVGElement) {
        let walls = svg.getElementsByClassName('wall');
        for (let i = 0; i < walls.length; i++) {
            let wall = <SVGElement>walls[i];
            let pathData = wall.getAttribute('d');
            let points = this.getPoints(pathData);
        }
    }

    getPoints(pathData) {
        let mode = "";
        let points: { x: number, y: number }[] = [];
        let exploded = pathData.split(' ').forEach((str: string) => {
            if (["M", "m", "V", "v", "H", "h"].indexOf(str) != -1) {
                mode = str;
            }
            else {
                // compute things
                let point: { x: number, y: number };
                let lastPoint = points[points.length - 1];
                switch (mode) {
                    case "M":
                        {
                            point = this.extractCoords(str);
                            break;
                        }
                    case "m":
                        // TODO
                        break;
                    case "H": {
                        point = {
                            x: Number(str),
                            y: lastPoint.y
                        }
                        break;
                    }
                    case "h": {
                        point = {
                            x: lastPoint.x + Number(str),
                            y: lastPoint.y
                        }
                        break;
                    }
                    case "V": {
                        point = {
                            x: lastPoint.x,
                            y: Number(str)
                        }
                        break;
                    }
                    case "v": {
                        point = {
                            x: lastPoint.x,
                            y: lastPoint.y + Number(str)
                        }
                        break;
                    }
                    case "z": {
                        point = points[0]
                    }
                    default: {
                        console.log('not handled mode !!!! : ' + mode + " with value : " + str);
                    }
                }

                points.push(point);
                // Clear mode (will be overwritten next loop tho)
                mode = "";
            }
        });

        return points;
    }

    extractCoords(coords: string): { x: number, y: number } {
        let exploded = coords.split(',');
        return { x: Number(exploded[0]), y: Number(exploded[1]) };
    }
    addSvg(svg: any) {
        let shapes = this.getVectorsFromSvg(svg);
        // let shape = coords.map(coord => {
        //     return new BABYLON.Vector3(coord.x, coord.y, 0);
        // });

    
    // var rectangle = BABYLON.Polygon.Rectangle(10, 0, 20, 2);
	// let builder = new BABYLON.PolygonMeshBuilder('test', rectangle, scene);
    // builder.build(false,3);

    }

    // addShape(coords: { x: number, y: number }[]) {
    //     // Mat for mesh extruded
    //     let mat = new BABYLON.StandardMaterial("mat1", this.scene);
    //     mat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1.0);
    //     mat.backFaceCulling = false;

    //     let shape = coords.map(coord => {
    //         return new BABYLON.Vector3(coord.x, coord.y, 0);
    //     });

    //     // draw line
    //     let shapeLine = BABYLON.MeshBuilder.CreateLines("sl", { points: shape }, this.scene);
    //     shapeLine.color = new BABYLON.Color3(0, 0, 0);

    //     // Build extruded
    //     let  = [BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 1, 0)];
    //     let mesh = BABYLON.MeshBuilder.ExtrudeShape("extr", { shape: shape, : , scale: 1, rotation: 0 }, this.scene);
    //     mesh.material = mat;

    //     mesh.position.x += mesh.position.x;
    //     mesh.position.z += mesh.position.z;
    // }

    render() {
        this.setScene();
        this.showAxis();

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    /** Set methods */
    setScene() {
        this.scene = new BABYLON.Scene(this.engine);
        this.scene.clearColor = new BABYLON.Color4(.5, .5, .5, 1);

        // let ground = BABYLON.MeshBuilder.CreateGround('ground1', { width: 100, height: 100 }, this.scene);
        this.camera = new BABYLON.FreeCamera('cam1', new BABYLON.Vector3(0, 30, -30), this.scene);
        // this.camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 0, new BABYLON.Vector3(0, 0, -0), this.scene);
        // this.camera.position = new BABYLON.Vector3(-5, -5, -10);

        this.camera.attachControl(this.canvas, true);

        let light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this.scene);
    }

    showAxis() {
        let size = 20;
        var axisX = BABYLON.Mesh.CreateLines("axisX", [
            BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
            new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
        ], this.scene);
        axisX.color = new BABYLON.Color3(1, 0, 0);
        var axisY = BABYLON.Mesh.CreateLines("axisY", [
            BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
            new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
        ], this.scene);
        axisY.color = new BABYLON.Color3(0, 1, 0);
        var axisZ = BABYLON.Mesh.CreateLines("axisZ", [
            BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
            new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, 0.05 * size, size * 0.95)
        ], this.scene);
        axisZ.color = new BABYLON.Color3(0, 0, 1);
    }

}