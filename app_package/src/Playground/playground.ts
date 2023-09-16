import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

class Playground {
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        // This creates a basic Babylon Scene object (non-mesh)
        const scene = new BABYLON.Scene(engine);

        // This creates and positions a free camera (non-mesh)
        const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

        let container = BABYLON.AssetContainer;

        BABYLON.SceneLoader.LoadAssetContainer("http://127.0.0.1:8181/assets/", "pump_bottle_label_camera_sphere.glb", scene, function (container) {
            
            container.addAllToScene();

            //scene camera to one loaded
            scene.activeCamera = container.cameras[0];

            scene.meshes = container.meshes;

            //highlight a mesh
            const hl = new BABYLON.HighlightLayer("hl1", scene);
            hl.addMesh(container.meshes[2], BABYLON.Color3.Teal());
            hl.blurHorizontalSize = 0.1;
            hl.blurVerticalSize = 0.1;
            console.log('highlight blurHorizontalSize',hl.blurHorizontalSize);

            console.log('Finished loading');
 
        });

        //The background image
        var layer = new BABYLON.Layer('','http://127.0.0.1:8181/assets/pink_label_render.png', scene, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

        console.log('scene cameras', scene.cameras);
        console.log('scene meshes', scene.meshes);

        return scene;
    }
}

export function CreatePlaygroundScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
    return Playground.CreateScene(engine, canvas);
}
