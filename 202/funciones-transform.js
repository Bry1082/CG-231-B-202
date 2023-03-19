/**
 * Geometria: Crea un objeto THREE.Geometry y lo retorna 
 * ENTRADAS:  vx= Arreglos de vertices (Arreglos de arregos de enteros )
 * SALIDAS: geon= objeto THREE.Geometry generado a paritr de arreglo vx
 */
function Geometria(vx){
    geon= new THREE.Geometry();
    for (let i = 0; i < vx.length; ++i) {
        x = vx[i][0];
        y = vx[i][1];
        z = vx[i][2];
        vector = new THREE.Vector3(x, y, z);
        geon.vertices.push(vector);
    }
    return geon;

}  
/**
 * Traslacion: crea la matriz de traslacion a partir del vector vt
 * ENTRADAS: vt: vector de traslacion (arreglo de traslacion)
 * SALIDAS: matriz = MAtriz de translacion generada a partir de vt 
 */
function Traslation(vt) {
    var matriz = new THREE.Matrix4();
    matriz.set(1, 0, 0, vt[0],
            0, 1, 0, vt[1],
            0, 0, 1, vt[2],
            0, 0, 0, 1);
    return matriz;
}
/**
 * Escalado: crea la matriz de escalado a partir del vector vs
 * ENTRADAS: vs: vector de escalado (arreglo de escalado)
 * SALIDAS: matriz = MatrizS de translacion generada a partir de vs
 */
function Escalado(vs) {
    var matrizS = new THREE.Matrix4();
    matrizS.set(vs[0], 0, 0, 0,
            0, vs[1], 0, 0,
            0, 0, vs[2], 0,
            0, 0, 0, 1);
    return matrizS;
}

/**
 * Rotacion: crea matrices de rotacion a partir de vector angulito
 * ENTRADAS: angle: arreglo con angulo en x,y,z
 * SALIDAS: matrizresultado: rotacion en los angulo aplicados.
 */

function Rotacion(angle) {

    var matrizRx = new THREE.Matrix4();
    var angulox = (angle[0]*Math.PI)/180;
    var cx = Math.cos(angulox);
    var sx = Math.sin(angulox);

    matrizRx.set(1,  0, 0, 0, //rotacion en x 
                0,  cx, -sx, 0, 
                0, sx, cx, 0,
                0, 0, 0, 1);


    var matrizRy = new THREE.Matrix4();
    var anguloy = (angle[1]*Math.PI)/180;
    var cy = Math.cos(anguloy);
    var sy = Math.sin(anguloy);

    matrizRy.set(cy,  0, sy, 0, //rotacion en y
                0,  1, 0, 0, 
                -sy, 0, cy, 0,
                0, 0, 0, 1);

    var matrizRz = new THREE.Matrix4();
    var anguloz = (angle[2]*Math.PI)/180;
    var cz = Math.cos(anguloz);
    var sz = Math.sin(anguloz);

    matrizRz.set(cz,  -sz, 0, 0, //rotacion en z
                sz,  cz, 0, 0, 
                0, 0, 1, 0,
                0, 0, 0, 1);
    
    
    matrixResultado = new THREE.Matrix4();

    matrixResultado.set(1,  0, 0, 0, //Matriz identidad para que se palique la rotacion en todos los angulos dados
                        0,  1, 0, 0, 
                        0, 0, 1, 0,
                        0, 0, 0, 1);

    matrixResultado.multiply(matrizRx);
    matrixResultado.multiply(matrizRy);
    matrixResultado.multiply(matrizRz);


        return  matrixResultado
        

}

/**
 * Rotacion real:rotacion en los 3 ejes y traslado 
 * ENTRADA: OBJETO: Objeto tipo THREE.line a ser rotado, angulitos = vector angulos en x,y,z,vp=(posicion inicial)
 * SALIDA: obj Actializado 
 */
function RotacionReal(obj,vp,angle){
    vt= [-vp[0],-vp[1],-vp[2]]; //Translacion al puto de origen [0,0,0]
    obj.applyMatrix(Traslation(vt)); 
    obj.applyMatrix(Rotacion(angle));//Rotacion del obj
    obj.applyMatrix(Traslation(vp));// Traslacion al punto inicial 

}

/**
 * PiramideFinal:rotacion en los 3 ejes y escalado en el punto de origen
 * ENTRADA: OBJETO: Objeto tipo THREE.line a ser rotado, angle = vector angulos en x,y,z, vp=( vector de posicion inicial)
 * SALIDA: obj : Actializado escalado y rotado.
 */

function PiramideFinal(obj,vp,angle,vs){
    vt= [-vp[0],-vp[1],-vp[2]]; //Translacion al puto de origen [0,0,0]
    obj.applyMatrix(Traslation(vt)); //Traslacion origen
    obj.applyMatrix(Escalado(vs));//Escalacion del obj
    obj.applyMatrix(Rotacion(angle));//Roatcion del obj
    obj.applyMatrix(Traslation(vp));// Traslacion al punto inicial 

}


/**
 * Escalado real: escala y traslada
 * ENTRADA: OBJETO: Objeto tipo THREE.line a ser escaldado, vs=(Vectores escalado),vp=(posicion inicial)
 * SALIDA: obj Actializado 
 */
function EscaladoReal(obj,vp,vs){
    vt= [-vp[0],-vp[1],-vp[2]]; //Translacion al puto de origen [0,0,0]
    obj.applyMatrix(Traslation(vt)); 
    obj.applyMatrix(Escalado(vs));//Escalado del obj
    obj.applyMatrix(Traslation(vp));// Traslacion al punto inicial 

}


