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
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";
import CustomTrigger from "@/components/custom-trigger";
import GithubLinkButton from "@/components/github-link-button";
import { Input } from "@/components/ui/input";
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

export const Route = createFileRoute("/groups/$groupId/task-editor")({
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
    { title: "Task Editor", url: "/groups/1/task-editor" },
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
        <CardTitle>Edit Task</CardTitle>
        <CardDescription>Edit your task in one-click.</CardDescription>
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
        <Button>Edit</Button>
      </CardFooter>
    </Card>
  );
}
