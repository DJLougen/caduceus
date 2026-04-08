import { use } from "react";
import { TaskDetail } from "./task-detail";
import tasksJson from "../../../../api/tasks/tasks.json";
import { CASUAL_ARENA } from "@/lib/data";

type FullTask = {
  id: string;
  name: string;
  domain: string;
  difficulty: string;
  description: string;
  tools_available: string[];
  environment?: {
    files?: { path: string; description: string }[];
    services?: { name: string; port?: number; status?: string }[];
    preconditions?: string[];
  };
  success_criteria?: string[];
  par_steps?: number;
  source?: string;
};

// Also generate pages for casual arena tasks
const casualTasks: FullTask[] = CASUAL_ARENA.map((t) => ({
  id: t.id,
  name: t.name,
  domain: "Casual Arena",
  difficulty: t.judging === "automated" ? "Medium" : "Medium",
  description: t.longDescription,
  tools_available: [],
  environment: {
    files: [],
    services: [],
    preconditions: t.rules,
  },
  success_criteria: t.scoring,
  par_steps: undefined,
  source: undefined,
}));

// Only generate pages for tasks with a source repo (public tasks) + casual arena
const PUBLIC_TASK_IDS = new Set(
  (tasksJson as FullTask[]).filter((t) => t.source).map((t) => t.id)
);
const ALL_TASKS: FullTask[] = [
  ...(tasksJson as FullTask[]).filter((t) => PUBLIC_TASK_IDS.has(t.id)),
  ...casualTasks,
];

export function generateStaticParams() {
  return ALL_TASKS.map((t) => ({ id: t.id }));
}

export default function TaskPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const task = ALL_TASKS.find((t) => t.id === id) || null;
  return <TaskDetail task={task} />;
}
