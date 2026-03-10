import type { Meta, StoryObj } from '@storybook/react-vite';
import type { FC } from 'react';
import { useMemo } from 'react';

import RootStore from '../../../state/rootStore';
import SearchStore, { type SearchStoreOptions } from '../../../state/searchStore';
import { baseStorybookDecorator } from '../../../stories/decorators';
import type { SearchFacet, SearchFacets } from '../../../types';
import SearchFacetsComponent from './SearchFacets';

type SearchFacetsStoryArgs = {
  readonly options: Omit<SearchStoreOptions, 'onSearch'>;
};

// Mock facets data
const checkboxFacet: SearchFacet = {
  data_type: 'string_array',
  fill_rate: 0.95,
  key: 'category',
  label: 'Category',
  selector_type: 'checkbox',
  value_refs: [
    {
      count: 150,
      fill_rate: 0.45,
      label: 'Paintings',
      value: 'paintings',
    },
    {
      count: 120,
      description: 'Three-dimensional artworks',
      fill_rate: 0.36,
      label: 'Sculptures',
      value: 'sculptures',
    },
    {
      count: 80,
      fill_rate: 0.24,
      label: 'Photographs',
      value: 'photographs',
    },
    {
      count: 50,
      description: 'Works on paper including drawings and prints',
      fill_rate: 0.15,
      label: 'Works on Paper',
      value: 'works_on_paper',
    },
  ],
};

const numberFacet: SearchFacet = {
  data_type: 'integer',
  description: 'Filter by the year of creation',
  fill_rate: 0.85,
  key: 'creation_year',
  label: 'Year Created',
  selector_type: 'number',
  value_refs: [],
};

const numberRangeFacet: SearchFacet = {
  bounds: {
    max: 2024,
    min: 1800,
  },
  data_type: 'integer',
  description: 'Filter by a range of years',
  fill_rate: 0.90,
  key: 'year_range',
  label: 'Year Range',
  selector_type: 'number_range',
  value_refs: [],
};

const dateRangeFacet: SearchFacet = {
  bounds: {
    max: 2024,
    min: 1900,
  },
  data_type: 'date',
  description: 'Filter by date range',
  fill_rate: 0.88,
  key: 'date_range',
  label: 'Date Range',
  selector_type: 'date_range',
  value_refs: [],
};

const yearRangeFacet: SearchFacet = {
  bounds: {
    max: 2024,
    min: 1900,
  },
  data_type: 'date',
  description: 'Filter by year range using a slider',
  fill_rate: 0.88,
  key: 'year_range',
  label: 'Year Range',
  selector_type: 'year_range',
  value_refs: [],
};

const mockFacets: SearchFacets = [
  checkboxFacet,
  numberFacet,
  numberRangeFacet,
  dateRangeFacet,
];

const buildSearchStore = (options: SearchStoreOptions) => new SearchStore(
  new RootStore(),
  options,
);

function SearchFacetsStory({ options }: SearchFacetsStoryArgs) {
  const search = useMemo(() => buildSearchStore({
    ...options,
    onSearch: async () => options.count ?? 100,
  }), [options]);

  return <SearchFacetsComponent search={search} />;
}

const meta = {
  component: SearchFacetsStory,
  decorators: [
    (StorybookStory: FC) => (
      <div style={{ border: '1px solid #e5e5e5', maxWidth: '400px', padding: '16px' }}>
        {baseStorybookDecorator(StorybookStory)}
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    options: { control: false },
  },
  tags: ['autodocs'],
  title: 'UI/SearchFacets',
} satisfies Meta<SearchFacetsStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllFacetTypes: Story = {
  args: {
    options: {
      count: 100,
      facets: mockFacets,
      placeholder: 'Search artworks...',
      searchOnFacetChange: true,
    },
  },
};

export const CheckboxOnly: Story = {
  args: {
    options: {
      facets: [checkboxFacet],
    },
  },
};

export const WithDescriptions: Story = {
  args: {
    options: {
      facets: [
        {
          ...checkboxFacet,
          description: 'Select one or more categories to filter results',
        },
      ],
    },
  },
};

export const NumberInputOnly: Story = {
  args: {
    options: {
      facets: [numberFacet],
    },
  },
};

export const NumberRangeOnly: Story = {
  args: {
    options: {
      facets: [numberRangeFacet],
    },
  },
};

export const DateRangeOnly: Story = {
  args: {
    options: {
      facets: [dateRangeFacet],
    },
  },
};

export const YearRangeOnly: Story = {
  args: {
    options: {
      facets: [yearRangeFacet],
    },
  },
};

export const WithPreselectedValues: Story = {
  args: {
    options: {
      facets: mockFacets,
      selectedFacets: {
        category: ['paintings', 'sculptures'],
      },
    },
  },
};

export const ManyOptions: Story = {
  args: {
    options: {
      facets: [
        {
          ...checkboxFacet,
          value_refs: Array.from({ length: 25 }, (_, i) => ({
            count: 100 - i * 3,
            fill_rate: (100 - i * 3) / 100,
            label: `Option ${i + 1}`,
            value: `option_${i + 1}`,
          })),
        },
      ],
    },
  },
};

export const EmptyFacets: Story = {
  args: {
    options: {
      facets: [],
      count: 0,
    },
  },
};
