import { useEffect, useState } from "react";
import { createFileRoute, useParams, useNavigate } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export const Route = createFileRoute("/groups/$groupId/task-editor")({
  component: TaskEditor,
  validateSearch: (search) => {
    return {
      taskId: typeof search.taskId === "string" ? search.taskId : undefined,
    };
  },
});

function TaskEditor() {
  const { groupId } = useParams({ strict: false });
  const { taskId } = Route.useSearch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    taskName: "",
    dueDate: "",
    detail: "",
    status: "Pending",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!taskId) return;

    const fetchTask = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:5000/api/tasks/${taskId}`);
        const data = await response.json();
        console.log("Fetched task data:", data); 
        const task = data.task ?? data;

        if (task.name && task.due_date) {
          setForm({
            taskName: task.name,
            dueDate: task.due_date,
            detail: task.detail || "",
            status: task.status || "Pending",
          });
        } else {
          console.error("Invalid task format:", task);
        }
      } catch (err) {
        console.error("Error fetching task:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = taskId
      ? `http://127.0.0.1:5000/api/tasks/${taskId}`
      : `http://127.0.0.1:5000/api/groups/${groupId}/tasks`;

    const method = taskId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.taskName,
          due_date: form.dueDate,
          detail: form.detail,
          status: form.status,
        }),
      });

      if (response.ok) {
        if (!groupId) {
          console.error("Missing groupId");
          return;
        }

        navigate({ to: "/groups/$groupId/task-management", params: { groupId } });
      } else {
        console.error("Failed to save task");
      }
    } catch (err) {
      console.error("Error submitting task:", err);
    }
  };

  // 👀 Show loading state
  if (taskId && loading) {
    return <div className="p-4 text-center">Loading task...</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{taskId ? "Edit Task" : "Create Task"}</CardTitle>
        <CardDescription>
          {taskId
            ? "Update the task details below."
            : "Add a new task for this group."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Task Name</Label>
              <Input
                id="name"
                value={form.taskName}
                onChange={(e) => setForm({ ...form, taskName: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="due-date">Due date</Label>
              <Input
                id="due-date"
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="task-detail">Task Detail</Label>
              <Textarea
                id="task-detail"
                className="w-full h-32 px-4 py-2 resize-y"
                wrap="soft"
                value={form.detail}
                onChange={(e) => setForm({ ...form, detail: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="status">Status</Label>
              <Select
                value={form.status}
                onValueChange={(value) => setForm({ ...form, status: value })}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Late">Late</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                  <SelectItem value="Canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <CardFooter className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (!groupId) {
                  console.error("Missing groupId");
                  return;
                }
                navigate({ to: "/groups/$groupId/task-management", params: { groupId } });
              }}
            >
              Cancel
          </Button>
            <Button type="submit">Save</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
