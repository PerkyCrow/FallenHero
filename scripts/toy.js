import {loadImage, drawImage} from './utils.js'


async function init () {
    const canvas = document.querySelector('#fallen_hero .game_canvas')
    const ctx = canvas.getContext('2d')

    const heroImage = await loadImage('images/hero_run_01.png')
    drawImage(ctx, {
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        image: heroImage
    })
}


window.addEventListener('load', init)