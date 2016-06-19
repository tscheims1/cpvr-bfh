// global variables
var renderer;
var scene;
var camera;

/**
 * Initializes the scene, camera and objects. Called when the window is
 * loaded by using window.onload (see below)
 */
function init() {

    // create a scene, that will hold all our elements such as objects, 
	// cameras and lights.
    scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    camera = new THREE.PerspectiveCamera(45, 
										 window.innerWidth / window.innerHeight, 
										 0.1, 1000);

    // create a render, sets the background color and the size
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    // create a cube
    var cubeGeometry = new THREE.BoxGeometry(6, 4, 6);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 'red'});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

	var transfo = new THREE.Matrix4();
	var transfo2 = new THREE.Matrix4();

	transfo.set(1.0, 0.0, 0.0, 0.0,
                0.0, 1.0, 0.0, 0.0,
				0.0, 0.0, 1.0, 0.0,
				0.0, 0.0, 0.0, 1.0);

	var angle = 30.0;
	var theta = Math.PI * angle / 180.0;
	transfo.set (Math.cos(theta), -Math.sin(theta), 0.0, 0.0,
				 Math.sin(theta), Math.cos(theta), 0.0, 0.0,
				 0.0, 0.0, 1.0, 0.0,
				 0.0, 0.0, 0.0, 1.0);

	transfo2.set(1.0, 0.0, 0.0, 0.0,
				 0.0, Math.cos(theta), -Math.sin(theta), 0.0,
				 0.0, Math.sin(theta), Math.cos(theta), 0.0,
				 0.0, 0.0, 0.0, 1.0);

	//var transfo3 = new THREE.Matrix4().multiplyMatrices(transfo, transfo2);
	var transfo3 = new THREE.Matrix4().multiplyMatrices(transfo2, transfo);

	cubeGeometry.applyMatrix(transfo3);

    cube.castShadow = true;

    // add the cube to the scene
    scene.add(cube);

    // position and point the camera to the center of the scene
    camera.position.x = 15;
    camera.position.y = 16;
    camera.position.z = 13;
    camera.lookAt(scene.position);

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(10, 20, 20);
    spotLight.shadowCameraNear = 20;
    spotLight.shadowCameraFar = 50;
    spotLight.castShadow = true;

    scene.add(spotLight);


    // add the output of the renderer to the html element
    document.body.appendChild(renderer.domElement);

    // call the render function, after the first render, interval is determined
    // by requestAnimationFrame
    render();
}

/**
 * Called when the scene needs to be rendered. Delegates to requestAnimationFrame
 * for future renders
 */
function render() {
  
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}


/**
 * Function handles the resize event. This make sure the camera and the renderer
 * are updated at the correct moment.
 */
function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// calls the init function when the window is done loading.
window.onload = init;
// calls the handleResize function when the window is resized
window.addEventListener('resize', handleResize, false);
