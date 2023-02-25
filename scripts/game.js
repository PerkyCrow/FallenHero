import imagePaths from './image_paths.js'
import {loadImages, setScale, drawScene, startAnimationLoop, clearCanvas} from './utils.js'
import Scene from './scene.js'


async function init () {
    const score    = document.querySelector('#fallen_hero .game_score')
    const canvas   = document.querySelector('#fallen_hero .game_canvas')
    const gameOver = document.querySelector('#fallen_hero .game_over')
    const replay   = document.querySelector('#fallen_hero .game_replay_button')
    const ctx      = canvas.getContext('2d')

    setScale(ctx, 100)

    const images = await loadImages(imagePaths)

    let scene = createScene()

    function createScene () {
        gameOver.style.display = 'none'

        return new Scene({
            debug: false,
            onGameOver: displayGameOver
        })
    }

    function restartScene () {
        scene = createScene()
    }

    function displayGameOver () {
        gameOver.style.display = 'block'
    }

    replay.addEventListener('pointerdown', restartScene)

    canvas.addEventListener('pointerdown', () => {
        scene.hero.jump()
    })

    startAnimationLoop(function (deltaTime) {
        scene.update(deltaTime)

        if (!scene.ended) {
            clearCanvas(ctx, scene.camera)
            drawScene(ctx, scene, images)
            score.innerHTML = scene.score
        }
    })
}


window.addEventListener('load', init)
