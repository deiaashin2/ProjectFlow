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
} from "@/components/ui/sheet"
import { useState } from 'react';

export const Route = createFileRoute("/groups/$groupId/task-management")({
  component: MessagePage,
});

function MessagePage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "275px",
      } as React.CSSProperties}
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
            <DataTableDemo selectedDate={selectedDate} />

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
              <CalendarDemo setSelectedDate={setSelectedDate} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}


function MessageBreadcrumb() {
  const navItems = [
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

export type Task = {
  id: string;
  dueDate: string; // Update to string (for date as "YYYY-MM-DD" format)
  status: "Pending" | "Done" | "Late" | "Canceled"; // Status of the payment
  taskName: string; // Name of the task
  detail?: string;
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
              search={{ taskId: payment.id }}
              className="[&.active]:font-bold"
            >
              Edit Task
            </Link>
            </DropdownMenuItem>
            <SheetDemo task={payment} />
              <DropdownMenuItem
                onClick={async () => {
                  try {
                    const res = await fetch(`http://127.0.0.1:5000/api/tasks/${payment.id}`, {
                      method: "DELETE",
                    });
                    if (res.ok) {
                      window.location.reload(); // or call fetchTasks() again
                    } else {
                      console.error("Failed to delete task");
                    }
                  } catch (err) {
                    console.error("Error deleting task:", err);
                  }
                }}
              >
                Delete
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTableDemo({ selectedDate }: { selectedDate: Date | undefined }) {
  const [data, setData] = React.useState<Task[]>([]);
  const [filteredData, setFilteredData] = React.useState<Task[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  React.useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/groups/1/tasks");
        const tasks = await response.json();
        const formatted = tasks.map((task: any) => ({
          id: task.id.toString(),
          taskName: task.name,
          dueDate: task.due_date,
          status: task.status,
          detail: task.detail,
        }));
        setData(formatted);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  React.useEffect(() => {
    if (selectedDate) {
      const selectedDateString = selectedDate.toISOString().split('T')[0];
      const filtered = data.filter(task => task.dueDate === selectedDateString);
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [selectedDate, data]);

  const table = useReactTable({
    data: filteredData,
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

export function CalendarDemo({ setSelectedDate }: { setSelectedDate: (date: Date | undefined) => void }) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setSelectedDate(selectedDate);
  };

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={handleDateChange}
      className="rounded-md border shadow"
    />
  );
}


export function CardWithForm() {
  const [form, setForm] = useState({
    taskName: "",
    dueDate: "",
    detail: "",
    status: "Pending",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/api/groups/1/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.taskName,
          due_date: form.dueDate,
          detail: form.detail,
          status: form.status,
        }),
      });

      if (response.ok) {
        setForm({ taskName: "", dueDate: "", detail: "", status: "Pending" });
        window.location.reload(); // or refetch task list instead
      } else {
        console.error("Failed to create task");
      }
    } catch (err) {
      console.error("Error during task creation:", err);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create Task</CardTitle>
        <CardDescription>Create your new task in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Task Name</Label>
              <Input
                id="name"
                placeholder="Task name of your project"
                value={form.taskName}
                onChange={(e) =>
                  setForm({ ...form, taskName: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="due-date">Due date</Label>
              <Input
                id="due-date"
                type="date"
                placeholder="Due date"
                value={form.dueDate}
                onChange={(e) =>
                  setForm({ ...form, dueDate: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="task-detail">Task Detail</Label>
              <Textarea
                className="w-full h-32 px-4 py-2 resize-y"
                wrap="soft"
                id="task_detail"
                placeholder="Task Details"
                value={form.detail}
                onChange={(e) =>
                  setForm({ ...form, detail: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="status">Status</Label>
              <Select
                value={form.status}
                onValueChange={(value) => setForm({ ...form, status: value })}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Late">Late</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                  <SelectItem value="Canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <CardFooter className="flex justify-between mt-4 p-0">
            <Button type="button" variant="outline" onClick={() => setForm({
              taskName: "", dueDate: "", detail: "", status: "Pending"
            })}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}

export function SheetDemo({ task }: { task: Task }) {
  const [fullTask, setFullTask] = useState<Task | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetch(`http://127.0.0.1:5000/api/tasks/${task.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setFullTask(data.task);
        });
    }
  }, [isOpen, task.id]);

  return (
    <>
      <DropdownMenuItem
        onClick={(e) => {
          e.preventDefault(); 
          e.stopPropagation(); 
          setIsOpen(true); 
        }}
      >
        Task details
      </DropdownMenuItem>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          onOpenAutoFocus={(e) => e.preventDefault()} 
          onCloseAutoFocus={(e) => e.preventDefault()} 
        >
          <SheetHeader>
            <SheetTitle>{fullTask?.taskName || task.taskName}</SheetTitle>
            <SheetDescription>
              {fullTask?.detail?.trim()
                ? fullTask.detail
                : "No details provided."}
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground">
              <p>
                <span className="font-semibold">Due:</span> {fullTask?.dueDate || task.dueDate}
              </p>
              <p>
                <span className="font-semibold">Status:</span> {fullTask?.status || task.status}
              </p>
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="button">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
