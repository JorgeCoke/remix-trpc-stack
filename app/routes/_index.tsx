import { type MetaFunction } from "@remix-run/node";
import { trpc } from "~/lib/trpc";
import { trpcVanilla } from "~/lib/trpc-vanilla";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const welcome = trpc.welcome.useQuery({ name: "frontend visitor!" });
  const hello = trpc.hello.useMutation();

  return (
    <div>
      <button
        onClick={async () => {
          const res = await trpcVanilla.welcome.query({
            name: "frontend visitor!",
          });
          alert(JSON.stringify(res));
        }}
      >
        Query Welcome (Vanilla tRPC)
      </button>
      <button
        onClick={async () => {
          const res = await trpcVanilla.hello.mutate({
            name: "frontend world!",
          });
          alert(JSON.stringify(res));
        }}
      >
        Mutate Hello (Vanilla tRPC)
      </button>
      <br />
      <hr />
      {welcome.data && (
        <p>Hello from ReactQuery tRPC {JSON.stringify(welcome.data)}</p>
      )}
      <button
        onClick={() => {
          hello.mutate({
            name: "frontend world!",
          });
        }}
      >
        Mutate Hello (ReactQuery tRPC)
      </button>
      {hello.data && (
        <p>Hello from ReactQuery tRPC {JSON.stringify(hello.data)}</p>
      )}
    </div>
  );
}
