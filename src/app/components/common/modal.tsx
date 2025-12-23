"use client"

import React, { ReactNode } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@heroui/react";
interface IProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode,
    size?: "xs" | "sm" | "md" | "lg" | "xl";
}
export default function CustomModal({
    isOpen,
    onClose,
    title,
    children,
    size="xs"
}: IProps) {
  return (
    <>
      <Modal className="max-lg:top-[-30%]" isOpen={isOpen} size={size} onClose={onClose} isKeyboardDismissDisabled={true}>
        <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">{title}</ModalHeader>
              <ModalBody>
                {children}
              </ModalBody>
            </>
        </ModalContent>
      </Modal>
    </>
  );
}

