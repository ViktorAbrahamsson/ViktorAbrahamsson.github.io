/*
    "FREE 1975 Porsche 911 (930) Turbo" (https://skfb.ly/6WZyV) by Karol Miklas is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
*/
import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

const parameters = {
    materialColor: '#205375',
    starColor: '#59a2d2'
}
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
 const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Renderer
 */
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Objects
 */
// Texture
const textureLoader = new THREE.TextureLoader()
const gradientTexture = textureLoader.load('textures/gradients/3.jpg')
gradientTexture.magFilter = THREE.NearestFilter

// Material
const material = new THREE.MeshStandardMaterial({
    color: parameters.materialColor,
    gradientMap: gradientTexture
})

/**
 * Car
 */
 let porsche

 const gltfLoader = new GLTFLoader()
 const rgbeLoader = new RGBELoader()
 
 renderer.outputEncoding = THREE.sRGBEncoding
 renderer.toneMapping = THREE.ACESFilmicToneMapping
 renderer.toneMappingExposure = 3
 
 rgbeLoader.load('models/car/je_gray_park_4k.hdr', (hdrmap) => {
    hdrmap.mapping = THREE.EquirectangularReflectionMapping
     scene.environment = hdrmap
 
     const url = 'models/car/scene.gltf'
     gltfLoader.load(url, (gltf) => {
        porsche = gltf.scene
        porsche.scale.set(0.75, 0.75, 0.75)
        porsche.rotateY(-0.75)
        porsche.position.setX(0.75)
        porsche.position.y = - objectsDistance * 0 - 1
    
        scene.add(porsche)
        
    })
 }) 

// Meshes
const objectsDistance = 4
// const mesh1 = new THREE.Mesh(
//     new THREE.BoxGeometry(1.5, 2, 0.2),
//     material
// )
// const mesh2 = new THREE.Mesh(
//     new THREE.TorusGeometry(1, 0.2, 100, 32),
//     material
// )
// const mesh3 = new THREE.Mesh(
//     new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
//     material
// )


// mesh2.position.y = - objectsDistance * 1
// mesh3.position.y = - objectsDistance * 2

// mesh1.position.x = 1.5
// mesh2.position.x = 1.5
// mesh3.position.x = 1.5

// scene.add(mesh1, mesh2, mesh3)

// const sectionMeshes = [ mesh1, mesh2, mesh3]


/**
 * Particles
 */
const particlesCount = 1000
const positions = new Float32Array(particlesCount)

for (let i = 0; i < particlesCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * objectsDistance * 3
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
}

const particlesGeometry = new THREE.BufferGeometry()
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

// Material
const particlesMaterial = new THREE.PointsMaterial({
    color: parameters.starColor,
    sizeAttenuation: true,
    size: 0.03
})

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)


window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)

/**
 * Scroll
 */
let scrollY = window.scrollY
let currentSection = 0

window.addEventListener("scroll", () => {
    scrollY = window.scrollY
    // const newSection = Math.round(scrollY / sizes.height)

    // if (newSection != currentSection) {
    //     currentSection = newSection

    //     // gsap.to(
    //     //     sectionMeshes[currentSection].rotation,
    //     //     {
    //     //         duration: 1.5,
    //     //         ease: 'power2.inOut',
    //     //         x: '+=0',
    //     //         y: '+=6',
    //     //         z: ''
    //     //     }
    //     // )
    // }
})

/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Animate camera
    camera.position.y = - scrollY / sizes.height * objectsDistance

    const parallaxX = cursor.x
    const parallaxY = - cursor.y
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 3 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 3 * deltaTime

    // Rotate Car
    if(porsche) {
        porsche.rotation.y = - elapsedTime / 4
    }

    // Animate meshes
    // for (const mesh of sectionMeshes) {
    //     // mesh.rotation.x += deltaTime * 0.1
    //     mesh.rotation.y += deltaTime * 0.12
    // }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()