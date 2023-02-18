async function init () {
    const canvas = document.querySelector('#fallen_hero .game_canvas')
    const ctx = canvas.getContext('2d')

    drawRectangle(ctx, {
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        fillColor: 'black'
    })

    drawRectangle(ctx, {
        x: 200,
        y: 50,
        width: 150,
        height: 150,
        fillColor: 'white'
    })
}

function drawRectangle (ctx, {x, y, width, height, fillColor}) {
    ctx.fillStyle = fillColor
    ctx.fillRect(x, y, width, height)
}


window.addEventListener('load', init)