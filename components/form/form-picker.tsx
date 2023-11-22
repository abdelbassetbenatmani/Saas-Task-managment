"use client";
import Link from "next/link";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import { useState, useEffect } from "react";
import FormErrors from "./form-error";
import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import { defaultImages } from "@/constant/defaultImage";

type Props = {
  id: string;
  errors: Record<string, string[] | undefined>;
};

const FormPicker = ({ id, errors }: Props) => {
  const { pending } = useFormStatus();
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState(null);

  useEffect(() => {
    const fetchUnsplash = async () => {
      try {
        const response = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });
        if (response && response.response) {
          const newImages = response.response as Array<Record<string, any>>;
          setImages(newImages);
        } else {
          console.log(response);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUnsplash();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-5">
        <Loader2 className="w-10 h-10 text-gray-900 animate-spin" />
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2">
        {images.map((image) => {
          
          return (
            <div
              key={image.id}
              className={cn(
                "relative h-14 hover:opacity-75 transition bg-muted",
                pending && "opacity-50 hover:opacity-50 cursor-auto"
              )}>
              <button
                type="button"
                onClick={() => {
                  setSelectedImageId(image.id);
                }}
                className={cn("w-full h-full rounded-md overflow-hidden")}>
                  
                <input
                    type="radio"
                    name={id}
                    id={id}
                    value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
                    className="hidden"
                    checked={selectedImageId ===image.id}
                    disabled={pending}
                    onChange={() => {}}
                    />
                <Image
                  src={image.urls.regular}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
                {selectedImageId ===image.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>
      <FormErrors errors={errors} id={id} />
    </div>
  );
};

export default FormPicker;
