
import imagePaths from './image_paths.js'
import {loadImages, setScale, drawScene, startAnimationLoop, clearCanvas} from './utils.js'
import Scene from './scene.js'


async function init () {
    const canvas = document.querySelector('#fallen_hero .game_canvas')
    const ctx = canvas.getContext('2d')

    setScale(ctx, 100)

    const images = await loadImages(imagePaths)
    const scene = new Scene({
        debug: true,
        onGameOver: () => {
            console.log('Game over!')
        }
    })

    startAnimationLoop(function (deltaTime) {
        clearCanvas(ctx, scene.camera)

        scene.update(deltaTime)
        drawScene(ctx, scene, images)
    })

    canvas.addEventListener('pointerdown', () => {
        scene.hero.jump()
    })
}


window.addEventListener('load', init)
