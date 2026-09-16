import type { Capability } from "@/types/content";

export const capabilities: Capability[] = [
  { id: "capability-develop", slug: "develop", name: "Develop", shortDescription: "Turn an early packaging direction into a practical system.", order: 1 },
  { id: "capability-improve", slug: "improve", name: "Improve", shortDescription: "Refine existing packaging around function, fit, and presentation.", order: 2 },
  { id: "capability-source", slug: "source", name: "Source", shortDescription: "Match each component to the specialist supplier it requires.", order: 3 },
  { id: "capability-coordinate", slug: "coordinate", name: "Coordinate", shortDescription: "Keep multiple suppliers moving as one packaging program.", order: 4 },
  { id: "capability-inspect", slug: "inspect", name: "Inspect", shortDescription: "Manage quality checks against agreed project requirements.", order: 5 },
  { id: "capability-consolidate-deliver", slug: "consolidate-deliver", name: "Consolidate & Deliver", shortDescription: "Bring components together for coordinated shipment.", order: 6 },
];
