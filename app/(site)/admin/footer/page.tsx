import { getFooterListComponents } from "@/actions/admin/footer/getFooterListComponents";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { DeleteDialog } from "./DeleteDialog";

export default async function FooterGalleryPage() {
  const components = await getFooterListComponents();

  return (
    <>
      <Button asChild>
        <Link href="/admin/footer/new">Add new component</Link>
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Component</TableHead>
            <TableHead>Delete</TableHead>
            <TableHead>Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {components.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.component}</TableCell>
              <TableCell>
                <DeleteDialog id={item.id}>
                  <Button variant="ghost" size="icon">
                    <Trash2Icon />
                  </Button>
                </DeleteDialog>
              </TableCell>
              <TableCell>
                <Button size="icon" variant="ghost" asChild>
                  <Link href={`/admin/footer/${item.id}`}>
                    <Edit2Icon />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
