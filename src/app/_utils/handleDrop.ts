

interface DraggableItemData {
  id: number;
  content: string;
  source?: string;
}

type DropHandlerArgs<T> = {
  event: React.DragEvent;
  currentList: T[];
  sourceKey: string; // where the item is being dropped
  onUpdate: (newList: T[]) => void;
  onRemoveFromSource?: (source: string, itemId: number) => void;
};

export function handleDrop<T extends DraggableItemData>({
  event,
  currentList,
  sourceKey,
  onUpdate,
  onRemoveFromSource,
}: DropHandlerArgs<T>) {
  event.preventDefault();

  const data = event.dataTransfer.getData('text/plain');
  if (!data) return;

  let droppedItem: T;
  try {
    droppedItem = JSON.parse(data);
  } catch (err) {
    console.error('Invalid drop data', err);
    return;
  }

  // prevent duplicates
  if (currentList.some(item => item.id === droppedItem.id)) return;

  // remove from original source list if applicable
  if (droppedItem.source && droppedItem.source !== sourceKey && onRemoveFromSource) {
    onRemoveFromSource(droppedItem.source, droppedItem.id);
  }

  // add to current list
  const newList = [...currentList, { ...droppedItem, source: sourceKey }];
  if (typeof onUpdate === 'function') {
    onUpdate(newList);
  } else {
    console.error('onUpdate is not a function');
  }
}
