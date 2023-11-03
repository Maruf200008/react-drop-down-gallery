import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useState } from "react";
import { BsImage } from "react-icons/bs";

export default function SortableItem({ image, handleCount, dragingActive }) {
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

  const inlineStyles = {
    transformOrigin: "0 0",
    ...style,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={inlineStyles}
        className=" border-2 border-green-400 rounded-md h-full w-full bg-neutral-100"
      />
    );
  }

  const handleCheck = (value) => {
    setSelect(!select);
    console.log(select);
    console.log(value);
    console.log(select);
    handleCount({ value, select });
  };

  return (
    <div ref={setNodeRef} style={style} className="group h-full relative">
      <div
        {...attributes}
        {...listeners}
        // check border style
        className={
          image?.img === null
            ? "border-2 border-dashed bg-neutral-100  border-neutral-300 rounded-md overflow-hidden relative  h-[100%] flex flex-col items-center justify-center"
            : "border-2 border-neutral-300 bg-white rounded-md overflow-hidden relative group"
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
              <div
                className={`bg-transparent ${
                  !dragingActive ? "group-hover:bg-black/30" : null
                } ease-in duration-300  h-full w-full absolute top-0 left-0`}
              />
            </div>
          ) : (
            <div>
              <img src={image?.img} alt="image" className="img-container" />
              {!dragingActive ? (
                <div
                  className={`bg-transparent ${
                    !select ? "group-hover:bg-black/40" : " bg-white/50"
                  } ease-in duration-300  h-full w-full absolute top-0 left-0`}
                />
              ) : null}
            </div>
          )}
        </div>
      </div>
      {image?.img !== null && !dragingActive ? (
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
            checked={select}
            value={select}
            onChange={() => handleCheck(image?.id)}
          />
        </div>
      ) : null}
    </div>
  );
}

React.memo(SortableItem);
