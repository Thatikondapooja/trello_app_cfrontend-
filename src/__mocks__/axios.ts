const axiosMock = {
  create: () => axiosMock,
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() },
  },
  isAxiosError: jest.fn(),
};

export default axiosMock;
