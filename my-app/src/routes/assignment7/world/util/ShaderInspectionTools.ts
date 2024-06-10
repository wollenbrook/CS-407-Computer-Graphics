import { WebGLRenderer, Scene, PerspectiveCamera, Object3D, Mesh } from 'three';

// Adapted from jee7's answer here: https://stackoverflow.com/questions/75172794/how-can-i-see-the-whole-shaders-text-content-with-all-the-prepended-code-by-th
export class ShaderProgramUtils {
    
    constructor(renderer : WebGLRenderer, scene : Scene, camera : PerspectiveCamera, object : Mesh) {
        renderer.compile(scene, camera); // Might be unnecessary, the shaders could already be compiled
    }
    
    findAndOutputShader(renderer : WebGLRenderer, object : Mesh, shaderIdentifier : string, shaderName : string) : string {
        var programs = renderer.properties.get(object.material).programs;
        let output = '';
        for (var program of programs) {
            output += this.outputShader("// ----" + shaderName + " Code----", renderer.getContext().getShaderSource(program[1][shaderIdentifier]));
        }
        return output;
    }
    
    outputShader(prefix : string, code : string | null) : string {
        if (code) {
            code = code.replaceAll("\t", "  ");
            // var lines = code.split("\n");
            // var linedCode = "";
            // var i = 1;
            // for (var line of lines) {
            //     linedCode += (i < 10 ? " " : "") + i + ":\t\t" + line + "\n";
            //     i++;
            // }
        
            // var output = prefix + "\n" + linedCode;
            //console.log(output);
            //return output;
            return prefix + '\n' + code;
        }
        else {
            return "//No code found";
        }
    }
}
