import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useState } from "react";
import { BsImage } from "react-icons/bs";

export default function SortableItem({ image, handleCount }) {
  const [select, setSelect] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: image?.id,
    data: {
      type: "Images",
      image,
    },
  });
  const style = { transition, transform: CSS.Transform.toString(transform) };

  const handleCheck = (value) => {
    setSelect(!select);
    handleCount({ value, select });
  };

  if (isDragging) {
    return <div>Hellow</div>;
  }

  return (
    <div ref={setNodeRef} style={style} className="relative h-full group">
      <div
        {...attributes}
        {...listeners}
        // check border style
        className={
          image?.img === null
            ? "border-2 border-dashed bg-neutral-100 border-neutral-300 rounded-md overflow-hidden relative  h-[100%] flex flex-col items-center justify-center"
            : "border-2 border-neutral-300 rounded-md overflow-hidden relative group"
        }
      >
        <div>
          {/* check image or null */}
          {image?.img === null ? (
            <div>
              <div className=" flex items-center justify-center flex-col p-5 gap-5   h-full w-full ">
                <div className=" text-[20px]">
                  <BsImage />
                </div>
                <div className=" sm:text-[20px]">
                  <p> Add Images</p>
                </div>
              </div>
              <div className=" bg-transparent group-hover:bg-black/30 ease-in duration-300  h-full w-full absolute top-0 left-0" />
            </div>
          ) : (
            <div>
              <img src={image?.img} alt="image" className="img-container" />
              <div
                className={`bg-transparent ${
                  !select ? "group-hover:bg-black/40" : " bg-white/50"
                } ease-in duration-300  h-full w-full absolute top-0 left-0`}
              />
            </div>
          )}
        </div>
      </div>
      {image?.img !== null ? (
        <div
          className={
            select
              ? " absolute left-3 sm:left-5 top-3 sm:top-5"
              : " absolute left-3 top-3 sm:left-5 sm:top-5 hidden group-hover:block"
          }
        >
          <input
            type="checkbox"
            name="check"
            checked={image?.selected}
            onChange={() => handleCheck(image?.id)}
          />
        </div>
      ) : null}
    </div>
  );
}

React.memo(SortableItem);
