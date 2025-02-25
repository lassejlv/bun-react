export const json = async (json: any, status: number = 200): Promise<Response> => {
  return Response.json(json, { status })
}

export const err = async (message: string, status: number): Promise<Response> => {
  return json({ message }, status)
}

export const success = async (message: string): Promise<Response> => {
  return json({ message }, 200)
}
