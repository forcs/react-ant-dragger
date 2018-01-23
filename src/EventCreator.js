export default (source, target) => (options = {}) => {
  const base = {
    source,
    target
  }
  const extra = {
    item: options.item,
    itemType: options.itemType,
    isDragging: options.isDragging,
    isOver: options.isOver,

    differenceFromInitialOffset: options.differenceFromInitialOffset,
    initialClientOffset: options.initialClientOffset,
    initialSourceClientOffset: options.initialSourceClientOffset,
    clientOffset: options.clientOffset,
    sourceClientOffset: options.sourceClientOffset
  }

  return {
    ...base,
    ...extra
  }
}
