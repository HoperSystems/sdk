import { PlanStep, Goal } from "../types/types"
import { v4 as uuidv4 } from "uuid"

export class Planner {
  generatePlan(goal: Goal): PlanStep[] {
    return [
      {
        id: uuidv4(),
        action: `Analyze goal: ${goal.description}`,
        executed: false
      },
      {
        id: uuidv4(),
        action: `Execute strategy toward: ${goal.description}`,
        executed: false
      }
    ]
  }
}
