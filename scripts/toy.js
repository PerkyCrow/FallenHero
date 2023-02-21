
import imagePaths from './image_paths.js'
import {loadImages, setScale, drawScene, startAnimationLoop, clearCanvas} from './utils.js'
import Scene from './scene.js'


async function init () {
    const canvas = document.querySelector('#fallen_hero .game_canvas')
    const ctx = canvas.getContext('2d')

    setScale(ctx, 100)

    const images = await loadImages(imagePaths)
    const scene = new Scene()

    scene.add({
        x: 0,
        y: 0.85,
        width: 2,
        height: 2,
        image: images.mountain1
    })

    scene.add({
        x: 1.5,
        y: 0.85,
        width: 2,
        height: 2,
        image: images.mountain2
    })

    scene.add({
        x: 3,
        y: 0.85,
        width: 2,
        height: 2,
        image: images.mountain3
    })

    scene.add({
        x: 4.5,
        y: 0.85,
        width: 2,
        height: 2,
        image: images.mountain4
    })

    scene.add({
        x: 0,
        y: 3,
        width: 1,
        height: 0.5,
        image: images.floor1
    })

    scene.add({
        x: 1,
        y: 3,
        width: 1,
        height: 0.5,
        image: images.floor2
    })

    scene.add({
        x: 2,
        y: 3,
        width: 1,
        height: 0.5,
        image: images.floor3
    })

    scene.add({
        x: 3,
        y: 3,
        width: 1,
        height: 0.5,
        image: images.floor4
    })

    scene.add({
        x: 4,
        y: 3,
        width: 1,
        height: 0.5,
        image: images.floor5
    })

    scene.add({
        x: 5,
        y: 3,
        width: 1,
        height: 0.5,
        image: images.floor6
    })

    scene.add({
        x: 6,
        y: 3,
        width: 1,
        height: 0.5,
        image: images.floor1
    })

    scene.add({
        x: 0,
        y: 1,
        width: 2,
        height: 2,
        image: images.tree1
    })

    scene.add({
        x: 1.5,
        y: 1,
        width: 2,
        height: 2,
        image: images.tree2
    })

    scene.add({
        x: 3,
        y: 1,
        width: 2,
        height: 2,
        image: images.tree3
    })

    scene.add({
        x: 4.5,
        y: 1,
        width: 2,
        height: 2,
        image: images.tree4
    })

    scene.add({
        x: 0.5,
        y: 2,
        width: 1,
        height: 1,
        image: images.grass1
    })

    scene.add({
        x: 1.5,
        y: 2,
        width: 1,
        height: 1,
        image: images.grass2
    })

    scene.add({
        x: 2.5,
        y: 2,
        width: 1,
        height: 1,
        image: images.grass3
    })

    scene.add({
        x: 3.5,
        y: 2,
        width: 1,
        height: 1,
        image: images.rocks1
    })

    scene.add({
        x: 4.5,
        y: 2,
        width: 1,
        height: 1,
        image: images.grass1
    })

    scene.add({
        x: 5.5,
        y: 2,
        width: 1,
        height: 1,
        image: images.grass2
    })

    startAnimationLoop(function (deltaTime) {
        clearCanvas(ctx, scene.camera)
        scene.update(deltaTime)
        drawScene(ctx, scene)
    })

}


window.addEventListener('load', init)
