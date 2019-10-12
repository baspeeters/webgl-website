export function translateClientX(
    pos: number,
    innerWidth: number,
    zoomFactor: number,
) {
    return (pos - (innerWidth / 2)) / (zoomFactor / 2);
}

export function translateClientY(
    pos: number,
    innerHeight: number,
    zoomFactor: number,
) {
    return -(pos - (innerHeight / 2)) / (zoomFactor / 2);
}
