var datastring = document.currentScript.getAttribute('stardata');
var stardata = JSON.parse(datastring);
console.log(stardata);

var example = (function () {

    "use strict";

    var scene = new THREE.Scene(),
        renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
        light = new THREE.AmbientLight(0xffffff),
        camera,
        controls,
        box;

    function initScene() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("webgl-container").appendChild(renderer.domElement);

        scene.add(light);

        camera = new THREE.PerspectiveCamera(
            35,
            window.innerWidth / window.innerHeight,
            1,
            100000000
        );

        scene.add(camera);        

        var stars = [];
        for (var i = 0; i < stardata.length; i++) {
            stars.push(new THREE.ArrowHelper( 
                new THREE.Vector3(stardata[i].vx, stardata[i].vy+230, stardata[i].vz).normalize(),
                new THREE.Vector3(stardata[i].px, stardata[i].py, stardata[i].pz),
                stardata[i].V,
                0xffff00, stardata[i].V/3, stardata[i].V/3));
        }

        for (var j = 0; j < stardata.length; j++) {
            scene.add(stars[j]);
        }

        //galactic centre
        var geometry = new THREE.SphereGeometry(500, 16, 16);
        var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        var galCentre = new THREE.Mesh(geometry, material);
        //galCentre.position.x = 1593.52248843017;
        //galCentre.position.y = 5811.18966926513;
        //galCentre.position.z = 5262.20112754097;
        
        var d = new Date();
        var n = d.getTime();
        if (n % 2 === 1) {
            galCentre.position.x = Math.cos(359.9443 * Math.PI / 180) * Math.cos(-0.0462 * Math.PI / 180) * 8000;
            galCentre.position.y = Math.sin(359.9443 * Math.PI / 180) * Math.cos(-0.0462 * Math.PI / 180) * 8000;
            galCentre.position.z = Math.sin(-0.0462 * Math.PI / 180) * 8000;
            scene.add(galCentre);
        }
        else
        {
            galCentre.position.x = Math.cos(359.9443 * Math.PI / 180) * Math.cos(-0.0462 * Math.PI / 180) * 8000;
            galCentre.position.y = Math.sin(359.9443 * Math.PI / 180) * Math.cos(-0.0462 * Math.PI / 180) * 8000;
            galCentre.position.z = Math.sin(-0.0462 * Math.PI / 180) * 8000;
            scene.add(galCentre);
        }

        //earth
        var geometry2 = new THREE.SphereGeometry(25, 16, 16);
        var material2 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        var earth = new THREE.Mesh(geometry2, material2);
        earth.position.x = 0;
        earth.position.y = 0;
        earth.position.z = 0;
        scene.add(earth);


        //axes
        var axisHelper = new THREE.AxisHelper(50);
        scene.add(axisHelper);

        //galaxy
        //var galaxymap = new THREE.ImageLoader();
        //galaxymap.load('~\Images/Milky_Way_Galaxy.jpg');
        //console.log(galaxymap);
        //var galgeometry = new THREE.PlaneGeometry(30000, 30000);
        //var galmaterial = new THREE.MeshBasicMaterial({ map: galaxymap, side: THREE.DoubleSide });
        //var galaxy = new THREE.Mesh(galgeometry, galmaterial);
        //galaxy.position.x = 1593.52248843017;
        //galaxy.position.y = 5811.18966926513;
        //galaxy.position.z = 5262.20112754097;
        //scene.add(galaxy);

        //box
        box = new THREE.Mesh(
            new THREE.BoxGeometry(
                20,
                20,
                20),
            new THREE.MeshBasicMaterial({

                vertexColors: THREE.VertexColors
            }));
        assignColorsToCube(box);
        //scene.add(box);
        //endbox

        controls = new THREE.OrbitControls(camera);
        controls.target = new THREE.Vector3(galCentre.position.x, galCentre.position.y, galCentre.position.z);
        controls.addEventListener('change', render);
        camera.position.set(1000, 1000, 1000);
        render();
        camera.position.set(1000, 1000, 1000);
    }

    function assignColorsToCube(cube) {


        var colors = [
            new THREE.Color("rgb(255,0,0)"),
            new THREE.Color("rgb(0,255,0)"),
            new THREE.Color("rgb(0,0,255)"),
            new THREE.Color("rgb(255,255,0)"),
            new THREE.Color("rgb(0,255,255)"),
            new THREE.Color("rgb(255,0,255)")
        ];

        for (var i = 0; i < 12; i += 2) {

            var color = colors[i / 2];

            //each cube face is made up of 2 triangles & we want same color for each
            cube.geometry.faces[i].color = color;
            cube.geometry.faces[i + 1].color = color;
        }
    }

    function render() {
        renderer.render(scene, camera);        
    }

    window.onload = initScene;

    return {
        scene: scene
    };

})();