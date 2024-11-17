/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createReactBlockSpec,
  FileBlockWrapper,
  ResizeHandlesWrapper,
} from "@blocknote/react";


import { cn } from "@libs";
import { ChangeEvent, useCallback, useState } from "react";

import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  Input,
  Button,
} from "@ui";

import {FaYoutube} from "react-icons/fa";

export const Youtube = createReactBlockSpec(
  {
    type: "youtube",
    propSchema: {
      url: {
        default: "" as const,
      },
      previewWidth: {
        default: 560,
      },
    },
    content: "none",
  },
  {
    render: (props) => {

      const [width, setWidth] = useState<number>(
        Math.min(
          props.block.props.previewWidth!,
          props.editor.domElement.firstElementChild!.clientWidth
        )
      );

      const [isOpen, setIsOpen] = useState<boolean>(true);
      const [currentURL, setCurrentURL] = useState<string>("");

      const handleURLChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
          event.currentTarget.focus();
          setCurrentURL(event.currentTarget.value);
        },
        []
      );

      const handleURL = useCallback(() => {
        setIsOpen(true);
        const url = new URL(currentURL);
        url.searchParams.delete("t");
        
        props.editor.updateBlock(props.block, {
          type: 'youtube',
          props: {
            ...props.block.props,
            url: url.href.replace("/watch?v=", "/embed/"),
          },
        });
      }, [currentURL, props.editor, props.block]);

      return (
        <div
          className={cn(
            "bn-file-block-content-wrapper",
            props.block.props.url
              ? "flex w-full justify-center"
              : "w-full rounded-md bg-zinc-100 px-4 py-3"
          )}
          data-file-block
        >
          {props.block.props.url ? (
            <FileBlockWrapper {...(props as any)}>
              <ResizeHandlesWrapper
                {...(props as any)}
                width={width}
                setWidth={setWidth}
              >
                <iframe
                  width={width}
                  height="315"
                  src={props.block.props.url}
                  title="YouTube video player"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
                  allowFullScreen
                />
              </ResizeHandlesWrapper>
            </FileBlockWrapper>
          ) : (
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
              <AlertDialogTrigger className="w-full">
                <Button
                  variant={"ghost"}
                  size={"lg"}
                  className="w-full justify-start gap-x-2"
                >
                  <FaYoutube />
                  Add Video
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Добавить ссылку на видео с YouTube
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <Input
                      type="text"
                      placeholder="youtube.com/watch"
                      onChange={handleURLChange}
                      onEnter={handleURL}
                    />
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Отмена</AlertDialogCancel>
                  <AlertDialogAction onClick={handleURL}>
                    Добавить
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      );
    },
  }
);
