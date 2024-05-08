import { ref } from 'vue';

export const usePagination = () => {
  const initElement = ref(0);
  const endElement = ref(3);

  const nextElement = (newInitElement: number, newEndElement: number) => {
    initElement.value = newInitElement;
    endElement.value = newEndElement;
  };

  const previusElement = (newInitElement: number, newEndElement: number) => {
    initElement.value = newInitElement;
    endElement.value = newEndElement;
  };

  return {
    initElement,
    endElement,
    nextElement,
    previusElement,
  };
}