import { useCallback, useState } from 'react';

export const useToggleModals = () => {
  const [toggleModals, setToggleModals] = useState({
    edit: false,
    delete: false,
    create: false,
    preview: false,
  });

  const handleToggleModals = useCallback((value: keyof typeof toggleModals) => {
    setToggleModals((prev) => ({
      ...prev,
      [value]: !prev[value],
    }));
  }, []);

  return { toggleModals, setToggleModals, handleToggleModals };
};
