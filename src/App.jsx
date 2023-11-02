import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useState } from "react";
import { createPortal } from "react-dom";
import {
  img1,
  img10,
  img11,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
} from "./assets/index";
import SortableItem from "./components/SortableItem";

function App() {
  const [count, setCount] = useState(0);
  const [selectId, setSelectId] = useState({});
  const [removeId, setRemoveId] = useState(new Set());
  const [activeColumn, setActiveColumn] = useState(null);
  const [images, setImages] = useState([
    {
      id: 1,
      img: img1,
    },
    {
      id: 2,
      img: img2,
    },
    {
      id: 3,
      img: img3,
    },
    {
      id: 4,
      img: img4,
    },
    {
      id: 5,
      img: img5,
    },
    {
      id: 6,
      img: img6,
    },
    {
      id: 7,
      img: img7,
    },
    {
      id: 8,
      img: img8,
    },
    {
      id: 9,
      img: img9,
    },
    {
      id: 10,
      img: img10,
    },
    {
      id: 11,
      img: img11,
    },
    {
      id: 12,
      img: null,
    },
  ]);

  // handle count & check
  const handleCount = ({ value, select }) => {
    if (!select && value !== selectId) {
      setCount((prv) => prv + 1);
      setSelectId({ check: true, id: value });
      // set id
      const updatedSet = new Set(removeId);
      updatedSet.add(value);
      setRemoveId(updatedSet);
    } else if (
      (select && count >= 0 && value === selectId) ||
      value !== selectId
    ) {
      setCount((prv) => prv - 1);
      setSelectId({ check: false, id: value });
      if (removeId.has(value)) {
        const updatedSet = new Set(removeId);
        updatedSet.delete(value);
        setRemoveId(updatedSet);
      }
    }
  };

  const handleDelete = () => {
    const newData = images.filter((img) => !removeId.has(img.id));
    console.log(newData);
    setImages(newData);
    setCount(0);
  };

  // handle DND
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }
    setImages((images) => {
      const oldIndex = images.findIndex((image) => image.id === active.id);
      const newIndex = images.findIndex((image) => image.id === over.id);
      return arrayMove(images, oldIndex, newIndex);
    });
  };

  const onDragStart = (event) => {
    console.log("DRAG START", event);
    if (event.active.data.current.type === "Images") {
      setActiveColumn(event.active.data.current.image);
      return;
    }
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto p-4">
        <div className=" my-10 flex flex-col sm:flex-row items-center gap-5 justify-between border-b pb-5">
          <div>
            {/* check show count or not */}
            {count > 0 ? (
              <div className=" flex items-center gap-5">
                <input type="checkbox" name="count" checked />
                <p className=" text-xl font-semibold">
                  {count} {count === 1 ? "File" : "Files"} Selected
                </p>
              </div>
            ) : (
              <h1 className=" font-semibold text-xl">Gallary</h1>
            )}
          </div>
          <div>
            <button
              onClick={handleDelete}
              className=" bg-red-600 hover:bg-red-400 ease-in duration-300 px-7 py-3 rounded-md text-white font-semibold  cursor-pointer"
            >
              Delete Files
            </button>
          </div>
        </div>

        <DndContext
          onDragStart={onDragStart}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={images}
            strategy={verticalListSortingStrategy}
          >
            <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-7">
              {images.map((image, index) => (
                <div
                  key={image?.id}
                  className={
                    index === 0 ? "col-span-2 md:row-span-2" : " col-span-1"
                  }
                >
                  <SortableItem image={image} handleCount={handleCount} />
                </div>
              ))}
            </div>
          </SortableContext>
          {createPortal(
            <DragOverlay>
              {activeColumn && <SortableItem image={activeColumn} />}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </>
  );
}

export default App;
