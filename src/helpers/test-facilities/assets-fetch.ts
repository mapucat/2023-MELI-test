export const assetsFetchMock = (response: any) =>
  async (): Promise<Response> => await Promise.resolve<Response>({
    ok: true,
    status: 200,
    json: async () => await Promise.resolve(response)
  } as Response)
