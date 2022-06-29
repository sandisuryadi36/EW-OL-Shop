export function viewRP(nominal) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(nominal)
}