import React, {useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ThemeToggle from "@/components/theme-toggle";
import CustomTrigger from "@/components/custom-trigger";
import GithubLinkButton from "@/components/github-link-button";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import AppSidebar from "@/components/app-sidebar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from 'react';

export const Route = createFileRoute("/groups/$groupId/task-management")({
  component: MessagePage,
});

function MessagePage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Automatically scroll into view on page load`
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "275px",
        } as React.CSSProperties
      }
      defaultOpen={false}
    >
      <AppSidebar />

      <SidebarInset>
      {/* Header */}
      <header className="sticky top-0 flex shrink-0 gap-4 border-b dark:bg-sidebar">
        <div className="flex items-center gap-2 flex-grow p-4">
          <CustomTrigger />
          <Separator orientation="vertical" className="mr-2" />
          <MessageBreadcrumb />
        </div>
        <div className="flex items-center">
          <ThemeToggle />
          <GithubLinkButton />
        </div>
      </header>

      {/* Task Layout */}
      <div className="flex flex-grow h-full dark:bg-sidebar">
        <div className="flex flex-col flex-grow px-4 pb-6 mt-6">
          {/* Data Table */}
          <DataTableDemo />

          {/* Textarea and CardWithForm */}
          <div className="flex flex-col gap-4 mt-6 pb-12">
            <div>
              <CardWithForm />
            </div>
          </div>
        </div>

        {/* Calendar Sidebar */}
        <div className="hidden lg:flex min-w-56 lg:min-w-64 p-2 border-l bg-sidebar h-full">
          <div>
            <CalendarDemo />
          </div>
        </div>
      </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function MessageBreadcrumb() {
  const navItems = [
    { title: "Home", url: "/" },
    { title: "Groups", url: "/groups" },
    { title: "Task Management", url: "/groups/1/task-management" },
  ];
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {navItems.map((navItem, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={navItem.url} className="text-lg">
                  {navItem.title}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index !== navItems.length - 1 && (
              <BreadcrumbSeparator>
                <ArrowRight />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

const data: Task[] = [
  {
    id: "m5gr84i9",
    status: "Pending",
    taskName: "Task 1", // Updated field for task name
    dueDate: "2025-03-10", // Sample due date
  },
  {
    id: "3u1reuv4",
    status: "Late",
    taskName: "Task 2", // Updated field for task name
    dueDate: "2025-03-12", // Sample due date
  },
  {
    id: "derv1ws0",
    status: "Done",
    taskName: "Task 3", // Updated field for task name
    dueDate: "2025-03-15", // Sample due date
  },
  {
    id: "5kma53ae",
    status: "Canceled",
    taskName: "Task 4", // Updated field for task name
    dueDate: "2025-03-20", // Sample due date
  },
  {
    id: "bhqecj4p",
    status: "Done",
    taskName: "Task 5", // Updated field for task name
    dueDate: "2025-03-22", // Sample due date
  },
];

export type Task = {
  id: string;
  dueDate: string; // Update to string (for date as "YYYY-MM-DD" format)
  status: "Pending" | "Done" | "Late" | "Canceled"; // Status of the payment
  taskName: string; // Name of the task
};

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "taskName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Task Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("taskName")}</div>
    ),
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Date
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("dueDate")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy Task ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                to="/groups/$groupId/task-editor"
                params={{ groupId: "1" }}
                className="[&.active]:font-bold"
              >
                Edit Task
              </Link>
            </DropdownMenuItem>
              <SheetDemo/>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Tasks..."
          value={
            (table.getColumn("taskName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("taskName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow"
    />
  );
}

export function CardWithForm() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create Task</CardTitle>
        <CardDescription>Create your new task in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Task Name</Label>
              <Input id="name" placeholder="Task name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="due-date">Due date</Label>
              <Input id="due-date" type="date" placeholder="Due date" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="task-detail">Task Detail</Label>
              <Textarea className="w-full h-32 px-4 py-2 resize-y"
               wrap="soft" id="task_detail" placeholder="Task Details"/>
            </div>  
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="status">Status</Label>
              <Select>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Pending</SelectItem>
                  <SelectItem value="sveltekit">Late</SelectItem>
                  <SelectItem value="astro">Done</SelectItem>
                  <SelectItem value="nuxt">Canceled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Create</Button>
      </CardFooter>
    </Card>
  );
}

export function SheetDemo() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
      <DropdownMenuItem onClick={() => setIsOpen(true)}>Task details</DropdownMenuItem>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={() => setIsOpen(false)}>Save changes</Button> 
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
