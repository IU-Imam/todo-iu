"use client"
import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow } from 'date-fns'; // Import formatDistanceToNow

export default function Home() {
  const [todos, setTodos] = useState([]); // Declare todos state variable

  useEffect(() => {
    fetchTodos();
  }, []);

  function fetchTodos() {
    axios.get('/api/todos')
      .then((response) => {
        setTodos(response.data); // Set todos state with response data
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }

  return (
    <>
      <section className="flex mt-32 justify-center">
        <div className="w-96 m-4 cursor-pointer border-2 shadow-lg rounded-xl items-center">
          <ThemeToggle />
          <Card>
            <CardHeader>
              <CardTitle>Add Todo</CardTitle>
              <CardDescription className="flex w-full max-w-sm items-center space-x-2">
                <Input type="text" placeholder="Todo" />
                <Button type="submit">Add</Button>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>A list of your Todos.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Checkbox id="done" />
                    </TableHead>
                    <TableHead className="w-[100px]">SN</TableHead>
                    <TableHead className="w-[100px]">Todo</TableHead>
                    <TableHead className="w-[100px]">Action</TableHead>
                    <TableHead >Created</TableHead> {/* Added Created At header */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todos.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Checkbox id="done" />
                      </TableCell>
                      <TableCell className="font-medium">{i + 1}</TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell className="flex space-x-2 items-center">
                        <Button variant="outline" size="icon">
                          <Pencil1Icon className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell><p className="text-xs">

                        {formatDistanceToNow(new Date(item.created_at))} {/* Use formatDistanceToNow for the date */}
                      </p>
                      </TableCell>
                    </TableRow>
                    
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <p>Todo-IU</p>
            </CardFooter>
          </Card>
        </div>
      </section>
    </>
  );
}
