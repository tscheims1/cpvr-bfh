var camera, orbitControls, scene, renderer;

init();
animate();

function init() 
{
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 45, 
								window.innerWidth / window.innerHeight,
								0.1, 1000)  ;
	camera.position.x = -10;
	camera.position.y = 10;
	camera.position.z = 10;

	

	// create a render and set the size
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( 0x00000000 );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	orbitControls = new THREE.OrbitControls( camera, renderer.domElement );
	orbitControls.autoRotate = true;
	orbitControls.enableZoom = true;

	//camera.lookAt(scene.position);
	var vertices = [];
	vertices.push ( new THREE.Vector3 ( 0.0, 0.0, 0.0 ) );
	vertices.push ( new THREE.Vector3 ( 1.0, 0.0, 0.0 ) );
	vertices.push ( new THREE.Vector3 ( 1.0, 1.0, 0.0 ) );
	vertices.push ( new THREE.Vector3 ( 0.0, 1.0, 0.0 ) );

	vertices.push ( new THREE.Vector3 ( 0.0, 0.0, 1.0 ) );
	vertices.push ( new THREE.Vector3 ( 1.0, 0.0, 1.0 ) );
	vertices.push ( new THREE.Vector3 ( 1.0, 1.0, 1.0 ) );
	vertices.push ( new THREE.Vector3 ( 0.0, 1.0, 1.0 ) );

	var faces=[];
	//behind
	faces.push(new THREE.Face3 (3,2,0));//stuy later
	faces.push(new THREE.Face3 (2,1,0));
	
	//front
	faces.push(new THREE.Face3(6,7,4));
	faces.push(new THREE.Face3(4,5,6));	
	
	
	faces.push ( new THREE.Face3 ( 1, 2, 5) );//right side
	faces.push ( new THREE.Face3 ( 5, 2, 6) );

	faces.push ( new THREE.Face3 ( 0, 4, 3) );
	faces.push ( new THREE.Face3 ( 4, 7, 3	) );//left side

	faces.push ( new THREE.Face3 ( 2, 3, 6) );
	faces.push ( new THREE.Face3 ( 3, 7, 6	) );//top -> done

	faces.push ( new THREE.Face3 ( 1, 5, 0) );
	faces.push ( new THREE.Face3 ( 5, 4, 0) );//bottom -> done

	cubeGeometry = new THREE.Geometry();
	cubeGeometry.vertices = vertices;
	cubeGeometry.faces = faces;

	
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	cubeMaterial = new THREE.MeshPhongMaterial (
		{
		 color: 0x00ff00,
		 specular:0xff0000,
//		 specular: 0x111111
		} );

	
	var cube = new THREE.Mesh( geometry, cubeMaterial );
	
	var edges = new THREE.FaceNormalsHelper( cube, 2, 0x00ff00, 1 );
	var ambient = new THREE.AmbientLight(0x404040);
	var light = new THREE.PointLight( 0xffffff);
	var spotLight = new THREE.SpotLight( 0xff0000);
	light.position.set(3,1.5,3);
	var pointLightHelper = new THREE.PointLightHelper( light, 1 );
	scene.add( pointLightHelper );
	scene.add(light);	
	scene.add(ambient);
	scene.add( cube );
	scene.add(edges);
	//x: red
	//y: greend
	//z: blue
	var pos = new THREE.Vector3(1,1,1);
	var axes = new THREE.AxisHelper( 1.5 );
	scene.add ( axes );
} 

function render() {
	renderer.render(scene, camera);
}

function onWindowResize() 
{
	
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() 
{
    requestAnimationFrame( animate );

	// required if controls.enableDamping = true, 
	// or if controls.autoRotate = true
    orbitControls.update(); 
    //stats.update();
    render();
}
