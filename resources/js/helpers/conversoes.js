export function covertTamanhoArquivo(valor) {
    if (valor > (1000 * 1000 * 1000)) return (valor / (1000 * 1000 * 1000)).toFixed(2) + ' GB'
    if (valor > (1000 * 1000)) return (valor / (1000 * 1000)).toFixed(2) + ' MB'
    if (valor > 1000) return Math.round((valor / 1000)) + ' kB'
    return valor + ' B'
}

export function covertDataNumber(valor) {
    return new Date(valor).toLocaleDateString() + ' ' + new Date(valor).toLocaleTimeString()
}
