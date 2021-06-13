export async function sendContactData(contactData) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactData),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong!')
  }
}
