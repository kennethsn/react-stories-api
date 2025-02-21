import useCollection from './useCollection';

const useCollectionSlot = (component: string) => {
  const collection = useCollection();
  return {
    Component: collection.getSlotComponent(component)!,
    slotIsAvailable: collection.isSlotAvailable(component),
  };
};

export default useCollectionSlot;
