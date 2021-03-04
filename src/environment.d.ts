declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HELLO_FROM: string
    }
  }
}

export {}
