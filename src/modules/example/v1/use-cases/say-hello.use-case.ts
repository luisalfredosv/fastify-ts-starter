export interface SayHelloInput {
  name: string;
}

export interface SayHelloOutput {
  message: string;
  timestamp: string;
}

export function sayHelloUseCase(input: SayHelloInput): SayHelloOutput {
  return {
    message: `Hola ${input.name}`,
    timestamp: new Date().toISOString(),
  };
}
