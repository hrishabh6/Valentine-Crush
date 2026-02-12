import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-24">
      <div className="z-10 w-full max-w-md items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-4xl font-bold text-center mb-8">Hello Shadcn UI</h1>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="email" placeholder="Email" />
            <Button type="submit">Subscribe</Button>
          </div>
          <div className="mt-8 text-center text-muted-foreground">
            <p>Next.js + Tailwind CSS + Shadcn UI initialized successfully!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
