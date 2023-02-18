export function loadImage (path) {
    return new Promise((resolve, reject) => {
        const image = new Image()
        image.src = path
        image.onload = () => resolve(image)
        image.onerror = reject
    })
}


export function drawRectangle (ctx, {x, y, width, height, fillColor}) {
    ctx.fillStyle = fillColor
    ctx.fillRect(x, y, width, height)
}


export function drawImage (ctx, {x, y, width, height, image}) {
    ctx.drawImage(image, x, y, width, height)
}
