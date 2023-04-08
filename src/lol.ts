import { translate } from "./index.js";

const t = translate({
  id: "hello",
  variables: {
    name: "Billy",
    age: "30",
    job: "conducteur routier",
  },
  language: "en",
});

t.then((e: any) => {
  console.log(e);
});
