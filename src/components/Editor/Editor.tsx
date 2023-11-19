import React, { useState, useCallback, ReactElement } from "react";
import DraggableElement from "../DraggableElement/DraggableElement";
import styles from "./Editor.module.scss";
import generatePosition from "../../utils/generatePosition";

export interface Element {
    id: number;
    x: number;
    y: number;
}

const MemoizedDraggableElement = React.memo(DraggableElement);

const Editor = (): ReactElement => {
    const [elements, setElements] = useState<Element[]>([]);
    const [selectedElementId, setSelectedElementId] = useState<number | null>(null);

    const addElement = useCallback(() => {
        const { x, y } = generatePosition(elements);
        setElements(prevElements => [
            ...prevElements,
            { id: prevElements.length + 1, x, y }
        ]);
    }, [elements]);

    const selectElement = useCallback((id: number) => {
        setSelectedElementId(id);
    }, []);

    const removeSelectedElement = useCallback(() => {
        if (selectedElementId !== null) {
            setElements(prevElements => prevElements.filter(element => element.id !== selectedElementId));
            setSelectedElementId(null);
        }
    }, [selectedElementId]);

    return (
        <div className={styles.editor}>
            <button className={styles.editor__button} onClick={addElement}>
                Add Element
            </button>
            <button
                className={styles.editor__button}
                onClick={removeSelectedElement}
                disabled={selectedElementId === null}
            >
                Remove Element
            </button>
            {elements.map((element) => (
                <MemoizedDraggableElement
                    key={element.id}
                    x={element.x}
                    y={element.y}
                    number={element.id}
                    onSelect={() => selectElement(element.id)}
                />
            ))}
        </div>
    );
};

export default Editor;
