import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useState } from "react";
import { BsImage } from "react-icons/bs";

export default function SortableItem({ image, handleCount }) {
  const [select, setSelect] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: image?.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  const handleCheck = (value) => {
    setSelect(!select);
    handleCount({ value, select });
  };

  return (
    <div className="relative h-full group bg-slate-200 ">
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        // check border style
        className={
          image?.img === null
            ? "border border-dashed bg-neutral-100 border-neutral-600 rounded-md overflow-hidden relative  h-[100%] flex flex-col items-center justify-center"
            : "border rounded-md overflow-hidden relative group"
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
                <div className=" text-[20px]">
                  <p> Add Images</p>
                </div>
              </div>
              <div className=" bg-transparent group-hover:bg-black/20 ease-in duration-300  h-full w-full absolute top-0 left-0" />
            </div>
          ) : (
            <div className=" ">
              <img src={image?.img} alt="image" className="img-container" />
              <div className=" bg-transparent group-hover:bg-black/20 ease-in duration-300  h-full w-full absolute top-0 left-0" />
            </div>
          )}
        </div>
      </div>
      <div
        className={
          select
            ? " absolute left-5 top-5"
            : " absolute left-5 top-5 hidden group-hover:block"
        }
      >
        <input
          type="checkbox"
          name="check"
          checked={image.selected}
          onChange={() => handleCheck(image.id)}
        />
      </div>
    </div>
  );
}

React.memo(SortableItem);
