"use client";

import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import Image from "next/image";

const data = [
  {
    id: "id-1",
    image: "img1.png",
    title: "Scotland Island",
    location: "Sydney, Australia",
  },
  {
    id: "id-2",
    image: "img2.png",
    title: "The Charles Grand Brasserie & Bar",
    location: "Sydney, Australia",
  },
  {
    id: "id-3",
    image: "img3.png",
    title: "Bridge Climb",
    location: "Dolor, Sit amet",
  },
  {
    id: "id-4",
    image: "img4.png",
    title: "Scotland Island",
    location: "Sydney, Australia",
  },
  {
    id: "id-5",
    image: "img5.png",
    title: "Clam Bar",
    location: "Etcetera veni, Vidi vici",
  },
  {
    id: "id-6",
    image: "img6.png",
    title: "Vivid Festival",
    location: "Sydney, Australia",
  },
];

interface Chapter {
  id: string;
  image: string;
  title: string;
  location: string;
}

const imageStyle = {
  borderRadius: "10%",
  border: "1px solid #fff",
};

export function DragAndDrop() {
  const [chapters, setChapters] = useState<Chapter[]>(data);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return; // Early exit if not dropped in a valid area

    const items = chapters; // Make a copy of the chapters array to avoid mutation
    const [reorderedItem] = items.splice(result.source.index, 1); // Remove item from source
    items.splice(result.destination.index, 0, reorderedItem); // Insert item at destination

    setChapters(items); // Update the state with the reordered chapters
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex items-center gap-x-2 border rounded-md mb-4 text-sm hover:bg-gray-400 pr-12"
                  >
                    <div className="px-2 py-3 border-r items-center rounded-l-md transition cursor-grab">
                      <Image
                        src={`/assets/${chapter.image}`}
                        width={120}
                        height={120}
                        alt="List Image"
                        style={imageStyle}
                      />
                    </div>
                    <div>
                      <p className="font-bold">{chapter.title}</p>
                      <p>{chapter.location}</p>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
