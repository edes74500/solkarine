type MockFunction<T = any> = jest.Mock<Promise<T>>;

export function createLeanMock<T>(result: T, shouldReject: boolean = false): { lean: MockFunction<T> } {
  return {
    lean: shouldReject ? jest.fn().mockRejectedValue(result) : jest.fn().mockResolvedValue(result),
  };
}
