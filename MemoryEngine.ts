export class MemoryEngine {
  private logs: string[] = []

  store(entry: string) {
    this.logs.push(entry)
  }

  getAll(): string[] {
    return this.logs
  }
}
