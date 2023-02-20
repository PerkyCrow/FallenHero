
import {loadImage, drawImage, drawGrid, setScale} from './utils.js'


async function init () {
    const canvas = document.querySelector('#fallen_hero .game_canvas')
    const ctx = canvas.getContext('2d')

    setScale(ctx, 100)
    drawGrid(ctx)

    const heroImage = await loadImage('images/hero_run_01.png')
    drawImage(ctx, {
        x: 0,
        y: 0,
        width: 1,
        height: 1,
        image: heroImage
    })
}


window.addEventListener('load', init)
