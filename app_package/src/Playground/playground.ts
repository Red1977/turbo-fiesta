import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

class Playground {
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        // This creates a basic Babylon Scene object (non-mesh)
        const scene = new BABYLON.Scene(engine);

        // This creates and positions a free camera (non-mesh)
        const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

        const container = BABYLON.AssetContainer;

        BABYLON.SceneLoader.LoadAssetContainer("http://127.0.0.1:8181/assets/", "pump_bottle_label_camera_sphere.glb", scene, function (container) {
            const meshes = container.meshes;
            const materials = container.materials;
            console.log('assetContainer cameras', container.cameras);
            console.log('assetContainer meshes', container.meshes);
            container.addAllToScene();
            scene.activeCamera = container.cameras[0];
            //scene.activeCamera.attachControl(canvas, false);
            //container.cameras[0].attachControl(canvas, true);
          });

        // This targets the camera to scene origin
        //camera.setTarget(BABYLON.Vector3.Zero());

        // This attaches the camera to the canvas
        //camera.attachControl(canvas, true);

        var layer = new BABYLON.Layer('','http://127.0.0.1:8181/assets/pink_label_render.png', scene, true);

        

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
        const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);

        // Move the sphere upward 1/2 its height
       // sphere.position.y = 1;

        // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
        //const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);
        //let groundMaterial = new BABYLON.StandardMaterial("Ground Material", scene);
        //groundMaterial.diffuseColor = BABYLON.Color3.Red();
        //ground.material = groundMaterial;

        return scene;
    }
}

export function CreatePlaygroundScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
    return Playground.CreateScene(engine, canvas);
}
