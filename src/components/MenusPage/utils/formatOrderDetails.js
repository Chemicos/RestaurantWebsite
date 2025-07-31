export function generateOrderDetailsText(order) {
  const parts = []

  if (order.garnitura) {
    parts.push(order.garnitura)
  }

  if (Array.isArray(order.salate)) {
    parts.push(
      ...order.salate.map(salata => `${salata.name} x${salata.quantity}`)
    )
  }

  if (Array.isArray(order.bauturi)) {
    parts.push(
      ...order.bauturi.map(bautura => `${bautura.name} x${bautura.quantity}`)
    )
  }

  if (Array.isArray(order.sosuri)) {
    parts.push(
      ...order.sosuri.map(sos => `${sos.name} x${sos.quantity}`)
    )
  }

  return parts.join(', ')
}