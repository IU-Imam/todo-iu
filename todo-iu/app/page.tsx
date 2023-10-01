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
import { formatDistanceToNow } from 'date-fns';
import { title } from "process";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState(''); // Rename state variable to avoid conflicts

  useEffect(() => {
    fetchTodos();
  }, []);

  const titleChange = (e) => {
    setTitle(e.target.value); // Update todoTitle state
  }

  const submitForm = (e) => {
    e.preventDefault(); // Fix typo here
    var formData = new FormData()
    formData.append('title',title)
    formData.append('is_done',0)

    axios.post('/api/todos',formData).then((response)=>{
      setTitle('')
      fetchTodos()
    })
  }

  function fetchTodos() {
    axios.get('/api/todos')
      .then((response) => {
        setTodos(response.data);
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
            <form  method="POST" onSubmit={submitForm}>
              <CardHeader>
                <CardTitle>Add Todo</CardTitle>
                <CardDescription className="flex w-full max-w-sm items-center space-x-2">
                  <Input type="text" placeholder="Todo" className="form-control" name="title" value={title} onChange={titleChange} />
                  <Button className="input-group-text" type="submit">Add</Button>
                </CardDescription>
              </CardHeader>
            </form>
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
                    <TableHead>Created</TableHead>
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
                      <TableCell>
                        <p className="text-xs">
                          {formatDistanceToNow(new Date(item.created_at))}
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
