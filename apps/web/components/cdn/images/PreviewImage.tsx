// import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
// import { Button } from "@repo/ui/components/button";
// import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@repo/ui/components/dialog";
// import { Download, Minus, Plus, X } from "lucide-react";
// import Image from "next/image";
// import { useRef, useState } from "react";
// import { ReactZoomPanPinchRef, TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

// interface PreviewImageProps {
//   url: string;
//   alt?: string;
//   onClose?: () => void;
//   allowDownload?: boolean;
//   filename?: string;
// }

// export default function PreviewImage({
//   url,
//   alt = "Image",
//   onClose,
//   allowDownload = false,
//   filename,
// }: PreviewImageProps) {
//   const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isError, setIsError] = useState(false);

//   const handleOpen = () => {
//     setIsOpen(true);
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//     if (onClose) {
//       onClose();
//     }
//   };

//   const dashedFilename = filename?.replace(/ /g, "-");
//   // Extraire le nom du fichier de l'URL
//   const filenameDownload = dashedFilename || url.split("/").pop() || "image";

//   const handleDownload = () => {
//     // Créer un élément a temporaire pour forcer le téléchargement
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = filenameDownload;
//     link.target = "_blank"; // Ouvrir dans un nouvel onglet
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   if (!url) return null;

//   return (
//     <>
//       <Button
//         variant="ghost"
//         className="absolute top-2 right-2 z-10 bg-black/30 hover:bg-black/50 rounded-full p-1"
//         size="icon"
//         onClick={handleOpen}
//       >
//         <Plus className="h-4 w-4 text-white" />
//       </Button>

//       <Dialog
//         open={isOpen}
//         onOpenChange={(open) => {
//           if (!open) handleClose();
//         }}
//       >
//         <DialogContent className="!max-w-[1500px] !max-h-[90vh]">
//           <Button variant="ghost" size="icon" className="absolute top-2 right-2 z-10" onClick={handleClose}>
//             <X className="h-4 w-4" />
//           </Button>
//           <VisuallyHidden>
//             <DialogTitle>Voir l'image</DialogTitle>
//             <DialogDescription>Agrandir l'image</DialogDescription>
//           </VisuallyHidden>

//           <div className="flex flex-col items-center justify-center w-full h-full">
//             <TransformWrapper
//               initialScale={1}
//               initialPositionX={0}
//               initialPositionY={0}
//               minScale={1}
//               maxScale={4}
//               centerOnInit
//               limitToBounds
//               smooth={true}
//               doubleClick={{ disabled: false }}
//               wheel={{ step: 0.1 }}
//               ref={transformComponentRef}
//             >
//               {({ zoomIn, zoomOut, resetTransform }) => (
//                 <>
//                   <div className="flex items-center gap-2 z-10 mb-2">
//                     <Button variant="outline" size="icon" onClick={() => zoomOut()}>
//                       <Minus className="h-4 w-4" />
//                     </Button>
//                     <Button variant="outline" size="icon" onClick={() => zoomIn()}>
//                       <Plus className="h-4 w-4" />
//                     </Button>
//                     <Button variant="outline" size="icon" onClick={() => resetTransform()}>
//                       <X className="h-4 w-4" />
//                     </Button>
//                     {allowDownload && !isError && (
//                       <Button variant="outline" size="icon" onClick={handleDownload}>
//                         <Download className="h-4 w-4" />
//                       </Button>
//                     )}
//                   </div>
//                   <TransformComponent
//                     wrapperClass="w-fit !h-full flex items-center justify-center"
//                     contentClass="!w-full !h-full"
//                   >
//                     <Image
//                       src={url}
//                       alt={alt}
//                       width={1920}
//                       height={1080}
//                       className="max-w-full max-h-[calc(90vh-10rem)] object-contain"
//                       id="previewImage"
//                       onError={(e) => {
//                         e.currentTarget.src = "/images/error.png";
//                         setIsError(true);
//                       }}
//                     />
//                   </TransformComponent>
//                 </>
//               )}
//             </TransformWrapper>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }
