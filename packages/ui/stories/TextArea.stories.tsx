import type { Meta, StoryFn } from "@storybook/react";
import { Textarea } from "../components/ui/text-area";

const meta = {
  title: "TextArea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;

// type Story = StoryObj<typeof meta>;

const Template: StoryFn<typeof Textarea> = (args) => <Textarea {...args} />;
export const Default: StoryFn<typeof Textarea> = Template.bind({});
export const Error: StoryFn<typeof Textarea> = Template.bind({});
export const Disabled: StoryFn<typeof Textarea> = Template.bind({});
export const Small: StoryFn<typeof Textarea> = Template.bind({});
export const NonResizable: StoryFn<typeof Textarea> = Template.bind({});

Default.args = {
  size: "md",
  state: "default",
  resizable: true,
};

Error.args = {
  size: "md",
  state: "error",
  resizable: true,
};

Disabled.args = {
  size: "md",
  state: "disabled",
  resizable: true,
};

Small.args = {
  size: "sm",
  state: "default",
  resizable: true,
};

NonResizable.args = {
  size: "md",
  state: "default",
  resizable: false,
};
