import { DragAndDrop } from "@/components/drag-and-drop";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <h1 className="text-xl font-medium">Drag-and-Drop List Reordering</h1>
      <DragAndDrop />
    </main>
  );
}
