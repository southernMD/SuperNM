<template>
    <canvas class="webgl" :width="width" :height="height"></canvas>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import earthVertexShader from '@/assets/earth/shaders/earth/vertex.vs'
import earthFragmentShader from '@/assets/earth/shaders/earth/fragment.fs'
import atmosphereVertexShader from '@/assets/earth/shaders/atmosphere/vertex.vs'
import atmosphereFragmentShader from '@/assets/earth/shaders/atmosphere/fragment.fs'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'

const props = withDefaults(defineProps<{
    width: number
    height: number
    pixelRatio: number
}>(), {
    width: 200,
    height: 100,
    pixelRatio: Math.min(window.devicePixelRatio, 2)
})

function getSunSpherical(latitude: number, longitude: number, date: Date) {
    // 获取当前时间（UTC 转本地时间）
    const hours = date.getUTCHours() + longitude / 15; // 15° ≈ 1 小时
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);

    // 太阳赤纬计算（简化版）
    const declination = 23.44 * Math.cos((360 / 365) * (dayOfYear + 10) * (Math.PI / 180));

    // 太阳时角（角度制）
    const hourAngle = (hours - 12) * 15;

    // 太阳仰角（phi）
    const latitudeRad = latitude * (Math.PI / 180);
    const declinationRad = declination * (Math.PI / 180);
    const hourAngleRad = hourAngle * (Math.PI / 180);
    const altitude = Math.asin(
        Math.sin(latitudeRad) * Math.sin(declinationRad) +
        Math.cos(latitudeRad) * Math.cos(declinationRad) * Math.cos(hourAngleRad)
    );

    // 太阳方位角（theta）
    const cosAzimuth = (Math.sin(declinationRad) - Math.sin(latitudeRad) * Math.sin(altitude)) /
        (Math.cos(latitudeRad) * Math.cos(altitude));
    let azimuth = Math.acos(cosAzimuth);
    if (hours > 12) azimuth = 2 * Math.PI - azimuth; // 下午调整方向

    return { phi: Math.PI / 2 - altitude, theta: azimuth };
}

let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let controls: OrbitControls | null = null;
let earth: THREE.Mesh | null = null;
let atmosphere: THREE.Mesh | null = null;
let debugSun: THREE.Mesh | null = null;
let sunSpherical: THREE.Spherical | null = null;
let sunDirection: THREE.Vector3 | null = null;
let clock: THREE.Clock | null = null;

function initThreeJS() {
    if (renderer) renderer.dispose();
    if (scene) scene.clear();
    if (camera) camera.remove();
    if (controls) controls.dispose();
    if (earth) earth.geometry.dispose();
    if (atmosphere) atmosphere.geometry.dispose();
    if (debugSun) debugSun.geometry.dispose();

    // Canvas
    const canvas = document.querySelector('canvas.webgl') as HTMLCanvasElement;

    // Scene
    scene = new THREE.Scene();

    // Loaders
    const textureLoader = new THREE.TextureLoader();

    /**
     * Earth
     */

    const earthDayTexture = textureLoader.load('/earth/day.jpg');
    earthDayTexture.colorSpace = THREE.SRGBColorSpace;
    earthDayTexture.anisotropy = 8;
    const earthNightTexture = textureLoader.load('/earth/night.jpg');
    earthNightTexture.anisotropy = 8;
    earthNightTexture.colorSpace = THREE.SRGBColorSpace;
    const earthSpecularCloudsTexture = textureLoader.load('/earth/specularClouds.jpg');
    earthSpecularCloudsTexture.anisotropy = 8;

    const earthParameters = {
        atmosphereDayColor: "#00aaff",
        atmosphereTwilightColor: "#00aaff"
    };

    // Mesh
    const earthGeometry = new THREE.SphereGeometry(2, 64, 64);
    const earthMaterial = new THREE.ShaderMaterial({
        vertexShader: earthVertexShader,
        fragmentShader: earthFragmentShader,
        uniforms: {
            uDayTexture: { value: earthDayTexture },
            uNightTexture: { value: earthNightTexture },
            uSpecularCloudsTexture: { value: earthSpecularCloudsTexture },
            uSunDirection: { value: new THREE.Vector3(0, 0, 1) },
            uAtmosphereDayColor: { value: new THREE.Color(earthParameters.atmosphereDayColor) },
            uAtmosphereTwilightColor: { value: new THREE.Color(earthParameters.atmosphereTwilightColor) },
        }
    });
    earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Atmosphere
    const atmosphereMaterial = new THREE.ShaderMaterial({
        side: THREE.BackSide,
        transparent: true,
        uniforms: {
            uSunDirection: { value: new THREE.Vector3(0, 0, 1) },
            uAtmosphereDayColor: { value: new THREE.Color(earthParameters.atmosphereDayColor) },
            uAtmosphereTwilightColor: { value: new THREE.Color(earthParameters.atmosphereTwilightColor) },
        },
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader
    });
    atmosphere = new THREE.Mesh(earthGeometry, atmosphereMaterial);
    atmosphere.scale.set(1.04, 1.04, 1.04);
    scene.add(atmosphere);

    sunSpherical = new THREE.Spherical(1, Math.PI / 2, 0.5);
    sunDirection = new THREE.Vector3().setFromSpherical(sunSpherical);
    const sunPosition = getSunSpherical(39.9, 116.4, new Date());
    sunSpherical.phi = sunPosition.phi;
    sunSpherical.theta = sunPosition.theta;
    const updateSun = () => {
        const now = new Date();
        const hours = now.getUTCHours() + now.getUTCMinutes() / 60;
        const phi = (hours / 24) * Math.PI * 2;
        sunSpherical.phi = phi;
        sunDirection.setFromSpherical(sunSpherical);

        if (debugSun) debugSun.position.copy(sunDirection).multiplyScalar(25);
        if (earthMaterial) earthMaterial.uniforms.uSunDirection.value.copy(sunDirection);
        if (atmosphereMaterial) atmosphereMaterial.uniforms.uSunDirection.value.copy(sunDirection);
    };

    debugSun = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.1, 2),
        new THREE.MeshBasicMaterial()
    );
    // scene.add(debugSun);
    updateSun();
    setInterval(updateSun, 3600000);

    /**
     * Sizes
     */

    window.addEventListener('resize', () => {
        // Update sizes
        // Update camera
        if (camera) {
            camera.aspect = props.width / props.height;
            camera.updateProjectionMatrix();
        }

        // Update renderer
        if (renderer) {
            renderer.setSize(props.width, props.height);
            renderer.setPixelRatio(props.pixelRatio);
        }
    });

    /**
     * Camera
     */
    // Base camera
    camera = new THREE.PerspectiveCamera(25, props.width / props.height, 0.1, 100);
    if (scene) scene.add(camera);

    // Controls
    controls = new OrbitControls(camera, canvas);
    if (controls) controls.enableDamping = true;

    /**
     * Renderer
     */
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    });
    if (renderer) {
        renderer.setSize(props.width, props.height);
        renderer.setPixelRatio(props.pixelRatio);
        renderer.setClearColor('#000011');
    }

    // Avatar
    const circleTexture = textureLoader.load('/avatar.png');
    const circle = new THREE.Mesh(
        new THREE.CircleGeometry(0.1, 32),
        new THREE.MeshBasicMaterial({
            map: circleTexture,
            side: THREE.DoubleSide,
        })
    );
    circle.position.set(-0.93, 1.067, -1.514);
    earth?.add(circle);
    if (camera) camera.position.copy(circle.position.clone().multiplyScalar(8));

    const fontLoader = new FontLoader();
    fontLoader.load(
        '/earth/helvetiker_regular.typeface.json',
        (font) => {
            const textGeometry = new TextGeometry('I Am In ShangHai', {
                font: font,
                size: 0.5,
                depth: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.03,
                bevelOffset: 0,
                bevelSegments: 5
            });
            const material = new THREE.MeshMatcapMaterial();
            const matcapTextures = new THREE.TextureLoader().load('/earth/matcaps.png');
            material.matcap = matcapTextures;
            const cube = new THREE.Mesh(
                textGeometry,
                material
            );
            textGeometry.center();
            cube.position.copy(circle.position.clone());
            scene?.add(cube);
            cube.rotation.y = Math.PI;
            cube.position.set(0, 3, 0);
        }
    );
    scene.translateY(-1);
    /**
     * Animate
     */
    clock = new THREE.Clock();
    const tick = () => {
        const elapsedTime = clock?.getDelta() || 0;
        if (earth) earth.rotation.y += (2 * Math.PI / 86400) * elapsedTime;
        if (circle) circle.rotation.y += (2 * Math.PI / 86400) * elapsedTime;
        // Update controls
        if (circle && camera) circle.lookAt(camera.position);

        if (controls) controls.update();

        // Render
        if (renderer && scene && camera) renderer.render(scene, camera);

        // Call tick again on the next frame
        window.requestAnimationFrame(tick);
    };

    tick();
}

onMounted(() => {
    initThreeJS();
});

watch([() => props.width, () => props.height, () => props.pixelRatio], () => {
    initThreeJS();
});
</script>