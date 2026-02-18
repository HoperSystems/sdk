import { Goal, AgentState } from "../types/types"
import { Planner } from "./Planner"
import { Executor } from "./Executor"
import { Evaluator } from "./Evaluator"
import { MemoryEngine } from "../memory/MemoryEngine"
import { XOATClient } from "../xoat/XOATClient"
import { v4 as uuidv4 } from "uuid"

export class Agent {
  private state: AgentState
  private planner = new Planner()
  private executor = new Executor()
  private evaluator = new Evaluator()
  private memory = new MemoryEngine()
  private xoat: XOATClient

  constructor(goalDescription: string, rpcUrl: string) {
    const goal: Goal = {
      id: uuidv4(),
      description: goalDescription,
      completed: false
    }

    this.state = {
      goal,
      plan: [],
      memory: []
    }

    this.xoat = new XOATClient(rpcUrl)
  }

  async run(): Promise<void> {
    console.log("Initializing Agent...")

    this.state.plan = this.planner.generatePlan(this.state.goal)

    while (!this.state.goal.completed) {
      for (const step of this.state.plan) {
        if (!step.executed) {
          await this.executor.execute(step)
          this.memory.store(`Executed: ${step.action}`)
        }
      }

      this.evaluator.evaluate(this.state.goal, this.state.plan)
      await this.xoat.anchorState(this.state)
    }

    console.log("Goal Completed ✅")
  }
}
