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

            //Set up mouseover event
            let actionManager = new BABYLON.ActionManager(scene);
            container.meshes[2].actionManager = actionManager;

            container.meshes[2].isPickable = true;

            //if cursor is hovering over it,  highlight of the mesh
            actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function(ev){
                hl.addMesh(container.meshes[2], BABYLON.Color3.Teal());
            }));
            //Remove highlight when cursor no longer over mesh
            actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function(ev){
                hl.removeAllMeshes();
            }));

            //recognise click event
            actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function(ev){
                console.log("mesh clicked");
                const input = document.createElement('input');
                input.type = 'file';

                input.onchange = () => {
                    const files = Array.from(input.files);
                    const file = files[0];

                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const contents = e.target.result;

                        var labelTexture = new BABYLON.Texture(contents, scene);
                        labelTexture.name = "labelTex";
                        //labelTexture.uScale = -1;
                        labelTexture.vScale = -1;
                        

                        container.meshes[2].material.albedoTexture = labelTexture;
                        container.meshes[2].material?.backFaceCulling = true;
                    };
                    reader.readAsDataURL(file);
                };
                input.click();
            }));
            
            hl.blurHorizontalSize = 1;
            hl.blurVerticalSize = 1;
 
        });

        //The background image
        var layer = new BABYLON.Layer('','http://127.0.0.1:8181/assets/pink_label_render.png', scene, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 10.0;

        return scene;
    }
}

export function CreatePlaygroundScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
    return Playground.CreateScene(engine, canvas);
}
