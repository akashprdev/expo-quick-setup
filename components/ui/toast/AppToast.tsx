import { Toast, ToastTitle } from '@/components/ui/toast';
import type { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { Divider } from '../divider';
import { Icon } from '../icon';

type AppToastProps = {
  id: string | number;
  title: string;
  icon: LucideIcon;
};

export function AppToast({ id, title, icon: IconComponent }: AppToastProps) {
  const toastId = `toast-${id}`;

  return (
    <Toast nativeID={toastId} className="px-5 py-3 gap-4 shadow-soft-1 items-center flex-row">
      <Icon as={IconComponent} size="xl" className="fill-typography-100 stroke-none" />
      <Divider orientation="vertical" className="h-[30px] bg-outline-200" />
      <ToastTitle size="sm">{title}</ToastTitle>
    </Toast>
  );
}
