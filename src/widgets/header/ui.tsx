import { Bell, MoreVertical } from 'lucide-react';

export const Header = () => {
  return (
    <header className="flex w-full items-center justify-end gap-3 bg-white p-4">
      <Bell className="cursor-pointer" />
      <MoreVertical className="cursor-pointer" />
    </header>
  );
};
