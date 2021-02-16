# Leviosa codding challange
To take the quiz, please fork this repository. Good luck!

## Part 1
For each of the code examples below, explain what is wrong with the code and come up with a fix. It is okay to google as long as you provide correct answers.

For each fix, create a separate file in the root directory of the repository, with names `example1.ts`, `example2.ts`, etc. Put your explanations into these the files as comments.

### Example 1

```typescript
interface Props {
  items: Item[];
}

interface Item {
  id: string;
  title: string;
  description: string;
}

const Component: FC<Props> = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => 
        <Item 
          key={index}
          item={item}
        />
      )}
    </div>
  );
};
```

### Example 2

```typescript
const Component: FC = () => {
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setSecondsElapsed(secondsElapsed + 1);
    }, 1000);
  }, [secondsElapsed, setSecondsElapsed]);

  return (
    <span>
      Seconds elapsed: {secondsElapsed}
    </span>
  );
};
```

### Example 3

```typescript
const publishItems = async () => {
  const itemsToPublish = ["foo", "bar", "baz", "boo", "quux"];
  itemsToPublish.forEach(async item => {
    await asyncPublisher.publish(item);
  });
};

publishItems().catch(e => {
  throw new Error("Failed to publish items!");
});
```

### Example 4

```typescript
const definedItems(array: any[]) => {
  const outputArray = [];
  array.forEach(item => {
    if (item) outputArray.push(item);
  }
  return outputArray;
}
```

### Example 5

```typescript
const Component: FC = () => {
  const { error, data, loading } = useQuery(SomeQuery);

  if (loading) return <Spinner />
  if (error) return <ErrorInfo error={error} />

  const [selectedItem, setSelectedItem] = useState<string |null>(null);

  return (
    <>
      {data.items.map(item => 
        <Item 
          key={item.id}
          item={item}
          selected={selectedItem === item.id}
          onSelect={() => setSelectedItem(item.id)}
        />
      }
    </>
  );
};
```

## Part 2
Please answer in as much detail as possible to the questions below. There is no one correct answer, provide your best opinion.

Put your answers into files named `question1.md`, `question2.md`.

### Question 1
List a few problems of JavaScript as a language.

### Question 2
How would you design an infinite scroll view, like feed on Facebook?

## Part 3
Code a component.

In this challenge, you will be asked to code a partial clone of a component from Ant Design library. It is prohibited to use any third-party UI libraries under the hood. If you are stuck, feel free to ask specific, well formed questions.

Create a directory at the root of the repo named `component`. Initialise it as an NPM package and configure Storybook. Create a single story that renders the component, and renders its current value as a raw JSON string next to it.

The component should accept the following props:

```typescript
interface Props {
  // Empty placeholder. If not specified, defaults to "Please select".
  placeholder?: string;
  // Descriptors of available items.
  items: Item[];
  // Ids of selected items.
  value: string[];
  // Callback that is called with ids of selected items when the value changes.
  onChange: (selectedItems: string[]) => void;
}

interface Item {
  // Unique identifier of an item.
  id: string;
  // Display text of an item.
  title: string;
}
```

The component should look like and behave like [multiple selection](https://ant.design/components/select/#components-select-demo-multiple)  variant of `Select` component from Ant Design:

1. By default, component is rendered in `closed` mode, and looks like an empty text input.
2. If no items are selected, a placeholder is rendered within the input. Custom placeholder can be specified by component user, otherwise the default must be used.
3. Clicking on the input opens a dropdown that includes a row per each item. The height of the dropdown is limited. If there are many items, a scrollbar should appear. If there are no items, a «no data» placeholder must appear.
4. Clicking anywhere outside of the component or clicking on the input part of the component should close the dropdown.
5. Rows change background color on hover.
6. Clicking on a row selects the respective item, or unselects it, if it is already selected. Selected rows have different background colors, and a «checkmark» icon.
7. Per each selected item, a grey block with item text appears within the input part of the component. Each block has a «close» icon. Clicking on the icon unselects respective item.
8. If at least one item is selected, a «clear» icon should appear within the input part of the component. Clicking on the icon unselects all selected items.
9. User can type arbitrary text within the input part of the component. When there is any text in the input part of the component, only those items that have titles starting with the text should be rendered.
10. Component must support navigation with arrows. When the dropdown is open, pressing keyUp or keyDown should change focused row. When enter is pressed, current focused row should be toggled.


