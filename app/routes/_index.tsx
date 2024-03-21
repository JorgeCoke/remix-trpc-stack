import { type MetaFunction } from "@remix-run/node";
import { trpc } from "~/lib/trpc";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      <button
        onClick={async () => {
          const res = await trpc.welcome.query({ name: "frontend visitor!" });
          alert(JSON.stringify(res));
        }}
      >
        Query Welcome
      </button>
      <button
        onClick={async () => {
          const res = await trpc.hello.mutate({ name: "frontend world!" });
          alert(JSON.stringify(res));
        }}
      >
        Mutate Hello
      </button>
    </div>
  );
}
