export interface Goal {
  id: string
  description: string
  completed: boolean
}

export interface PlanStep {
  id: string
  action: string
  executed: boolean
}

export interface AgentState {
  goal: Goal
  plan: PlanStep[]
  memory: string[]
}
