import { useRef } from "react";
import styles from "./dragIngredientConstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { TIngredient } from "../../../types/types";

type TDragIngredient = {
  ingredient: TIngredient;
  deleteIngredient: () => void;
  moveIngredient: (id: string, index: number) => void;
  index: number;
  id: string;
};

const DragIngredient = ({
  ingredient,
  deleteIngredient,
  moveIngredient,
  index,
  id,
}: TDragIngredient) => {
  const refMoveIngedient = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "moveIngredient",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor: DropTargetMonitor) {
      if (!refMoveIngedient.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect =
        refMoveIngedient.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) {
        return;
      }

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveIngredient(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "moveIngredient",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(refMoveIngedient));

  return (
    <div
      ref={refMoveIngedient}
      style={{ opacity }}
      className={styles.dragIngredient}>
      <div>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={deleteIngredient}
        data-handler-id={handlerId}
      />
    </div>
  );
};

export default DragIngredient;
