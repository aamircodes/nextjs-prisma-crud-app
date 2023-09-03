import Link from 'next/link';
import prisma from '../db';
import { redirect } from 'next/navigation';

export default function New() {
  async function addTodo(data: FormData) {
    'use server';

    await prisma.todo.create({
      data: {
        content: data.get('content') as string,
        complete: false,
      },
    });
    redirect('/');
  }

  return (
    <>
      <header className='flex mb-2'>
        <h1 className='text-3xl font-bold'>New</h1>
      </header>
      <div>
        <form action={addTodo} className='flex gap-2 flex-col mb-2'>
          <input
            type='text'
            placeholder='Type here'
            className='input input-bordered w-full max-w-xs mb-2'
            name='content'
          />
          <div className='flex gap-4 justify-start'>
            <button type='submit' className='btn btn-accent'>
              Add
            </button>
            <Link href='..'>
              <button type='submit' className='btn btn-secondary'>
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
