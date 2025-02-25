import ky from 'ky'

export const api = ky.create({
  hooks: {
    afterResponse: [
      async (_request, _options, response) => {
        if (!response.ok) {
          const json = (await response.json()) as { message: string }
          throw new Error(json.message || 'An unknown error occurred')
        }
      },
    ],
  },
})
