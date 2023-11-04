import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { useState } from "react";
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
  const [activeImage, setActiveImage] = useState(null);
  const [dragingActive, setDragingActive] = useState(false);
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
  const handleCount = ({ value: imgId, select }) => {
    if (!select && imgId !== selectId) {
      setCount((prv) => prv + 1);
      setSelectId({ check: true, id: imgId });
      // set id
      const updatedSet = new Set(removeId);
      updatedSet.add(imgId);
      setRemoveId(updatedSet);
    } else if (
      (select && count >= 0 && imgId === selectId) ||
      imgId !== selectId
    ) {
      setCount((prv) => prv - 1);
      setSelectId({ check: false, id: imgId });
      if (removeId.has(imgId)) {
        const updatedSet = new Set(removeId);
        updatedSet.delete(imgId);
        setRemoveId(updatedSet);
      }
    }
  };

  // handle Delete
  const handleDelete = () => {
    const newData = images.filter((img) => !removeId.has(img.id));
    setImages(newData);
    setCount(0);
  };

  //  DND Start
  const onDragStart = (event) => {
    setDragingActive(true);
    if (event.active.data.current.type === "Images") {
      setActiveImage(event.active.data.current.image);
      return;
    }
  };

  //  DND End
  const handleDragEnd = (event) => {
    setDragingActive(false);
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
          {count > 0 ? (
            <div>
              <button
                onClick={handleDelete}
                className=" bg-red-600 hover:bg-red-400 ease-in duration-300 px-7 py-3 rounded-md text-white font-semibold  cursor-pointer"
              >
                Delete {count === 1 ? "File" : "Files"}
              </button>{" "}
            </div>
          ) : null}
        </div>

        <DndContext
          onDragStart={onDragStart}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={images} strategy={rectSortingStrategy}>
            <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-7 overflow-hidden">
              {images.map((image, index) => (
                <SortableItem
                  key={image?.id}
                  image={image}
                  handleCount={handleCount}
                  dragingActive={dragingActive}
                  index={index}
                />
              ))}
            </div>
          </SortableContext>
          <DragOverlay adjustScale={true}>
            {activeImage && (
              <SortableItem image={activeImage} dragingActive={dragingActive} />
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
}

export default App;
