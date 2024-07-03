import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type FileDeleteAlertDialogProps = {
  onClick: () => void;
  open: boolean;
  onOpenChange: (state: boolean) => void;
  title: string;
  description: string;
  disabled?: boolean;
};

export const FileDeleteAlertDialog: React.FC<FileDeleteAlertDialogProps> = ({
  onClick,
  onOpenChange,
  open,
  title,
  description,
  disabled,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={disabled}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={disabled}
            onClick={(e) => {
              if (typeof disabled === "boolean") e.preventDefault();
              onClick();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
