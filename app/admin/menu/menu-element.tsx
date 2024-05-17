import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button"
import { Edit2Icon, TrashIcon } from "lucide-react"
import Link from "next/link";

type Props = {
    id: number;
    title: string;
}

export const MenuElement = ({ title, id }: Props) => {
    return (
        <div className="border p-3 mb-2 flex items-center justify-between">
            <div>
                {title}
            </div>
            <div>
                <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/menu/${id}`}>
                        <Edit2Icon />
                    </Link>
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                            <TrashIcon />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete menu - {title}.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button variant="destructive">Delete</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    )
}