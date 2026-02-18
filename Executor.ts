import { PlanStep } from "../types/types"

export class Executor {
  async execute(step: PlanStep): Promise<void> {
    console.log("Executing:", step.action)
    step.executed = true
  }
}
