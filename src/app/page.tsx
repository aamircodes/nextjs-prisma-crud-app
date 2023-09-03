import Link from 'next/link';
import prisma from './db';
import TodoItem from './components/TodoItem';
import { revalidatePath } from 'next/cache';

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  'use server';
  await prisma.todo.update({
    where: {
      id,
    },
    data: { complete },
  });
}

async function deleteTodo(id: string) {
  'use server';
  await prisma.todo.delete({
    where: {
      id,
    },
  });
  revalidatePath('/');
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <div className=''>
      <header className='flex mb-8 justify-between'>
        <h1 className='text-4xl font-bold'>Todos</h1>
        <Link href='/new'>
          <button className='btn btn-outline'>New</button>
        </Link>
      </header>
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            complete={todo.complete}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
}
