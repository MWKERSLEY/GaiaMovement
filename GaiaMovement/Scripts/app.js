var datastring = document.currentScript.getAttribute('stardata');
var stardata = JSON.parse(datastring);
console.log(stardata);

var example = (function () {

    "use strict";

    var scene = new THREE.Scene(),
        renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
        light = new THREE.AmbientLight(0xffffff),
        camera = new THREE.PerspectiveCamera(
            35,
            window.innerWidth / window.innerHeight,
            1,
            10000000000000
        ),
        controls = new THREE.OrbitControls(camera);

    function initScene() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("webgl-container").appendChild(renderer.domElement);

        scene.add(light);

        //camera = new THREE.PerspectiveCamera(
        //    35,
        //    window.innerWidth / window.innerHeight,
        //    1,
        //    100000000
        //);

        scene.add(camera);        

        var stars = [];
        for (var i = 0; i < stardata.length; i++) {
            stars.push(new THREE.ArrowHelper( 
                new THREE.Vector3(stardata[i].vx + 10, stardata[i].vz + 7.17, -(stardata[i].vy+235.25)).normalize(),
                new THREE.Vector3(stardata[i].px, stardata[i].pz, -stardata[i].py),
                Math.sqrt(stardata[i].V * stardata[i].V+55494)/3,
                0xffff00, Math.sqrt(stardata[i].V * stardata[i].V + 55494) / 9, Math.sqrt(stardata[i].V * stardata[i].V + 55494)/9));
        }
        //10, 235.25, 7.17
        for (var j = 0; j < stardata.length; j++) {
            scene.add(stars[j]);
        }

        //galactic centre
        var geometry = new THREE.SphereGeometry(500, 16, 16);
        var material = new THREE.MeshBasicMaterial({ color: 0x040404 });
        var galCentre = new THREE.Mesh(geometry, material);
        //galCentre.position.x = 1593.52248843017;
        //galCentre.position.y = 5811.18966926513;
        //galCentre.position.z = 5262.20112754097;
        
        var d = new Date();
        var n = d.getTime();
        if (n % 2 === 1) {
            galCentre.position.x = Math.cos(359.9443 * Math.PI / 180) * Math.cos(-0.0462 * Math.PI / 180) * 8000;
            galCentre.position.y = Math.sin(-0.0462 * Math.PI / 180) * 8000;
            galCentre.position.z = -(Math.sin(359.9443 * Math.PI / 180) * Math.cos(-0.0462 * Math.PI / 180) * 8000);
            //scene.add(galCentre);
        }
        else
        {
            galCentre.position.x = Math.cos(359.9443 * Math.PI / 180) * Math.cos(-0.0462 * Math.PI / 180) * 8000;
            galCentre.position.y = Math.sin(-0.0462 * Math.PI / 180) * 8000;
            galCentre.position.z = -(Math.sin(359.9443 * Math.PI / 180) * Math.cos(-0.0462 * Math.PI / 180) * 8000);
            //scene.add(galCentre);
        }

        var GCarrow = new THREE.ArrowHelper(
            new THREE.Vector3(0, 1, 0).normalize(),
            new THREE.Vector3(galCentre.position.x, galCentre.position.y, galCentre.position.z),
            3000 / 3,
            0xff0000, 3000 / 9, 3000 / 9);
        //scene.add(GCarrow);

        //earth
        var geometry2 = new THREE.SphereGeometry(25, 16, 16);
        var material2 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        var earth = new THREE.Mesh(geometry2, material2);
        earth.position.x = 0;
        earth.position.y = 0;
        earth.position.z = 0;
        scene.add(earth);

        var eartharrow = new THREE.ArrowHelper(
            new THREE.Vector3(10, 7.17, -235.25).normalize(),
            new THREE.Vector3(0, 0, 0),
            235.57 / 3,
            0x0000ff, 235.57 / 9, 235.57 / 9);
        scene.add(eartharrow);

        //axes
        //var axisHelper = new THREE.AxisHelper(50);
        //scene.add(axisHelper);

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

        //var geometry3 = new THREE.PlaneGeometry(500, 200, 320);
        //var material3 = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
        //var plane3 = new THREE.Mesh(geometry3, material3);
        //scene.add(plane3);

        // plane
        //var texture = new THREE.TextureLoader().load('Images/Milky_Way_Galaxy.jpg');
        //var img = new THREE.MeshBasicMaterial({
        //    map:
        //        //THREE.ImageUtils.loadTexture('Images/Milky_Way_Galaxy.jpg'),
        //        texture,
        //    transparent: true,
        //    side: THREE.DoubleSide//, alphaTest: 0.3
        //});
        //        //var alphaMap = new THREE.ImageUtils.loadTexture('Images/Milky_Way_Galaxy.jpg');
        //img.alphaMap = texture;
        //img.map.needsUpdate = true; //ADDED
        //img.alphaMap.needsUpdate = true; //ADDED
        //var plane = new THREE.Mesh(new THREE.PlaneGeometry(45000, 45000), img);
        //plane.overdraw = true;
        //plane.rotation.x = -Math.PI / 2;
        //plane.rotation.z = Math.PI * 1.55;
        //plane.position.x = 8000;
        //img.needsUpdate = true;
        //texture.needsUpdate = true;
        //plane.needsUpdate = true;
        //scene.add(plane);



        window.addEventListener('resize', onWindowResize, false);

        //controls = new THREE.OrbitControls(camera);
        controls.target = new THREE.Vector3(galCentre.position.x, galCentre.position.y, galCentre.position.z);
        controls.addEventListener('change', render);
        camera.position.set(-20000, 7000, 1000);
        controls.autoRotate = true;
        controls.update();
        //camera.up.set(0, 0, 1);
        //render();


        var loader = new THREE.TextureLoader();
        // load a resource
        loader.load(
            // resource URL
            'Images/Milky_Way_Galaxy.jpg',

            // onLoad callback
            function (texture) {
                // in this example we create the material when the texture is loaded
                var material = new THREE.MeshBasicMaterial({
                    map: texture
                });

                var img = new THREE.MeshBasicMaterial({
                    map: texture, transparent: true,
                    side: THREE.DoubleSide//, alphaTest: 0.3
                });
                img.alphaMap = texture;
                img.map.needsUpdate = true; //ADDED
                img.alphaMap.needsUpdate = true; //ADDED
                var plane = new THREE.Mesh(new THREE.PlaneGeometry(45000, 45000), img);
                plane.overdraw = true;
                plane.rotation.x = -Math.PI / 2;
                plane.rotation.z = Math.PI * 1.55;
                plane.position.x = 8000;
                img.needsUpdate = true;
                plane.needsUpdate = true;
                scene.add(plane);
                plane.needsUpdate = true;
        render();


            },

            // onProgress callback currently not supported
            undefined,

            // onError callback
            function (err) {
                console.error('An error happened.');
            }
        );
    }

    function onWindowResize() {

        var width = window.innerWidth;
        var height = window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);

    }
    function render() {
        renderer.render(scene, camera);        
    }

    window.onload = initScene;

    return {
        scene: scene
    };

})();