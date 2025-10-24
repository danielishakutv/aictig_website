import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface LightboxProps {
  images: Array<{
    id: string;
    image: string;
    title: string;
    caption?: string;
  }>;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrevious,
  onNext,
}: LightboxProps) {
  if (!images[currentIndex]) return null;

  const currentImage = images[currentIndex];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-90" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden transition-all">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
                  aria-label="Close"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>

                {/* Previous button */}
                {images.length > 1 && (
                  <button
                    onClick={onPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
                    aria-label="Previous"
                  >
                    <ChevronLeftIcon className="w-6 h-6" />
                  </button>
                )}

                {/* Next button */}
                {images.length > 1 && (
                  <button
                    onClick={onNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
                    aria-label="Next"
                  >
                    <ChevronRightIcon className="w-6 h-6" />
                  </button>
                )}

                {/* Image */}
                <div className="relative">
                  <img
                    src={currentImage.image}
                    alt={currentImage.title}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                </div>

                {/* Caption */}
                <div className="mt-4 text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold text-white mb-2"
                  >
                    {currentImage.title}
                  </Dialog.Title>
                  {currentImage.caption && (
                    <Dialog.Description className="text-neutral-300">
                      {currentImage.caption}
                    </Dialog.Description>
                  )}
                  {images.length > 1 && (
                    <p className="mt-2 text-sm text-neutral-400">
                      {currentIndex + 1} / {images.length}
                    </p>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
