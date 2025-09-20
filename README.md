# komed3-periodic-table-patcher-assist
Tool to assist making patches to another project [periodic-table](https://github.com/komed3/periodic-table)
Bringing types to its DB, and prototypes of tools for conversion.

## More in depth

While this project has a direct object, its indirect objective is to improve my parsing and conversion tools for projects
of this kind as I currently plan to extend my scrapping knowhow in the future with a keen accent on strict typing.

Strict typing in typescript which is also on a third plan, As much I love duck typing it really gets hard to have strict typing.
Hence why there's 2 dependencies on JSON schema validations


## running the project

To install dependencies:

```bash
bun install
```

To run:

```bash
bun dev
```

To build schema
```bash
# MainstreamStructure can be changed if you want to make another kind of schema
bun run schema -- MainstreamStructure
```

This project was created using `bun init` in bun v1.2.20. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
