import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { MultiSelect, MultiSelectProps } from './MultiSelect';

export default {
  title: 'Example/MultiSelect',
  component: MultiSelect,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<MultiSelectProps> = (args) => <MultiSelect {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  placeholder: 'placeholder',
  items: [
    { id: '1', title: 'title1' },
    { id: '2', title: 'title2' },
    { id: '3', title: 'title3' },
    { id: '4', title: 'title4' },
    { id: '5', title: 'title5' },
    { id: '6', title: 'title6' },
  ],
  value: [],
  onChange: (selectedItems: string[]) => {
    console.log(selectedItems);
  },
};
