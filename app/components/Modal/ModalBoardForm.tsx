"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { TwitterPicker } from "react-color";
import { nanoid } from "nanoid";
import * as motion from "motion/react-client";
import { useStopPropagation } from "@/app/hooks";
import { boardFormSchema } from "../../util/validation";
import { useBoardsStore, useModalStore } from "../../store";

export default function ModalBoardForm() {
  const { form, handleChange, onSubmit, inputRef } = useModalBoardForm();

  return (
    <Form {...form}>
      <motion.form
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.1 }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-white w-[350px] p-3 mx-auto left-0 right-0 fixed top-32 rounded-md"
        onClick={useStopPropagation}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Board Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="보드 이름을 입력해주세요"
                  {...field}
                  ref={inputRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <TwitterPicker
          className="mx-auto rounded-lg"
          onChangeComplete={handleChange}
        />
        <Button type="submit">Submit</Button>
      </motion.form>
    </Form>
  );
}

const useModalBoardForm = () => {
  const boardId = useModalStore((state) => state.boardId);
  const editedBoard = useBoardsStore((state) => {
    if (state.boards) {
      return state.boards.find((board) => board.id === boardId);
    }
  });
  const closeModal = useModalStore((state) => state.closeModal);
  const addBoard = useBoardsStore((state) => state.addBoard);
  const editBoard = useBoardsStore((state) => state.editBoard);

  const isEditing = editedBoard !== undefined;

  const inputRef = useRef<HTMLInputElement>(null);
  const [color, setColor] = useState(() =>
    isEditing ? editedBoard.color : "#22194D",
  );

  const form = useForm<z.infer<typeof boardFormSchema> & { color: string }>({
    resolver: zodResolver(boardFormSchema),
    defaultValues: {
      title: isEditing ? editedBoard.title : "",
    },
  });

  const handleChange = <T extends { hex: string }>(color: T) => {
    setColor(color.hex);
  };

  const onSubmit: SubmitHandler<z.infer<typeof boardFormSchema>> = (data) => {
    const id = nanoid(8);
    const newData = { ...data, id, color, todoIds: [], isExisting: true };
    if (isEditing) {
      const editedData = { ...editedBoard, title: data.title, color };
      editBoard(editedData);
    } else {
      addBoard(newData);
    }
    closeModal("idle");
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  return { form, handleChange, onSubmit, inputRef };
};
