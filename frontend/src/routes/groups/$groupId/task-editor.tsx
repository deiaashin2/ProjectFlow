import { useState } from "react";
import { useParams } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export function CardWithForm() {
  const { groupId } = useParams({ strict: false });
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [detail, setDetail] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/groups/${groupId}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          due_date: dueDate,
          detail,
          status,
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert("Task created!");
      } else {
        alert("Failed to create task");
      }
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create Task</CardTitle>
        <CardDescription>Add a new task for this group.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Task Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="due-date">Due date</Label>
              <Input
                id="due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="task-detail">Task Detail</Label>
              <Textarea
                id="task-detail"
                className="w-full h-32 px-4 py-2 resize-y"
                wrap="soft"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select" />
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
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
